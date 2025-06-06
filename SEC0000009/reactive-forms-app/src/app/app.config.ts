import {ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// registrar idiomas
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import {LocaleService} from './shared/services/locale.service';

registerLocaleData(localeEs, 'es' );
registerLocaleData(localeFr, 'fr' );
registerLocaleData(localeEn, 'en' );

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideRouter(routes),
    // traductor con pipe // witchFetch(), para usar el fecth nativo del navegador
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'i18n/', '.json'),
          deps: [HttpClient]
        }
      })
    ),
    // selecionar idoma por defecto, por fecto es el ingles
    {
      provide: LOCALE_ID,
      //useValue: 'es'
      deps: [LocaleService],
      useFactory: (localService : LocaleService) => localService.getLocale()
    }
  ]
};
