import * as React from "react";
export type BadgeProps = {
    /** Text to render if no children are provided */
    text?: string;
    /** shadcn badge variants */
    variant?: "default" | "secondary" | "destructive" | "outline";
    /** visual sizing helper (maps to Tailwind padding/font-size) */
    size?: "sm" | "md" | "lg";
    /** shape helper */
    shape?: "soft" | "pill";
    /** Optional lucide-react icon names */
    iconLeft?: string;
    iconRight?: string;
    /** passthrough */
    className?: string;
    children?: React.ReactNode;
};
export declare function BadgeComponent(props: BadgeProps): import("react/jsx-runtime").JSX.Element;
