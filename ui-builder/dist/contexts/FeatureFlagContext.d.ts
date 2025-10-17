import { ReactNode } from 'react';
interface FeatureFlagContextType {
    flags: Record<string, any>;
    isFeatureEnabled: (flag: string) => boolean;
}
interface FeatureFlagProviderProps {
    flags: Record<string, any>;
    children: ReactNode;
}
export declare function FeatureFlagProvider({ flags, children }: FeatureFlagProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useFeatureFlags(): FeatureFlagContextType;
export {};
