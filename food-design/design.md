# Design System Inspired by Studio375

> Auto-extracted from `https://375.studio/en` on 2026-05-04

## 1. Visual Theme & Atmosphere

Friendly, approachable design with rounded shapes and generous whitespace.

The hero section leads with "We are Studio375, communications, graphic design, and web agency based in Vicenza.".

**Key Characteristics:**
- hatton as the heading font (custom web font loaded via @font-face)
- neue as the body font for all running text
- Heading weight 200
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#11baff` used for CTAs and brand highlights
- Rounded corners (20px+) creating a friendly, approachable feel
- Tags: light, rounded, accented, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#11baff`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#cc0597`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#ffffff`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#cc0597`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#ffffff`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#666666`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#e5e5e5`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#000000` | `--palette-1` | section | large | text-light |
| 2 | `#cc0597` | `--palette-2` | badge | large | text-light |
| 3 | `#11baff` | `--palette-3` | section | large | text-dark |

## 3. Typography Rules

- **Heading Font:** `hatton` (web font)
- **Body Font:** `neue` (web font)

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | hatton | 46.08px | 200 | 46.08px | normal |
| H2 | hatton | 64px | 200 | 62.08px | normal |
| H3 | hatton | 66.56px | 200 | 66.56px | normal |
| Body | neue | 13px | 500 | 20px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `100px` | headings |
| H1 | `84.48px` | headings |
| H2 | `70px` | headings |
| H3 | `66.56px` | headings |
| H4 | `64px` | headings |
| Body L | `60.16px` | body / supporting text |
| Body | `46.08px` | body / supporting text |
| Small | `24px` | body / supporting text |
| XS | `20.48px` | body / supporting text |
| Caption | `20px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: transparent;
  color: #ffffff;
  border-radius: 29px;
  padding: 4px 7px;
  font-size: 20px;
  font-weight: 400;
  border: 2px solid rgb(255, 255, 255);
  cursor: pointer;
}
```

### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #ffffff;
  border-radius: 0px;
  padding: 0px 0px;
  font-size: 60.16px;
  font-weight: 200;
  border: none;
  cursor: pointer;
}
```

## 5. Layout Principles

- **Base spacing unit:** `4px` — use multiples (8px, 12px, 16px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `4px` | element |
| spacing-2 | `50px` | card |
| spacing-3 | `5px` | element |
| spacing-4 | `6px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-card | `20px` | card |
| radius-card | `29px` | card |
| radius-card | `24px` | card |
| radius-card | `26px` | card |
| radius-subtle | `2px` | subtle |
| radius-card | `50px` | card |

## 6. Depth & Elevation

No prominent box-shadows detected. This design likely uses flat surfaces with borders or background color changes for depth.

## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `hatton` for all headings and `neue` for body text
- Use `#11baff` as the single dominant accent/CTA color
- Maintain `4px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`20px`+) consistently for all interactive elements
- Use weight 200 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute hatton/neue with generic alternatives
- Don't use irregular spacing — stick to 4px grid
- Don't use dark/black backgrounds — this is a light-themed design
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use pure black (#000000) for text — use `#ffffff` instead
- Don't add decorative elements not present in the original design — no badges, ribbons, banners, or ornaments unless the source site uses them
- Don't invent UI patterns the source site doesn't have — if the original has no NEW badge, don't add one just because a red is in the palette

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Touch targets: minimum 44×44px on mobile
- Maintain 4px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #ffffff
Accent:      #11baff
Secondary:   #cc0597
Border:      #e5e5e5
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `hatton` heading in `#ffffff`, and a `#11baff` CTA button."
2. "Create a pricing card using background `#cc0597`, border `#e5e5e5`, `neue` for text, and 12px padding."
3. "Design a navigation bar — `#ffffff` background, `#ffffff` links, `#11baff` for active state."
4. "Build a feature grid with 3 columns, 12px gap, each card using the card component style."
5. "Create a footer with `#ffffff` background, `#ffffff` text, and 8px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Check responsive behavior — test mobile and tablet layouts
7. Final pass — verify all colors match, spacing is consistent, fonts are correct
