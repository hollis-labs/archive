import { ComponentConfig } from '../types';
export interface ResizableConfig extends ComponentConfig {
    type: 'resizable';
    props: {
        direction?: 'horizontal' | 'vertical';
        panels: Array<{
            id: string;
            defaultSize?: number;
            minSize?: number;
            maxSize?: number;
            content: ComponentConfig[];
        }>;
        withHandle?: boolean;
        className?: string;
    };
}
export declare function ResizableComponent({ config }: {
    config: ResizableConfig;
}): import("react/jsx-runtime").JSX.Element | null;
