import { ComponentConfig } from '../types';
interface ModalLayoutProps {
    config: ComponentConfig;
    title?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function ModalLayout({ title, open, onOpenChange, children }: ModalLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
