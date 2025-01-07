<template>
    <div
        class="VGroup"
        :class="[
            `VGroup-align-${align}`,
            `VGroup-justify-${justify}`,
            `VGroup-gap-${gap}`,
        ]">
        <slot />
    </div>
</template>

<script>
export default {

    props: {
        align: { type: String, default: 'stretch' },
        justify: { type: String },
        gap: { type: String, default: '1' },
    }

};
</script>

<style scoped>
.VGroup {
    display: flex;
    flex-flow: column nowrap;
}

.VGroup-align-stretch { align-items: stretch; }
.VGroup-align-baseline { align-items: baseline; }
.VGroup-align-center { align-items: center; }
.VGroup-align-start { align-items: flex-start; }
.VGroup-align-end { align-items: flex-end; }

.VGroup-justify-center { justify-content: center; }
.VGroup-justify-start { justify-content: flex-start; }
.VGroup-justify-end { justify-content: flex-end; }
.VGroup-justify-space-around { justify-content: space-around; }
.VGroup-justify-space-between { justify-content: space-between; }

.VGroup-gap-0 { gap: 0 }
.VGroup-gap-1 { gap: var(--sp) }
.VGroup-gap-2 { gap: var(--sp2) }
.VGroup-gap-3 { gap: var(--sp3) }
.VGroup-gap-4 { gap: var(--sp4) }
</style>
