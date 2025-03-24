<template>
    <article>
        <h2>Switches</h2>
        <VGroup>
            <HGroup wrap>
                <HGroup tagName="label">
                    <input v-model="value" type="checkbox" />
                    <div>Checked</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="disabled" type="checkbox" />
                    <div>Disabled</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="focus" type="checkbox" />
                    <div>Focus</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="hover" type="checkbox" />
                    <div>Hover</div>
                </HGroup>
                <HGroup tagName="label">
                    <input
                        v-model="size"
                        type="checkbox"
                        true-value="small"
                        false-value="" />
                    <div>Small</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="knobOutline" type="checkbox" />
                    <div>Knob Outline</div>
                </HGroup>
            </HGroup>
            <HGroup wrap>
                <Switch
                    v-for="token, index of tokens"
                    :key="index"
                    v-model="value"
                    :kind="token.id"
                    :disabled="disabled"
                    :pseudoFocus="focus"
                    :pseudoHover="hover"
                    :pseudoActive="active"
                    :size="size"
                    :knobOutline="knobOutline" />
            </HGroup>
        </VGroup>
    </article>
</template>

<script>
export default {

    data() {
        return {
            value: false,
            disabled: false,
            focus: false,
            hover: false,
            size: undefined,
            knobOutline: false,
        };
    },

    computed: {

        tokens() {
            return [
                {
                    id: 'primary',
                    label: 'Primary',
                },
                {
                    id: 'secondary',
                    label: 'Secondary',
                },
                {
                    id: 'tertiary',
                    label: 'Tertiary',
                },
                {
                    id: 'success',
                    label: 'Success',
                },
                {
                    id: 'warning',
                    label: 'Warning',
                },
                {
                    id: 'danger',
                    label: 'Danger',
                },
            ];
        }

    }

};
</script>

<style scoped>
</style>
