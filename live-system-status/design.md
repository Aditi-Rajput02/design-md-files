# Hilo Design System
## Based on: hilo.com/en-gb/pages/how-it-works

## Overview
Hilo is a **smart home energy management platform** by Hydro-Québec. The "How It Works" page communicates the product through a **clean, light-mode marketing site** — confident, minimal, and benefit-driven.

The visual language is:
- **Light and airy** — white and off-white backgrounds dominate
- **Accent-forward** — the lime-green `#C6F200` is used sparingly but boldly
- **Step-driven storytelling** — numbered sections walk users through the journey
- **Photography + UI hybrid** — real device photos sit alongside app UI mockups

---

## 🎯 Design Principles (from the actual page)

### 1. Show the Journey, Not Just the Product
- The page is structured as a numbered step flow: Install → Connect → Save
- Each step has a headline, short copy, and a visual (photo or mockup)
- Users understand the full experience before committing

### 2. Benefit-First Language
- Headlines lead with outcomes: "Save money", "Stay comfortable", "It's automatic"
- No technical jargon on the marketing surface
- Numbers and savings figures are highlighted prominently

### 3. Trust Through Simplicity
- Hydro-Québec branding provides institutional trust
- Clean white space signals reliability, not startup chaos
- Testimonials and partner logos reinforce credibility

### 4. Calm, Not Flashy
- The lime accent is used for CTAs and key highlights only
- No gradients, no heavy shadows, no decorative noise
- Photography is warm and domestic (real homes, real people)

---

## 🎨 Color System

### Core Palette (actual Hilo site)
| Token | Value | Usage |
|------|------|------|
| `primary` | `#C6F200` | CTA buttons, active states, key highlights |
| `primary-dark` | `#A8CC00` | Hover state for primary |
| `surface-white` | `#FFFFFF` | Page background, cards |
| `surface-off-white` | `#F5F5F0` | Alternating section backgrounds |
| `surface-dark` | `#1A1A1A` | Footer, dark hero sections |
| `text-primary` | `#1A1A1A` | Main body and heading text |
| `text-secondary` | `#5C5C5C` | Subtext, captions, labels |
| `text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `border-subtle` | `rgba(0,0,0,0.08)` | Card borders, dividers |
| `success` | `#28C76F` | Savings confirmed, positive states |
| `error` | `#EA5455` | Alerts, warnings |

### Usage Rules
- **White** is the default surface — the page breathes
- **`#C6F200`** appears only on CTAs, step numbers, and key stat callouts
- **Dark sections** (`#1A1A1A`) are used for the footer and occasional hero contrast
- Never use `#C6F200` as a background for large areas — it's an accent, not a fill

---

## ☀️ Light Mode & 🌙 Dark Mode — Both Supported

Hilo supports **both light and dark themes**. The marketing site ("How It Works") defaults to light; the app dashboard defaults to dark. A theme toggle lets users switch at any time.

### ☀️ Light Mode Token Values
| Token | Light Value |
|------|------|
| `--bg` | `#FFFFFF` |
| `--bg-alt` | `#F5F5F0` |
| `--surface` | `#FFFFFF` |
| `--surface-elevated` | `#F0F0EB` |
| `--text` | `#1A1A1A` |
| `--text-muted` | `#5C5C5C` |
| `--border` | `rgba(0,0,0,0.08)` |
| `--border-hover` | `rgba(0,0,0,0.18)` |
| `--shadow` | `0 2px 12px rgba(0,0,0,0.06)` |

### 🌙 Dark Mode Token Values
| Token | Dark Value |
|------|------|
| `--bg` | `#121212` |
| `--bg-alt` | `#181818` |
| `--surface` | `#1E1E1E` |
| `--surface-elevated` | `#252525` |
| `--text` | `#FFFFFF` |
| `--text-muted` | `rgba(255,255,255,0.45)` |
| `--border` | `rgba(255,255,255,0.1)` |
| `--border-hover` | `rgba(255,255,255,0.2)` |
| `--shadow` | `0 2px 12px rgba(0,0,0,0.4)` |

### Shared Tokens (same in both modes)
| Token | Value |
|------|------|
| `--primary` | `#C6F200` |
| `--primary-dark` | `#A8CC00` |
| `--primary-text` | `#1A1A1A` |
| `--success` | `#28C76F` |
| `--error` | `#EA5455` |
| `--blue` | `#007AFF` |

