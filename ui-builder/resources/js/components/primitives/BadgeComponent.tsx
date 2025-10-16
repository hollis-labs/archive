```tsx
import * as React from "react";
import { createElement } from "react";
import * as Icons from "lucide-react";
// If you already have shadcn badge exported here:
import { Badge as ShadcnBadge } from "@/components/ui/badge";

// If you have a cn() helper; if not, use a simple join fallback.
import { cn } from "@/lib/utils";
// Fallback if you don't have cn()
// const cn = (...c: (string | undefined | false)[]) => c.filter(Boolean).join(" ");

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

const sizeClass: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "text-[10px] px-1.5 py-0.5",
  md: "text-xs px-2.5 py-0.5",
  lg: "text-sm px-3 py-1",
};

export default function BadgeComponent(props: BadgeProps) {
  const {
    text,
    variant = "default",
    size = "md",
    shape = "soft",
    iconLeft,
    iconRight,
    className,
    children,
  } = props;

  const IconL = iconLeft ? (Icons as any)[iconLeft] : null;
  const IconR = iconRight ? (Icons as any)[iconRight] : null;

  return (
    <ShadcnBadge
      variant={variant as any}
      className={cn(
        "inline-flex items-center gap-1",
        sizeClass[size],
        shape === "pill" && "rounded-full",
        className
      )}
    >
      {IconL ? createElement(IconL, { className: "h-3.5 w-3.5" }) : null}
      {children ?? text}
      {IconR ? createElement(IconR, { className: "h-3.5 w-3.5" }) : null}
    </ShadcnBadge>
  );
}

