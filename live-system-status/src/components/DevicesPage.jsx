import { useState, useMemo } from 'react';
import './DevicesPage.css';

/* ── SVG icon helper ─────────────────────────────────────────────────────────── */
const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const SearchIcon = () => <Ic size={14} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
const PlusIcon   = () => <Ic size={14} d="M12 5v14M5 12h14" />;

/* ── Device data ─────────────────────────────────────────────────────────────── */
const ALL_DEVICES = [
  { id:1,  name:'Living Room Thermostat', room:'Living Room', type:'Thermostat', icon:'🌡️', on:true,  status:'online', watts:12,  usage:38 },
  { id:2,  name:'Kitchen Lights',         room:'Kitchen',     type:'Lighting',   icon:'💡', on:true,  status:'online', watts:8,   usage:55 },
  { id:3,  name:'Bedroom AC',             room:'Bedroom',     type:'Climate',    icon:'❄️', on:false, status:'offline',watts:0,   usage:0  },
  { id:4,  name:'Washing Machine',        room:'Laundry',     type:'Appliance',  icon:'🫧', on:false, status:'offline',watts:0,   usage:0  },
  { id:5,  name:'Smart TV',              room:'Living Room', type:'Electronics',icon:'📺', on:true,  status:'online', watts:95,  usage:72 },
  { id:6,  name:'Garage Door',           room:'Garage',      type:'Security',   icon:'🚗', on:false, status:'alert',  watts:0,   usage:0  },
  { id:7,  name:'Outdoor Lights',        room:'Garden',      type:'Lighting',   icon:'🔦', on:true,  status:'online', watts:24,  usage:90 },
  { id:8,  name:'Water Heater',          room:'Basement',    type:'Appliance',  icon:'🚿', on:true,  status:'online', watts:180, usage:65 },
];

const FILTERS = ['All', 'Online', 'Offline', 'Lighting', 'Climate', 'Appliance', 'Security'];

/* ── DeviceCard ──────────────────────────────────────────────────────────────── */
function DeviceCard({ device, onToggle }) {
  const usageLevel = device.usage > 75 ? 'high' : device.usage > 40 ? 'medium' : 'low';

  return (
    <div className={`device-card${device.on ? ' is-on' : ''}`}>
      {/* Top: icon + toggle */}
      <div className="dc-top">
        <div className={`dc-icon-wrap ${device.on ? 'on' : 'off'}`}>
          {device.icon}
        </div>
        <label className="dc-toggle" onClick={e => e.stopPropagation()}>
          <input type="checkbox" checked={device.on} onChange={() => onToggle(device.id)} />
          <span className="dc-toggle-track" />
          <span className="dc-toggle-thumb" />
        </label>
      </div>

      {/* Name + room */}
      <div className="dc-info">
        <div className="dc-name">{device.name}</div>
        <div className="dc-room">{device.room} · {device.type}</div>
      </div>

      {/* Status + wattage */}
      <div className="dc-status-row">
        <span className={`dc-status-badge ${device.status}`}>
          <span className="dc-status-dot" />
          {device.status === 'online' ? 'Online' : device.status === 'alert' ? 'Alert' : 'Offline'}
        </span>
        <span className="dc-usage">
          {device.on ? <><span>{device.watts}W</span> now</> : '—'}
        </span>
      </div>

      {/* Usage bar */}
      {device.on && (
        <div className="dc-bar-wrap">
          <div className={`dc-bar-fill ${usageLevel}`} style={{ width: `${device.usage}%` }} />
        </div>
      )}
    </div>
  );
}

/* ── DevicesPage ─────────────────────────────────────────────────────────────── */
export default function DevicesPage() {
  const [devices, setDevices]   = useState(ALL_DEVICES);
  const [filter, setFilter]     = useState('All');
  const [search, setSearch]     = useState('');

  const toggle = (id) =>
    setDevices(prev => prev.map(d =>
      d.id === id ? { ...d, on: !d.on, status: !d.on ? 'online' : 'offline', watts: !d.on ? ALL_DEVICES.find(x=>x.id===id).watts : 0 } : d
    ));

  const filtered = useMemo(() => {
    return devices.filter(d => {
      const matchFilter =
        filter === 'All'     ? true :
        filter === 'Online'  ? d.status === 'online' :
        filter === 'Offline' ? d.status === 'offline' :
        d.type === filter;
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                          d.room.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [devices, filter, search]);

  const onlineCount  = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;
  const alertCount   = devices.filter(d => d.status === 'alert').length;
  const totalWatts   = devices.filter(d => d.on).reduce((s, d) => s + d.watts, 0);

  return (
    <div className="devices-page">

      {/* Toolbar */}
      <div className="devices-toolbar">
        <div className="devices-search">
          <span className="search-icon"><SearchIcon /></span>
          <input
            placeholder="Search devices or rooms…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-pills">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-pill${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >{f}</button>
          ))}
        </div>
        <button className="btn-primary" style={{ whiteSpace:'nowrap' }}>
          <PlusIcon /> Add Device
        </button>
      </div>

      {/* Summary chips */}
      <div className="devices-summary">
        <div className="summary-chip">
          <span className="summary-dot online" />
          <div>
            <div className="summary-count">{onlineCount}</div>
            <div className="summary-label">Online</div>
          </div>
        </div>
        <div className="summary-chip">
          <span className="summary-dot offline" />
          <div>
            <div className="summary-count">{offlineCount}</div>
            <div className="summary-label">Offline</div>
          </div>
        </div>
        <div className="summary-chip">
          <span className="summary-dot alert" />
          <div>
            <div className="summary-count">{alertCount}</div>
            <div className="summary-label">Alerts</div>
          </div>
        </div>
        <div className="summary-chip">
          <span className="summary-dot saving" />
          <div>
            <div className="summary-count">{totalWatts}W</div>
            <div className="summary-label">Live Usage</div>
          </div>
        </div>
      </div>

      {/* Device grid */}
      <div className="devices-grid">
        {filtered.length === 0 ? (
          <div className="devices-empty">
            <div className="devices-empty-icon">🔍</div>
            No devices match your search or filter.
          </div>
        ) : (
          filtered.map(d => (
            <DeviceCard key={d.id} device={d} onToggle={toggle} />
          ))
        )}
      </div>
    </div>
  );
}
