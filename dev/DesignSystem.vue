<template>
    <div class="DesignSystem">
        <article>
            <h2>Design System</h2>
            <p>
                Every UI library needs a design system. A good design system ensures a consistent visual and behavioral experience, provides a coherent visual identity, and is minimalistic enough to be unobtrusive to end applications.
            </p>
            <p>
                Nightshade features a minimalistic design system based solely on CSS variables and some lightweight conventions. It is comprised of the following key aspects:
            </p>
            <ul>
                <li><a href="#spacing">Spacing</a></li>
                <li><a href="#typography">Typography</a></li>
                <li><a href="#colors">Colors</a></li>
            </ul>

            <h3 id="spacing">Spacing</h3>
            <p>
                All components use consistent spacing defined as multiples of a <strong>base spacing unit</strong>. It is defined as <code>--sp</code> variable and is equal to <code>8px</code> by default.
            </p>
            <p>
                The following spacing variables are included by default:
            </p>

            <pre><code>{{ spacingCss }}</code></pre>

            <h3 id="typography">Typography</h3>
            <p>
                The following CSS variables define typography. Applications should override these to match their unique style requirements.
            </p>

            <pre><code>{{ typographyCss }}</code></pre>

            <h3 id="colors">Colors</h3>
            <p>
                Nightshade features a simple yet efficient approach to manage dual-themed application colors scheme.
            </p>

            <h4>Color tokens</h4>

            <p>Nightshade employs layered approach to structure application colors:</p>

            <ul>
                <li>
                    <strong>Basis tokens</strong> govern the main text and background colors
                </li>
                <li>
                    <strong>Semantic tokens</strong> provide the color palette for various UI components, such as buttons, inputs, etc. They are made to look consistent with the text and background colors defined by basis tokens.
                </li>
                <li>
                    <strong>Semantic variables</strong> are derived from semantic tokens and provide meaningful CSS variables for use in UI elements.
                </li>
            </ul>

            <p>
                Each color token is defined as a set of CSS variables and includes 5 grades of lightness in the form of <code>--color-&lt;token&gt;-&lt;0-4&gt;</code> (e.g. <code>--color-primary-0</code>).
            </p>

            <p>
                This approach allows to define a minimalistic color grade for basis and surface tokens and then use these color grades to define more meaningful semantic tokens. Such approach makes it easy to customize the colors globally whilst maintaining dual-theme compatibility with minimal effort.
            </p>

            <h4>Basis tokens</h4>

            <p>
                The following CSS variables define the basis colors for the application.
            </p>

            <ul>
                <li>
                    <strong>base</strong> defines the backdrop colors of various UI surfaces. The various grades of based token is intended to be used as a background or border color for panels, cards and other neutral UI elements. The <code>--color-base-0</code> variable is typically associated with primary background (e.g. plain white for light themes and deep dark for dark themes).
                    <HGroup>
                        <Circle style="background: var(--color-base-0)" />
                        <Circle style="background: var(--color-base-1)" />
                        <Circle style="background: var(--color-base-2)" />
                        <Circle style="background: var(--color-base-3)" />
                        <Circle style="background: var(--color-base-4)" />
                    </HGroup>
                </li>
                <li>
                    <strong>text</strong> defines the main text colors. The <code>--color-text-0</code> variable is used as the main application text color, whereas the subsequent grades are used for de-emphasized text, as well as various UI elements (e.g. the slider of a progress bar).
                    <HGroup>
                        <Circle style="background: var(--color-text-0)" />
                        <Circle style="background: var(--color-text-1)" />
                        <Circle style="background: var(--color-text-2)" />
                        <Circle style="background: var(--color-text-3)" />
                        <Circle style="background: var(--color-text-4)" />
                    </HGroup>
                </li>
            </ul>

            <h4>Semantic tokens</h4>
            <p>
                Nightshade defines the finite set of semantic tokens:
            </p>
            <ul>
                <li>
                    <strong>default</strong> is used for regular de-emphasized actionable elements, such as toolbar buttons. By default it inherits the colors from <code>base</code> token, but the grades are inverted in dark theme.
                    <HGroup>
                        <Circle style="background: var(--color-default-0)" />
                        <Circle style="background: var(--color-default-1)" />
                        <Circle style="background: var(--color-default-2)" />
                        <Circle style="background: var(--color-default-3)" />
                        <Circle style="background: var(--color-default-4)" />
                    </HGroup>
                </li>
                <li>
                    <strong>primary</strong> is used for call-to-action elements.
                    <HGroup>
                        <Circle style="background: var(--color-primary-0)" />
                        <Circle style="background: var(--color-primary-1)" />
                        <Circle style="background: var(--color-primary-2)" />
                        <Circle style="background: var(--color-primary-3)" />
                        <Circle style="background: var(--color-primary-4)" />
                    </HGroup>
                </li>
                <li>
                    <strong>secondary</strong> is used for elements that need to stand out, but not attract as much attention as primary elements. Typical application links would use this color by default.
                    <HGroup>
                        <Circle style="background: var(--color-secondary-0)" />
                        <Circle style="background: var(--color-secondary-1)" />
                        <Circle style="background: var(--color-secondary-2)" />
                        <Circle style="background: var(--color-secondary-3)" />
                        <Circle style="background: var(--color-secondary-4)" />
                    </HGroup>
                </li>
                <li>
                    <strong>tertiary</strong> is used as an alternative color to secondary, useful to provide an alternative option or disambiguation.
                    <HGroup>
                        <Circle style="background: var(--color-tertiary-0)" />
                        <Circle style="background: var(--color-tertiary-1)" />
                        <Circle style="background: var(--color-tertiary-2)" />
                        <Circle style="background: var(--color-tertiary-3)" />
                        <Circle style="background: var(--color-tertiary-4)" />
                    </HGroup>
                </li>
                <li>
                    <strong>success</strong> indicates a successful action or outcome, synonymous to "great job". Should conventionally be a shade of green.
                    <HGroup>
                        <Circle style="background: var(--color-success-0)" />
                        <Circle style="background: var(--color-success-1)" />
                        <Circle style="background: var(--color-success-2)" />
                        <Circle style="background: var(--color-success-3)" />
                        <Circle style="background: var(--color-success-4)" />
                    </HGroup>
                </li>
                <li>
                    <strong>warning</strong> indicates a potential issue, side effect or a deviation from norm, often synonymous to "proceed with caution". Should conventionally be a shade of yellow or amber.
                    <HGroup>
                        <Circle style="background: var(--color-warning-0)" />
                        <Circle style="background: var(--color-warning-1)" />
                        <Circle style="background: var(--color-warning-2)" />
                        <Circle style="background: var(--color-warning-3)" />
                        <Circle style="background: var(--color-warning-4)" />
                    </HGroup>
                </li>
                <li>
                    <strong>danger</strong> indicates an error, irreversible or destructive action. Should conventionally be a shade of red.
                    <HGroup>
                        <Circle style="background: var(--color-danger-0)" />
                        <Circle style="background: var(--color-danger-1)" />
                        <Circle style="background: var(--color-danger-2)" />
                        <Circle style="background: var(--color-danger-3)" />
                        <Circle style="background: var(--color-danger-4)" />
                    </HGroup>
                </li>
            </ul>

            <h4>Semantic variables</h4>
            <p>
                After the palette is established, the following color semantics are used to define the colors of various UI elements.
            </p>
            <ul>
                <li>
                    <code>--color-&lt;token&gt;</code> — text written in the color the token represents
                </li>
                <li>
                    <code>--color-&lt;token&gt;-surface-top</code> — top surface color
                </li>
                <li>
                    <code>--color-&lt;token&gt;-surface-bottom</code> — bottom surface color
                </li>
                <li>
                    <code>--color-&lt;token&gt;-text</code> — text written on the surface
                </li>
                <li>
                    <code>--color-&lt;token&gt;-focus</code> — focus outline
                </li>
                <li>
                    <code>--color-&lt;token&gt;-outline</code> — outline color
                </li>
                <li>
                    <code>--color-&lt;token&gt;-shadow</code> — shadow color
                </li>
            </ul>

            <p>
                The application can choose to override specific semantic variables to achieve the desired look and feel, although it is more advisable to override semantic tokens instead.
            </p>

            <h4>Using colors</h4>
            <p>
                When designing custom components, it is advisable to use the semantic variables in order for the components to "fit" the application look and feel.
            </p>
            <p>
                When doing so, consider matching the states of primary UI components: buttons and inputs.
            </p>
        </article>
    </div>
</template>

<script>
import spacingCss from '../stylesheets/vars/spacing.css?raw';
import typographyCss from '../stylesheets/vars/typography.css?raw';

export default {

    data() {
        return {
            spacingCss,
            typographyCss,
        };
    }

};
</script>

<style scoped>
.DesignSystem {

}
</style>
