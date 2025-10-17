import { PageConfig } from '../types';
interface UsePageConfigResult {
    config: PageConfig | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}
export declare function usePageConfig(key: string): UsePageConfigResult;
export {};
