import {Routes} from '@angular/router';
import {HomePageComponent} from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'country',
    // carga perezosa, el country.routes.ts lo carga como un modulo, por lo que nos quedamos con lo que nos interesa
    //loadChildren: () => import('./countries/country.routes').then( m => m.countryRoutes)
    // o exportamos por defecto countryRoutes, y no hace falta el then, ya que lo va a coger por defecto las rutas
    // exportadas como rutas de country
    loadChildren: () => import('./countries/country.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }];
