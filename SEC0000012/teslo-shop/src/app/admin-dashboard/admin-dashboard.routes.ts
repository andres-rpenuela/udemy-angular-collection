import {Routes} from '@angular/router';
import {AdminLayoutComponent} from '@dashboard/layout/admin-layout/admin-layout.component';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    title: 'Admin Dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products',
        title: 'Admin Products',
        loadComponent: () => import('./pages/products-admin-page/products-admin-page.component').then(m => m.ProductsAdminPageComponent)
      },
      {
        path: 'product/:id',
        title: 'Admin Product',
        loadComponent: () => import('./pages/product-admin-page/product-admin-page.component').then(m => m.ProductAdminPageComponent)
      },
      {
        path: '**',
        redirectTo: 'products',
      }
    ]
  }
];

export default adminDashboardRoutes;
