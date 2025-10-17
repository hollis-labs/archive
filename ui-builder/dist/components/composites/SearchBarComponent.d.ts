import { ComponentConfig } from '../types';
interface SearchBarConfig extends ComponentConfig {
    type: 'search.bar';
    dataSource?: string;
    result?: {
        target: string;
    };
    props?: {
        placeholder?: string;
    };
}
export declare function SearchBarComponent({ config }: {
    config: SearchBarConfig;
}): import("react/jsx-runtime").JSX.Element;
export {};
