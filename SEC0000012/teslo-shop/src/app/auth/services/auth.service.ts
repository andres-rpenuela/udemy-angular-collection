import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {AuthStatus} from '@auth/interfaces/auth.interface';
import {UserResponse} from '@auth/interfaces/user-response.interface';
import {User} from '@auth/interfaces/user.interface';
import {UserLogin} from '@auth/interfaces/user-request.interface';
import {catchError, of, tap, throwError} from 'rxjs';

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
  protected _token = signal<string|null>(null);

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
    if (this._authStatus() === 'checking') return this._authStatus();

    if(this._user() ){
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  public user = computed<User | null>( () => this._user() );
  public token = computed<string | null>( () => this._token() );


  constructor() { }


  // Desestructuración de objetos en los parámetros de la función
  // Extrayendo directamente las propiedades email y password del objeto UserLogin.
  public login( {email , password}:UserLogin){
    console.log('Login: '+email.substring(0,4)+'....');

    return this.httpClient.post<UserResponse>(this.endpointLogin,
      {
      email: email,
      password: password,
      },
      { observe: 'response' }      // 🚩 le pides la respuesta completa
    ).pipe(
      tap( (response) => {
        // Si llegas aquí, ¡el servidor respondió con un 2xx!
        //this._authStatus.set('authenticated'); // opcional, la señal computed lo cambiara si el user no es nulo

        console.log('Status code:', response.status);        // p.ej. 200
        console.log('Full headers:', response.headers);
        const body = response.body!;            // tu UserResponse
        this._user.set(body.user);
        this._token.set(body.token);

        localStorage.setItem('token', this.token()! )
      }),
      catchError( (error)=> {
        // Si llegas aquí, el servidor respondió con 4xx/5xx o hubo un problema de red.

        console.error('Error al hacer login:', error);
        //return throwError( () => new Error("Error al hacer login",error));
        return of(); // emite un Observable vacío para que tu stream no se rompa, no entra ni en 'next' ni en 'error' de la subcripcion
      })
    )
  }
}
