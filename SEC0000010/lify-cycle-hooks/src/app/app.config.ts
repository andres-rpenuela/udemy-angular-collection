import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    //provideZoneChangeDetection({ eventCoalescing: true }), // Optional: Use this if you want to enable zone change detection
    provideRouter(routes),
    provideZonelessChangeDetection() // Optional: Use this if you want to enable zoneless change detection
  ]
};
