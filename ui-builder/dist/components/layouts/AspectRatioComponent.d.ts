import { ComponentConfig } from '../types';
export interface AspectRatioConfig extends ComponentConfig {
    type: 'aspect-ratio';
    props: {
        ratio?: number | string;
        className?: string;
    };
    children?: ComponentConfig[];
}
export declare function AspectRatioComponent({ config }: {
    config: AspectRatioConfig;
}): import("react/jsx-runtime").JSX.Element;
