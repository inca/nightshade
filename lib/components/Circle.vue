<template>
    <div
        class="Circle"
        :class="[
            `Circle-${size}`
        ]">
        <slot />
    </div>
</template>

<script>
export default {

    props: {
        size: { type: String, default: 'normal' },
    }

};
</script>

<style scoped>
.Circle {
    --CircleSize: var(--sp2);
    width: var(--CircleSize);
    height: var(--CircleSize);
    border-radius: var(--CircleSize);
    box-shadow: 0 1px 3px rgba(0,0,0,.25);
}

.Circle-normal { --CircleSize: var(--sp2) }
.Circle-large { --CircleSize: var(--sp4) }
.Circle-larger { --CircleSize: var(--sp6) }
</style>
