import '@fortawesome/fontawesome-free/css/all.min.css';
import '../stylesheets/full.css';
import './theme.css';

import { createApp } from 'vue';

import * as components from '../lib/components/index.js';
import { themePlugin } from '../lib/index.js';
import Root from './Root.vue';

const app = createApp(Root);
app.use(themePlugin);

for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
}

app.mount('#app');
