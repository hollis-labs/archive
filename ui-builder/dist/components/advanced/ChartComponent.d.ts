import { ComponentConfig } from '../types';
interface ChartDataPoint {
    label: string;
    value: number;
    [key: string]: any;
}
interface ChartConfig extends ComponentConfig {
    type: 'chart';
    props: {
        chartType: 'bar' | 'line' | 'pie' | 'area' | 'donut';
        data: ChartDataPoint[];
        title?: string;
        legend?: boolean;
        colors?: string[];
        height?: number;
        xAxisKey?: string;
        yAxisKey?: string;
        showGrid?: boolean;
        showTooltip?: boolean;
        className?: string;
    };
}
export declare function ChartComponent({ config }: {
    config: ChartConfig;
}): import("react/jsx-runtime").JSX.Element;
export {};
