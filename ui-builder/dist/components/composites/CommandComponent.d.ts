import { ComponentConfig } from '../types';
export interface CommandConfig extends ComponentConfig {
    type: 'command';
    props: {
        placeholder?: string;
        emptyText?: string;
        groups: Array<{
            heading?: string;
            items: Array<{
                label: string;
                icon?: string;
                shortcut?: string;
                value?: string;
                disabled?: boolean;
            }>;
        }>;
        open?: boolean;
        defaultOpen?: boolean;
        showShortcut?: boolean;
        className?: string;
    };
    actions?: {
        onSelect?: {
            type: 'command' | 'navigate' | 'emit' | 'http';
            command?: string;
            url?: string;
            event?: string;
            method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
            payload?: Record<string, any>;
        };
    };
}
export declare function CommandComponent({ config }: {
    config: CommandConfig;
}): import("react/jsx-runtime").JSX.Element;
