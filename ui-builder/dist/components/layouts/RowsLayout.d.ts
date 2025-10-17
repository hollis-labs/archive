import { ComponentConfig } from '../types';
interface RowsLayoutProps {
    config: ComponentConfig & {
        children?: ComponentConfig[];
    };
}
export declare function RowsLayout({ config }: RowsLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
