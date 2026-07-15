import React from 'react';
import { Provider } from 'react-redux';
import { App as AntdApp } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '../store/store';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import ErrorBoundary from '../components/feedback/error/ErrorBoundary';
import { GlobalErrorProvider } from '../contexts/GlobalErrorContext';
import GlobalErrorView from '../components/feedback/error/GlobalErrorView';
import ToastProvider from '../components/feedback/toast/ToastProvider';


interface Props {
    children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({ children }) => {
    return (
        <Provider store={store}>
            <HelmetProvider>
                <AntdApp>
                    <ErrorBoundary> {/* Catches JavaScript runtime/rendering errors */}
                        <ThemeProvider> {/* Provides global theme (dark/light, design tokens) */}
                            <LanguageProvider> {/* Provides application-wide i18n / localization */}
                                <GlobalErrorProvider> {/* Manages global HTTP/API error state */}
                                    <GlobalErrorView /> {/* Renders custom UI for critical API errors */}
                                    <ToastProvider />
                                    {children} {/* Main application content (routes/layouts/pages) */}
                                </GlobalErrorProvider>
                            </LanguageProvider>
                        </ThemeProvider>
                    </ErrorBoundary>
                </AntdApp>
            </HelmetProvider>
        </Provider>
    );
};

export default AppProviders;
