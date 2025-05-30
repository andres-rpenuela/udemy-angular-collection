import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { // load lazy of routes, about default routes
        path: 'auth',
        loadChildren: () => import('./auth/auth.router')
      },
      { // load lazy of routes, about not default rotues
        path: 'reactive',
        loadChildren: () => import('./reactive/reactive.router').then( (module) => module.reactiveRoutes)
      },
      { // load lazy of routes, about not default rotues
        path: 'country',
        loadChildren: () => import('./country/country.router').then( (module) => module.countryRoutes)
      },

    ]
  },
  {
    path:'**',
    redirectTo: 'basic'
  }
];
