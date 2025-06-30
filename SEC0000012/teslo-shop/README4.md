# Interceptores

Intercpet una petición, puede modificarla, o incluso cancelarla.

Por ejemplo:
* Si quieres que todas las peticiones a una URL específica sean canceladas, puedes hacerlo con un interceptor.
* Añadir un token de autenticación a todas las peticiones que se envían a un servidor.

Se pueden crear:
* Mediante el decorador `@interceptor` de la clase `Interceptor`.

```typescript
@Injectable() // Decorador necesario para que Angular pueda inyectar el interceptor
export class AuthInterceptor implements HttpInterceptor {
    // función que intercepta las peticiones
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = 'your-auth-token';
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }
}
```

* Funciones que reciban un objeto `Request` y devuelvan un objeto `Response` (_versines de Angular 19+_).

```typescript
// Funcion
export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req);
}

// Funcion Lambda
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
```

Para Angular 19+, se debe registrar el interceptor en el módulo principal de la aplicación, mediante la propiedad `withInterceptors` de `provideHttpClient`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors( [ loggingInterceptor ] )
    ),
  ]
};
```
