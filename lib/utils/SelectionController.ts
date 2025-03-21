import { Event } from 'nanoevent';

export class SelectionController {

    selectedIds = new Set<string>();
    changed = new Event<void>();

    get size() {
        return this.selectedIds.size;
    }

    getSelectedIds() {
        return [...this.selectedIds];
    }

    getFirst(): string | null {
        return [...this.selectedIds][0] ?? null;
    }

    isSelected(id: string) {
        return this.selectedIds.has(id);
    }

    isSingleSelected(id: string) {
        return this.selectedIds.size === 1 && this.selectedIds.has(id);
    }

    setSelectedIds(ids: Iterable<string>) {
        this.selectedIds = new Set(ids);
        this.changed.emit();
    }

    selectSingle(id: string) {
        if (this.isSingleSelected(id)) {
            return;
        }
        this.selectedIds.clear();
        this.selectedIds.add(id);
        this.changed.emit();
    }

    addToSelection(...ids: string[]) {
        let changed = false;
        for (const id of ids) {
            const has = this.selectedIds.has(id);
            if (!has) {
                this.selectedIds.add(id);
                changed = true;
            }
        }
        if (changed) {
            this.changed.emit();
        }
    }

    removeFromSelection(...ids: string[]) {
        let changed = false;
        for (const id of ids) {
            const removed = this.selectedIds.delete(id);
            if (removed) {
                changed = true;
            }
        }
        if (changed) {
            this.changed.emit();
        }
    }

    toggleSelection(id: string) {
        if (this.isSelected(id)) {
            this.removeFromSelection(id);
        } else {
            this.addToSelection(id);
        }
    }

    deselectAll() {
        if (this.selectedIds.size === 0) {
            return;
        }
        this.selectedIds.clear();
        this.changed.emit();
    }

}
