/**
 * Design Tokens — Hilo-Inspired Design System
 * Source: DESIGN.md  (animations section is extensible — added below)
 */

// ─── Color Tokens ────────────────────────────────────────────────────────────
export const colors = {
  primary: '#C6F200',
  surfaceDark: '#121212',
  surfaceLight: '#FFFFFF',
  surfaceElevated: '#1E1E1E',
  textDark: '#121212',
  textLight: '#FFFFFF',
  accentBlue: '#007AFF',
  success: '#28C76F',
  error: '#EA5455',
  border: 'rgba(255,255,255,0.1)',
  textMuted: 'rgba(255,255,255,0.45)',
};

// ─── Shape / Border-Radius Tokens ────────────────────────────────────────────
export const radii = {
  sm: '4px',
  md: '12px',   // default card radius
  lg: '24px',
};

// ─── Spacing Tokens (8-pt grid) ───────────────────────────────────────────────
export const spacing = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

// ─── Typography Tokens ────────────────────────────────────────────────────────
export const typography = {
  fontFamily: "'Inter', system-ui, sans-serif",
  weights: {
    regular: 400,
    label: 500,
    heading: 700,
  },
};

// ─── Animation Tokens ─────────────────────────────────────────────────────────
// Canonical extensible spec (DESIGN.md — animations section):
//
//   animations:
//     durations:
//       fast:   150ms
//       smooth: 300ms
//       lazy:   600ms
//     easings:
//       snappy:  "cubic-bezier(0.2, 0, 0, 1)"
//       organic: "cubic-bezier(0.4, 0, 0.2, 1)"
//
export const animation = {
  durations: {
    fast:   '150ms',   // micro-interactions (button press, dot state change)
    smooth: '300ms',   // hover scale, badge transitions
    lazy:   '600ms',   // card entrance, pulse cycle base
  },
  easings: {
    snappy:  'cubic-bezier(0.2, 0, 0, 1)',    // decisive, no overshoot
    organic: 'cubic-bezier(0.4, 0, 0.2, 1)',  // natural, material-like
  },

  // ── Derived / composed values (built from the canonical tokens above) ──────
  // Entrance: lazy duration + organic easing → smooth slide-up on mount
  get entranceDuration() { return this.durations.lazy; },
  get entranceEasing()   { return this.easings.organic; },
  entranceDelay: '30ms',

  // Hover scale: smooth duration + snappy easing → crisp lift
  get hoverDuration() { return this.durations.smooth; },
  get hoverEasing()   { return this.easings.snappy; },
  hoverScale: 'scale(1.025)',

  // Pulse glow: 2× lazy = 1200ms cycle, organic easing → breathing feel
  get pulseDuration() {
    // 2 × lazy (600ms) = 1200ms — a calm, readable heartbeat
    return `${parseInt(this.durations.lazy) * 2}ms`;
  },
  get pulseEasing() { return this.easings.organic; },

  // Fast interactions (button active, service-row hover bg)
  get fastDuration() { return this.durations.fast; },
  get fastEasing()   { return this.easings.snappy; },
};
