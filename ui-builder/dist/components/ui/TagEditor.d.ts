interface TagEditorProps {
    tags: string[];
    onSave: (tags: string[]) => Promise<void>;
    placeholder?: string;
    maxTags?: number;
    readOnly?: boolean;
    className?: string;
}
export declare function TagEditor({ tags, onSave, placeholder, maxTags, readOnly, className, }: TagEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
