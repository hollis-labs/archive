import { ComponentConfig } from '../types';
export interface BreadcrumbConfig extends ComponentConfig {
    type: 'breadcrumb';
    props: {
        items: Array<{
            label: string;
            href?: string;
            current?: boolean;
        }>;
        separator?: 'chevron' | 'slash' | 'none';
        className?: string;
    };
}
export declare function BreadcrumbComponent({ config }: {
    config: BreadcrumbConfig;
}): import("react/jsx-runtime").JSX.Element;
