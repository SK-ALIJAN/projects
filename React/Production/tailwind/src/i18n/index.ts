import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE } from './i18nTypes';

// Use Vite's glob import to dynamically chunk and load locale JSON files
const locales = import.meta.glob('./locales/*.json');

const dynamicBackend = {
  type: 'backend' as const,
  init() {},
  read(
    language: string,
    _namespace: string,
    callback: (err: Error | null, data: Record<string, unknown> | null) => void
  ) {
    const cleanLang = language.split('-')[0];
    const key = `./locales/${cleanLang}.json`;

    if (locales[key]) {
      locales[key]()
        .then((module) => {
          callback(null, (module as { default: Record<string, unknown> }).default);
        })
        .catch((err) => {
          callback(err instanceof Error ? err : new Error(String(err)), null);
        });
    } else {
      // Fallback to default language if requested language chunk is missing
      const fallbackKey = `./locales/${DEFAULT_LANGUAGE}.json`;
      if (locales[fallbackKey]) {
        locales[fallbackKey]()
          .then((module) => {
            callback(null, (module as { default: Record<string, unknown> }).default);
          })
          .catch((err) => {
            callback(err instanceof Error ? err : new Error(String(err)), null);
          });
      } else {
        callback(new Error(`Locale "${cleanLang}" and fallback not found`), null);
      }
    }
  }
};

i18n
  .use(dynamicBackend)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // React already escapes values safely
    },
    react: {
      useSuspense: false // Prevents suspense fallback issues during dynamic chunk loading
    }
  });

export default i18n;
