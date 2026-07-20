import React, { Component } from "react";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

/**
 * --------------------------------------------------------
 * Next.js Style ErrorBoundary Component
 * --------------------------------------------------------
 *
 * Emulates the Next.js `error.js` / Dev Error Overlay UI.
 * Catches any uncaught JS runtime exceptions, reference errors,
 * or rendering crashes and displays a Next.js style error overlay.
 */
class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ errorInfo });
        console.error("🚨 Unhandled Runtime Error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        if (this.props.fallback) {
            return this.props.fallback;
        }

        const isDev = import.meta.env.DEV;

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999999,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '850px',
                    maxHeight: '90vh',
                    backgroundColor: '#111111',
                    color: '#ededed',
                    borderRadius: '12px',
                    border: '1px solid #333333',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {/* Next.js Header Bar */}
                    <div style={{
                        padding: '16px 24px',
                        borderBottom: '1px solid #222222',
                        backgroundColor: '#161616',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#e5484d',
                                display: 'inline-block'
                            }} />
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#e5484d', letterSpacing: '0.5px' }}>
                                Unhandled Runtime Error
                            </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#888888', fontFamily: 'monospace' }}>
                            {isDev ? 'Development Mode Overlay' : 'Application Error'}
                        </span>
                    </div>

                    {/* Error Content */}
                    <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                        <h1 style={{
                            margin: '0 0 12px 0',
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#ffffff',
                            lineHeight: 1.4,
                            wordBreak: 'break-word'
                        }}>
                            {this.state.error?.name || 'Error'}: {this.state.error?.message || 'An unexpected error occurred.'}
                        </h1>

                        {/* Call Stack Box */}
                        {this.state.error?.stack && (
                            <div style={{ marginTop: '16px' }}>
                                <div style={{ fontSize: '12px', color: '#888888', marginBottom: '8px', fontWeight: 500 }}>
                                    Call Stack / Trace:
                                </div>
                                <pre style={{
                                    margin: 0,
                                    padding: '16px',
                                    backgroundColor: '#0a0a0a',
                                    borderRadius: '8px',
                                    border: '1px solid #222222',
                                    color: '#f38ba8',
                                    fontSize: '12px',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    lineHeight: 1.6,
                                    overflowX: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    maxHeight: '300px'
                                }}>
                                    {this.state.error.stack}
                                </pre>
                            </div>
                        )}

                        {/* Component Stack */}
                        {this.state.errorInfo?.componentStack && (
                            <div style={{ marginTop: '16px' }}>
                                <div style={{ fontSize: '12px', color: '#888888', marginBottom: '8px', fontWeight: 500 }}>
                                    Component Tree Stack:
                                </div>
                                <pre style={{
                                    margin: 0,
                                    padding: '16px',
                                    backgroundColor: '#0a0a0a',
                                    borderRadius: '8px',
                                    border: '1px solid #222222',
                                    color: '#a6adc8',
                                    fontSize: '12px',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    lineHeight: 1.5,
                                    overflowX: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    maxHeight: '150px'
                                }}>
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Action Footer Bar */}
                    <div style={{
                        padding: '16px 24px',
                        borderTop: '1px solid #222222',
                        backgroundColor: '#161616',
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            onClick={this.handleReset}
                            style={{
                                backgroundColor: '#222222',
                                color: '#ffffff',
                                border: '1px solid #333333',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Try again
                        </button>
                        <button
                            onClick={this.handleReload}
                            style={{
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Reload page
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorBoundary;
