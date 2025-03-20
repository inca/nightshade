<template>
    <InputBase
        class="InputTextarea"
        v-bind="{
            ...$attrs,
            ...$props
        }"
        :fixedHeight="false">
        <slot name="before" />
        <textarea
            ref="input"
            :value="modelValue"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            :rows="effectiveRows"
            resize="none"
            autocomplete="off"
            @input="onInput($event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)" />
        <slot name="after" />
    </InputBase>
</template>

<script>
import InputBase from './InputBase.vue';

export default {

    props: {
        ...InputBase.props,
        modelValue: { type: [String, Number] },
        placeholder: { type: String },
        rows: { type: Number },
        autoSize: { type: Boolean, default: true },
        minRows: { type: Number, default: 2 },
        maxRows: { type: Number, default: 10 },
        autoFocus: { type: Boolean },
        readonly: { type: Boolean },
    },

    emits: [
        'focus',
        'blur',
        'input',
        'update:modelValue'
    ],

    computed: {

        effectiveRows() {
            if (this.autoSize) {
                const lineCount = this.modelValue.split('\n').length;
                return Math.max(Math.min(lineCount, this.maxRows), this.minRows);
            }
            return this.rows ?? this.minRows ?? 2;
        },

    },

    mounted() {
        if (this.autoFocus) {
            this.$refs.input?.focus();
        }
    },

    methods: {

        onInput(ev) {
            this.$emit('update:modelValue', ev.target.value);
        }

    }

};
</script>

<style scoped>
.InputTextarea {
    --InputBase-padding: var(--sp1-5);
}

input, textarea {
    -webkit-appearance: none;
    box-sizing: border-box;
    flex: 1;
    padding: 0;
    border: 0;
    width: 100%;
    min-width: 0;
    outline: 0;
    user-select: text;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: inherit;
    resize: none;
}
</style>
