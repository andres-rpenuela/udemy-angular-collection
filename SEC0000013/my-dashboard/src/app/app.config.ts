import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, ViewTransitionInfo, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // activa efectos de transaccion + opciones
      withViewTransitions({
        // saltar la primera (cuando se crea)
      skipInitialTransition: true,
        // muestra info de la transaccion
      onViewTransitionCreated( transitionInfo : ViewTransitionInfo){
        console.log( transitionInfo);
      }
    })),
    // Option 1: Importar de forma tradicional todos los modulos
    //importProvidersFrom(HttpClient),
    // Option 2: Importa Http Cliente
    provideHttpClient(
      //withFetch() // modalidad de funcionaimienot
      //,withInterceptors( [ loggingInterceptor,authInterceptor ] ) // interceptores
    ),
  ]
};
