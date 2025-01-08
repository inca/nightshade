<template>
    <article>
        <h2>Inputs</h2>

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
                    <input v-model="round" type="checkbox" />
                    <div>Round</div>
                </HGroup>
                <HGroup tagName="label">
                    <input v-model="invalid" type="checkbox" />
                    <div>Invalid</div>
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

            <InputText
                v-model="text"
                label="Optional label"
                :pseudoFocus="focus"
                :pseudoHover="hover"
                :round="round"
                :disabled="disabled"
                :invalid="invalid"
                :size="size">
                <template #after>
                    <i
                        v-if="icon"
                        :class="icon"
                        class="color-success" />
                </template>
            </InputText>
        </VGroup>

        <p>
            <code>InputBase</code> is a handy component used to create input-like fields.
            You can place arbitrary content into its default slot.
        </p>

        <VGroup>

            <HGroup align="end">
                <InputBase
                    class="flex-1"
                    label="Optional label"
                    :pseudoFocus="focus"
                    :pseudoHover="hover"
                    :round="round"
                    :disabled="disabled"
                    :invalid="invalid"
                    :size="size">
                    <div class="pad-1" tabindex="0">
                        The text above is <strong>{{ text }}</strong>
                    </div>
                </InputBase>
                <Btn
                    label="Side button"
                    kind="default"
                    :round="round"
                    :size="size" />
            </HGroup>

            <InputBase
                label="Optional label"
                :pseudoFocus="focus"
                :pseudoHover="hover"
                :round="round"
                :disabled="disabled"
                :invalid="invalid"
                :size="size"
                :fixedHeight="false">
                <VGroup class="pad-1">
                    <p>Can also be multiline and contain other elements.</p>
                    <HGroup>
                        <Btn
                            label="Side button"
                            kind="default"
                            :round="round"
                            :size="size" />
                    </HGroup>
                </VGroup>
            </InputBase>
        </VGroup>
    </article>
</template>

<script>
export default {

    data() {
        return {
            text: 'Hello world!',
            disabled: false,
            focus: false,
            hover: false,
            round: false,
            invalid: false,
            size: undefined,
            icon: undefined,
        };
    },

};
</script>

<style scoped>
</style>
