declare global {
    interface Window {
        __BOOT__?: {
            isAuthenticated: boolean;
            hasUsers: boolean;
            user: {
                id: number;
                name: string;
                email: string;
            } | null;
            pageKey: string;
        };
    }
}
export {};
