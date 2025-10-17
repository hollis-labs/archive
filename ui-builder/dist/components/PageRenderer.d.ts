interface PageRendererProps {
    pageKey: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare function PageRenderer({ pageKey, open, onOpenChange }: PageRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
