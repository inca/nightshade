<template>
    <component
        :is="tagName"
        ref="button"
        class="Btn button"
        :class="[
            `Btn-${size}`,
            `Btn-${actualKind}`,
            `Btn-iconPos-${iconPos}`,
            {
                'Btn-disabled': disabled || blocked,
                'Btn-square': square,
                'Btn-round': round,
                'Btn-outline': outline,
                'Btn-block': block,
                'Btn-pseudo-focus': pseudoFocus,
                'Btn-pseudo-hover': pseudoHover,
                'Btn-pseudo-active': pseudoActive,
            },
        ]"
        :disabled="disabled || blocked"
        :title="title ?? label"
        :href="href"
        @uiactivate="onUiActivate($event)"
        @mouseenter="hover = true"
        @mouseleave="hover = false">

        <slot
            name="icon"
            :hover="hover"
            :blocked="blocked">
            <i
                v-if="icon"
                :class="icon"
                class="Icon" />
        </slot>

        <span
            v-if="label"
            class="Label">
            {{ label }}
        </span>

        <slot
            :hover="hover"
            :blocked="blocked" />

    </component>
</template>

<script>
export default {

    props: {
        label: { type: String },
        title: { type: String },
        icon: { type: String },
        iconPos: { type: String, default: 'left' },
        kind: { type: String, default: 'link-default' },
        hoverKind: { type: String },
        customTag: { type: String },
        href: { type: String },
        debounce: { type: Number, default: 0 },
        disabled: { type: Boolean, default: false },
        size: { type: String, default: 'normal' },
        square: { type: Boolean, default: false },
        block: { type: Boolean, default: false },
        round: { type: Boolean, default: false },
        outline: { type: Boolean, default: false },
        pseudoFocus: { type: Boolean, default: false },
        pseudoHover: { type: Boolean, default: false },
        pseudoActive: { type: Boolean, default: false },
    },

    data() {
        return {
            hover: false,
            blocked: false,
        };
    },

    computed: {

        tagName() {
            return this.customTag ?? 'button';
        },

        actualKind() {
            const { kind, hoverKind, hover } = this;
            return hover ? (hoverKind ?? kind) : kind;
        },

    },

    methods: {

        onUiActivate() {
            if (this.debounce > 0) {
                this.blocked = true;
                setTimeout(() => {
                    this.blocked = false;
                }, this.debounce);
            }
        },

    }

};
</script>

<style scoped>
.Btn {
    --Btn-padding: var(--sp1-5);
    --Btn-gap: var(--sp);
    --Btn-size: var(--input-size);
    --Btn-font-size: var(--font-size);

    --Btn-text-color: inherit;
    --Btn-outline-color: transparent;
    --Btn-outline-color-effective: transparent;
    --Btn-outline-color-focus: var(--color-primary);
    --Btn-surface-top: transparent;
    --Btn-surface-bottom: transparent;
    --Btn-shadow-color: transparent;
    --Btn-border-radius: var(--border-radius);

    -webkit-appearance: none;
    appearance: none;

    position: relative;
    z-index: 1;
    margin: 0;
    padding: 0 var(--Btn-padding);
    height: var(--Btn-size);
    line-height: var(--Btn-size);
    box-sizing: border-box;

    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    gap: var(--Btn-gap);

    border: 0;
    border-radius: var(--Btn-border-radius);
    cursor: pointer;
    user-select: none;
    overflow: hidden;

    font-family: inherit;
    font-size: var(--Btn-font-size);

    color: var(--Btn-text-color);
    outline: 2px solid var(--Btn-outline-color-effective);

    background: radial-gradient(
        120% 150% at 80% 0%,
        var(--Btn-surface-top),
        var(--Btn-surface-bottom)
    );
    background-clip: padding-box;
    box-shadow: 0 1px 1px var(--Btn-shadow-color);

    transition: color .3s, outline .3s, filter .3s, border-radius .3s;
}

.Btn:focus, .Btn:active, .Btn:hover {
    transition: none;
}

.Btn:not(:disabled):hover, .Btn.Btn-pseudo-hover {
    filter: brightness(1.07);
}

.Btn:not(:disabled):focus, .Btn.Btn-pseudo-focus {
    z-index: 10;
    --Btn-outline-color-effective: var(--Btn-outline-color-focus);
}

.Btn:not(:disabled):active, .Btn.Btn-pseudo-active {
    padding-top: 1px;
    box-shadow:
        0 6px 12px rgba(0,0,0,.08) inset,
        0 1px 2px rgba(0,0,0,.12) inset;
}

