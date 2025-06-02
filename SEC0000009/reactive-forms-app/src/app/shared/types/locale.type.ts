export type Locale = 'ES' | 'FR' | 'EN';

export const LOCALE_ES: Locale = 'ES';
export const LOCALE_FR: Locale = 'FR';
export const LOCALE_EN: Locale = 'EN';

export const LOCALES: Locale[] = ['ES', 'FR', 'EN'];

export function getValidLocale(localeStr: string | null ): Locale | null {
  if (LOCALES.includes(localeStr as Locale)) {
    return localeStr as Locale;
  }
  return null;
}