### Theme Toggle Rules
- Toggle is a sun/moon icon button in the navbar (top-right)
- Switching theme uses a CSS class on `<html>` or `<body>`: `class="theme-light"` / `class="theme-dark"`
- Transition: `background 300ms organic, color 300ms organic` — smooth, not jarring
- Persist preference in `localStorage`
- Respect `prefers-color-scheme` as the initial default

> **Primary `#C6F200` and all semantic colors are identical in both modes** — only surfaces, text, borders, and shadows change.

---

## 🔤 Typography

### Font Stack
- **Headings:** `"GT Walsheim", "Helvetica Neue", Arial, sans-serif` — rounded, friendly, confident
- **Body:** `"Inter", system-ui, sans-serif` — clean and readable
- Fallback: `system-ui, sans-serif`

### Scale (from the How It Works page)
| Role | Size | Weight | Usage |
|------|------|------|------|
| Hero Heading | 48–56px | 700 | Page title, section hero |
| Section Heading | 32–40px | 700 | Step titles, feature names |
| Sub-heading | 20–24px | 600 | Card titles, callout labels |
| Body | 16–18px | 400 | Paragraph copy |
| Caption / Label | 12–14px | 500 | Tags, step numbers, fine print |

### Guidelines
- Headings use tight letter-spacing (`-0.02em` to `-0.04em`)
- Body copy is generous line-height (`1.6–1.75`)
- Step numbers are displayed large (`64–80px`) in `#C6F200`
- Avoid ALL CAPS except for short labels/tags

---

## 📐 Layout System

### Page Structure (How It Works page pattern)
The page is divided into **full-width alternating sections**:

```
[Navbar — sticky, white, logo left / nav right]
[Hero — white bg, large headline, subtext, CTA]
[Step 1 — white bg, text left / image right]
[Step 2 — off-white bg, image left / text right]
[Step 3 — white bg, text left / image right]
[Stats Banner — dark bg (#1A1A1A), 3-col numbers]
[Features Grid — off-white bg, 3-col icon cards]
[Testimonials — white bg]
[CTA Section — lime bg (#C6F200), dark text]
[Footer — dark bg (#1A1A1A)]
```

### Grid
- Base unit: **8px**
- Column scale: `8 / 16 / 24 / 32 / 48 / 64 / 96`
- Page columns: **12-column grid**, max-width **1200px**, gutters **24px**
- Section padding: `80px 0` (desktop), `48px 0` (mobile)

### Step Layout (alternating)
- Two-column: `1fr 1fr` on desktop, stacked on mobile (`< 768px`)
- Text column: heading + 2–3 lines of copy + optional CTA link
- Visual column: device photo or phone mockup (rounded corners, subtle shadow)
- Step number: large `#C6F200` numeral floated above the heading

### Container
- Max width: **1200px**, centered, `padding: 0 24px`

---

## 🔲 Shapes & Elevation

| Token | Value | Usage |
|------|------|------|
| `rounded-sm` | `8px` | Tags, badges, small chips |
| `rounded-md` | `16px` | Cards, input fields, buttons |
| `rounded-lg` | `24px` | Feature cards, image frames |
| `rounded-xl` | `32px` | Phone mockup frames, hero images |
| `rounded-full` | `9999px` | Pills, avatar circles |

### Shadow Scale
| Token | Value | Usage |
|------|------|------|
| `shadow-sm` | `0 1px 4px rgba(0,0,0,0.06)` | Subtle card lift |
| `shadow-md` | `0 4px 16px rgba(0,0,0,0.08)` | Floating cards, modals |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.12)` | Device mockups, hero images |

---

## 🧩 Components (from the How It Works page)

### Navbar
- Background: `#FFFFFF`, `border-bottom: 1px solid rgba(0,0,0,0.08)`
- Logo: left-aligned, Hilo wordmark
- Nav links: center or right, `#5C5C5C`, hover → `#1A1A1A`
- CTA button: right-aligned, primary style
- Sticky on scroll with subtle shadow

### Primary CTA Button
- Background: `#C6F200`
- Text: `#1A1A1A`, weight 700
- Radius: `16px`
- Padding: `14px 28px`
- Hover: background → `#A8CC00`, slight scale `1.02`
- No border, no shadow

### Secondary / Ghost Button
- Background: transparent
- Border: `1.5px solid #1A1A1A`
- Text: `#1A1A1A`, weight 600
- Radius: `16px`
- Hover: background → `rgba(0,0,0,0.05)`

### Step Number Badge
- Value: `01`, `02`, `03` etc.
- Font size: `72px`, weight 800
- Color: `#C6F200`
- Positioned above the step heading
- Acts as a visual anchor, not a functional element

