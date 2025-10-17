import { ComponentConfig, ActionConfig } from '../types';
interface SonnerConfig extends ComponentConfig {
    type: 'sonner';
    props: {
        message: string;
        description?: string;
        action?: {
            label: string;
            action: ActionConfig;
        };
        duration?: number;
        position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
        variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
        className?: string;
    };
}
export declare function SonnerComponent({ config }: {
    config: SonnerConfig;
}): null;
export {};
