 
/**
 * Dashboard.jsx — Hilo-Inspired Design System
 * Full dashboard page: navbar · KPI stats · energy chart · devices · alerts · live status
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import LiveSystemStatus from './LiveSystemStatus';
import DevicesPage from './DevicesPage';
import './Dashboard.css';

/* ── useStaggerReveal — IntersectionObserver for .auralis-reveal elements ── */
function useStaggerReveal(containerRef) {
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.auralis-reveal');
    if (!els || !els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [containerRef]);
}

/* ── useCountUp hook — animates a number from 0 to target ───────────────────── */
function useCountUp(target, duration = 900) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const numTarget = parseFloat(target);
    if (isNaN(numTarget)) { setDisplay(target); return; }
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numTarget * eased;
      setDisplay(Number.isInteger(numTarget) ? Math.round(current) : current.toFixed(1));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

/* ── AnimatedStatValue — wraps a stat value with count-up ───────────────────── */
function AnimatedStatValue({ value, unit, color }) {
  const animated = useCountUp(parseFloat(value) || 0, 1000);
  const isFloat  = String(value).includes('.');
  const prefix   = String(value).startsWith('$') ? '$' : '';
  const shown    = prefix + (isFloat ? parseFloat(animated).toFixed(1) : animated);

  return (
    <div className={`stat-value ${color}`} style={{ animation: 'countUp 600ms cubic-bezier(0.4,0,0.2,1) both' }}>
      {shown}
      {unit && <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 2 }}>{unit}</span>}
    </div>
  );
}

/* ── Inline SVG icons ────────────────────────────────────────────────────────── */
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ZapIcon    = () => <Icon size={16} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;
const HomeIcon   = () => <Icon size={16} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
const TrendIcon  = () => <Icon size={16} d="M23 6l-9.5 9.5-5-5L1 18" />;
const BellIcon   = () => <Icon size={16} d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />;
const PlusIcon   = () => <Icon size={14} d="M12 5v14M5 12h14" />;
const DownloadIcon = () => <Icon size={14} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />;
const ThermIcon  = () => <Icon size={14} d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />;
const LightIcon  = () => <Icon size={14} d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />;
const AcIcon     = () => <Icon size={14} d="M8 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3M8 19l4 3 4-3" />;
const WashIcon   = () => <Icon size={14} d="M3 3h18v18H3zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;

/* ── Static data ─────────────────────────────────────────────────────────────── */
const STATS = [
  { label: 'Energy Saved',   value: '18.4',  unit: 'kWh', color: 'primary', icon: <ZapIcon />,   badge: '+12%', dir: 'up' },
  { label: 'Active Devices', value: '9',     unit: '',    color: 'blue',    icon: <HomeIcon />,  badge: 'stable', dir: 'flat' },
  { label: 'Monthly Savings',value: '$34',   unit: '',    color: 'success', icon: <TrendIcon />, badge: '+8%',  dir: 'up' },
  { label: 'Alerts',         value: '2',     unit: '',    color: 'white',   icon: <BellIcon />,  badge: '-1',   dir: 'down' },
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const USAGE = [62, 45, 78, 55, 90, 40, 68]; // % of max

const DEVICES = [
  { id: 1, name: 'Living Room Thermostat', room: 'Living Room', icon: <ThermIcon />, on: true },
  { id: 2, name: 'Kitchen Lights',         room: 'Kitchen',     icon: <LightIcon />, on: true },
  { id: 3, name: 'Bedroom AC',             room: 'Bedroom',     icon: <AcIcon />,    on: false },
  { id: 4, name: 'Washing Machine',        room: 'Laundry',     icon: <WashIcon />,  on: false },
];

const ALERTS = [
  { type: 'warning', text: 'Peak hours starting at 5 PM — consider shifting heavy loads.', time: '4:45 PM' },
  { type: 'success', text: 'Energy goal met! You saved 18.4 kWh this week.',               time: '2:10 PM' },
  { type: 'info',    text: 'Bedroom AC scheduled to turn off at 11 PM.',                   time: '1:30 PM' },
  { type: 'error',   text: 'Unusual spike detected on circuit 3. Check devices.',           time: '9:05 AM' },
];

const NAV = ['Overview', 'Devices', 'Analytics', 'Automations'];

/* ── Toggle component ────────────────────────────────────────────────────────── */
function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-track" />
      <span className="toggle-thumb" />
    </label>
  );
}

