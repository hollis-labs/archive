type SlotUpdateCallback = (data: any) => void;
type ResultConfig = {
    target: string;
};
export declare class SlotBinder {
    private static instance;
    private slots;
    static getInstance(): SlotBinder;
    subscribe(targetId: string, callback: SlotUpdateCallback): () => void;
    update(result: ResultConfig | string, data: any): void;
    clear(targetId: string): void;
    clearAll(): void;
}
export declare const slotBinder: SlotBinder;
export {};
