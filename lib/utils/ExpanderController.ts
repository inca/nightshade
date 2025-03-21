import { Event } from 'nanoevent';

export class ExpanderController {

    expandedIds = new Set<string>();
    changed = new Event<void>();

    setExpandedIds(ids: Iterable<string>) {
        this.expandedIds.clear();
        for (const id of ids) {
            this.expandedIds.add(id);
        }
    }

    isExpanded(id: string) {
        return this.expandedIds.has(id);
    }

    toggle(id: string) {
        if (this.isExpanded(id)) {
            this.collapse(id);
        } else {
            this.expand(id);
        }
    }

    expand(id: string) {
        if (this.isExpanded(id)) {
            return;
        }
        this.expandedIds.add(id);
        this.changed.emit();
    }

    collapse(id: string) {
        if (!this.isExpanded(id)) {
            return;
        }
        this.expandedIds.delete(id);
        this.changed.emit();
    }

    collapseAll() {
        if (this.expandedIds.size > 0) {
            this.expandedIds.clear();
            this.changed.emit();
        }
    }

}
