export declare class Store<Value> {
    private handlers;
    private currentValue;
    set(value: Value): void;
    subscribe(handler: (value: Value) => void): void;
}
//# sourceMappingURL=Store.d.ts.map