# Can0nical Brand: Electric Verdant

Binding for every Can0nical product (Can0nical, Can0nical Swap, and any app that
follows). Read this before styling any surface. Values here are the source of
truth for `tailwind-preset.js`, `tokens.css` and `tokens.json` in this package.

Extracted from Can0nical's Design Manual (Web Brand System v1.0, May 2026) and
its rule R08. Product-specific behaviour (for example Can0nical's three-zone UX
model) lives in each product's own repo, not here.

---

## 1. The name

- The zero in **Can0nical** is always the numeral **0**, never the letter O. In
  code, identifiers, assets, alt text and every string. Product names follow it:
  **Can0nical Swap**.
- In the wordmark the zero is always **Amber `#F5C038`**, on every background.

## 2. Colour palette

| Token | Name | Hex | Role |
|---|---|---|---|
| `lime` | Electric Lime | `#6EE034` | CTAs, active and verified states, progress, hover. **The trust signal.** |
| `void` | Deep Void | `#0D1A10` | Default canvas (dark mode), cards, navigation. Never in print. |
| `forest` | Forest Anchor | `#1A5C2E` | Structure: dividers, muted surfaces, tag fills. Primary text and accent in light mode. |
| `amber` | Amber Zero | `#F5C038` | The wordmark zero, Founding Pioneer credentials, Integrity Score milestones. **Never a general UI accent.** |
| `mint` | Mint Surface | `#F2FDE9` | Light-mode canvas, print backgrounds, light landing sections. |

### Usage rules

- **Electric Lime** is reserved for CTAs, active or verified states, progress and
  hover. Don't dilute it as a generic fill.
- **Amber is protected.** Only the wordmark zero, Founding Pioneer and Integrity
  Score milestones. Not for errors, warnings or decoration.
- **Gradients:** Lime to Forest only, sparingly (hero graphics, verification
  success). **Never on text.**
- Buttons: lime fill with void text (`bg-lime text-void`) in both themes.

### Transparency scale (on Deep Void)

The only sanctioned opacity steps for overlays and fills on the dark canvas:

| Colour | Steps |
|---|---|
| Lime | 8%, 16%, 30% |
| Amber | 12% |
| White | 4% |

## 3. Light and dark themes

Dark is the default. Light swaps the canvas to Mint with Forest as text and
accent. Lime and Amber stay as accents in both. Use the **semantic tokens**, not
raw palette colours, for anything that changes with the theme.

| Semantic token | Dark (default) | Light |
|---|---|---|
| `bg` (page background) | Deep Void `#0D1A10` | Mint `#F2FDE9` |
| `surface` (cards, raised) | Deep Void `#0D1A10` | White `#FFFFFF` |
| `content` (primary text) | Mint `#F2FDE9` | Forest `#1A5C2E` |
| `line` (borders, dividers) | Forest `#1A5C2E` | Forest `#1A5C2E` (lower alpha in use) |
| `accent` (link text, emphasis, hover foreground) | Lime `#6EE034` | Forest `#1A5C2E` |

`accent` flips to Forest in light mode because lime text on mint is unreadable.
Button **fills** keep the fixed `lime` token.

Theme switch: set `data-theme="light"` or `data-theme="dark"` on `<html>`;
`tokens.css` defines both. Without the attribute, dark applies.

## 4. Typography

| Role | Typeface | Weights | Use |
|---|---|---|---|
| Wordmark and display | **Arvo** (slab serif) | **700** for the wordmark; 400 editorial | The wordmark; Can0nical also uses it for page and card headings |
| UI and body | **DM Sans** | 300, 400, 500, 600 | Interfaces, labels, body copy, navigation |
| Data and IDs | **DM Mono** | 400, 500 | Hashes, UPIDs, CV IDs, transaction IDs, code, data labels |

- **Arvo weight:** the original brand spec says 600, but Arvo ships only 400 and
  700, so 600 cannot render. Use **700** (what Can0nical has always shown).
- IDs always in DM Mono, e.g. `UPID: CAN-F8A3B9E2`.
- **Self-host the fonts** with `@fontsource/arvo`, `@fontsource/dm-sans` and
  `@fontsource/dm-mono`. Never load Google Fonts: it sends every visitor's IP to
  Google before consent.

Tailwind families from the preset: `font-wordmark`, `font-sans`, `font-mono`.

## 5. Wordmark

- `Can0nical` in Arvo 700, `letter-spacing: 0`, in the `accent` colour, with the
  zero in Amber:

  ```jsx
  <span className="font-wordmark font-bold text-accent">
    Can<span className="text-amber">0</span>nical
  </span>
  ```

- Clear space at least half the cap height on every side. Minimum width 80 px on
  screen, 20 mm in print. Never next to a competing typographic element.
- The zero alone is the brand glyph: favicon, app icon base, social avatar.
- **Never:** tracked or letter-spaced; the letter O; another typeface; another
  zero colour; another weight.
- The Canonized checkmark (✓) appears only on verified profiles, never as
  decoration.

## 6. Voice

- **Empowering and human** on app surfaces; **corporate and precise** on anything
  generated for a third party (CVs, certificates, records, exports).
- **No em dashes in anything a user reads** (Can0nical R17): UI, emails, PDFs,
  meta descriptions, alt text. Re-punctuate with a colon, comma, parentheses or a
  full stop. En dashes stay correct in numeric ranges (2026–2036). The em dash is
  the most reliable sign that copy was machine-drafted and never read back, and
  this brand's promise is that what it publishes was checked.

## 7. Using this package

```js
// tailwind.config.js
import brand from '@can0nical/brand/preset'
export default { presets: [brand], content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'] }
```

```css
/* your main stylesheet, before @tailwind base */
@import '@can0nical/brand/tokens.css';
```

`tokens.json` carries the same values for places without Tailwind (emails,
generated images). Don't define a second palette in a product: extend this one.
