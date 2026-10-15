interface SelectOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}
interface InlineEditSelectProps {
    value: string;
    options: SelectOption[];
    onSave: (value: string) => Promise<void>;
    placeholder?: string;
    variant?: 'default' | 'outline' | 'secondary';
    className?: string;
}
export declare function InlineEditSelect({ value, options, onSave, placeholder, variant, className, }: InlineEditSelectProps): import("react/jsx-runtime").JSX.Element;
export {};
