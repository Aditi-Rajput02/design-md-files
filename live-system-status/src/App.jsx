import { useState } from 'react';
import Dashboard from './components/Dashboard';
import LiveSystemStatus from './components/LiveSystemStatus';

export default function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <>
      {/* Page switcher — dev helper, floats bottom-right */}
      <div style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 999,
        display: 'flex', gap: 8,
      }}>
        <button
          onClick={() => setPage('dashboard')}
          style={{
            padding: '7px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600,
            fontFamily: 'Inter, sans-serif', cursor: 'pointer', border: 'none',
            background: page === 'dashboard' ? '#C6F200' : 'rgba(255,255,255,0.08)',
            color: page === 'dashboard' ? '#121212' : 'rgba(255,255,255,0.6)',
            transition: 'all 150ms ease',
          }}
        >Dashboard</button>
        <button
          onClick={() => setPage('status')}
          style={{
            padding: '7px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600,
            fontFamily: 'Inter, sans-serif', cursor: 'pointer', border: 'none',
            background: page === 'status' ? '#C6F200' : 'rgba(255,255,255,0.08)',
            color: page === 'status' ? '#121212' : 'rgba(255,255,255,0.6)',
            transition: 'all 150ms ease',
          }}
        >Status Card</button>
      </div>

      {page === 'dashboard'
        ? <Dashboard />
        : (
          <main className="app-shell">
            <LiveSystemStatus />
          </main>
        )
      }
    </>
  );
}
