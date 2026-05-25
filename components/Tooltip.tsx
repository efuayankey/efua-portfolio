'use client';

interface TooltipState {
  x: number;
  y: number;
  id: string;
  name: string;
  desc: string;
}

export default function Tooltip({ tip }: { tip: TooltipState | null }) {
  if (!tip) return null;

  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono), monospace' };
  const serif: React.CSSProperties = { fontFamily: 'var(--font-serif), serif' };

  return (
    <div style={{
      position: 'fixed', left: tip.x + 16, top: tip.y - 10,
      background: 'rgba(0,0,0,0.96)', border: '1px solid #e8552a',
      padding: '10px 14px', zIndex: 500, pointerEvents: 'none',
      maxWidth: 230,
    }}>
      <div style={{ ...mono, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e8552a', marginBottom: 3 }}>
        :{tip.id}
      </div>
      <div style={{ ...mono, fontSize: '0.8rem', color: '#fdf6e8', marginBottom: 3 }}>
        {tip.name}
      </div>
      <div style={{ ...serif, fontSize: '0.62rem', color: 'rgba(253,246,232,0.4)', lineHeight: 1.5 }}>
        {tip.desc}
      </div>
      <div style={{ ...mono, fontSize: '0.45rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(253,246,232,0.12)', marginTop: 6 }}>
        click to open →
      </div>
    </div>
  );
}

export type { TooltipState };
