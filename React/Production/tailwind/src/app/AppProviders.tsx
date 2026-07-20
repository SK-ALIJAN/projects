import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider, App as AntdApp } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '@/store/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/feedback/error/ErrorBoundary';
import { GlobalErrorProvider } from '@/contexts/GlobalErrorContext';
import GlobalErrorView from '@/components/feedback/error/GlobalErrorView';
import ToastProvider from '@/components/feedback/toast/ToastProvider';

interface Props {
  children: React.ReactNode;
}

const AntdLocalizationWrapper: React.FC<Props> = ({ children }) => {
  const { antdLocale, direction } = useLanguage();

  return (
    <ConfigProvider locale={antdLocale} direction={direction}>
      <AntdApp>
        {children}
      </AntdApp>
    </ConfigProvider>
  );
};

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundary> {/* Catches JavaScript runtime/rendering errors */}
          <ThemeProvider> {/* Provides global theme (dark/light, design tokens) */}
            <LanguageProvider> {/* Provides application-wide i18n / localization */}
              <AntdLocalizationWrapper> {/* Syncs Antd locale & RTL direction */}
                <GlobalErrorProvider> {/* Manages global HTTP/API error state */}
                  <GlobalErrorView /> {/* Renders custom UI for critical API errors */}
                  <ToastProvider />
                  {children} {/* Main application content (routes/layouts/pages) */}
                </GlobalErrorProvider>
              </AntdLocalizationWrapper>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </Provider>
  );
};

export default AppProviders;
