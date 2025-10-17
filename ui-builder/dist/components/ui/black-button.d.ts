import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const blackButtonVariants: (props?: ({
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BlackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof blackButtonVariants> {
    asChild?: boolean;
}
declare const BlackButton: React.ForwardRefExoticComponent<BlackButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { BlackButton, blackButtonVariants };
