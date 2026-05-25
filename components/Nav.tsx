'use client';

export default function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 24, left: 0, right: 0, zIndex: 190,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.85rem 2.5rem',
      background: 'rgba(0,0,0,0.85)', borderBottom: '1px solid #1e1e1e',
      backdropFilter: 'blur(12px)',
    }}>
      <span style={{
        fontFamily: 'var(--font-bebas), sans-serif',
        fontSize: '1.5rem', letterSpacing: '0.06em', color: '#fdf6e8',
      }}>
        EY<span style={{ color: '#e8552a' }}>.</span>
      </span>

      <span style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(253,246,232,0.12)',
      }}>
        hover a node · click to explore
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <div style={{
          width: 6, height: 6, background: '#e8552a', borderRadius: '50%',
          animation: 'blink 2s ease infinite',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#e8552a',
        }}>
          Open · 2027 roles
        </span>
      </div>
    </nav>
  );
}
