import { ComponentConfig } from '../types';
export interface TabsConfig extends ComponentConfig {
    type: 'tabs';
    props: {
        defaultValue: string;
        tabs: Array<{
            value: string;
            label: string;
            content: ComponentConfig[];
            disabled?: boolean;
        }>;
        className?: string;
        listClassName?: string;
    };
}
export declare function TabsComponent({ config }: {
    config: TabsConfig;
}): import("react/jsx-runtime").JSX.Element;
