interface FormField {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'file';
    required?: boolean;
    placeholder?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
    accept?: string;
}
interface FormModalProps {
    title: string;
    fields: FormField[];
    submitUrl: string;
    submitMethod?: string;
    submitLabel?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}
export declare function FormModal({ title, fields, submitUrl, submitMethod, submitLabel, open, onOpenChange, onSuccess, }: FormModalProps): import("react/jsx-runtime").JSX.Element;
export {};
