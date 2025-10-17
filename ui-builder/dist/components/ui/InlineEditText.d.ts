interface InlineEditTextProps {
    value: string;
    onSave: (value: string) => Promise<void>;
    placeholder?: string;
    multiline?: boolean;
    className?: string;
}
export declare function InlineEditText({ value, onSave, placeholder, multiline, className, }: InlineEditTextProps): import("react/jsx-runtime").JSX.Element;
export {};
