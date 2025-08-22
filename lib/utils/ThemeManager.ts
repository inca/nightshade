import { Plugin, reactive } from 'vue';

export type ThemeToken = 'light' | 'dark' | 'auto';

export const themePlugin: Plugin = {
    install(app) {
        const themeManager = reactive(new ThemeManager());
        app.provide('themeManager', themeManager);
        themeManager.init();
    }
};

export class ThemeManager {

    currentTheme: ThemeToken = 'auto';

    init() {
        this.loadTheme();
        this.applyTheme();
        this.listenForSystemThemeChanges();
    }

    setTheme(theme: ThemeToken) {
        this.currentTheme = theme;
        this.saveTheme();
        this.applyTheme();
    }

    toggleTheme() {
        this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
    }

    protected applyTheme() {
        const doc = document.documentElement;
        const themeToken = this.currentTheme === 'auto' ? this.getSystemTheme() : this.currentTheme;
        doc.classList.remove('theme-light');
        doc.classList.remove('theme-dark');
        doc.classList.add(`theme-${themeToken}`);
        window.dispatchEvent(new CustomEvent('themeChanged'));
    }

    protected loadTheme() {
        this.currentTheme = this.getLocalStorageTheme();
    }

    protected saveTheme() {
        if (this.currentTheme === 'auto') {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', this.currentTheme);
        }
    }

    protected listenForSystemThemeChanges() {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        query.addEventListener('change', () => {
            if (this.currentTheme === 'auto') {
                this.applyTheme();
            }
        });
    }

    protected getLocalStorageTheme(): ThemeToken {
        const tok = localStorage.getItem('theme') ?? '';
        if (['dark', 'light'].includes(tok)) {
            return tok as ThemeToken;
        }
        return 'auto';
    }

    protected getSystemTheme(): ThemeToken {
        const m = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return m ? 'dark' : 'light';
    }

}
