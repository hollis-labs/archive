import { ComponentConfig } from '../types';
export interface NavigationMenuConfig extends ComponentConfig {
    type: 'navigation-menu';
    props: {
        items: Array<{
            label: string;
            trigger?: 'hover' | 'click';
            content?: ComponentConfig[];
            href?: string;
            items?: Array<{
                label: string;
                href: string;
                description?: string;
                icon?: string;
            }>;
        }>;
        orientation?: 'horizontal' | 'vertical';
        className?: string;
    };
}
export declare function NavigationMenuComponent({ config }: {
    config: NavigationMenuConfig;
}): import("react/jsx-runtime").JSX.Element;
