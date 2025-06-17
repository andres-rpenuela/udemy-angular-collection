import {Routes} from '@angular/router';
import {StoreFrontLayoutComponent} from './layouts/store-front-layout/store-front-layout.component';

export const storeFrontRoutes : Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      { // load lazy, about component not default
        path: '',
        title: 'Store - Home',
        loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
      },
      { // load lazy, about component  default
        path: 'gender/:gender',
        title: 'Store - Gender',
        loadComponent: () => import('./pages/gender-page/gender-page.component')
      },
      {
        path: 'product/:idSlug',
        title: 'Store - Product',
        loadComponent: () => import('./pages/product-page/product-page.component').then(m => m.ProductPageComponent)
      },
      {
        path: '**',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

// falicita la importacion
export default storeFrontRoutes;

