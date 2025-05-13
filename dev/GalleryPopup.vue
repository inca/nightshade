<template>
    <article>
        <h2>Popups</h2>

        <p>
            Popups, widely criticized by designers for being "the dumbest way to add more content existing UI layout", are still very common for organizing contextual content that does not necessarily need to be visible at all times.
        </p>

        <h3>Bubble</h3>

        <p>
            Bubbles are primitive building blocks for various popups.
        </p>

        <p>
            Their arrow tip is referred to as "anchor" and can be attached to any element. The body of the bubble is positioned absolutely and has different direction and alignment options.
        </p>

        <p>
            In the example below various anchor points are positioned absolutely (rendered as a small red dot), each with a bubble inside.
        </p>

        <div class="BubbleSpace">
            <template
                v-for="dir in ['top', 'right', 'bottom', 'left']"
                :key="dir">
                <template
                    v-for="align in ['start', 'end']"
                    :key="align">
                    <div
                        class="Anchor"
                        :class="[
                            `Anchor-${dir}`,
                            `Anchor-${align}`,
                        ]">
                        <Bubble :dir="dir" :align="align">
                            <div class="BubbleContent nowrap">
                                dir: {{ dir }}, align: {{ align }}
                            </div>
                        </Bubble>
                    </div>
                </template>
            </template>
        </div>

        <h3>Context Popups</h3>

        <p>
            Context popups are bubbles that are attached to a position of an element specified via <code>anchorRef</code> prop. They are teleported to an <code>id="overlays"</code> container which must be present in the DOM.
        </p>

        <Btn
            ref="popupBtn"
            kind="default"
            label="Show popup"
            @click="popupShown = true" />

        <ContextPopup
            v-if="popupShown"
            anchorRef="popupBtn"
            align="auto"
            @hide="popupShown = false">
            <div class="pad-2 nowrap">
                This is a popup! 🎈
            </div>
        </ContextPopup>

        <p>
            By default context popups include an overlay that prevents scrolling of the underlying page and intercepts clicks that trigger <code>@hide</code> event. Those can be disabled with <code>overlayEnabled=false</code>.
        </p>

    </article>
</template>

<script>
export default {

    data() {
        return {
            popupShown: false,
        };
    }

};
</script>

<style scoped>
.BubbleSpace {
    position: relative;
    height: 240px;
}

.BubbleContent {
    padding: var(--sp2);
}

.Anchor {
    position: absolute;
    border: 2px solid red;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}

.Anchor-top.Anchor-start { top: 20%; left: 20%; }
.Anchor-top.Anchor-end { top: 20%; right: 20%; }
.Anchor-bottom.Anchor-start { bottom: 20%; left: 20%; }
.Anchor-bottom.Anchor-end { bottom: 20%; right: 20%; }
.Anchor-left.Anchor-start { left: 20%; top: 30%; }
.Anchor-left.Anchor-end { left: 20%; bottom: 30%; }
.Anchor-right.Anchor-start { right: 20%; top: 30%; }
.Anchor-right.Anchor-end { right: 20%; bottom: 30%; }
</style>
