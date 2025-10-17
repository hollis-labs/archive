import { ComponentConfig } from '../types';
interface CarouselConfig extends ComponentConfig {
    type: 'carousel';
    props: {
        items: ComponentConfig[];
        autoplay?: boolean;
        interval?: number;
        loop?: boolean;
        showDots?: boolean;
        showArrows?: boolean;
        className?: string;
    };
}
export declare function CarouselComponent({ config }: {
    config: CarouselConfig;
}): import("react/jsx-runtime").JSX.Element;
export {};
