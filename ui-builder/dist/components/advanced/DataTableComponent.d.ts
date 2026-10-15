import { ComponentConfig, ActionConfig } from '../types';
interface DataTableColumnConfig {
    key: string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    render?: 'text' | 'badge' | 'avatar' | 'actions' | 'custom';
    width?: string;
    align?: 'left' | 'center' | 'right';
}
interface DataTableConfig extends ComponentConfig {
    type: 'data-table';
    props: {
        columns: DataTableColumnConfig[];
        data?: any[];
        dataSource?: string;
        toolbar?: ComponentConfig[];
        rowAction?: any;
        pagination?: {
            enabled: boolean;
            pageSize: number;
        };
        selection?: {
            enabled: boolean;
            type: 'single' | 'multiple';
        };
        actions?: {
            rowClick?: ActionConfig;
            rowActions?: ComponentConfig[];
        };
        loading?: boolean;
        emptyText?: string;
        className?: string;
    };
}
export declare function DataTableComponent({ config }: {
    config: DataTableConfig;
}): import("react/jsx-runtime").JSX.Element;
export {};
