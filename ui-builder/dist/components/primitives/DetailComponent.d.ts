import { ComponentConfig } from '../types';
interface DetailComponentProps {
    config: ComponentConfig & {
        dataSource?: string;
        url?: string;
        fields?: Array<{
            key: string;
            label: string;
            type?: 'date' | 'badge' | 'text';
        }>;
    };
    data?: any;
}
export declare function DetailComponent({ config, data: initialData }: DetailComponentProps): import("react/jsx-runtime").JSX.Element;
export {};
