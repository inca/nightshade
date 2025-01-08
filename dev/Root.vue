<template>
    <div class="Root">
        <Usage />
        <DesignSystem />
        <GalleryBtn />
    </div>
</template>

<script>
import DesignSystem from './DesignSystem.vue';
import GalleryBtn from './GalleryBtn.vue';
import Usage from './Usage.vue';

export default {

    components: {
        DesignSystem,
        GalleryBtn,
        Usage,
    }

};
</script>

<style scoped>
.Root {
    max-width: 640px;
    margin: var(--sp4) auto;
}
</style>
