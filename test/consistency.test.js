// The four brand files must never disagree. Run with `npm test`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import preset from '../tailwind-preset.js'

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8')
const tokens = JSON.parse(read('tokens.json'))
const css = read('tokens.css')
const brand = read('BRAND.md')
const colors = preset.theme.extend.colors

const toChannels = (hex) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ')

// The CSS block for one theme, keyed by its selector.
const block = (selector) => {
  const start = css.indexOf(selector)
  assert.ok(start >= 0, `tokens.css has no ${selector} block`)
  return css.slice(start, css.indexOf('}', start))
}
const cssVar = (body, name) => body.match(new RegExp(`--${name}-rgb:\\s*([0-9 ]+);`))?.[1].trim()

test('preset palette equals tokens.json palette', () => {
  for (const [key, { hex }] of Object.entries(tokens.palette)) {
    assert.equal(colors[key], hex, `preset ${key}`)
  }
})

test('tokens.css matches tokens.json themes', () => {
  const blocks = { dark: block(":root[data-theme='dark']"), light: block(":root[data-theme='light']") }
  for (const [theme, values] of Object.entries(tokens.themes)) {
    for (const [name, hex] of Object.entries(values)) {
      assert.equal(cssVar(blocks[theme], name), toChannels(hex), `${theme} --${name}-rgb`)
    }
  }
})

test('every semantic token in the preset has a CSS variable', () => {
  for (const name of Object.keys(tokens.themes.dark)) {
    assert.equal(colors[name], `rgb(var(--${name}-rgb) / <alpha-value>)`, `preset ${name}`)
  }
})

test('BRAND.md states every palette and theme value', () => {
  const hexes = new Set([
    ...Object.values(tokens.palette).map((p) => p.hex),
    ...Object.values(tokens.themes).flatMap(Object.values),
  ])
  for (const hex of hexes) assert.ok(brand.includes(hex), `BRAND.md is missing ${hex}`)
})

test('the zero is a numeral and amber', () => {
  assert.equal(colors.amber, '#F5C038')
  assert.ok(!/Canonical/.test(brand), 'BRAND.md spells the name with a letter O')
})

test('no em dashes in BRAND.md (R17)', () => {
  assert.ok(!brand.includes('—'), 'BRAND.md contains an em dash')
})
