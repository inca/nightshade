<template>
    <div
        class="InputLabel"
        :title="label">
        <svg
            class="Corner"
            viewBox="0 0 32 32"
            preserveAspectRatio="none">
            <path d="M0 32 C 16 32 16 0 32 0 L 32 32 z" />
        </svg>
        <div class="Label">
            {{ label }}
        </div>
        <svg
            class="Corner"
            viewBox="0 0 32 32"
            preserveAspectRatio="none">
            <path
                d="M0 32 C 16 32 16 0 32 0 L 32 32 z"
                transform="scale(-1, 1)"
                transform-origin="50% 50%" />
        </svg>
    </div>
</template>

<script>
export default {

    props: {
        label: { type: String },
    },

};
</script>

<style scoped>
.InputLabel {
    --InputLabel-size: calc(0.75 * var(--InputBase-size));
    position: relative;
    z-index: 10;

    display: flex;
    margin: 0 var(--sp2);
    max-width: 75%;

    height: var(--InputLabel-size);
    line-height: var(--InputLabel-size);
    font-size: var(--InputBase-font-size);
}

.Corner {
    flex: 0 0 var(--InputBase-size);
    stroke: transparent;
    fill: var(--InputBase-label-surface);
}

.Label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    background: var(--InputBase-label-surface);
    color: var(--InputBase-label-color);
}
</style>
