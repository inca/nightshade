<template>
    <article>
        <h2>Buttons</h2>
        <VGroup>
            <HGroup>
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
                    <input v-model="active" type="checkbox" />
                    <div>Active</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="round" type="checkbox" />
                    <div>Round</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="outline" type="checkbox" />
                    <div>Outline</div>
                </HGroup>
            </HGroup>
            <HGroup>
                <Btn
                    v-for="token, index of tokens"
                    :key="index"
                    :label="token.label"
                    :kind="token.id"
                    :disabled="disabled"
                    :pseudoFocus="focus"
                    :pseudoHover="hover"
                    :pseudoActive="active"
                    :round="round"
                    :outline="outline" />
            </HGroup>
            <HGroup>
                <Btn
                    v-for="token, index of tokens"
                    :key="index"
                    :label="token.label"
                    :kind="'link-' + token.id"
                    :disabled="disabled"
                    :pseudoFocus="focus"
                    :pseudoHover="hover"
                    :pseudoActive="active"
                    :round="round"
                    :outline="outline" />
            </HGroup>
        </VGroup>
    </article>
</template>

<script>
export default {

    data() {
        return {
            disabled: false,
            focus: false,
            hover: false,
            active: false,
            round: false,
            outline: false,
        };
    },

    computed: {

        tokens() {
            return [
                {
                    id: 'default',
                    label: 'Default',
                },
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
