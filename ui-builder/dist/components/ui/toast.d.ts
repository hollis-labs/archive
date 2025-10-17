import { default as React } from 'react';
import { Toast as ToastType } from '../../hooks/useToast';
interface ToastProps {
    toast: ToastType;
    onRemove: (id: string) => void;
}
export declare const Toast: React.FC<ToastProps>;
interface ToastContainerProps {
    toasts: ToastType[];
    onRemove: (id: string) => void;
}
export declare const ToastContainer: React.FC<ToastContainerProps>;
export {};
