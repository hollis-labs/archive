import { default as React } from 'react';
export interface DataItem {
    id: string | number;
    enabled?: boolean;
    [key: string]: any;
}
export interface ColumnDefinition<T extends DataItem> {
    key: keyof T | 'actions' | 'checkbox';
    label: string;
    width?: string;
    sortable?: boolean;
    render?: (item: T, value: any) => React.ReactNode;
}
export interface FilterDefinition {
    key: string;
    label: string;
    options: {
        value: string;
        label: string;
        count?: number;
    }[];
}
interface DataManagementModalProps<T extends DataItem> {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
    title: string;
    data: T[];
    columns: ColumnDefinition<T>[];
    loading?: boolean;
    error?: string;
    filters?: FilterDefinition[];
    searchPlaceholder?: string;
    searchFields?: (keyof T)[];
    expandedContent?: (item: T) => React.ReactNode;
    onToggleItem?: (itemId: string | number, checked: boolean) => void;
    onAction?: (action: string, item: T) => void;
    actionItems?: Array<{
        key: string;
        label: string;
        className?: string;
    }>;
    onRefresh?: () => void;
    customHeader?: React.ReactNode;
    emptyStateMessage?: string;
    emptyStateIcon?: React.ReactNode;
    defaultSort?: string;
    defaultSortDirection?: 'asc' | 'desc';
    clickableRows?: boolean;
    expandedContentMaxWidth?: string;
    onRowClick?: (item: T) => void;
}
export declare function DataManagementModal<T extends DataItem>({ isOpen, onClose, onBack, title, data, columns, loading, error, filters, searchPlaceholder, searchFields, expandedContent, onToggleItem, onAction, actionItems, onRefresh, customHeader, emptyStateMessage, emptyStateIcon, defaultSort, defaultSortDirection, clickableRows, expandedContentMaxWidth, onRowClick }: DataManagementModalProps<T>): import("react/jsx-runtime").JSX.Element | null;
export {};
