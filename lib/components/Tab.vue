<template>
    <div
        class="Tab"
        :class="[
            `Tab-${dir}`,
            `Tab-${orientation}`,
        ]">
        <TabCap
            class="TabCap"
            :dir="dir"
            type="start" />
        <div class="Content">
            <slot>
                <div
                    v-if="label"
                    class="TabLabel"
                    :title="label">
                    {{ label }}
                </div>
            </slot>
        </div>
        <TabCap
            class="TabCap"
            :dir="dir"
            type="end" />
    </div>
</template>

<script>
export default {

    props: {
        dir: { type: String, default: 'top' },
        label: { type: String },
    },

    computed: {

        orientation() {
            return this.dir === 'top' || this.dir === 'bottom' ? 'h' : 'v';
        },

    },

};
</script>

<style scoped>
.Tab {
    --Tab-size: var(--sp3);
    --Tab-cap-size: var(--sp4);
    --Tab-surface: var(--color-base-1);
    --Tab-color: var(--color-text-0);
    --Tab-shadow-size: 0.5px;
    --Tab-shadow-color: rgba(0, 0, 0, .25);
    --Tab-shadow-offset-x: 0;
    --Tab-shadow-offset-y: 0;

    display: flex;
    cursor: pointer;
    position: relative;
    filter: drop-shadow(var(--Tab-shadow-offset-x) var(--Tab-shadow-offset-y) var(--Tab-shadow-size) var(--Tab-shadow-color));
}

.TabCap, .Content {
    position: relative;
    z-index: 2;
}

.Content {
    min-width: 0;
    display: flex;
    align-items: center;
    background: var(--Tab-surface);
    color: var(--Tab-color);
}

.TabLabel {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Tab-h {
    flex-flow: row;
    height: var(--Tab-size);
}

.Tab-v {
    flex-flow: column;
    width: var(--Tab-size);
}

.Tab-v .Content {
    writing-mode: vertical-lr;
    text-orientation: sideways-right;
    transform: rotate(180deg);
    transform-origin: 50% 50%;
}

.TabCap {
    flex: 0 0 var(--Tab-cap-size);
    fill: var(--Tab-surface);
}

.Tab-h .TabCap {
    width: var(--Tab-cap-size);
}

.Tab-v .TabCap {
    height: var(--Tab-cap-size);
}
</style>
