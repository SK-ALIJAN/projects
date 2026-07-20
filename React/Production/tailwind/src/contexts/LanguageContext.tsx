import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '@/i18n';
import { storageService } from '@/services/storage/storage.service';
import { PersistenceStorageKey } from '@/services/storage/PersistenceStorageKey';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<string>(() => {
    return (
      storageService.get<string>('local', PersistenceStorageKey.LANGUAGE) ||
      (typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en') ||
      'en'
    );
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    storageService.set('local', PersistenceStorageKey.LANGUAGE, lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
};
