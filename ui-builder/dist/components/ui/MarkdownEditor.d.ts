interface MarkdownEditorProps {
    content: string;
    onSave: (content: string) => Promise<void>;
    onCancel?: () => void;
    placeholder?: string;
    minHeight?: string;
}
export declare function MarkdownEditor({ content, onSave, onCancel, placeholder, minHeight, }: MarkdownEditorProps): import("react/jsx-runtime").JSX.Element | null;
export {};
