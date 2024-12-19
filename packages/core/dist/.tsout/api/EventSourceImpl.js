export class EventSourceImpl {
    constructor(context, internalEventSource) {
        this.context = context;
        this.internalEventSource = internalEventSource;
    }
    remove() {
        this.context.dispatch({
            type: 'REMOVE_EVENT_SOURCE',
            sourceId: this.internalEventSource.sourceId,
        });
    }
    refetch() {
        this.context.dispatch({
            type: 'FETCH_EVENT_SOURCES',
            sourceIds: [this.internalEventSource.sourceId],
            isRefetch: true,
        });
    }
    get id() {
        return this.internalEventSource.publicId;
    }
    get url() {
        return this.internalEventSource.meta.url;
    }
    get format() {
        return this.internalEventSource.meta.format; // TODO: bad. not guaranteed
    }
}
//# sourceMappingURL=EventSourceImpl.js.map