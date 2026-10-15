import { ComponentConfig } from '../types';
export interface CollapsibleConfig extends ComponentConfig {
    type: 'collapsible';
    props: {
        title: string;
        defaultOpen?: boolean;
        disabled?: boolean;
        triggerClassName?: string;
        contentClassName?: string;
        className?: string;
    };
    children?: ComponentConfig[];
}
export declare function CollapsibleComponent({ config }: {
    config: CollapsibleConfig;
}): import("react/jsx-runtime").JSX.Element;
