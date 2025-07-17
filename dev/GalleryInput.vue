<template>
    <article>
        <h2>Inputs</h2>

        <VGroup gap="2">

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
                label="Optional very very very very very very very very very very long label"
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

        <VGroup gap="2">

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
                    <div tabindex="0">
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
                :pseudoFocus="focus"
                :pseudoHover="hover"
                :round="round"
                :disabled="disabled"
                :invalid="invalid"
                :size="size"
                :fixedHeight="false"
                tagName="div">
                <VGroup>
                    <p>Can also be multiline and contain other elements.</p>
                    <HGroup>
                        <Btn
                            label="Some button"
                            kind="default"
                            :round="round"
                            :size="size" />
                    </HGroup>
                </VGroup>
            </InputBase>
        </VGroup>

        <p>
            Inputs support the following label styles: <code>tab</code>, <code>text</code>, <code>inline</code>.
        </p>

        <VGroup gap="2">
            <HGroup align="end">
                <InputText
                    v-model="text"
                    label="Tab Label"
                    labelStyle="tab"
                    :disabled="disabled"
                    :invalid="invalid"
                    :size="size"
                    :pseudoFocus="focus"
                    :pseudoActive="active"
                    :pseudoHover="hover"
                    :round="round" />
                <InputText
                    v-model="text"
                    label="Text Label"
                    labelStyle="text"
                    :disabled="disabled"
                    :invalid="invalid"
                    :size="size"
                    :pseudoFocus="focus"
                    :pseudoActive="active"
                    :pseudoHover="hover"
                    :round="round" />
                <InputText
                    v-model="text"
                    label="Inline Label gj"
                    labelStyle="inline"
                    :disabled="disabled"
                    :invalid="invalid"
                    :size="size"
                    :pseudoFocus="focus"
                    :pseudoActive="active"
                    :pseudoHover="hover"
                    :round="round" />
            </HGroup>
        </VGroup>

        <h3>Input Textarea</h3>

        <InputTextarea
            v-model="text"
            label="Multiline text"
            autoSize
            :disabled="disabled"
            :invalid="invalid"
            :size="size"
            :pseudoFocus="focus"
            :pseudoActive="active"
            :pseudoHover="hover"
            :round="round" />

        <h3>Input Select</h3>

        <InputSelect
            v-model="selectedItem"
            label="Choose your side"
            :items="[
                {
                    icon: 'fas fa-robot',
                    value: 'robot',
                    title: 'Robot',
                },
                {
                    icon: 'fas fa-user',
                    value: 'human',
                    title: 'Human',
                }
            ]"
            :disabled="disabled"
            :invalid="invalid"
            :size="size"
            :pseudoFocus="focus"
            :pseudoActive="active"
            :pseudoHover="hover"
            :round="round" />

    </article>
</template>

<script>
export default {

    data() {
        return {
            text: 'Hello world!',
            selectedItem: 'robot',
            active: false,
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
