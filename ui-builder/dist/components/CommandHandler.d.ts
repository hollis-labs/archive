export declare class CommandHandler {
    private handlers;
    constructor();
    private setupDefaultHandlers;
    register(command: string, handler: (payload: any) => void): void;
    private listen;
}
export declare const commandHandler: CommandHandler;
