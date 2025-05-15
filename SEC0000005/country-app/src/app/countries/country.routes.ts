import {Routes} from '@angular/router';
import {ByCapitalComponent} from './components/by-capital/by-capital.component';

export const countryRoutes:Routes = [
  {
  path: '',
    component: ByCapitalComponent
  }];

// lo exportamos por defecto, para que cuando se haga una carga perezosa, este lo coga por defecto y no hace falta aplicar
// el then, es decir, haciendo 'export default country' permite pasar de eso
//     loadChildren: () => import('./countries/country.routes').then(m => m.countryRoutes)
//     por esto, en el app.routes.ts o se importe perezosamente con el 'loadChildren'
//     loadChildren: () => import('./countries/country.routes')
export default countryRoutes;
