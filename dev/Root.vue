<template>
    <div class="Root">
        <DesignSystem />
        <GalleryBtn />
    </div>
</template>

<script>
import DesignSystem from './DesignSystem.vue';
import GalleryBtn from './GalleryBtn.vue';

export default {

    components: {
        DesignSystem,
        GalleryBtn,
    }

};
</script>

<style scoped>
.Root {
    max-width: 640px;
    margin: var(--sp4) auto;
}
</style>
