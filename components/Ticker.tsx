'use client';

const ITEMS = [
  { star: true,  text: 'Efua Yankey' },
  { star: false, text: 'CS + AI Researcher · Lehigh University · Class of 2028' },
  { star: true,  text: 'Neurosymbolic AI · SWAT Lab · Prof. Jeff Heflin' },
  { star: false, text: 'ABRCMS 2025 · IRB Research · 83% Cultural Alignment' },
  { star: true,  text: 'HawkSearch · Agentathon 2026 · Claude API' },
  { star: false, text: 'Rossin Junior Fellow · Open to 2027 Internships' },
];

// Duplicate for seamless loop
const ALL = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid #1e1e1e',
      padding: '0.4rem 0', overflow: 'hidden', whiteSpace: 'nowrap',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'inline-flex', animation: 'tickscroll 35s linear infinite' }}>
        {ALL.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            padding: '0 2.5rem', color: 'rgba(253,246,232,0.12)',
          }}>
            <b style={{ color: '#e8552a', fontWeight: 400 }}>{item.star ? '★' : '→'}</b>{' '}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
