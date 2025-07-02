import {Routes} from '@angular/router';
import {AuthLayoutComponent} from '@auth/layout/auth-layout/auth-layout.component';


export const authRoutes:Routes = [
  {
    path: '',
    title: 'Authentication Layou',
    component: AuthLayoutComponent,
    children: [ // Load lazy
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
      },
      {
        path:'**',
        redirectTo:'login'
      }
    ]
  }
];
// facilita su importacion como rutas hijas
export default authRoutes;
