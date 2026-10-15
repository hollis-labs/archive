import { ComponentConfig, ActionConfig } from '../types';
export interface PaginationConfig extends ComponentConfig {
    type: 'pagination';
    props: {
        currentPage: number;
        totalPages: number;
        onPageChange?: ActionConfig;
        showFirstLast?: boolean;
        showPrevNext?: boolean;
        maxVisible?: number;
        className?: string;
    };
}
export declare function PaginationComponent({ config }: {
    config: PaginationConfig;
}): import("react/jsx-runtime").JSX.Element;
