import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Locale } from 'antd/es/locale';
import enUS from 'antd/locale/en_US';
import esES from 'antd/locale/es_ES';
import frFR from 'antd/locale/fr_FR';
import deDE from 'antd/locale/de_DE';
import jaJP from 'antd/locale/ja_JP';
import arEG from 'antd/locale/ar_EG';

import i18n from '../i18n';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../i18n/i18nTypes';
import type { SupportedLanguage, LanguageMeta, TextDirection } from '../i18n/i18nTypes';
import { storageService } from '../services/storage/storage.service';
import { PersistenceStorageKey } from '../services/storage/PersistenceStorageKey';

const ANTD_LOCALES: Record<SupportedLanguage, Locale> = {
  en: enUS,
  es: esES,
  fr: frFR,
  de: deDE,
  ja: jaJP,
  ar: arEG
};

interface LanguageContextType {
  language: SupportedLanguage;
  languageMeta: LanguageMeta;
  direction: TextDirection;
  antdLocale: Locale;
  setLanguage: (lang: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = storageService.get<string>('local', PersistenceStorageKey.LANGUAGE);
    if (saved && (saved in SUPPORTED_LANGUAGES)) {
      return saved as SupportedLanguage;
    }
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
      if (browserLang in SUPPORTED_LANGUAGES) {
        return browserLang;
      }
    }
    return DEFAULT_LANGUAGE;
  });

  const languageMeta = useMemo(
    () => SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES.en,
    [language]
  );

  const direction = languageMeta.dir;
  const antdLocale = useMemo(() => ANTD_LOCALES[language] || enUS, [language]);

  useEffect(() => {
    // 1. Sync i18next instance
    i18n.changeLanguage(language);

    // 2. Sync DOM document attributes for accessibility, SEO & RTL CSS rules
    if (typeof document !== 'undefined') {
      document.documentElement.lang = languageMeta.isoCode;
      document.documentElement.dir = direction;
    }
  }, [language, languageMeta, direction]);

  const setLanguage = (lang: SupportedLanguage) => {
    if (!(lang in SUPPORTED_LANGUAGES)) return;
    setLanguageState(lang);
    storageService.set('local', PersistenceStorageKey.LANGUAGE, lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        languageMeta,
        direction,
        antdLocale,
        setLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
