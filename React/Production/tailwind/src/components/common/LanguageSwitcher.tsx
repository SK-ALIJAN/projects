import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '@/i18n/i18nTypes';
import type { SupportedLanguage, LanguageMeta } from '@/i18n/i18nTypes';
import { useTranslation } from '@/i18n/useTranslation';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'compact' | 'pills';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'dropdown'
}) => {
  const { language, setLanguage, languageMeta, direction } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languagesList = Object.values(SUPPORTED_LANGUAGES);

  const filteredLanguages = languagesList.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap gap-2 items-center ${className}`}>
        {languagesList.map((lang) => {
          const isActive = lang.code === language;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
              {lang.dir === 'rtl' && (
                <span className="text-[10px] px-1 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded">
                  RTL
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t('common.selectLanguage')}
        className="inline-flex items-center justify-between gap-2.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{languageMeta.flag}</span>
          <span className="font-semibold">{languageMeta.nativeName}</span>
          <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
            ({languageMeta.code})
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            direction === 'rtl' ? 'left-0' : 'right-0'
          } mt-2 w-64 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 ring-1 ring-black/5 z-50 overflow-hidden transform transition-all animate-fadeIn`}
        >
          {/* Search Input Filter */}
          <div className="p-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="relative">
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredLanguages.length === 0 ? (
              <div className="px-4 py-3 text-xs text-center text-gray-400">
                No languages found
              </div>
            ) : (
              filteredLanguages.map((lang: LanguageMeta) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm leading-snug">
                          {lang.nativeName}
                        </span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                          {lang.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {lang.dir === 'rtl' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                          RTL
                        </span>
                      )}
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
