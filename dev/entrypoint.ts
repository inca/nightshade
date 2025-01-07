import '../stylesheets/index.css';
import './theme.css';

import { createApp } from 'vue';

import * as components from '../lib/index.js';
import Root from './Root.vue';

const app = createApp(Root);
for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
}
app.mount('#app');
