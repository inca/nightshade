<template>
    <article>
        <h2>Tabs</h2>

        <p>
            In physical world, tabs are a way to label and quickly access content inside the folder.
        </p>

        <p>
            In UI tabs are often associated with toggling between different views.
            It is often overlooked that a single tab can be used to label the associated content.
        </p>

        <p>
            Nightshade tabs are flexible and customizable, so that they can achieve both of these goals.
            Orientation is set as a component property, whereas the size, color and curve stiffness can be controlled with CSS variables.
        </p>

        <HGroup wrap>
            <VGroup tagName="label">
                <InputText
                    v-model="size"
                    number
                    label="Size"
                    min="12"
                    max="64" />
                <input
                    v-model="size"
                    type="range"
                    min="12"
                    max="64" />
            </VGroup>
            <VGroup tagName="label">
                <InputText
                    v-model="capSize"
                    number
                    label="Cap size"
                    min="12"
                    max="64" />
                <input
                    v-model="capSize"
                    type="range"
                    min="12"
                    max="64" />
            </VGroup>
        </HGroup>

        <h3>Standalone tabs</h3>

        <HGroup>
            <Tab
                dir="top"
                :style="tabStyle">
                Top
            </Tab>

            <Tab
                dir="bottom"
                :style="tabStyle">
                Bottom
            </Tab>

        </HGroup>

        <HGroup>
            <Tab
                dir="left"
                :style="tabStyle">
                Left
            </Tab>

            <Tab
                dir="right"
                :style="tabStyle">
                Right
            </Tab>
        </HGroup>

    </article>
</template>

<script>
export default {

    data() {
        return {
            size: 24,
            capSize: 24,
        };
    },

    computed: {

        tabStyle() {
            return {
                '--Tab-size': `${this.size}px`,
                '--Tab-cap-size': `${this.capSize}px`,
            };
        },

    },

};
</script>

<style scoped>
</style>
