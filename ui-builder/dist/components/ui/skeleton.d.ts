import { default as React } from 'react';
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string;
    height?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    lines?: number;
    animate?: boolean;
}
declare function Skeleton({ className, width, height, variant, lines, animate, ...props }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
declare const ChatSessionSkeleton: React.FC;
declare const ChatMessageSkeleton: React.FC;
declare const SidebarSkeleton: React.FC;
declare const VaultProjectSelectorSkeleton: React.FC;
declare const ChatHeaderSkeleton: React.FC;
export { Skeleton, ChatSessionSkeleton, ChatMessageSkeleton, SidebarSkeleton, VaultProjectSelectorSkeleton, ChatHeaderSkeleton };
