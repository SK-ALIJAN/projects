import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Use Vite's glob import to dynamically chunk and load locale JSON files
const locales = import.meta.glob('./locales/*.json');

const dynamicBackend = {
  type: 'backend' as const,
  init() {},
  read(language: string, _namespace: string, callback: (err: Error | null, data: any) => void) {
    const key = `./locales/${language}.json`;
    if (locales[key]) {
      locales[key]()
        .then((module: any) => {
          callback(null, module.default);
        })
        .catch((err) => {
          callback(err instanceof Error ? err : new Error(String(err)), null);
        });
    } else {
      callback(new Error(`Locale "${language}" not found`), null);
    }
  }
};

i18n
  .use(dynamicBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
