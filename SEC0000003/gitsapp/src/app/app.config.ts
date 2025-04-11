import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provider http client as Fetch
    // provideHttpClient() le dice a Angular que configure un cliente HTTP.
    // withFetch() le dice que use fetch() como mecanismo para hacer las peticiones HTTP
    provideHttpClient( withFetch() )
  ]
};
