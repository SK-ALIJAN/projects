import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/i18nTypes';
import type { SupportedLanguage, LanguageMeta } from '../../i18n/i18nTypes';
import { useTranslation } from '../../i18n/useTranslation';

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
      <div className={`d-flex flex-wrap gap-2 align-items-center ${className}`}>
        {languagesList.map((lang) => {
          const isActive = lang.code === language;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center gap-2`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
              {lang.dir === 'rtl' && (
                <span className="badge bg-warning text-dark">RTL</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t('common.selectLanguage')}
        className="btn btn-outline-secondary dropdown-toggle d-inline-flex align-items-center gap-2 shadow-sm"
      >
        <span className="fs-6 leading-none">{languageMeta.flag}</span>
        <span className="fw-semibold">{languageMeta.nativeName}</span>
        <span className="text-uppercase text-muted small">({languageMeta.code})</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`dropdown-menu show shadow-lg border-0 ${
            direction === 'rtl' ? 'dropdown-menu-start' : 'dropdown-menu-end'
          } p-2`}
          style={{ minWidth: '240px', position: 'absolute', zIndex: 1050 }}
        >
          {/* Search Input Filter */}
          <div className="p-1 mb-2 border-bottom">
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control form-control-sm"
              autoFocus
            />
          </div>

          {/* Languages List */}
          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {filteredLanguages.length === 0 ? (
              <div className="px-3 py-2 text-center text-muted small">
                No languages found
              </div>
            ) : (
              filteredLanguages.map((lang: LanguageMeta) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`dropdown-item d-flex align-items-center justify-content-between py-2 rounded ${
                      isSelected ? 'active fw-bold' : ''
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-5">{lang.flag}</span>
                      <div className="d-flex flex-column text-start">
                        <span className="small leading-tight">{lang.nativeName}</span>
                        <span className="text-muted text-capitalize" style={{ fontSize: '10px' }}>
                          {lang.name}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-1">
                      {lang.dir === 'rtl' && (
                        <span className="badge bg-warning text-dark" style={{ fontSize: '9px' }}>
                          RTL
                        </span>
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
