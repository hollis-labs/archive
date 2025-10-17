import { ActionConfig, ActionResult } from '../types';
interface UseActionResult {
    execute: (action: ActionConfig, context?: Record<string, any>) => Promise<ActionResult>;
    loading: boolean;
    error: Error | null;
}
export declare function useAction(): UseActionResult;
export {};
