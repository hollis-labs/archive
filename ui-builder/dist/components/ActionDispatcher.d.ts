import { ActionConfig, ActionResult } from './types';
export declare class ActionDispatcher {
    private static instance;
    static getInstance(): ActionDispatcher;
    execute(action: ActionConfig, context?: Record<string, any>): Promise<ActionResult>;
    private handleCommand;
    private handleNavigate;
    private handleApi;
}
export declare const actionDispatcher: ActionDispatcher;
