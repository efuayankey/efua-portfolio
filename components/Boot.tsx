'use client';
import { useEffect, useState } from 'react';

export default function Boot({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(onDone, 1200);
    }, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000', zIndex: 3000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
      opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'all',
      transition: 'opacity 1.2s ease',
    }}>
      <div style={{
        fontFamily: 'var(--font-bebas), sans-serif',
        fontSize: 'clamp(3rem, 10vw, 7rem)',
        letterSpacing: '0.06em', lineHeight: 0.88, textAlign: 'center', color: '#fdf6e8',
      }}>
        EF<span style={{ color: '#e8552a' }}>UA</span><br />
        YAN<span style={{ color: '#e8552a' }}>KEY</span>
      </div>

      <div style={{
        width: 0, height: 1, background: '#e8552a',
        animation: 'bootline 1.6s ease 0.3s forwards',
      }} />

      <div style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase',
        color: 'rgba(253,246,232,0.12)', opacity: 0,
        animation: 'fadein 0.8s ease 1s forwards',
      }}>
        initializing knowledge graph...
      </div>
    </div>
  );
}