### Feature Icon Card
- Background: `#FFFFFF`
- Border: `1px solid rgba(0,0,0,0.08)`
- Radius: `24px`
- Padding: `32px`
- Icon: 40×40px, lime-tinted background circle
- Title: 18px, weight 700
- Body: 14–16px, `#5C5C5C`
- Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.08)`, `translateY(-2px)`

### Stats Banner (dark section)
- Background: `#1A1A1A`
- 3-column layout
- Stat value: `48px`, weight 800, color `#C6F200`
- Stat label: `14px`, weight 500, color `rgba(255,255,255,0.6)`
- Dividers: `1px solid rgba(255,255,255,0.1)` between columns

### Device / App Mockup Frame
- Radius: `32px`
- Shadow: `shadow-lg`
- Background: `#1A1A1A` (phone shell)
- Inner screen: dark UI (Hilo app in dark mode)
- Slight rotation (`rotate(-2deg)` or `rotate(3deg)`) for visual interest

---

## 🪜 Page Flow — "How It Works" Steps

### Step 1 — Install
> "We install smart thermostats and devices in your home."
- Visual: technician/device photo
- Key message: professional installation, no DIY required
- Supporting copy: compatible devices list

### Step 2 — Connect
> "Your devices connect to the Hilo app."
- Visual: phone mockup showing the app dashboard
- Key message: one app controls everything
- Supporting copy: iOS + Android, real-time control

### Step 3 — Earn Rewards
> "Participate in challenges and earn bill credits."
- Visual: app screen showing rewards/savings
- Key message: passive savings, no effort needed
- Supporting copy: Hydro-Québec partnership, guaranteed savings

---

## ⚡ Animation Tokens (extensible spec)

```yaml
animations:
  durations:
    fast:   150ms   # micro-interactions, hover states
    smooth: 300ms   # page transitions, card hovers
    lazy:   600ms   # entrance animations, step reveals
  easings:
    snappy:  "cubic-bezier(0.2, 0, 0, 1)"    # decisive, no overshoot
    organic: "cubic-bezier(0.4, 0, 0.2, 1)"  # natural, material-like
```

### Applied Animations
| Element | Animation | Token used |
|------|------|------|
| Step sections | Fade-in + slide-up on scroll | `lazy` + `organic` |
| CTA button hover | Scale `1.02` | `fast` + `snappy` |
| Feature card hover | `translateY(-2px)` + shadow | `smooth` + `organic` |
| Step number | Count-up on enter viewport | `lazy` + `organic` |
| Navbar on scroll | Shadow fade-in | `fast` + `snappy` |

---

## 📊 Data & Stats Presentation

Hilo uses **bold numbers** to communicate value instantly:

| Stat | Display style |
|------|------|
| Average savings | Large `#C6F200` number, e.g. **"$160/year"** |
| Devices supported | Plain white number on dark bg |
| Challenge participation | Percentage with upward trend icon |

### Rules
- Max 3 stats in a banner — don't dilute impact
- Always pair a number with a short label (≤ 5 words)
- Use `#C6F200` for the most important number only

---

## ✅ Do's and ❌ Don'ts (updated from actual site)

### Do
- Lead with benefits, not features
- Use large white space between sections
- Show the product in real-home context (photography)
- Use `#C6F200` only for the single most important element per section
- Keep CTAs to one per section
- Use alternating section backgrounds to create rhythm

### Don't
- Use `#C6F200` as a large background fill (it's an accent)
- Stack more than 3 feature cards in a row on desktop
- Use more than 2 font weights per section
- Add decorative gradients or complex illustrations
- Use shadows heavier than `shadow-md` on marketing surfaces

---

## 💡 Accessibility

- Contrast: `#1A1A1A` on `#FFFFFF` = 16.1:1 ✅
- Contrast: `#1A1A1A` on `#C6F200` = 9.7:1 ✅
- Contrast: `#FFFFFF` on `#1A1A1A` = 16.1:1 ✅
- All interactive elements have visible focus rings
- Step numbers are decorative — real headings carry semantic meaning (`h2`, `h3`)
- Images have descriptive `alt` text
- Animations respect `prefers-reduced-motion`

---

## 🧠 Final Design Tone

The Hilo "How It Works" page feels like:
- A **trusted utility company** that has gone digital-first
- **Approachable and domestic** — this is for homeowners, not engineers
- **Quietly confident** — the product speaks through clarity, not hype

> "Smart energy. Simple life."
