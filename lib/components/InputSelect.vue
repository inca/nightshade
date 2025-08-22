<template>
    <InputBase
        class="InputSelect"
        v-bind="{
            ...$props
        }"
        tabindex="0"
        @click="show()">
        <slot name="before" />
        <i
            v-if="itemIcon"
            class="Icon"
            :class="itemIcon" />
        <span
            v-if="selectedItem"
            class="Value">
            {{ itemTitle }}
        </span>
        <span
            v-if="!selectedItem"
            class="Placeholder">
            {{ placeholder }}
        </span>
        <div
            ref="icon"
            class="DropdownIcon">
            <slot name="iconDropdown">
                <i :class="iconDropdown" />
            </slot>
        </div>
        <ContextMenu
            v-if="!disabled && menuShown"
            anchorRef="icon"
            :items="getMenuItems()"
            :search="search"
            :overlayShown="false"
            @hide="menuShown = false" />
        <slot name="after" />
    </InputBase>
</template>

<script>
import InputBase from './InputBase.vue';

export default {

    props: {
        ...InputBase.props,
        modelValue: {},
        items: { type: Array, default: () => [] },
        placeholder: { type: String },
        readonly: { type: Boolean },
        search: { type: Boolean, default: false },
    },

    emits: [
        'focus',
        'blur',
        'update:modelValue'
    ],

    data() {
        return {
            menuShown: false,
        };
    },

    computed: {

        selectedItem() {
            return this.items.find(item => (item.value ?? item) === this.modelValue);
        },

        itemTitle() {
            const { selectedItem } = this;
            return selectedItem?.title ?? selectedItem;
        },

        itemIcon() {
            const { selectedItem } = this;
            return selectedItem?.icon;
        },

        iconDropdown() {
            return this.$nightshadeIcons?.dropdown ?? 'fas fa-angle-down';
        },

    },

    methods: {

        onInput(ev) {
            this.$emit('update:modelValue', ev.target.value);
        },

        selectValue(value) {
            this.$emit('update:modelValue', value);
            this.menuShown = false;
        },

        getMenuItems() {
            return this.items.map(item => {
                const title = typeof item === 'string' ? item : item.title;
                const value = typeof item === 'string' ? item : item.value;
                return {
                    title,
                    checked: value === this.modelValue,
                    disabled: item.disabled,
                    description: item.description,
                    icon: item.icon ?? undefined,
                    activate: () => {
                        if (this.disabled) {
                            return;
                        }
                        this.selectValue(value);
                    }
                };
            });
        },

        show() {
            if (!this.disabled) {
                this.menuShown = true;
            }
        }

    }

};
</script>

<style scoped>
.Icon {
    opacity: 0.5;
    width: var(--sp2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: var(--sphalf);
}

.Value, .Placeholder {
    line-height: var(--input-size);
    flex: 1 1 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.DropdownIcon {
    color: var(--color-text-2);
    font-size: var(--font-size-small);
}
</style>