/* ── Bar chart ───────────────────────────────────────────────────────────────── */
function BarChart({ data, labels, activeIdx, onSelect }) {
  const max = Math.max(...data);
  return (
    <div className="bar-chart">
      {data.map((v, i) => (
        <div className="bar-col" key={labels[i]}>
          <div
            className={`bar-fill${i === activeIdx ? ' active' : ''}`}
            style={{ height: `${(v / max) * 100}%` }}
            onClick={() => onSelect(i)}
            title={`${labels[i]}: ${v}%`}
          />
          <span className="bar-label">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Theme toggle icon ───────────────────────────────────────────────────────── */
function ThemeToggle({ light, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={light ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{
        width: 32, height: 32, borderRadius: '50%', border: 'none',
        background: light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
        color: light ? '#1A1A1A' : '#FFFFFF',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 16,
        transition: 'background 150ms ease, transform 300ms ease',
        flexShrink: 0,
      }}
    >
      {light ? '🌙' : '☀️'}
    </button>
  );
}

/* ── Auralis Waveform — 12 animated bars ────────────────────────────────────── */
function AuralisWaveform({ status = 'online' }) {
  return (
    <div className={`auralis-waveform${status !== 'online' ? ` ${status}` : ''}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="auralis-wave-bar" />
      ))}
    </div>
  );
}

/* ── Auralis Orb Field — ambient floating blobs ──────────────────────────────── */
function AuralisOrbs() {
  return (
    <div className="auralis-orb-field" aria-hidden="true">
      <div className="auralis-orb auralis-orb-1" />
      <div className="auralis-orb auralis-orb-2" />
      <div className="auralis-orb auralis-orb-3" />
    </div>
  );
}

/* ── Dashboard component ─────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [activeNav, setActiveNav]     = useState('Overview');
  const [devices, setDevices]         = useState(DEVICES);
  const [activeBar, setActiveBar]     = useState(4); // Friday highlighted
  const [isDark, setIsDark]           = useState(false); // light by default (matches Hilo site)

  const bodyRef = useRef(null);
  useStaggerReveal(bodyRef);

  const toggleDevice = (id) =>
    setDevices(prev => prev.map(d => d.id === id ? { ...d, on: !d.on } : d));

  const activeDevices = devices.filter(d => d.on).length;

  return (
    <div className={`dashboard${isDark ? ' theme-dark' : ''}`}>

      {/* ── Auralis ambient orbs (fixed, behind everything) ── */}
      <AuralisOrbs />

      {/* ── Navbar ── */}
      <nav className="dash-navbar">
        <div className="dash-logo">
          <span className="dash-logo-dot" />
          Hilo
        </div>

        <div className="dash-nav-links">
          {NAV.map(n => (
            <span
              key={n}
              className={`dash-nav-link${activeNav === n ? ' active' : ''}`}
              onClick={() => setActiveNav(n)}
            >
              {n}
            </span>
          ))}
        </div>

        <div className="dash-nav-right">
          <ThemeToggle light={!isDark} onToggle={() => setIsDark(v => !v)} />
          <button className="btn-ghost"><BellIcon /> Alerts</button>
          <div className="dash-avatar">JD</div>
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="dash-body" ref={bodyRef}>

        {/* ── DEVICES PAGE ── */}
        {activeNav === 'Devices' ? (
          <>
            <div className="dash-page-header auralis-reveal">
              <div>
                <h1 className="dash-page-title">Devices</h1>
                <p className="dash-page-subtitle">Manage and monitor all your smart home devices.</p>
              </div>
            </div>
            <DevicesPage />
          </>
        ) : (
          <>
            {/* ── OVERVIEW PAGE ── */}
            {/* Page header — shimmer title + waveform */}
            <div className="dash-page-header auralis-hero-glow auralis-reveal">
              <div>
                <h1 className="dash-page-title">
                  <span className="auralis-shimmer-text">Energy Dashboard</span>
                </h1>
                <p className="dash-page-subtitle" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  Good afternoon, Jane — here's your home overview.
                  <AuralisWaveform status="online" />
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-ghost"><DownloadIcon /> Export</button>
                <button className="btn-primary" onClick={() => setActiveNav('Devices')}><PlusIcon /> Add Device</button>
              </div>
            </div>

            {/* KPI stats — each card is a stagger reveal */}
            <div className="stat-grid">
              {STATS.map(s => (
                <div className="stat-card auralis-reveal" key={s.label}>
                  <div className="stat-icon-row">
                    <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                    <span className={`stat-badge ${s.dir}`}>{s.badge}</span>
                  </div>
                  <div className={`stat-value ${s.color}`}>{s.value}<span style={{ fontSize: 14, fontWeight: 500, marginLeft: 2 }}>{s.unit}</span></div>
                  <div className="stat-sub">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Energy chart + Devices — stagger reveal */}
            <div className="dash-two-col">
              <div className="dash-card auralis-reveal">
                <p className="card-label">Weekly Energy Usage</p>
                <p className="card-title">Usage by Day</p>
                <BarChart data={USAGE} labels={DAYS} activeIdx={activeBar} onSelect={setActiveBar} />
                <p style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 12 }}>
                  Click a bar to highlight · Values shown as % of peak
                </p>
              </div>
              <div className="dash-card auralis-reveal">
                <p className="card-label">Smart Devices</p>
                <p className="card-title">{activeDevices} of {devices.length} Active</p>
                <div className="device-list">
                  {devices.map(d => (
                    <div className="device-row" key={d.id}>
                      <div className="device-left">
                        <div className="device-icon">{d.icon}</div>
                        <div>
                          <div className="device-name">{d.name}</div>
                          <div className="device-room">{d.room}</div>
                        </div>
                      </div>
                      <Toggle checked={d.on} onChange={() => toggleDevice(d.id)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts + Live Status — stagger reveal */}
            <div className="dash-two-col">
              <div className="dash-card auralis-reveal">
                <p className="card-label">Notifications</p>
                <p className="card-title">Recent Alerts</p>
                <div className="alert-list">
                  {ALERTS.map((a, i) => (
                    <div className={`alert-row ${a.type}`} key={i}>
                      <span className="alert-text">{a.text}</span>
                      <span className="alert-time">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="dash-card auralis-reveal auralis-card-border" style={{ padding: 0, background: 'transparent', border: 'none' }}>
                <div className="dash-status-embed"><LiveSystemStatus /></div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
