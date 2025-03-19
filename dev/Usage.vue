<template>
    <article>
        <h2>Usage</h2>
        <p>
            Nightshade is shipped for ESM environments and build systems like <a href="https://vite.dev" target="_blank">Vite</a>.
            The package consists of a tree-shakable ESM components bundle and a set of CSS files.
        </p>

        <h3>Install the package</h3>
        <pre><code>npm i -s nightshade</code></pre>

        <h3>Import components</h3>

        <p>
            Import individual components to minimize the bundle size.
        </p>
        <pre><code>{{ importIndividual }}</code></pre>

        <p>
            Or import all components for a simpler setup.
        </p>
        <pre><code>{{ importAll }}</code></pre>

        <h3>Import CSS</h3>

        <h4>Required stylesheets</h4>
        <p>
            Nightshade components require minimal global CSS to work.
        </p>
        <ul>
            <li>
                <a href="https://github.com/inca/nightshade/blob/main/stylesheets/variables.css" target="_blank">variables.css</a> includes the global CSS variables that support the Design System.
            </li>
            <li>
                <a href="https://github.com/inca/nightshade/blob/main/stylesheets/baseline.css" target="_blank">baseline.css</a> establishes the sensible baseline for component styles. Most notably, it sets the text color and styles on document root and includes a global <code>box-sizing: border-box</code> rule. It is strongly recommended to import it; however, if you find it causes conflicts with your existing application, you may customize it to your needs.
            </li>
            <li>
                <code>components.css</code> contains the scoped styles for bundled components. Importing it is required.
            </li>
        </ul>

        <pre><code>{{ importRequiredCss }}</code></pre>

        <h4>Optional stylesheets</h4>

        <p>
            Nightshade also includes optional global styles referred to as "modules".
            Those are more opinionated and include utility classes, heading styles, <code>&lt;article&gt;</code> content styles etc. You can import them all or selectively, depending on your application needs.
        </p>

        <pre><code>{{ importOptionalCss }}</code></pre>

        <h4>All stylesheets</h4>

        <p>
            You can also import the full global stylesheet for simpler setup. Use this when you do not have to worry about potential conflicts with your existing application. Make sure to include <code>components.css</code> as well.
        </p>
        <pre><code>{{ importFullCss }}</code></pre>

    </article>
</template>

<script>
export default {

    computed: {

        importIndividual() {
            return `
import { Btn } from 'nightshade';

app.component('Btn', Btn);
`.trim();
        },

        importAll() {
            return `
import { components } from 'nightshade';

for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
}
`.trim();
        },

        importRequiredCss() {
            return `
import 'nightshade/stylesheets/variables.css';
import 'nightshade/stylesheets/baseline.css';
import 'nightshade/components.css';
`.trim();
        },

        importOptionalCss() {
            return `
import 'nightshade/stylesheets/modules/article.css';
import 'nightshade/stylesheets/modules/headings.css';
import 'nightshade/stylesheets/modules/kbd.css';
import 'nightshade/stylesheets/modules/transitions.css';
import 'nightshade/stylesheets/modules/utils.css';
`.trim();
        },

        importFullCss() {
            return `
import 'nightshade/stylesheets.css';
import 'nightshade/components.css';
`.trim();
        }

    }

};
</script>

<style scoped>
</style>
