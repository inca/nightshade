<template>
    <div class="Root">
        <div class="Container">
            <Usage />
            <DesignSystem />
            <GalleryBtn />
            <GalleryInput />
            <GalleryTab />
            <GalleryPopup />
            <GallerySwitch />
        </div>
    </div>
</template>

<script>
import DesignSystem from './DesignSystem.vue';
import GalleryBtn from './GalleryBtn.vue';
import GalleryInput from './GalleryInput.vue';
import GalleryPopup from './GalleryPopup.vue';
import GallerySwitch from './GallerySwitch.vue';
import GalleryTab from './GalleryTab.vue';
import Usage from './Usage.vue';

export default {

    components: {
        DesignSystem,
        GalleryBtn,
        GalleryInput,
        GalleryPopup,
        GallerySwitch,
        GalleryTab,
        Usage,
    }

};
</script>

<style scoped>
.Root {
    padding: 0 var(--sp2);
}

.Container {
    max-width: 640px;
    margin: var(--sp4) auto;
}
</style>
