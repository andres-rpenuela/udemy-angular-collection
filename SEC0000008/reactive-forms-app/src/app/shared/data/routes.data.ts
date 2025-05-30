import {reactiveRoutes} from '../../reactive/reactive.router';
import {Routes} from '@angular/router';

export const reactiveItems : Routes = reactiveRoutes[0].children ?? [];
