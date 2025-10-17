import { default as React } from 'react';
import { ComponentConfig } from './types';
type ComponentRenderer = React.ComponentType<{
    config: ComponentConfig;
}>;
declare class ComponentRegistry {
    private components;
    register(type: string, component: ComponentRenderer): void;
    get(type: string): ComponentRenderer | undefined;
    has(type: string): boolean;
    getAll(): string[];
}
export declare const registry: ComponentRegistry;
export { registry as componentRegistry };
export declare function registerPrimitiveComponents(): void;
export declare function registerLayoutComponents(): void;
export declare function registerNavigationComponents(): void;
export declare function registerCompositeComponents(): void;
export declare function registerAdvancedComponents(): void;
export declare function registerFormComponents(): void;
export declare function renderComponent(config: ComponentConfig): React.ReactElement | null;
