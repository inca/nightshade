import { Event } from 'nanoevent';

import { isInputElement } from './dom.js';
import { DomEventProxy } from './event-proxy.js';
import { ExpanderController } from './ExpanderController.js';
import { SelectionController } from './SelectionController.js';

export interface ListNavConfig {
    selector: string;
    selection?: SelectionController;
    expander?: ExpanderController;
    multiSelect?: boolean;
    selectOnFocus?: boolean;
    allowDrag?: boolean;
    canExpand?: (id: string) => boolean;
    resolveId?: (el: HTMLElement) => string;
}

/**
 * Facilitates keyboard + mouse navigation:
 *
 * - Up/Down keys move selection visually (i.e. in the order the visible elements appear in DOM)
 * - Shift + Up/Down keys extend the selection
 * - Click selects a single item
 * - Shift+Click extends the selection
 * - Meta+Click adds/removes the selection
 *
 * Selection extension is implemented using _anchor_ and _focus_, following a widespread UX pattern,
 * which is also similar to how text selection is implemented in modern editors.
 * Anchor is defined when selected without extension; focus is the most recently selected element.
 * When selection extension is made, the selection "revolves" around anchor.
 *
 * Usage:
 *
 * - Create a listNav instance either on the component or in one of the managers/controllers.
 *    - Component level is good for short-lived components like popups that don't need
 *      to persist or reuse/restore the selection state.
 * - Decorate list items with a data- attribute containing item id. Use that as a selector.
 * - Create a container arount list items.
 * - Call `.mount(container)` and `.destroy()` in `mounted` and `unmounted` hooks respectively.
 * - (optional) Make sure the list items are focusable, this allows moving focus with Tab as well as arrow keys.
 * - (optional) Apply styling based on selected state. Use `:focus-within` on container/wrapper
 *   to emphasize/deemphasize the selected items.
 */
export class ListNavController {

    selector: string;
    selection: SelectionController;
    expander: ExpanderController;
    multiSelect: boolean;
    selectOnFocus: boolean;
    allowDrag: boolean;
    canExpand: (id: string) => boolean;
    resolveId: (el: HTMLElement) => string;

    protected container: HTMLElement | null = null;
    protected containerEvents: DomEventProxy | null = null;
    protected windowEvents: DomEventProxy | null = null;

    protected anchorId = '';
    protected focusId = '';
    protected snapshotIds: string[] = [];
    protected snapshotEls: HTMLElement[] = [];
    protected dragging = false;

    dragStart = new Event<MouseEvent>();
    dragEnd = new Event<MouseEvent>();

    constructor(config: ListNavConfig) {
        this.selector = config.selector;
        this.selection = config.selection ?? new SelectionController();
        this.expander = config.expander ?? new ExpanderController();
        this.multiSelect = config.multiSelect ?? false;
        this.selectOnFocus = config.selectOnFocus ?? !this.multiSelect;
        this.allowDrag = config.allowDrag ?? false;
        this.canExpand = config.canExpand ?? (() => false);
        this.resolveId = config.resolveId ?? (el => el.getAttribute('data-id') ?? '');
    }

    mount(container: HTMLElement) {
        this.destroy();
        this.container = container;
        this.containerEvents = new DomEventProxy(this.container);
        this.windowEvents = new DomEventProxy(window);
        this.containerEvents.add('keydown', ev => this.onKeyDown(ev));
        this.containerEvents.add('mousedown', ev => this.onMouseDown(ev));
        this.containerEvents.add('uiclick', ev => this.onClickIntent(ev));
        this.containerEvents.add('uidragstart', ev => this.onDragStart(ev));
        this.containerEvents.add('focusin', ev => this.onFocus(ev));
        this.windowEvents.add('mouseup', ev => this.onMouseUp(ev));
    }

    destroy() {
        this.containerEvents?.removeAll();
        this.windowEvents?.removeAll();
        this.snapshotIds = [];
        this.snapshotEls = [];
        this.container = null;
        this.containerEvents = null;
        this.windowEvents = null;
    }

    isDragging() {
        return this.dragging;
    }

    /**
     * Manages keyboard navigation. Note: ev.preventDefault is required to avoid
     * arrow keys messing with scroll bars.
     */
    protected onKeyDown(ev: KeyboardEvent) {
        const el = ev.target as HTMLElement;
        const { shiftKey } = ev;
        const targetId = this.getTargetId(el);
        switch (ev.key) {
            case 'ArrowUp':
                ev.preventDefault();
                return this.moveSelection(-1, shiftKey);
            case 'ArrowDown':
                ev.preventDefault();
                return this.moveSelection(1, shiftKey);
            case 'ArrowLeft':
                if (isInputElement(el)) {
                    return;
                }
                ev.preventDefault();
                return this.collapse();
            case 'ArrowRight':
                if (isInputElement(el)) {
                    return;
                }
                ev.preventDefault();
                return this.expand();
            case ' ':
                if (isInputElement(el)) {
                    return;
                }
                ev.preventDefault();
                if (targetId) {
                    return this.toggleSelection(targetId);
                }
        }
    }

    protected onMouseDown(ev: MouseEvent) {
        if (ev.button !== 0) {
            return;
        }
        this.snapshot();
        const targetId = this.getTargetId(ev.target);
        if (!targetId) {
            return;
        }
        const { metaKey, ctrlKey, shiftKey } = ev;
        const selected = this.selection.isSelected(targetId);
        if (metaKey || ctrlKey) {
            this.toggleSelection(targetId);
        } else if (shiftKey) {
            this.extendSelection(targetId);
        } else if (!selected) {
            this.replaceSelection(targetId);
        }
    }

