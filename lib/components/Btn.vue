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
                'Btn-flat': flat,
                'Btn-shadow': shadow,
                'Btn-block': block,
                'Btn-pseudo-focus': pseudoFocus,
                'Btn-pseudo-hover': pseudoHover,
                'Btn-pseudo-active': pseudoActive,
            },
        ]"
        :disabled="disabled || blocked"
        :title="title ?? label"
        :href="href"
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
        tagName: { type: String, default: 'button' },
        href: { type: String },
        debounce: { type: Number, default: 0 },
        disabled: { type: Boolean, default: false },
        size: { type: String, default: 'normal' },
        square: { type: Boolean, default: false },
        block: { type: Boolean, default: false },
        round: { type: Boolean, default: false },
        outline: { type: Boolean, default: false },
        flat: { type: Boolean, default: false },
        shadow: { type: Boolean, default: false },
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

        actualKind() {
            const { kind, hoverKind, hover } = this;
            return hover ? (hoverKind ?? kind) : kind;
        },

    },

    methods: {

        // TODO add debounce

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

    --Btn-outline-size: var(--input-outline-size);
    --Btn-outline-color: transparent;
    --Btn-outline-color-effective: transparent;
    --Btn-outline-color-focus: var(--color-primary);
    --Btn-outline-offset: var(--input-outline-offset);

    --Btn-surface: transparent;
    --Btn-surface-top: transparent;
    --Btn-surface-bottom: transparent;

    --Btn-border-size: var(--input-border-size);
    --Btn-border-size-effective: 0;
    --Btn-border-color: transparent;
    --Btn-border-radius: var(--border-radius);

    --Btn-gradient-x: 50%;
    --Btn-gradient-y: 0%;
    --Btn-gradient-width: 150%;
    --Btn-gradient-height: 150%;

    --Btn-shadow-color: transparent;

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

    border: var(--Btn-border-size-effective) solid var(--Btn-border-color);
    border-radius: var(--Btn-border-radius);
    cursor: pointer;
    user-select: none;
    overflow: hidden;

    font-family: inherit;
    font-size: var(--Btn-font-size);

    color: var(--Btn-text-color);
    outline: var(--Btn-outline-size) solid var(--Btn-outline-color-effective);
    outline-offset: var(--Btn-outline-offset);
    background: radial-gradient(
        var(--Btn-gradient-width) var(--Btn-gradient-height) at var(--Btn-gradient-x) var(--Btn-gradient-y),
        var(--Btn-surface-top),
        var(--Btn-surface-bottom)
    );
    background-clip: padding-box;

    transition: color .3s, outline .3s, filter .3s, border-radius .3s;
}

.Btn:focus, .Btn:active, .Btn:hover {
    transition: none;
}

