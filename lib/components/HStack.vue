<template>
    <div class="HStack">
        <slot />
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.HStack {
    display: flex;
    align-items: stretch;
}

.HStack > *:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.HStack > *:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
</style>
