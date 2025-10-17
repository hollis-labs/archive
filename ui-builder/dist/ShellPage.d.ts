import { PageConfig } from './types';
export interface PageData {
    config: PageConfig;
    featureFlags: Record<string, any>;
}
export interface ShellPageProps {
    pageKey: string;
    isAuthenticated?: boolean;
    hasUsers?: boolean;
    user?: any;
}
export declare function ShellPage({ pageKey, isAuthenticated: _isAuthenticated, hasUsers: _hasUsers, user: _user }: ShellPageProps): import("react/jsx-runtime").JSX.Element;
