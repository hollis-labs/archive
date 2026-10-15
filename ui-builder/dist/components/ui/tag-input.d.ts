interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
}
export declare function TagInput({ value, onChange, placeholder, className }: TagInputProps): import("react/jsx-runtime").JSX.Element;
export {};
