import {reactiveRoutes} from '../../reactive/reactive.router';
import {Routes} from '@angular/router';
import authRoutes from '../../auth/auth.router';

export const reactiveItems : Routes = reactiveRoutes[0].children ?? [];

export const authItems : Routes = authRoutes[0].children ?? [];
