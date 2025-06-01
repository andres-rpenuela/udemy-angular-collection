import {effect, Injectable, signal} from '@angular/core';
import {getValidLocale, Locale, LOCALE_EN, LOCALE_ES} from '../types/locale.type';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private readonly currentLocaleSng = signal<Locale>(LOCALE_ES);

  constructor(private translate: TranslateService) {
    // get locale
    const localeMaybe: string | null = localStorage.getItem('locale');
    const validLocale = getValidLocale(localeMaybe) ?? LOCALE_ES;
    this.currentLocaleSng.set( validLocale );

    // uso del tranlate instalado
    this.translate.addLangs([LOCALE_EN.toString().toLowerCase(), LOCALE_ES.toString().toLowerCase()]);
    this.translate.setDefaultLang(validLocale.toString().toLowerCase() );

    effect(() => { // cada vez que cambie el idioma cambia
      this.translate.use(this.currentLocaleSng().toString().toLowerCase());
    });

  }

  public getLocale(): Locale {
    return this.currentLocaleSng();
  }

  public changeLocale(locale: Locale): void {
    // set locale + updated
    localStorage.setItem('locale',locale);
    this.currentLocaleSng.set(locale); // invoca al effecto

    // reload (para que carge el nuevo idomoa, opcional)
    (window as Window).location.reload();
  }
}
