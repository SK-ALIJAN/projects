export type TextDirection = 'ltr' | 'rtl';

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ar';

export interface LanguageMeta {
  code: SupportedLanguage;
  isoCode: string; // e.g., 'en-US', 'ar-SA'
  name: string;
  nativeName: string;
  dir: TextDirection;
  flag: string;
  defaultCurrency: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageMeta> = {
  en: {
    code: 'en',
    isoCode: 'en-US',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸',
    defaultCurrency: 'USD'
  },
  es: {
    code: 'es',
    isoCode: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    flag: '🇪🇸',
    defaultCurrency: 'EUR'
  },
  fr: {
    code: 'fr',
    isoCode: 'fr-FR',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
    defaultCurrency: 'EUR'
  },
  de: {
    code: 'de',
    isoCode: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    flag: '🇩🇪',
    defaultCurrency: 'EUR'
  },
  ja: {
    code: 'ja',
    isoCode: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    dir: 'ltr',
    flag: '🇯🇵',
    defaultCurrency: 'JPY'
  },
  ar: {
    code: 'ar',
    isoCode: 'ar-SA',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    defaultCurrency: 'SAR'
  }
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