    protected onMouseUp(ev: MouseEvent) {
        if (this.dragging) {
            this.dragEnd.emit(ev);
        }
        this.dragging = false;
    }

    protected onClickIntent(ev: MouseEvent) {
        this.snapshot();
        const targetId = this.getTargetId(ev.target);
        if (!targetId) {
            return;
        }
        if (ev.metaKey || ev.shiftKey) {
            // Those are handled elsewhere
            return;
        }
        this.replaceSelection(targetId);
    }

    protected onDragStart(ev: MouseEvent) {
        if (!this.allowDrag) {
            return;
        }
        const targetId = this.getTargetId(ev.target);
        if (!targetId) {
            return;
        }
        const selected = this.selection.isSelected(targetId);
        if (selected) {
            this.dragging = true;
            this.dragStart.emit(ev);
        }
    }

    protected onFocus(ev: FocusEvent) {
        if (!this.selectOnFocus) {
            return;
        }
        const targetId = this.getTargetId(ev.target);
        if (targetId) {
            this.replaceSelection(targetId);
        }
    }

    queryEls(): HTMLElement[] {
        if (!this.container) {
            return [];
        }
        const els = this.container.querySelectorAll<HTMLElement>(this.selector);
        return [...els];
    }

    protected appendSelection(targetId: string) {
        if (this.multiSelect) {
            this.selection.addToSelection(targetId);
            this.anchorId = targetId;
            this.focusId = targetId;
            this.updateFocus();
        } else {
            this.replaceSelection(targetId);
        }
    }

    protected toggleSelection(targetId: string) {
        if (this.multiSelect) {
            this.selection.toggleSelection(targetId);
            this.anchorId = targetId;
            this.focusId = targetId;
            this.updateFocus();
        } else {
            this.replaceSelection(targetId);
        }
    }

    protected extendSelection(targetId: string) {
        if (!this.multiSelect || !this.anchorId) {
            return this.replaceSelection(targetId);
        }
        const previousFocusId = this.focusId;
        if (previousFocusId) {
            const range = this.findRange(this.snapshotIds, this.anchorId, previousFocusId);
            for (const id of range) {
                this.selection.removeFromSelection(id);
            }
        }
        this.focusId = targetId;
        const range = this.findRange(this.snapshotIds, this.anchorId, this.focusId);
        for (const id of range) {
            this.selection.addToSelection(id);
        }
        this.updateFocus();
    }

    protected replaceSelection(targetId: string) {
        this.selection.selectSingle(targetId);
        this.anchorId = targetId;
        this.focusId = targetId;
        this.updateFocus();
    }

    deselect(targetId: string) {
        this.selection.removeFromSelection(targetId);
        this.anchorId = '';
        this.focusId = '';
        this.updateFocus();
    }

    moveSelection(increment: number, extend: boolean) {
        this.snapshot();
        const ids = this.snapshotEls.map(_ => this.resolveId(_));
        const focusIndex = ids.indexOf(this.focusId);
        if (focusIndex === -1) {
            const id = ids[0];
            return this.replaceSelection(id);
        }
        const targetIndex = focusIndex + increment;
        const targetId = ids[targetIndex];
        if (!targetId) {
            return;
        }
        return extend ? this.extendSelection(targetId) : this.replaceSelection(targetId);
    }

    selectFirst() {
        this.snapshot();
        const id = this.snapshotIds[0];
        if (id != null) {
            this.replaceSelection(id);
        }
    }

    isFirstSelected() {
        return this.selection.isSingleSelected(this.snapshotIds[0]);
    }

    collapse() {
        if (!this.focusId || !this.canExpand(this.focusId)) {
            return;
        }
        this.expander.collapse(this.focusId);
        this.snapshot();
    }

    expand() {
        if (!this.focusId || !this.canExpand(this.focusId)) {
            return;
        }
        this.expander.expand(this.focusId);
    }

    snapshot() {
        this.snapshotEls = this.queryEls();
        this.snapshotIds = this.snapshotEls.map(_ => this.resolveId(_));
        if (!this.snapshotIds.includes(this.anchorId)) {
            this.anchorId = '';
        }
        if (!this.snapshotIds.includes(this.focusId)) {
            this.focusId = '';
        }
        const invalidSelectionIds = this.selection.getSelectedIds().filter(_ => !this.snapshotIds.includes(_));
        if (invalidSelectionIds.length > 0) {
            this.selection.removeFromSelection(...invalidSelectionIds);
        }
    }

    protected getTargetId(eventTarget: EventTarget | null): string {
        if (eventTarget instanceof HTMLElement) {
            for (const el of this.snapshotEls) {
                if (el.contains(eventTarget as HTMLElement)) {
                    return this.resolveId(el);
                }
            }
        }
        return '';
    }

    /**
     * Get the ids between `from` and `to`, both inclusive.
     */
    protected findRange(ids: string[], from: string, to: string) {
        const a = ids.indexOf(from);
        const b = ids.indexOf(to);
        const start = Math.min(a, b);
        const end = Math.max(a, b);
        return ids.slice(start, end + 1);
    }

    protected updateFocus() {
        if (!this.focusId) {
            return;
        }
        for (const el of this.snapshotEls) {
            if (this.resolveId(el) === this.focusId) {
                if (!el.contains(document.activeElement)) {
                    el.focus();
                }
                return;
            }
        }
    }

}
