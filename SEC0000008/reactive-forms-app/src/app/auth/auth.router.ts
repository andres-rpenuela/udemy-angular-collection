import { Routes } from '@angular/router';
import {RegisterPageComponent} from './page/register-page/register-page.component';

export const authRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        title: 'Sign Up',
        component: RegisterPageComponent
      },
      {
        path: '**',
        redirectTo: 'sign-up'
      }
    ]
  }
];

export default authRoutes;
