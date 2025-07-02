import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {AuthStatus} from '@auth/interfaces/auth.interface';
import {UserResponse} from '@auth/interfaces/user-response.interface';
import {User} from '@auth/interfaces/user.interface';
import {UserLogin, UserRegister} from '@auth/interfaces/user-request.interface';
import {catchError, map, Observable, of} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);

  protected readonly endpointLogin : string= `${environment.baseUrl}/auth/login`;
  protected readonly endpointRegister : string= `${environment.baseUrl}/auth/register`
  protected readonly endpointCheckStatus : string= `${environment.baseUrl}/auth/check-status`

  protected _authStatus = signal<AuthStatus>('checking');
  protected _user = signal<User|null>(null);
  protected _token = signal<string|null>( localStorage.getItem('token') );

  productsMap = new Map<string,UserResponse>;

  // Getters de señales
  /**
   * Esta propiedad deriva su valor a partir de otras señales internas <code>(_authStatus y _user)</code>
   * Cada vez que <code>_authStatus</code> o <code>_user</code> cambian, el valor de authStatus se recalcula automáticamente.
   *
   * Lógica paso a paso
   * <ul>
   *   <li> Si el estado interno _authStatus es 'checking', entonces authStatus también devuelve 'checking'.</li>
   *   <li> Si hay un usuario en _user() (es decir, no es null), entonces considera que está 'authenticated'.</li>
   *   <li> En cualquier otro caso, devuelve 'not-authenticated'.</li>
   * </ul>
   *
   *  Nota: Al ser computed, es solo lectura.
   */
  public authStatus = computed<AuthStatus>( () =>{
    if (this._authStatus() === 'checking') return 'checking';

    if(this._user() ){
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  public user = computed<User | null>( () => this._user() );
  public token = computed<string | null>( () => this._token() );

  // se dispara tan pronto se inyecte el servicio por primera vez
  checkStatusResource = rxResource({
    stream: () => this.checkStatus()   // <-- devuelve Observable<StatusResponse>
  });

  constructor() { }


  // Desestructuración de objetos en los parámetros de la función
  // Extrayendo directamente las propiedades email y password del objeto UserLogin.
  public login( {email , password}:UserLogin) : Observable<boolean>{
    console.log('Login: '+email.substring(0,4)+'....');

    return this.httpClient.post<UserResponse>(this.endpointLogin,
      {
      email: email,
      password: password,
      },
      { observe: 'response' }      // 🚩 le pides la respuesta completa
    ).pipe(
      // tap( (response) => {
      //   // Si llegas aquí, ¡el servidor respondió con un 2xx!
      //   //this._authStatus.set('authenticated'); // opcional, la señal computed lo cambiara si el user no es nulo
      //
      //   // console.log('Status code:', response.status);        // p.ej. 200
      //   // console.log('Full headers:', response.headers);
      //   // const body = response.body!;            // tu UserResponse
      //   // this._user.set(body.user);
      //   // this._token.set(body.token);
      //   //
      //   // localStorage.setItem('token', this.token()! )
      //   this.handleAuthSuccess(response); // si no devuelve true
      // }),
      // si esta bien develve un true
      //map(()=> true),
      map( (response)=> this.handleAuthSuccess(response) ),
      catchError( error=> {
        // Si llegas aquí, el servidor respondió con 4xx/5xx o hubo un problema de red.

        console.error('Error al hacer login:', error);

        // limpiar parmas
        // this._user.set(null);
        // this._token.set(null);
        // localStorage.removeItem('token');
        // this._authStatus.set("not-authenticated");
        //
        // //return throwError( () => new Error("Error al hacer login",error)); // estor emite un Observalbe que entra en 'error' del a subscipcion
        // //return of(); // emite un Observable vacío para que tu stream no se rompa, no entra ni en 'next' ni en 'error' de la subcripcion
        // return of(false); // emite un Observable con false, esto entra en 'next' de la subcripcion
        return this.handleAuthError(error);
      })
    )
  }

  public checkStatus():Observable<boolean>{
    console.log('check status ....')
    const token:string | null = localStorage.getItem('token');

    if( !token ){
      this.logout();
      return of(false);
    }

    // evitar peticion http
    const storedSession = localStorage.getItem('userSession');

    if (storedSession) {
      const parsed: UserSession = JSON.parse(storedSession);
      console.log(parsed.userResponse);
      console.log(new Date(parsed.timestamp)); // Opcional: convertir timestamp a fecha legible

      const expirationTime = parsed.timestamp + (1 * 60 * 60 * 1000); // 1 hora en ms
      const isExpired = Date.now() > expirationTime;
      if( !isExpired ) {
        console.log("Cargando el usuario de la cache...")
        this._user.set(parsed.userResponse.user); // Cargar el usuario desde la sesión guardada
        this._token.set(token); // Cargar el token desde el localStorage
        this._authStatus.set('authenticated');

        return of( true );
      }
    }

    console.log("Realizando petición al servidor para verificar el estado de autenticación...");
    return this.httpClient.get<UserResponse>(this.endpointCheckStatus,{
      // se añade mediente interceptor
      // headers:{
      //   Authorization: `Bearer ${token}`
      // },
      observe: 'response'
    }).pipe(
      // tap( (response) => {
      //   // Si llegas aquí, ¡el servidor respondió con un 2xx!
      //   //this._authStatus.set('authenticated'); // opcional, la señal computed lo cambiara si el user no es nulo
      //
      //   this.handleAuthSuccess(response);
      // }),
      // // si esta bien develve un true
      // map(()=> true),
      map( (response) => this.handleAuthSuccess(response)),
      catchError( error=> {
        // Si llegas aquí, el servidor respondió con 4xx/5xx o hubo un problema de red.

        console.error('Error al hacer login:', error);

        return this.handleAuthError(error);
      })
    );
  }

  public register({password,email,fullName}:UserRegister ):Observable<boolean>{
    console.log('Register: '+email.substring(0,4)+'....');

    const payload = {password,email,fullName};

    return this.httpClient.post<UserResponse>(this.endpointRegister,
      payload,
      { observe: 'response' }      // 🚩 le pides la respuesta completa
    ).pipe( // devuelve la misma respuesta que el login, es decir, cuando se registre un usuario, se autentica automáticamente
      map( (response) => this.handleAuthSuccess(response) ),
      catchError( error=> {
        // Si llegas aquí, el servidor respondió con 4xx/5xx o hubo un problema de red.

        console.error('Error al hacer register:', error);

        return this.handleAuthError(error);
      })
    );
  }

  public logout(){
    console.log('Logout');
    // limpiar params
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set("not-authenticated");

    // TODO comentamos para que no se borre el token del local store mientras se desarrolla
    localStorage.removeItem('token');
    localStorage.removeItem('userSession');

  }

  private handleAuthSuccess(response: HttpResponse<UserResponse>) {
    console.log('Status code:', response.status);        // p.ej. 200
    console.log('Full headers:', response.headers);
    // const body = response.body!;            // tu UserResponse
    const {user,token} = response.body!;        // tu UserResponse desectructurado

    this._user.set(user); //body.user
    this._token.set(token); //body.token
    this._authStatus.set('authenticated');



    return true;
  }

  private handleAuthError(error:any):Observable<boolean> {
    // limpiar params
    this.logout();
    return of(false); // emite un Observable con false, esto entra en 'next' de la subcripcion
  }

  userSessionSaveEffect = effect(() => {
    console.log('userSessionSaveEffect called: { user: '+this._user()?.fullName.substring(0,3) + 'xxxx, token: ' + this._token()?.substring(0,3) + 'xxxx }');
    if (!this._user()) {
      return;
    };

    const userResponse:UserResponse = {
      user: this._user() as User, // Asegúrate de que `user` esté definido
      token: this._token() as string // Asegúrate de que `token` esté definido
    };

    const userSession: UserSession = {
      userResponse: userResponse,               // Asegúrate de que `user` esté definido
      timestamp: new Date(Date.now()).getTime() // Timestamp de cuando se guardó la sesión, puedes ajustar el tiempo según tus necesidades
    };

    localStorage.setItem('token', this._token()!); // Guardar el token en localStorage
    localStorage.setItem('userSession', JSON.stringify(userSession));
  });

}

export interface UserSession {
  userResponse: UserResponse
  timestamp: number; // Timestamp de cuando se guardó la sesión
}
