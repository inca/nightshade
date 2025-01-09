<template>
    <article>
        <h2>Tabs</h2>

        <p>
            In physical world, tabs are a way to label and quickly access content inside a folder.
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
                    label="Tab Size"
                    :min="12"
                    :max="64" />
                <input
                    v-model="size"
                    type="range"
                    :min="12"
                    :max="64" />
            </VGroup>
            <VGroup tagName="label">
                <InputText
                    v-model="capSize"
                    number
                    label="Cap size"
                    :min="12"
                    :max="64" />
                <input
                    v-model="capSize"
                    type="range"
                    :min="12"
                    :max="64" />
            </VGroup>
        </HGroup>

        <h3>Standalone tabs</h3>

        <VGroup gap="2">

            <VGroup gap="0">
                <Tab
                    class="StandaloneTab"
                    dir="top"
                    :style="tabStyle"
                    label="Top" />
                <HGroup gap="0">
                    <Tab
                        class="StandaloneTab"
                        dir="left"
                        :style="tabStyle"
                        label="Left" />
                    <div class="Box">
                        <strong>
                            Outside
                        </strong>
                    </div>
                    <Tab
                        class="StandaloneTab"
                        dir="right"
                        :style="tabStyle"
                        label="Right" />
                </HGroup>
                <Tab
                    class="StandaloneTab"
                    dir="bottom"
                    :style="tabStyle"
                    label="Bottom" />
            </VGroup>

            <VGroup gap="0">
                <div class="Box">
                    <strong>
                        Inside
                    </strong>
                    <VGroup gap="0" class="flex-1">
                        <Tab
                            class="StandaloneTab"
                            dir="bottom"
                            :style="tabStyle"
                            label="Bottom" />
                        <HGroup gap="0" class="flex-1">
                            <Tab
                                class="StandaloneTab"
                                dir="right"
                                :style="tabStyle"
                                label="Right" />
                            <Sizer />
                            <Tab
                                class="StandaloneTab"
                                dir="left"
                                :style="tabStyle"
                                label="Left" />
                        </HGroup>
                        <Tab
                            class="StandaloneTab"
                            dir="top"
                            :style="tabStyle"
                            label="Top" />
                    </VGroup>
                </div>
            </VGroup>
        </VGroup>

        <h3>Simple tabbed panel</h3>

        <p>
            This is a simple tabbed panel assembled with just Tab components and minimal CSS.
        </p>

        <VGroup gap="0">
            <HGroup class="Tabs">
                <Tab
                    v-for="index of [0, 1, 2]"
                    :key="index"
                    class="PanelTab"
                    :class="{
                        'PanelTab-active': activeTab === index,
                    }"
                    :label="`Tab ${index}`"
                    :style="tabStyle"
                    @click="activeTab = index" />
            </HGroup>
            <div class="Box TabbedPanel">
                <strong>Active tab: {{ activeTab }}</strong>
            </div>
        </VGroup>

    </article>
</template>

<script>
export default {

    data() {
        return {
            size: 24,
            capSize: 24,
            activeTab: 0,
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
.StandaloneTab {
    align-self: center;
}

.Box {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    position: relative;
    border: 2px solid var(--color-base-1);
    flex: 1;
    min-height: 120px;
    width: 100%;
    align-self: stretch;
}

.Box strong {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.PanelTab {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, .25));
}

.PanelTab + .PanelTab {
    margin-left: calc(-1.25 * var(--Tab-cap-size));
}

.PanelTab-active {
    --Tab-surface: var(--color-tertiary);
    --Tab-color: var(--color-tertiary-text);
    z-index: 20;
}

.PanelTab:hover:not(.PanelTab-active) {
    --Tab-surface: var(--color-base-2);
    z-index: 10;
}

.TabbedPanel {
    position: relative;
    z-index: 30;
    border-top-color: var(--color-tertiary);
}
</style>
