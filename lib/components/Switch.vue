<template>
    <label
        class="Switch"
        :class="[
            `Switch-${kind}`,
            `Switch-${size}`,
            {
                'Switch-active': !!modelValue,
                'Switch-disabled': disabled,
                'Switch-pseudo-focus': pseudoFocus,
                'Switch-pseudo-hover': pseudoHover,
                'Switch-pseudo-active': pseudoActive,
                'Switch-knob-outline': knobOutline,
            }
        ]"
        tabindex="0">
        <input
            type="checkbox"
            :checked="modelValue"
            :disabled="disabled"
            @change="onChange" />
    </label>
</template>

<script>
export default {

    props: {
        modelValue: { type: Boolean },
        disabled: { type: Boolean },
        kind: { type: String, default: 'primary' },
        size: { type: String, default: 'normal' },
        knobOutline: { type: Boolean, default: false },
        pseudoFocus: { type: Boolean, default: false },
        pseudoHover: { type: Boolean, default: false },
        pseudoActive: { type: Boolean, default: false },
    },

    emits: [
        'update:modelValue',
    ],

    methods: {

        onChange(ev) {
            this.$emit('update:modelValue', ev.target.checked);
        }

    }

};
</script>

<style scoped>
.Switch {
    --Switch-slide-width: 32px;
    --Switch-slide-height: 20px;
    --Switch-knob-size: 16px;
    --Switch-knob-offset: 2px;
    --Switch-knob-outline-offset: -2px;

    --Switch-outline-size: var(--input-outline-size);
    --Switch-outline-color: transparent;
    --Switch-outline-color-effective: transparent;
    --Switch-outline-color-focus: var(--color-primary);
    --Switch-outline-offset: var(--input-outline-offset);

    --Switch-surface-top: var(--color-base-3);
    --Switch-surface-bottom: var(--color-base-3);
    --Switch-surface-top-active: var(--color-primary);
    --Switch-surface-bottom-active: var(--color-primary);
    --Switch-surface-top-effective: var(--Switch-surface-top);
    --Switch-surface-bottom-effective: var(--Switch-surface-bottom);

    display: block;
    position: relative;
    width: var(--Switch-slide-width);
    height: var(--Switch-slide-height);
    border-radius: 10000px;

    cursor: pointer;
    background: radial-gradient(
        120% 150% at 80% 0%,
        var(--Switch-surface-top-effective),
        var(--Switch-surface-bottom-effective)
    );
    outline: var(--Switch-outline-size) solid var(--Switch-outline-color-effective);
    outline-offset: var(--Switch-outline-offset);
    background-clip: padding-box;
    transition: background-color .3s;

    box-shadow: 0 .5px 1px var(--color-shadow-medium) inset;
}

.Switch input {
    display: none;
}

.Switch::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--Switch-knob-size);
    height: var(--Switch-knob-size);
    border-radius: 1000px;
    background: var(--color-base-0);
    box-shadow: 0 1px 1px var(--color-shadow-medium);

    transform: translate(var(--Switch-knob-offset), -50%);
    transition: transform .3s;
}

.Switch:not(:disabled):hover, .Switch.Switch-pseudo-hover {
    filter: brightness(.96);
}

.Switch:not(:disabled):focus, .Switch.Switch-pseudo-focus {
    z-index: 10;
    --Switch-outline-color-effective: var(--Switch-outline-color-focus);
}

.Switch-active {
    --Switch-surface-top-effective: var(--Switch-surface-top-active);
    --Switch-surface-bottom-effective: var(--Switch-surface-bottom-active);
}

.Switch-active::after {
    transform: translate(
        calc(
            var(--Switch-slide-width) -
            var(--Switch-knob-size) -
            var(--Switch-knob-offset)
        ),
        -50%
    );
}

.Switch-disabled {
    cursor: not-allowed;
    opacity: .5;
}

.Switch-knob-outline::after {
    outline: var(--Switch-outline-size) solid var(--Switch-outline-color);
    outline-offset: var(--Switch-knob-outline-offset);
}

/* Sizes */

.Switch-small {
    --Switch-slide-width: 24px;
    --Switch-slide-height: 16px;
    --Switch-knob-size: 12px;
}

.Switch-large {
    --Switch-slide-width: 40px;
    --Switch-slide-height: 24px;
    --Switch-knob-size: 20px;
}

/* Kinds */

.Switch-default {
    --Switch-surface-top-active: var(--color-default-surface-top);
    --Switch-surface-bottom-active: var(--color-default-surface-bottom);
    --Switch-outline-color: var(--color-default-outline);
    --Switch-outline-color-focus: var(--color-default-focus);
}

.Switch-primary {
    --Switch-surface-top-active: var(--color-primary-surface-top);
    --Switch-surface-bottom-active: var(--color-primary-surface-bottom);
    --Switch-outline-color: var(--color-primary-outline);
    --Switch-outline-color-focus: var(--color-primary-focus);
}

.Switch-secondary {
    --Switch-surface-top-active: var(--color-secondary-surface-top);
    --Switch-surface-bottom-active: var(--color-secondary-surface-bottom);
    --Switch-outline-color: var(--color-secondary-outline);
    --Switch-outline-color-focus: var(--color-secondary-focus);
}

.Switch-tertiary {
    --Switch-surface-top-active: var(--color-tertiary-surface-top);
    --Switch-surface-bottom-active: var(--color-tertiary-surface-bottom);
    --Switch-outline-color: var(--color-tertiary-outline);
    --Switch-outline-color-focus: var(--color-tertiary-focus);
}

.Switch-success {
    --Switch-surface-top-active: var(--color-success-surface-top);
    --Switch-surface-bottom-active: var(--color-success-surface-bottom);
    --Switch-outline-color: var(--color-success-outline);
    --Switch-outline-color-focus: var(--color-success-focus);
}

.Switch-warning {
    --Switch-surface-top-active: var(--color-warning-surface-top);
    --Switch-surface-bottom-active: var(--color-warning-surface-bottom);
    --Switch-outline-color: var(--color-warning-outline);
    --Switch-outline-color-focus: var(--color-warning-focus);
}

.Switch-danger {
    --Switch-surface-top-active: var(--color-danger-surface-top);
    --Switch-surface-bottom-active: var(--color-danger-surface-bottom);
    --Switch-outline-color: var(--color-danger-outline);
    --Switch-outline-color-focus: var(--color-danger-focus);
}
</style>
