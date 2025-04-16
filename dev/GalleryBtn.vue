<template>
    <article>
        <h2>Buttons</h2>
        <VGroup>
            <HGroup wrap>
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
                    <input v-model="flat" type="checkbox" />
                    <div>Flat</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="round" type="checkbox" />
                    <div>Round</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="outline" type="checkbox" />
                    <div>Outline</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="shadow" type="checkbox" />
                    <div>Shadow</div>
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
                    <input
                        v-model="icon"
                        type="checkbox"
                        true-value="far fa-check-circle"
                        false-value="" />
                    <div>Icon</div>
                </HGroup>
            </HGroup>
            <HGroup wrap>
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
                    :outline="outline"
                    :shadow="shadow"
                    :flat="flat"
                    :size="size"
                    :icon="icon" />
            </HGroup>
            <HGroup wrap>
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
                    :outline="outline"
                    :shadow="shadow"
                    :flat="flat"
                    :size="size"
                    :icon="icon" />
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
            shadow: false,
            flat: false,
            size: undefined,
            icon: undefined,
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
