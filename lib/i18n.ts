import frTranslations from '@/locales/fr.json';
import enTranslations from '@/locales/en.json';

export type Locale = 'fr' | 'en';

const translations = {
  fr: frTranslations,
  en: enTranslations,
};

export const defaultLocale: Locale = 'fr';
export const locales: Locale[] = ['fr', 'en'];

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
