import { SUPPORTED_LANGUAGES } from '@/i18n/i18nTypes';
import type { SupportedLanguage } from '@/i18n/i18nTypes';

/**
 * Enterprise Internationalization (i18n / l10n) Formatting Utilities
 */

/**
 * Format currency according to MNC standard ISO locale and currency code
 */
export const formatCurrency = (
  amount: number,
  currency?: string,
  lang: SupportedLanguage = 'en'
): string => {
  const meta = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES.en;
  const targetCurrency = currency || meta.defaultCurrency;

  try {
    return new Intl.NumberFormat(meta.isoCode, {
      style: 'currency',
      currency: targetCurrency,
      maximumFractionDigits: 2
    }).format(amount);
  } catch {
    return `${targetCurrency} ${amount.toFixed(2)}`;
  }
};

/**
 * Format date according to target locale
 */
export const formatDate = (
  date: Date | string | number,
  lang: SupportedLanguage = 'en',
  options?: Intl.DateTimeFormatOptions
): string => {
  const meta = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES.en;
  const d = new Date(date);

  if (isNaN(d.getTime())) return '';

  const defaultOptions: Intl.DateTimeFormatOptions = options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  try {
    return new Intl.DateTimeFormat(meta.isoCode, defaultOptions).format(d);
  } catch {
    return d.toLocaleDateString();
  }
};

/**
 * Format numbers with digit grouping according to target locale
 */
export const formatNumber = (
  value: number,
  lang: SupportedLanguage = 'en',
  options?: Intl.NumberFormatOptions
): string => {
  const meta = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES.en;

  try {
    return new Intl.NumberFormat(meta.isoCode, options).format(value);
  } catch {
    return value.toLocaleString();
  }
};

/**
 * Format percentages according to target locale
 */
export const formatPercent = (
  value: number,
  lang: SupportedLanguage = 'en',
  decimals: number = 1
): string => {
  const meta = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES.en;

  try {
    return new Intl.NumberFormat(meta.isoCode, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  } catch {
    return `${(value * 100).toFixed(decimals)}%`;
  }
};
