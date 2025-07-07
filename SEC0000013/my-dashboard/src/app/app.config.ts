import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, ViewTransitionInfo, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';

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
    }))
  ]
};
