---
name: design-system-studio375
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Studio375

## Mission
Deliver implementation-ready design-system guidance for Studio375 that can be applied consistently across dashboard web app interfaces.

## Brand
- Product/brand: Studio375
- URL: https://375.studio/en
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=neue`, `font.family.stack=neue, neue Fallback`, `font.size.base=16px`, `font.weight.base=500`, `font.lineHeight.base=18.4px`
- Typography scale: `font.size.xs=13px`, `font.size.sm=16px`, `font.size.md=20px`, `font.size.lg=20.48px`, `font.size.xl=24px`, `font.size.2xl=46.08px`, `font.size.3xl=60.16px`, `font.size.4xl=64px`
- Color palette: `color.text.primary=#ffffff`, `color.text.secondary=#808080`, `color.surface.base=#000000`
- Spacing scale: `space.1=4px`, `space.2=7px`, `space.3=10px`, `space.4=15px`, `space.5=18.05px`, `space.6=20px`, `space.7=20.48px`, `space.8=25px`
- Radius/shadow/motion tokens: `radius.xs=29px` | `motion.duration.instant=200ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
