import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth.service';
import {firstValueFrom} from 'rxjs';
import {Role} from '@auth/interfaces/role.interface';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  console.log('isAdminGuard called');

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticate = await firstValueFrom( authService.checkStatus() );

  // hay que asegurar que el usuario está autenticado antes de verificar el rol, ya que cuando se recarga la página, el estado es 'checking' y no se ha resuelto la petición de verificación de estado
  if( isAuthenticate ){
    // Se puede crear una señal en authService que devuela true si es Admin o false si no lo es
    // public isAdmin = computed(() => { this._user()?.roles?.includes( Role.Admin ) ? true : false; });
    const user = authService.user();
    // Check if the user has the 'admin' role
    if (user && user.roles && user.roles.includes( Role.Admin )) {
      return true;

    } else {
      // If not an admin, redirect or handle accordingly
      console.warn('Access denied - Admins only');
      router.navigateByUrl('/',{ replaceUrl:true });
      return false;
    }
  }

  console.warn('Access denied - Not authenticated');
  router.navigateByUrl('/auth/login',{ replaceUrl:true });
  return false;
};