.Btn:not(:disabled):hover, .Btn.Btn-pseudo-hover {
    filter: brightness(.96);
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

.Btn-outline.Btn-outline {
    --Btn-border-size-effective: var(--Btn-border-size);
}

.Btn-flat.Btn-flat {
    --Btn-surface-top: var(--Btn-surface);
    --Btn-surface-bottom: var(--Btn-surface);
}

.Btn-shadow {
    box-shadow: 0 1px 1px var(--Btn-shadow-color);
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
    --Btn-surface: var(--color-default-surface);
    --Btn-surface-top: var(--color-default-surface-top);
    --Btn-surface-bottom: var(--color-default-surface-bottom);
    --Btn-border-color: var(--color-default-border-color);
    --Btn-outline-color: var(--color-default-outline);
    --Btn-outline-color-focus: var(--color-default-focus);
    --Btn-shadow-color: var(--color-default-shadow);
}

.Btn-primary {
    --Btn-text-color: var(--color-primary-text);
    --Btn-surface: var(--color-primary-surface);
    --Btn-surface-top: var(--color-primary-surface-top);
    --Btn-surface-bottom: var(--color-primary-surface-bottom);
    --Btn-border-color: var(--color-primary-border-color);
    --Btn-outline-color: var(--color-primary-outline);
    --Btn-outline-color-focus: var(--color-primary-focus);
    --Btn-shadow-color: var(--color-primary-shadow);
}

.Btn-secondary {
    --Btn-text-color: var(--color-secondary-text);
    --Btn-surface: var(--color-secondary-surface);
    --Btn-surface-top: var(--color-secondary-surface-top);
    --Btn-surface-bottom: var(--color-secondary-surface-bottom);
    --Btn-border-color: var(--color-secondary-border-color);
    --Btn-outline-color: var(--color-secondary-outline);
    --Btn-outline-color-focus: var(--color-secondary-focus);
    --Btn-shadow-color: var(--color-secondary-shadow);
}

.Btn-tertiary {
    --Btn-text-color: var(--color-tertiary-text);
    --Btn-surface: var(--color-tertiary-surface);
    --Btn-surface-top: var(--color-tertiary-surface-top);
    --Btn-surface-bottom: var(--color-tertiary-surface-bottom);
    --Btn-border-color: var(--color-tertiary-border-color);
    --Btn-outline-color: var(--color-tertiary-outline);
    --Btn-outline-color-focus: var(--color-tertiary-focus);
    --Btn-shadow-color: var(--color-tertiary-shadow);
}

.Btn-mono {
    --Btn-text-color: var(--color-mono-text);
    --Btn-surface: var(--color-mono-surface);
    --Btn-surface-top: var(--color-mono-surface-top);
    --Btn-surface-bottom: var(--color-mono-surface-bottom);
    --Btn-border-color: var(--color-mono-border-color);
    --Btn-outline-color: var(--color-mono-outline);
    --Btn-outline-color-focus: var(--color-mono-focus);
    --Btn-shadow-color: var(--color-mono-shadow);
}

.Btn-success {
    --Btn-text-color: var(--color-success-text);
    --Btn-surface: var(--color-success-surface);
    --Btn-surface-top: var(--color-success-surface-top);
    --Btn-surface-bottom: var(--color-success-surface-bottom);
    --Btn-border-color: var(--color-success-border-color);
    --Btn-outline-color: var(--color-success-outline);
    --Btn-outline-color-focus: var(--color-success-focus);
    --Btn-shadow-color: var(--color-success-shadow);
}

.Btn-warning {
    --Btn-text-color: var(--color-warning-text);
    --Btn-surface: var(--color-warning-surface);
    --Btn-surface-top: var(--color-warning-surface-top);
    --Btn-surface-bottom: var(--color-warning-surface-bottom);
    --Btn-border-color: var(--color-warning-border-color);
    --Btn-outline-color: var(--color-warning-outline);
    --Btn-outline-color-focus: var(--color-warning-focus);
    --Btn-shadow-color: var(--color-warning-shadow);
}

.Btn-danger {
    --Btn-text-color: var(--color-danger-text);
    --Btn-surface: var(--color-danger-surface);
    --Btn-surface-top: var(--color-danger-surface-top);
    --Btn-surface-bottom: var(--color-danger-surface-bottom);
    --Btn-border-color: var(--color-danger-border-color);
    --Btn-outline-color: var(--color-danger-outline);
    --Btn-outline-color-focus: var(--color-danger-focus);
    --Btn-shadow-color: var(--color-danger-shadow);
}

.Btn-link-default {
    --Btn-text-color: var(--color-default);
    --Btn-border-color: var(--color-default-border-color);
    --Btn-outline-color: var(--color-default-outline);
    --Btn-outline-color-focus: var(--color-default-focus);
}

.Btn-link-primary {
    --Btn-text-color: var(--color-primary);
    --Btn-border-color: var(--color-primary-border-color);
    --Btn-outline-color: var(--color-primary-outline);
    --Btn-outline-color-focus: var(--color-primary-focus);
}

.Btn-link-secondary {
    --Btn-text-color: var(--color-secondary);
    --Btn-border-color: var(--color-secondary-border-color);
    --Btn-outline-color: var(--color-secondary-outline);
    --Btn-outline-color-focus: var(--color-secondary-focus);
}

.Btn-link-tertiary {
    --Btn-text-color: var(--color-tertiary);
    --Btn-border-color: var(--color-tertiary-border-color);
    --Btn-outline-color: var(--color-tertiary-outline);
    --Btn-outline-color-focus: var(--color-tertiary-focus);
}

.Btn-link-mono {
    --Btn-text-color: var(--color-mono);
    --Btn-border-color: var(--color-mono-border-color);
    --Btn-outline-color: var(--color-mono-outline);
    --Btn-outline-color-focus: var(--color-mono-focus);
}

.Btn-link-success {
    --Btn-text-color: var(--color-success);
    --Btn-border-color: var(--color-success-border-color);
    --Btn-outline-color: var(--color-success-outline);
    --Btn-outline-color-focus: var(--color-success-focus);
}

.Btn-link-warning {
    --Btn-text-color: var(--color-warning);
    --Btn-border-color: var(--color-warning-border-color);
    --Btn-outline-color: var(--color-warning-outline);
    --Btn-outline-color-focus: var(--color-warning-focus);
}

.Btn-link-danger {
    --Btn-text-color: var(--color-danger);
    --Btn-border-color: var(--color-danger-border-color);
    --Btn-outline-color: var(--color-danger-outline);
    --Btn-outline-color-focus: var(--color-danger-focus);
}
</style>
