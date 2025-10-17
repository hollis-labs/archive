import { ComponentConfig } from '../types';
export interface AccordionConfig extends ComponentConfig {
    type: 'accordion';
    props: {
        type?: 'single' | 'multiple';
        collapsible?: boolean;
        defaultValue?: string | string[];
        items: Array<{
            value: string;
            title: string;
            content: ComponentConfig[];
            disabled?: boolean;
        }>;
        className?: string;
    };
}
export declare function AccordionComponent({ config }: {
    config: AccordionConfig;
}): import("react/jsx-runtime").JSX.Element | null;
