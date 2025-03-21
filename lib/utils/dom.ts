import { Point } from './point.js';

export type AnchorDir = 'middle' | 'top' | 'bottom' | 'left' | 'right';

export function getAnchorPoint(el: HTMLElement, dir: AnchorDir): Point {
    const box = el.getBoundingClientRect();
    const { top, left, width, height } = box;
    switch (dir) {
        case 'left':
            return { x: left, y: top + height * .5 };
        case 'right':
            return { x: left + width, y: top + height * .5 };
        case 'top':
            return { x: left + width * .5, y: top };
        case 'bottom':
            return { x: left + width * .5, y: top + height };
        case 'middle':
        default:
            return { x: left + width * .5, y: top + height * .5 };
    }
}

export function isInputElement(el: any) {
    if (!(el instanceof Element)) {
        return false;
    }
    return !!el.closest('input, textarea, select, [role="textbox"]');
}
