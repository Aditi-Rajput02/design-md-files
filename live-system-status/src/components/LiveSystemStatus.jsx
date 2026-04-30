/**
 * LiveSystemStatus.jsx
 * Hilo-Inspired Design System — Live System Status Card
 *
 * Animation tokens used:
 *  • Entrance  → cardEntrance keyframe (fade + slide-up, spring easing)
 *  • Hover     → scale(1.025) with overshoot cubic-bezier
 *  • Pulse     → pulseGlow + dotBreath keyframes on the Online indicator dot
 */

import { useState, useCallback } from 'react';
import { animation } from '../tokens/designTokens';
import './LiveSystemStatus.css';

// ─── Icons (inline SVG — no extra deps) ──────────────────────────────────────
const ServerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

// ─── Static data ──────────────────────────────────────────────────────────────
const INITIAL_SERVICES = [
  { id: 1, name: 'Energy API',       status: 'online',   latency: '18 ms' },
  { id: 2, name: 'Device Gateway',   status: 'online',   latency: '34 ms' },
  { id: 3, name: 'Analytics Engine', status: 'degraded', latency: '210 ms' },
  { id: 4, name: 'Notification Hub', status: 'online',   latency: '22 ms' },
];

const METRICS = [
  { label: 'Uptime',      value: '99.97%', colorClass: 'primary', delta: '+0.02%', dir: 'up' },
  { label: 'Avg Latency', value: '28 ms',  colorClass: 'blue',    delta: '-4 ms',  dir: 'up' },
  { label: 'Energy Saved',value: '1.4 kWh',colorClass: 'success', delta: '+0.3',   dir: 'up' },
  { label: 'Active Nodes',value: '12',     colorClass: 'muted',   delta: 'stable', dir: null },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getOverallStatus(services) {
  if (services.every(s => s.status === 'online')) return 'online';
  if (services.some(s => s.status === 'offline'))  return 'offline';
  return 'degraded';
}

function statusLabel(status) {
  return { online: 'All Systems Online', offline: 'System Offline', degraded: 'Degraded Performance' }[status];
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ─── Auralis Waveform — 12 animated bars (inline, no extra import needed) ────
function AuralisWaveform({ status = 'online' }) {
  return (
    <div className={`auralis-waveform${status !== 'online' ? ` ${status}` : ''}`}
      aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="auralis-wave-bar" />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LiveSystemStatus() {
  const [services, setServices]     = useState(INITIAL_SERVICES);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  // Re-mount trick: changing key re-triggers the entrance animation
  const [cardKey, setCardKey]       = useState(0);

  const overallStatus = getOverallStatus(services);

  const handleRefresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);

    // Simulate async fetch
    setTimeout(() => {
      // Randomly toggle analytics engine for demo
      setServices(prev =>
        prev.map(s =>
          s.id === 3
            ? { ...s, status: s.status === 'degraded' ? 'online' : 'degraded',
                latency: s.status === 'degraded' ? '31 ms' : '210 ms' }
            : s
        )
      );
      setLastUpdated(new Date());
      setRefreshing(false);
      // Re-trigger entrance animation on the card
      setCardKey(k => k + 1);
    }, 800);
  }, [refreshing]);

  return (
    <div
      key={cardKey}
      className="live-status-card"
      /**
       * Inline style bridges designTokens.js → LiveSystemStatus.css.
       *
       * Canonical animation token spec (DESIGN.md extensible section):
       *   durations: fast(150ms) | smooth(300ms) | lazy(600ms)
       *   easings:   snappy(cubic-bezier(0.2,0,0,1)) | organic(cubic-bezier(0.4,0,0.2,1))
       *
       * Composed values are derived from the primitives above:
       *   entrance  → lazy  + organic
       *   hover     → smooth + snappy
       *   pulse     → 2×lazy + organic
       *   fast-ui   → fast  + snappy
       */
      style={{
        /* ── Primitive duration tokens ── */
        '--duration-fast':   animation.durations.fast,
        '--duration-smooth': animation.durations.smooth,
        '--duration-lazy':   animation.durations.lazy,

        /* ── Primitive easing tokens ── */
        '--easing-snappy':  animation.easings.snappy,
        '--easing-organic': animation.easings.organic,

        /* ── Composed vars (CSS can also derive these via var() references) ── */
        '--entrance-duration': animation.entranceDuration,
        '--entrance-easing':   animation.entranceEasing,
        '--entrance-delay':    animation.entranceDelay,
        '--hover-scale':       animation.hoverScale,
        '--hover-duration':    animation.hoverDuration,
        '--hover-easing':      animation.hoverEasing,
        '--pulse-duration':    animation.pulseDuration,
        '--pulse-easing':      animation.pulseEasing,
        '--fast-duration':     animation.fastDuration,
        '--fast-easing':       animation.fastEasing,
      }}
    >
      {/* ── Header ── */}
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon">
            <ServerIcon />
          </div>
          <div>
            <p className="card-title">Live System Status</p>
            {/* Auralis waveform — reflects live system health */}
            <AuralisWaveform status={overallStatus} />
          </div>
        </div>

        {/* Status badge with pulse dot */}
        <div className={`status-badge ${overallStatus}`}>
          <span className={`pulse-dot ${overallStatus}`} aria-hidden="true" />
          {statusLabel(overallStatus)}
        </div>
      </div>

      <hr className="card-divider" />

      {/* ── Metrics Grid ── */}
      <div className="metrics-grid">
        {METRICS.map(m => (
          <div className="metric-item" key={m.label}>
            <span className="metric-label">{m.label}</span>
            <span className={`metric-value ${m.colorClass}`}>{m.value}</span>
            <span className={`metric-delta ${m.dir === 'up' ? 'up' : m.dir === 'down' ? 'down' : ''}`}>
              {m.dir === 'up'   && <ArrowUpIcon />}
              {m.dir === 'down' && <ArrowDownIcon />}
              {' '}{m.delta}
            </span>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      <p className="services-section-label">Services</p>
      <div className="services-list">
        {services.map(svc => (
          <div className="service-row" key={svc.id}>
            <span className="service-name">{svc.name}</span>
            <div className="service-right">
              <span className="service-latency">{svc.latency}</span>
              <span className={`service-dot ${svc.status}`} aria-label={svc.status} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="card-footer">
        <span className="last-updated">
          Updated {formatTime(lastUpdated)}
        </span>
        <button
          className={`refresh-btn${refreshing ? ' refreshing' : ''}`}
          onClick={handleRefresh}
          disabled={refreshing}
          aria-label="Refresh system status"
        >
          <RefreshIcon className="btn-icon" />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}
