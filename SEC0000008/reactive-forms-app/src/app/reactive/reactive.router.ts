import {Routes} from '@angular/router';

export const reactiveRoutes : Routes = [
  {
    path: '',
    title: 'Reactive Forms',
    children: [ // load lazy
      { // component as default
        path: 'basic',
        title: 'Básicos',
        loadComponent: () => import('./page/base-page/base-page.component')
      },
      { // component as NON default
        path: 'dinamyc',
        title: 'Dinámicos',
        loadComponent: () => import('./page/dinamyc-page/dinamyc-page.component').then(m => m.DinamycPageComponent)
      },
      { // component as default
        path: 'swith',
        title: 'Swithes',
        loadComponent: () => import('./page/switches-page/switches-page.component')
      },
      { // si no es ninguna de la anterior, redirecciona
        path: '**',
        redirectTo: 'basic'
      }
    ]
  }
]
