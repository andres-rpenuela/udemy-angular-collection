# Guards

Los Guards son un tipo middleware, middleware, o guardia de acceso que se ejecutan antes de que se resuelva una ruta.

Se utilizan para proteger recursos (:como rutas_) y controlar el acceso a ellas.

Ciclo de vida de un Guard:

1. El Guard se ejecuta antes de que se resuelva la ruta.
2. Si el Guard devuelve `true`, la ruta se resuelve y se ejecuta el controlador.
3. Si el Guard devuelve `false`, la ruta no se resuelve y se puede redirigir al usuario o mostrar un mensaje de error.
4. Si el Guard lanza una excepción, se puede manejar en un middleware de error o en el controlador.
5. Si el Guard no se ejecuta, la ruta se resuelve normalmente.

>**Nota**: Ciclo de vida de la navegación:
>
>* canActivate: Se ejecuta antes de que se resuelva la ruta.
>* canActivateChild: Se ejecuta antes de que se resuelva una ruta hija.
>* canDeactivate: Se ejecuta antes de que se desactive una ruta.
>* canLoad: Se ejecuta antes de que se cargue un módulo.
>* canMatch: (_Más común_) Se ejecuta antes de que se resuelva una ruta y se utiliza para controlar el acceso a rutas específicas.
>* resolve: Se ejecuta después de que se resuelve la ruta y se utiliza para resolver los datos de la ruta.
>
>Otras estados del ciclo de vida de la navegación, menos usados:
>* canActivateByUrl: Se ejecuta antes de que se resuelva una ruta y se utiliza para controlar el acceso a rutas específicas basadas en la URL.
>* canActivateByData: Se ejecuta antes de que se resuelva una ruta y se utiliza para controlar el acceso a rutas específicas basadas en los datos de la ruta.
>* canActivateByParams: Se ejecuta antes de que se resuelva una ruta y se utiliza para controlar el acceso a rutas específicas basadas en los parámetros de la ruta.
>* canActivateByQueryParams: Se ejecuta antes de que se resuelva una ruta y se utiliza para controlar el acceso a rutas específicas basadas en los parámetros de consulta de la ruta.
>* canActivateByFragment: Se ejecuta antes de que se resuelva una ruta y se utiliza para controlar el acceso a rutas específicas basadas en el fragmento de la URL.
>* ...

Ejemplo de un Guard `canMatch`, para proteger una ruta específica, y evitar que se acceda a ella si el usuario esta está autenticado:

```typescript
export const notAuthenticatedGuard: CanMatchFn = (route, segments) => {
  console.log('notAuthenticatedGuard called');
  return true;
};
```

Para usar el Guard, se debe agregar a la ruta en el módulo de rutas:

```typescript
export const routes: Routes = [
  {
    // Carga perezosa, de routas hijas
    path: 'auth',
    title: 'Auth',
    loadChildren: () => import('./auth/auth.router'),
    // Guards: Cualqquier ruta que vaya a cargar desde aquí, debe pasar por el guard
    // ademas, se puede agregar una función que se ejecuta si el guard pasa
    canMatch: [ notAuthenticatedGuard, () => { console.log('Hola mundo! ') }  ]
  },
  {
    // Carga perezosa, de routas hijas
    path: '',
    title: 'Store',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
```

Importante: 
* Los Guards se ejecutan en el orden en que se definen en la ruta.
* Si el Guard devuelve `true`, la ruta se resuelve y se ejecuta el controlador. 
* Si el Guard devuelve `false`, la ruta no se resuelve y se puede redirigir al usuario o mostrar un mensaje de error.
* Si hay varios Guards, se ejecutan en el orden en que se definen, y si uno devuelve `false`, la ruta no se resuelve, pero se ejecutan los siguientes Guards.

Ejemplo de un Guard con inyección de dependencias:

```typescript
export const notAuthenticatedGuard: CanMatchFn =async (route, segments) => {
  console.log('notAuthenticatedGuard called');
  const authService = inject(AuthService);
  const router = inject(Router);

  // cuando se recaga, el estado es 'checking', porque no se ha resuelto la petición de verificación de estado
  // const isAuthenticated = authService.authStatus();
  console.log('isAuthenticated:', authService.authStatus());

  // para asegurar que se ha resuelto la petición de verificación de estado, se utiliza una promesa y se espera a que se complete
  // `checkStatus` devuelve un observable<true>, pro lo que se ha de convertir a promesa.
  // Además, esto implica que el gaurd se async.
  const isAuthenticated = await firstValueFrom( authService.checkStatus() );

  // si esta autenticado, redirige a la ruta raíz de la aplicación
  if( isAuthenticated ) {
    router.navigateByUrl('/');
    return false;
  }

  // si no esta autenticado, permite el acceso a la ruta de auth
  return true;
};
```
