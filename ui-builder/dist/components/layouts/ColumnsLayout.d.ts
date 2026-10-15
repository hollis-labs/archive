import { ComponentConfig } from '../types';
interface ColumnsLayoutProps {
    config: ComponentConfig & {
        children?: ComponentConfig[];
    };
}
export declare function ColumnsLayout({ config }: ColumnsLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
