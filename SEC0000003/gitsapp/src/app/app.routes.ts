import { Routes } from '@angular/router';

export const routes: Routes = [
  // load lazy, opcion sin "export default ..." de un componente standalone o modulo
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component').then(c => c.DashboardPageComponent),
    children:[
      // load lazy, opcion con "export default ..." de un componente standalone o modulo
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component')
      },
      // load lazy, opcion con "export default ..." de un componente standalone o modulo
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component')
      },
      // load lazy, opcion con "export default ..." de un componente standalone o modulo
      // con argumento dinamico:: "/:{name-param}" tantos como se deese
      {
        path: 'history/:query',
        loadComponent: () =>
          import('./gifs/pages/gif-history-page/gif-history-page.component')
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  // rutas por defecto
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
