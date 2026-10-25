# @can0nical/brand

The Can0nical brand system (Electric Verdant), shared by every Can0nical product.

| File | What it is |
|---|---|
| `BRAND.md` | The rules: palette, themes, typography, wordmark, voice. Read it first |
| `tailwind-preset.js` | Tailwind preset (v3 format): brand colours, semantic theme tokens, font families. Works on Tailwind 3.4 and on Tailwind 4 through `@config` |
| `tokens.css` | CSS variables behind the semantic tokens, dark (default) and light |
| `tokens.json` | The same values for places without Tailwind (emails, generated images) |

## Install

Pinned to a release tag from GitHub (no npm account or token needed; the repo is public):

```json
"dependencies": {
  "@can0nical/brand": "github:Aju-Boss/can0nical-brand#v0.2.0"
}
```

Check it installed:

```sh
test -f node_modules/@can0nical/brand/BRAND.md && echo "BRAND.md installed"
```

To let Claude Code read the rules in that product, add this line to its `CLAUDE.md`:

```
@node_modules/@can0nical/brand/BRAND.md
```

## Use

```js
// tailwind.config.js
import brand from '@can0nical/brand/preset'

export default {
  presets: [brand],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
}
```

```css
/* main stylesheet, before @tailwind base */
@import '@can0nical/brand/tokens.css';
```

On Tailwind 4, load the same preset through a v3-style config file:

```css
/* main stylesheet (as Can0nical Swap does it) */
@import '@can0nical/brand/tokens.css';
@import 'tailwindcss';
@config '../tailwind.config.js';
```

Fonts are not bundled. Self-host them with `@fontsource/arvo` (400, 700),
`@fontsource/dm-sans` (300 to 600) and `@fontsource/dm-mono` (400, 500).

## Changing the brand

1. Change `BRAND.md`, `tailwind-preset.js`, `tokens.css` and `tokens.json` together.
2. `npm test` must pass: it fails if the four disagree.
3. Bump `version` in `package.json`, commit, and tag `vX.Y.Z`.
4. Each product moves to the new tag deliberately, by editing its dependency.

## Licence

Public for installation only. All rights reserved: see `LICENSE`.

## Releases

| Tag | Change |
|---|---|
| `v0.2.0` | Declares Tailwind 4 as a supported peer (`^3.4.0 \|\| ^4.0.0`), so products on Tailwind 4 install it without an npm override. No brand values changed |
| `v0.1.0` | First release, assembled from Can0nical's Design Manual and config |
