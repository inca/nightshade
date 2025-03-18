<template>
    <Transition
        :name="'fade-' + dir"
        appear>
        <div
            class="Bubble"
            :class="[
                `Bubble-${dir}`,
                `Bubble-${align}`,
            ]">
            <div class="Arrow" />
            <div
                class="Body">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<script>
export default {

    props: {
        dir: { type: String, default: 'bottom' },
        align: { type: String, default: 'start' },
    },

};
</script>

<style>
:root {
    --Bubble-surface: var(--color-base-0);
    --Bubble-arrow-size: 10px;
    --Bubble-arrow-offset: 16px;
    --Bubble-shadow-color: var(--color-shadow-light);
    --Bubble-shadow-size: 0 2px 5px;
}
</style>

<style scoped>
.Bubble {
    position: absolute;
    z-index: 10;
    filter: drop-shadow(var(--Bubble-shadow-size) var(--Bubble-shadow-color));
}

.Body {
    position: absolute;
    min-width: 48px;
    min-height: 16px;
    border-radius: var(--border-radius);
    background: var(--Bubble-surface);
}

.Arrow {
    position: absolute;
    z-index: 5;
    width: 0;
    height: 0;
    border: var(--Bubble-arrow-size) solid transparent;
    transform: translate(-50%, -50%);
}

/* Directions */

.Bubble-top > .Body {
    margin-bottom: var(--Bubble-arrow-size);
    bottom: 0;
}

.Bubble-bottom > .Body {
    margin-top: var(--Bubble-arrow-size);
    top: 0;
}

.Bubble-left > .Body {
    margin-right: var(--Bubble-arrow-size);
    right: 0;
}

.Bubble-right > .Body {
    margin-left: var(--Bubble-arrow-size);
    left: 0;
}

/* Alignments */

.Bubble-start.Bubble-top > .Body,
.Bubble-start.Bubble-bottom > .Body {
    left: 0;
    transform: translateX(calc(-1 * var(--Bubble-arrow-offset)));
}

.Bubble-center.Bubble-top > .Body,
.Bubble-center.Bubble-bottom > .Body {
    transform: translateX(-50%);
}

.Bubble-end.Bubble-top > .Body,
.Bubble-end.Bubble-bottom > .Body {
    right: 0;
    transform: translateX(var(--Bubble-arrow-offset));
}

.Bubble-start.Bubble-left > .Body,
.Bubble-start.Bubble-right > .Body {
    top: 0;
    transform: translateY(calc(-1 * var(--Bubble-arrow-offset)));
}

.Bubble-center.Bubble-left > .Body,
.Bubble-center.Bubble-right > .Body {
    transform: translateY(-50%);
}

.Bubble-end.Bubble-left > .Body,
.Bubble-end.Bubble-right > .Body {
    bottom: 0;
    transform: translateY(var(--Bubble-arrow-offset));
}

/* Arrows */

.Bubble-top > .Arrow {
    border-top-color: var(--Bubble-surface);
}

.Bubble-bottom > .Arrow {
    border-bottom-color: var(--Bubble-surface);
}

.Bubble-left > .Arrow {
    border-left-color: var(--Bubble-surface);
}

.Bubble-right > .Arrow {
    border-right-color: var(--Bubble-surface);
}
</style>
