import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth.service';
import {firstValueFrom} from 'rxjs';

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