.Label {
    line-height: var(--Btn-size);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Icon {
    width: var(--sp2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--Btn-font-size);
}

.Btn-square {
    padding-left: 0;
    padding-right: 0;
    width: var(--Btn-size);
    justify-content: center;
}

.Btn-round {
    --Btn-border-radius: var(--border-radius-round);
}

.Btn-disabled {
    opacity: .64;
    filter: saturate(40%);
    cursor: not-allowed;
}

.Btn-block {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
}

.Btn-outline {
    --Btn-outline-color-effective: var(--Btn-outline-color);
}

/* Sizes */

.Btn-large {
    --Btn-size: var(--input-size-large);
    --Btn-font-size: var(--font-size-large);
    --Btn-padding: var(--sp2);
}

.Btn-small {
    --Btn-size: var(--input-size-small);
    --Btn-font-size: var(--font-size-small);
    --Btn-padding: var(--sp);
    --Btn-gap: var(--sp0-5);
}

.Btn-iconPos-right .Icon {
    order: 100;
}

/* Kinds */
.Btn-default {
    --Btn-text-color: var(--color-default-text);
    --Btn-surface-top: var(--color-default-surface-top);
    --Btn-surface-bottom: var(--color-default-surface-bottom);
    --Btn-surface-top-hover: var(--color-default-surface-top-hover);
    --Btn-surface-bottom-hover: var(--color-default-surface-bottom-hover);
    --Btn-outline-color: var(--color-default-outline);
    --Btn-outline-color-focus: var(--color-default-focus);
    --Btn-shadow-color: var(--color-default-shadow);
}

.Btn-primary {
    --Btn-text-color: var(--color-primary-text);
    --Btn-surface-top: var(--color-primary-surface-top);
    --Btn-surface-bottom: var(--color-primary-surface-bottom);
    --Btn-surface-top-hover: var(--color-primary-surface-top-hover);
    --Btn-surface-bottom-hover: var(--color-primary-surface-bottom-hover);
    --Btn-outline-color: var(--color-primary-outline);
    --Btn-outline-color-focus: var(--color-primary-focus);
    --Btn-shadow-color: var(--color-primary-shadow);
}

.Btn-secondary {
    --Btn-text-color: var(--color-secondary-text);
    --Btn-surface-top: var(--color-secondary-surface-top);
    --Btn-surface-bottom: var(--color-secondary-surface-bottom);
    --Btn-surface-top-hover: var(--color-secondary-surface-top-hover);
    --Btn-surface-bottom-hover: var(--color-secondary-surface-bottom-hover);
    --Btn-outline-color: var(--color-secondary-outline);
    --Btn-outline-color-focus: var(--color-secondary-focus);
    --Btn-shadow-color: var(--color-secondary-shadow);
}

.Btn-tertiary {
    --Btn-text-color: var(--color-tertiary-text);
    --Btn-surface-top: var(--color-tertiary-surface-top);
    --Btn-surface-bottom: var(--color-tertiary-surface-bottom);
    --Btn-surface-top-hover: var(--color-tertiary-surface-top-hover);
    --Btn-surface-bottom-hover: var(--color-tertiary-surface-bottom-hover);
    --Btn-outline-color: var(--color-tertiary-outline);
    --Btn-outline-color-focus: var(--color-tertiary-focus);
    --Btn-shadow-color: var(--color-tertiary-shadow);
}

.Btn-success {
    --Btn-text-color: var(--color-success-text);
    --Btn-surface-top: var(--color-success-surface-top);
    --Btn-surface-bottom: var(--color-success-surface-bottom);
    --Btn-surface-top-hover: var(--color-success-surface-top-hover);
    --Btn-surface-bottom-hover: var(--color-success-surface-bottom-hover);
    --Btn-outline-color: var(--color-success-outline);
    --Btn-outline-color-focus: var(--color-success-focus);
    --Btn-shadow-color: var(--color-success-shadow);
}

.Btn-warning {
    --Btn-text-color: var(--color-warning-text);
    --Btn-surface-top: var(--color-warning-surface-top);
    --Btn-surface-bottom: var(--color-warning-surface-bottom);
    --Btn-outline-color: var(--color-warning-outline);
    --Btn-outline-color-focus: var(--color-warning-focus);
    --Btn-shadow-color: var(--color-warning-shadow);
}

.Btn-danger {
    --Btn-text-color: var(--color-danger-text);
    --Btn-surface-top: var(--color-danger-surface-top);
    --Btn-surface-bottom: var(--color-danger-surface-bottom);
    --Btn-outline-color: var(--color-danger-outline);
    --Btn-outline-color-focus: var(--color-danger-focus);
    --Btn-shadow-color: var(--color-danger-shadow);
}

.Btn-link-default {
    --Btn-text-color: var(--color-default);
    --Btn-outline-color: var(--color-default-outline);
    --Btn-outline-color-focus: var(--color-default-focus);
}

.Btn-link-primary {
    --Btn-text-color: var(--color-primary);
    --Btn-outline-color: var(--color-primary-outline);
    --Btn-outline-color-focus: var(--color-primary-focus);
}

.Btn-link-secondary {
    --Btn-text-color: var(--color-secondary);
    --Btn-outline-color: var(--color-secondary-outline);
    --Btn-outline-color-focus: var(--color-secondary-focus);
}

.Btn-link-tertiary {
    --Btn-text-color: var(--color-tertiary);
    --Btn-outline-color: var(--color-tertiary-outline);
    --Btn-outline-color-focus: var(--color-tertiary-focus);
}

.Btn-link-success {
    --Btn-text-color: var(--color-success);
    --Btn-outline-color: var(--color-success-outline);
    --Btn-outline-color-focus: var(--color-success-focus);
}

.Btn-link-warning {
    --Btn-text-color: var(--color-warning);
    --Btn-outline-color: var(--color-warning-outline);
    --Btn-outline-color-focus: var(--color-warning-focus);
}

.Btn-link-danger {
    --Btn-text-color: var(--color-danger);
    --Btn-outline-color: var(--color-danger-outline);
    --Btn-outline-color-focus: var(--color-danger-focus);
}
</style>
