<template>
    <svg
        class="TabCap"
        :class="[
            `TabCap-${dir}`,
            `TabCap-${type}`,
        ]"
        viewBox="0 0 32 32"
        preserveAspectRatio="none">
        <path d="M0 32 C 16 32 16 0 32 0 L 32 32 z" />
    </svg>
</template>

<script>
export default {

    props: {
        dir: { type: String, default: 'top' },
        type: { type: String, default: 'start' },
    },

};
</script>

<style scoped>
.TabCap {}

path {
    transform-origin: 50% 50%;
    stroke: none;
}

.TabCap-top.TabCap-start path { transform: scale(1, 1) }
.TabCap-top.TabCap-end path { transform: scale(-1, 1) }
.TabCap-bottom.TabCap-start path { transform: scale(1, -1) }
.TabCap-bottom.TabCap-end path { transform: scale(-1, -1) }

.TabCap-right.TabCap-start path { transform: scale(1, 1) rotate(90deg) }
.TabCap-right.TabCap-end path { transform: scale(-1, 1) rotate(-90deg) }
.TabCap-left.TabCap-start path { transform: scale(1, -1) rotate(-90deg) }
.TabCap-left.TabCap-end path { transform: scale(-1, -1) rotate(90deg) }
</style>
