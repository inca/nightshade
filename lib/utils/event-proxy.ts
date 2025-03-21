type EventListener = (ev: any) => void;

interface EventListenerDesc {
    eventName: string;
    listener: EventListener;
    options?: boolean | AddEventListenerOptions;
}

/**
 * A helper to effortlessly bind and unbind events to DOM elements.
 * This class keeps track of event listeners bound by using `add` method
 * and then allows quickly unbind by event name or all of them.
 *
 * Note: exactly 1 event listener can be bound to each type of event.
 */
export class DomEventProxy {

    listeners = new Map<string, EventListenerDesc>();

    constructor(readonly target: EventTarget) {}

    add(eventName: string, listener: EventListener, options?: boolean | AddEventListenerOptions) {
        this.remove(eventName);
        this.listeners.set(eventName, { eventName, listener, options });
        this.target.addEventListener(eventName, listener, options);
    }

    remove(eventName: string) {
        const desc = this.listeners.get(eventName);
        if (desc) {
            this.target.removeEventListener(desc.eventName, desc.listener, desc.options);
            this.listeners.delete(eventName);
        }
    }

    removeAll() {
        for (const desc of this.listeners.values()) {
            this.target.removeEventListener(desc.eventName, desc.listener, desc.options);
        }
        this.listeners.clear();
    }

}
