interface ErrorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: string;
    details?: string;
}
export declare function ErrorDialog({ open, onOpenChange, title, message, details, }: ErrorDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
