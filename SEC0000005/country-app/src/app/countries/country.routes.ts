import {Routes} from '@angular/router';
import {CountryLayoutComponent} from './layouts/country-layout/country-layout.component';
import {ByCapitalComponent} from './components/by-capital/by-capital.component';

export const countryRoutes:Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      { // carga no perezosa
        path: 'by-capital',
        component: ByCapitalComponent
      },
      // { // cargar perezosa
      //   path: 'by-capital',
      //   loadComponent: () => import('./components/by-capital/by-capital.component').then(m => m.ByCapitalComponent),
      // },
      { // carga perezosa
        path: 'by-country',
        loadComponent: () => import('./components/by-country/by-country.component').then(m => m.ByCountryComponent)
      },
      { // carga perezosa
        path: 'by-region',
        loadComponent: () => import('./components/by-region/by-region.component').then(m => m.ByRegionComponent)
      },
      { // ruta dinamica + carga perezosa
        path: 'by/:country',
        loadComponent: () => import('./components/country/country.component').then(m => m.CountryComponent)
      },
      { // si no es ninguna de la anterior, redirecciona
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
];

// lo exportamos por defecto, para que cuando se haga una carga perezosa, este lo coga por defecto y no hace falta aplicar
// el then, es decir, haciendo 'export default country' permite pasar de eso
//     loadChildren: () => import('./countries/country.routes').then(m => m.countryRoutes)
//     por esto, en el app.routes.ts o se importe perezosamente con el 'loadChildren'
//     loadChildren: () => import('./countries/country.routes')
export default countryRoutes;
