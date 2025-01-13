import { Plugin, reactive } from 'vue';

import { ThemeManager } from './ThemeManager.js';

export const themePlugin: Plugin = {
    install(app) {
        const themeManager = reactive(new ThemeManager());
        app.provide('themeManager', themeManager);
        themeManager.init();
    }
};
