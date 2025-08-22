import { Plugin } from 'vue';

export type IconOptions = Record<string, string | undefined>;

export const iconsPlugin: Plugin<IconOptions> = {

    install(app, options) {
        app.config.globalProperties.$nightshadeIcons = {
            ...options,
        };
    },

};
