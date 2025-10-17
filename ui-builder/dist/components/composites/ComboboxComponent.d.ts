import { ComponentConfig } from '../types';
export interface ComboboxConfig extends ComponentConfig {
    type: 'combobox';
    props: {
        placeholder?: string;
        emptyText?: string;
        searchPlaceholder?: string;
        options: Array<{
            value: string;
            label: string;
            icon?: string;
            disabled?: boolean;
        }>;
        value?: string;
        defaultValue?: string;
        searchable?: boolean;
        disabled?: boolean;
        className?: string;
    };
    actions?: {
        onChange?: {
            type: 'command' | 'navigate' | 'emit' | 'http';
            command?: string;
            url?: string;
            event?: string;
            method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
            payload?: Record<string, any>;
        };
    };
}
export declare function ComboboxComponent({ config }: {
    config: ComboboxConfig;
}): import("react/jsx-runtime").JSX.Element;
