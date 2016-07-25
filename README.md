# Nightshade — base for team-specific CSS framework

## Usage

Install via npm:

```
npm i --save nightshade
```

Import from your Stylus entry point:

```
// main.styl

// variable overrides go here

@import 'nightshade';

// your app components go there
```

## Conventions

Good classnames:

  * `.my-component`
  * `.my-component-subComponent`
  * `.myComponent--modifier`

Bad classnames:

  * `.myComponent`, `.my_component` (prefer single delimiters styls)
  * `.my-component-subcomponent-subsubstuff` (too much nesting, leave up to 2 levels)

Variables:

  * start with dollar $ (b/c Stylus emits unresolved variables as text)
  * use dash as name separator
  * name components specificity: from least specific to most specific
  * component variable scheme: `$what[-state]-property`

Good variable names:

  * `$color-primary`, `$color-warning`, `$color-critical` (base variables)
  * `$type-small`, `$type-large` (base variables)
  * `$link-color`, `$link-active-color` (component variables)

Selector specificity:

  * general rule is to avoid nesting to decrease selector weight,
    thus making component maintainable
  * some nesting does make sense, most likely the nested part is a semantic tag
    (e.g. `.basket h1`, `.page aside`, etc.)
  * good justification is actual CSS output, never nest unless that's
    what you would actually type into plain CSS

## Base variables

Typographic essentials:

    * `$font-size` — base font size (applied to html, default 16px)
    * `$font-main` — main font stack
    * `$font-weight-normal` — normal font weight (default 300)
    * `$font-weight-bold` — normal font weight (default 600)

Color scheme:

    * `$color-base` (backdrop, white)
    * `$color-default` (default ui color for buttons, input borders, etc., gray)
    * `$color-primary` (brand accent color)
    * `$color-warning` (self-explanatory, amber)
    * `$color-critical` (self-explanatory, blood)

Typographic sizes:

    * `$type-larger` (1.5em)
    * `$type-large` (1.2em)
    * `$type-normal` (1em)
    * `$type-small` (0.85em)
    * `$type-smaller` (0.75em)

These are used to produce modifiers (e.g. `.btn--primary`, `.btn--small`,
`.color--primary`, `.type-small`, etc.).

It's easy to both add/remove or override colors and sizes:

```
// Let's add success and secondary to our color scheme
$colors = 'base' 'default' 'primary' 'secondary' 'success' 'warning' 'critical'

$color-secondary = #d43
$color-secondary-text = #fff // optional, useful if contrast detector
                             // doesn't do what you want
$color-success = #3a5

@import 'nightshade'

// That's it! Classes like .btn--secondary and .btn--success are generated.
```

## Directory structure

* core — globals

  * variables — base variables (component variables should reside elsewhere)
  * mixins
  * reset — mimalistic user-agent resets
  * base — styles for base tags: html, body, img, a, etc.
  * helpers — general-purpose classnames with no semantic (to be listed in Vocabulary)

* components

  * filename === component name === toplevel classname
  * avoid nesting, unless nested part uses tag semantics
    (e.g. `.input-group input` or `.myArticle h1`)
  * avoid non-component classnames (bad: `.label`, `.grid .row`, `.grid .grid-cell`, good: `.grid-row`, `.grid-cell`, `.form-label`)
  * avoid > 2 levels of nesting (bad: `.grid-row-cell`)
  * it's also ok for some components to contain another components (e.g. `.ctl-group` to contain `.btn` and `.input`)

## Vocabulary

Each team should maintain its own UI stencils vocabulary so that random classnames
won't popup out of nowhere.

Remember, the whole point of framework/spec is reducing cognitive load.
Everyone should learn this vocabulary and use proper terms
both in code and in communication.
