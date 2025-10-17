import { ComponentConfig } from '../types';
export interface ScrollAreaConfig extends ComponentConfig {
    type: 'scroll-area';
    props: {
        height?: string;
        maxHeight?: string;
        orientation?: 'vertical' | 'horizontal';
        className?: string;
    };
    children?: ComponentConfig[];
}
export declare function ScrollAreaComponent({ config }: {
    config: ScrollAreaConfig;
}): import("react/jsx-runtime").JSX.Element;
