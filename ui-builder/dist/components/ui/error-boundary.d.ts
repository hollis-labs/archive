import { default as React, Component, ReactNode } from 'react';
interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    showResetButton?: boolean;
    resetKeys?: Array<string | number>;
    resetOnPropsChange?: boolean;
    context?: 'chat' | 'sidebar' | 'main' | 'dialog';
}
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
    errorId: string;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    private resetTimeoutId;
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidUpdate(prevProps: ErrorBoundaryProps): void;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    generateErrorId: () => string;
    reportError: (error: Error, errorInfo: React.ErrorInfo) => void;
    handleRetry: () => void;
    resetErrorBoundary: () => void;
    handleClearCache: () => void;
    handleGoHome: () => void;
    getContextualMessage: () => {
        title: string;
        description: string;
    };
    render(): string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | null | undefined;
}
export {};
