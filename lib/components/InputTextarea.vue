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
        modelValue: { type: String },
        placeholder: { type: String },
        rows: { type: Number },
        autoSize: { type: Boolean, default: true },
        autoFocus: { type: Boolean },
        readonly: { type: Boolean },
    },

    emits: [
        'focus',
        'blur',
        'input',
        'update:modelValue'
    ],

    mounted() {
        this.$nextTick(() => {
            if (this.autoFocus) {
                this.$refs.input?.focus();
            }
            if (this.autoSize) {
                this.initAutoSize();
            }
        });
    },

    methods: {

        onInput(ev) {
            this.$emit('update:modelValue', ev.target.value);
        },

        initAutoSize() {
            const textarea = this.$refs.input;
            textarea.style.height = textarea.scrollHeight + 'px';
            textarea.style.overflowY = 'hidden';
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });
        },

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
