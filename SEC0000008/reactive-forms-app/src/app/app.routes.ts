import { Routes } from '@angular/router';
import {authRotues} from './auth/auth.router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren( () => authRotues)

  }
];
