import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import * as React from "react";
interface AlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function AlertDialog({ open, onOpenChange, children }: AlertDialogProps): import("react/jsx-runtime").JSX.Element;
export declare function AlertDialogContent({ children, ...props }: React.ComponentProps<typeof DialogContent>): import("react/jsx-runtime").JSX.Element;
export declare function AlertDialogHeader({ children, ...props }: React.ComponentProps<typeof DialogHeader>): import("react/jsx-runtime").JSX.Element;
export declare function AlertDialogTitle({ children, ...props }: React.ComponentProps<typeof DialogTitle>): import("react/jsx-runtime").JSX.Element;
export declare function AlertDialogDescription({ children, ...props }: React.ComponentProps<typeof DialogDescription>): import("react/jsx-runtime").JSX.Element;
export declare function AlertDialogFooter({ children, ...props }: React.ComponentProps<typeof DialogFooter>): import("react/jsx-runtime").JSX.Element;
interface AlertDialogActionProps extends React.ComponentProps<typeof Button> {
    onClick?: () => void;
}
export declare function AlertDialogAction({ children, onClick, ...props }: AlertDialogActionProps): import("react/jsx-runtime").JSX.Element;
export declare function AlertDialogCancel({ children, onClick, ...props }: AlertDialogActionProps): import("react/jsx-runtime").JSX.Element;
export {};
