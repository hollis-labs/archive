import { ComponentConfig } from '../types';
export interface CardConfig extends ComponentConfig {
    type: 'card';
    props: {
        title?: string;
        description?: string;
        footer?: ComponentConfig;
        className?: string;
    };
    children?: ComponentConfig[];
}
export declare function CardComponent({ config }: {
    config: CardConfig;
}): import("react/jsx-runtime").JSX.Element;
