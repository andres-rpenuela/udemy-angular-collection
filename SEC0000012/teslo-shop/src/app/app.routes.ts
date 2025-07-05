import { Routes } from '@angular/router';
import {notAuthenticatedGuard} from "@auth/guards/not-authenticated-guard";
import {isAdminGuard} from "@auth/guards/is-admin-guard";

export const routes: Routes = [
  {
    // Carga perezosa, de routas hijas
    path: 'auth',
    title: 'Auth',
    loadChildren: () => import('./auth/auth.router'),
    // Guards: Cualqquier ruta que vaya a cargar desde aquí, debe pasar por el guard
    // ademas, se puede agregar una función que se ejecuta si el guard pasa
    canMatch: [
      // () => { console.log('Hola mundo 1! '); return false; },
      notAuthenticatedGuard,
      // () => { console.log('Hola mundo 2!'); return true; }
    ]
  },
  {
    // Carga perezosa, de routas hijas
    path: 'admin',
    title: 'Admin Dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    canMatch:[
      isAdminGuard
    ]
  },
  {
    // Carga perezosa, de routas hijas
    path: '',
    title: 'Store',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
