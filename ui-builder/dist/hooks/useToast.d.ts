export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}
export declare const useToast: () => {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => string;
    removeToast: (id: string) => void;
    success: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
    warning: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
};
