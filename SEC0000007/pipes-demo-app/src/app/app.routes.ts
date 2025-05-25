import { Routes } from '@angular/router';

export const routes: Routes = [
  { // load lazy + component mark as default
    path: 'basic',
    title: 'Base Pipes',
    loadComponent: () => import('./pages/basic-page/basic-page.component'),
  },
  { // load lazy + component mark as default
    path: 'numbers',
    title: 'Number Pipes',
    loadComponent: () => import('./pages/numbers-page/numbers-page.component'),
  },
  { // load lazy + component mark as default
    path: 'uncommon',
    title: 'Uncommon Pipes',
    loadComponent: () => import('./pages/uncommon-page/uncommon-page.component'),
  },
  { // load lazy + component mark as default
    path: 'custom',
    title: 'Custom Pipes',
    loadComponent: () => import('./pages/custom-page/custom-page.component'),
  },
  {
    path: '**',
    redirectTo: '/basic',
  }
];
