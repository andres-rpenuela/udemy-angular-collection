# Peticion Http Post + Manejo de erroes + Redirecion + Subcripcion

Peticion HTTP Post del servicio Auth
```typescript
public login( {email , password}:UserLogin) : Observable<boolean>{
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
    // si esta bien develve un true
    map(()=> true),
    catchError( error=> {
      // Si llegas aquí, el servidor respondió con 4xx/5xx o hubo un problema de red.

      console.error('Error al hacer login:', error);

      // limpiar parmas
      this._user.set(null);
      this._token.set(null);
      localStorage.removeItem('token');
      this._authStatus.set("not-authenticated");

      //return throwError( () => new Error("Error al hacer login",error)); // estor emite un Observalbe que entra en 'error' del a subscipcion
      //return of(); // emite un Observable vacío para que tu stream no se rompa, no entra ni en 'next' ni en 'error' de la subcripcion
      return of(false); // emite un Observable con false, esto entra en 'next' de la subcripcion
    })
  )
}
```

Subcripcion a la Petición HTTP, donde el observable devolver `true` o `false`, y redireccia si es true al home o mostrara un mensaje de error.

```typescript
const userLogin: UserLogin= {email:email!, password:password!}
this.authService.login(userLogin)
  .pipe(
    delay(500),
    finalize(() => this.isLoading.set(false) ),
    take(1))    // se desuscribe tras el primer «next»
  .subscribe({
    next: resp => {
      console.log("Respuesta subcripcion: "+resp);
      if( resp ){
        this.router.navigateByUrl('/');

        // redirecciona si el login es correcto y elimina el historal (opcion reomendad, si no hay guards)
        //this.router.navigateByUrl('/',{ replaceUrl:true });

        return;
      }

      this.hasError.set(true);
      // muestra un error durante un tiempo
      setTimeout(() =>{
        this.hasError.set(false);
      },2000);

    },
    error: err => {// no entará acá a no ser que el observable lance un throwError()
      console.log("Respuesta error subcripcion: "+err);
    }
  });
```

> **Nota**: Redirección con 'rotuer'
> * Básica: `this.router.navigateByUrl('/');`
> * Sin historial: `this.router.navigateByUrl('/',{ replaceUrl:true });`
