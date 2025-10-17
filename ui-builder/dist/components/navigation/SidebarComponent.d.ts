import { ComponentConfig } from '../types';
export interface SidebarConfig extends ComponentConfig {
    type: 'sidebar';
    props: {
        collapsible?: boolean;
        defaultOpen?: boolean;
        side?: 'left' | 'right';
        variant?: 'sidebar' | 'floating' | 'inset';
        items: Array<{
            label: string;
            icon?: string;
            href?: string;
            badge?: string;
            active?: boolean;
            children?: Array<{
                label: string;
                href: string;
                active?: boolean;
            }>;
        }>;
        groups?: Array<{
            label: string;
            items: Array<{
                label: string;
                icon?: string;
                href?: string;
                badge?: string;
                active?: boolean;
                children?: Array<{
                    label: string;
                    href: string;
                    active?: boolean;
                }>;
            }>;
        }>;
        className?: string;
    };
}
export declare function SidebarComponent({ config }: {
    config: SidebarConfig;
}): import("react/jsx-runtime").JSX.Element;
