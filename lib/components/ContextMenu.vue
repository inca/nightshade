<template>
    <ContextPopup
        :dir="dir"
        :align="align"
        :anchorRef="anchorRef"
        :anchorDir="anchorDir"
        @hide="hide()"
        @ready="initialize()">
        <div
            ref="menu"
            class="Menu"
            :class="{
                'Menu-search': search,
            }">
            <InputText
                v-if="search"
                ref="search"
                v-model="searchQuery"
                autoFocus
                class="Search"
                icon="fas fa-search"
                placeholder="Search"
                data-menu-item-id="#"
                @update:modelValue="doSearch()"
                @keydown.enter="activate()" />
            <div
                class="Items"
                @keydown.backspace="selectSearch()">
                <template
                    v-for="item, i of filteredItems"
                    :key="i">
                    <div
                        v-if="item.kind === 'separator'"
                        class="Separator" />
                    <div
                        v-else-if="item.kind === 'title'"
                        class="SectionTitle"
                        v-text="item.title" />
                    <div
                        v-else
                        class="MenuItem"
                        :class="[
                            {
                                'MenuItem-selected': isItemSelected(i),
                                'MenuItem-disabled': item.disabled,
                                'MenuItem-checked': item.checked,
                            },
                            `MenuItem-${item.kind}`
                        ]"
                        :data-menu-item-id="i"
                        tabindex="0"
                        @click="activateItem(item)">
                        <div class="ItemLine">
                            <i
                                v-if="item.icon"
                                :class="item.icon"
                                class="ItemIcon" />
                            <div class="ItemTitle">
                                {{ item.title }}
                            </div>
                            <template v-if="item.checked">
                                <slot name="iconCheck">
                                    <i
                                        class="CheckIcon"
                                        :class="iconCheck" />
                                </slot>
                            </template>
                        </div>
                        <div
                            v-if="item.description"
                            class="ItemDescription">
                            {{ item.description }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </ContextPopup>
</template>

<script>
import { fuzzySearch } from 'tokenized-search';

import { ListNavController } from '../utils/ListNavController.js';

export default {

    props: {
        dir: { type: String },
        align: { type: String },
        size: { type: String },
        items: { type: Array },
        atCursor: { type: Boolean },
        anchorRef: { type: String },
        anchorDir: { type: String },
        search: { type: Boolean },
        autoDismiss: { type: Boolean, default: true },
    },

    emits: ['hide'],

    data() {
        return {
            listNav: new ListNavController({
                selector: '[data-menu-item-id]',
                resolveId: el => el.getAttribute('data-menu-item-id'),
            }),
            searchQuery: '',
            filteredItems: this.items,
        };
    },

    computed: {

        iconCheck() {
            return this.$nightshadeIcons?.check ?? 'fas fa-check';
        }

    },

    unmounted() {
        this.listNav.destroy();
    },

    methods: {

        initialize() {
            this.listNav.mount(this.$refs.menu);
        },

        isItemSelected(i) {
            return this.listNav.selection.isSelected(String(i));
        },

        activate() {
            const idx = this.listNav.selection.getFirst();
            const item = this.filteredItems[idx];
            if (item) {
                this.activateItem(item);
            }
        },

        activateItem(item) {
            if (item.disabled || !item.activate) {
                return;
            }
            item.activate();
            if (this.autoDismiss) {
                this.hide();
            } else {
                item.checked = !item.checked;
            }
        },

        doSearch() {
            const q = this.searchQuery.trim();
            if (!q) {
                this.filteredItems = this.items;
                return;
            }
            const searchResults = fuzzySearch(q, this.items.map(item => item.title ?? ''));
            this.filteredItems = searchResults.map(res => {
                return this.items[res.index];
            });
        },

        selectSearch() {
            if (this.$refs.search) {
                this.$refs.search.$el.querySelector('input').focus();
            }
        },

        hide() {
            this.$emit('hide');
        },

    },

};
</script>

<style scoped>
.Menu {
    display: flex;
    flex-flow: column nowrap;
    min-width: 200px;
    max-height: 40vh;
}

.Menu-search {
    width: 240px;
}

.Search {
    flex: 0 0 auto;
}

.Items {
    overflow-y: auto;
    padding: var(--sp) 0;
}

.MenuItem {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--sp0-5);
    padding: var(--sp);
    cursor: pointer;
    user-select: none;
    outline: 0;
    line-height: 1;
}

.MenuItem-primary {
    color: var(--color-primary);
}

.MenuItem-danger {
    color: var(--color-danger);
}

.MenuItem-checked {
    color: var(--color-primary);
}

.MenuItem-disabled {
    color: var(--color-text-3);
    cursor: not-allowed;
}

.MenuItem:hover, .MenuItem-selected {
    background: var(--color-base-1);
}

.Items:focus-within .MenuItem.MenuItem-selected {
    background: var(--color-focus-0);
}

.Separator {
    margin: var(--sp) 0;
    border-bottom: 1px solid var(--color-base-3);
}

.SectionTitle {
    padding: var(--sp);
    color: var(--color-text-3);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.ItemLine {
    display: flex;
    align-items: center;
    gap: var(--sp);
}

.ItemTitle {
    flex: 1;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ItemIcon {
    flex: 0 0 var(--sp3);
    width: var(--sp3);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ItemDescription {
    font-size: var(--font-size-smaller);
    color: var(--color-text-2);
}

.CheckIcon {
    font-size: var(--font-size-small);
}
</style>
