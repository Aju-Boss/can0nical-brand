// Can0nical brand: Electric Verdant. Tailwind v3 preset.
// Values mirror BRAND.md; tokens.css must be loaded for the semantic tokens.
// test/consistency.test.js fails if this file, tokens.css and tokens.json drift.

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Fixed brand colours, identical in both themes.
        lime: '#6EE034', // Electric Lime: the trust signal
        void: '#0D1A10', // Deep Void: dark canvas, text on lime buttons
        forest: '#1A5C2E', // Forest Anchor: structure in both themes
        amber: '#F5C038', // Amber Zero: the wordmark zero, protected
        mint: '#F2FDE9', // Mint Surface: light canvas

        // Semantic theme tokens, resolved from the CSS variables in tokens.css
        // and flipped by [data-theme]. Opacity modifiers work through
        // the `/ <alpha-value>` channel syntax.
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        content: 'rgb(var(--content-rgb) / <alpha-value>)',
        line: 'rgb(var(--line-rgb) / <alpha-value>)',
        // Foreground accent: lime in dark, forest in light. Button fills use `lime`.
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
      },
      fontFamily: {
        wordmark: ['Arvo', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
}
