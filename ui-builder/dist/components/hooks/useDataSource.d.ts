import { DataSourceResult } from '../types';
interface UseDataSourceOptions {
    dataSource: string;
    filters?: Record<string, any>;
    search?: string;
    sort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
    pagination?: {
        page: number;
        perPage: number;
    };
    autoFetch?: boolean;
}
interface UseDataSourceResult<T = any> {
    data: T[];
    meta: DataSourceResult['meta'];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    fetch: (options?: Partial<UseDataSourceOptions>) => Promise<void>;
}
export declare function useDataSource<T = any>(options: UseDataSourceOptions): UseDataSourceResult<T>;
export {};
