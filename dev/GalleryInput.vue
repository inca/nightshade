<template>
    <article>
        <h2>Inputs</h2>

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
                <input v-model="round" type="checkbox" />
                <div>Round</div>
            </HGroup>
            <HGroup tagName="label">
                <input v-model="invalid" type="checkbox" />
                <div>Invalid</div>
            </HGroup>
        </HGroup>

        <p>
            <code>InputBase</code> is a handy component used to create input-like fields.
            You can place arbitrary content into its default slot.
        </p>
        <VGroup>
            <InputBase
                label="Optional label"
                :pseudoFocus="focus"
                :pseudoHover="hover"
                :round="round"
                :disabled="disabled"
                :invalid="invalid"
                tabindex="0">
                <div class="pad-1">
                    Hello!
                </div>
            </InputBase>
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
            round: false,
            invalid: false,
        };
    },

};
</script>

<style scoped>
</style>
