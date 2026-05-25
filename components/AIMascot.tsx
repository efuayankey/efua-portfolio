'use client';
import { useState, useEffect } from 'react';

const MESSAGES = [
  "hi ✦ i'm efua's ai twin",
  "she researches knowledge graphs.\ni live in one.",
  "ask me about her work →",
  "built overnight at agentathon.\nstill going.",
  "curious? just ask.",
];

const S = {
  mono:  { fontFamily: 'var(--font-mono), monospace' }  as React.CSSProperties,
  serif: { fontFamily: 'var(--font-serif), serif' }      as React.CSSProperties,
};

export default function AIMascot({ onOpenChat }: { onOpenChat: () => void }) {
  const [visible, setVisible]   = useState(false);
  const [msgIdx,  setMsgIdx]    = useState(0);
  const [waving,  setWaving]    = useState(false);

  const appear = (idx: number) => {
    setMsgIdx(idx);
    setVisible(true);
    setWaving(true);
    setTimeout(() => setWaving(false), 1800);
  };

  // First pop-up after 10s
  useEffect(() => {
    const t = setTimeout(() => appear(0), 10000);
    return () => clearTimeout(t);
  }, []);

  // Auto-hide after 7s, then reappear every 45s
  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => setVisible(false), 7000);
    return () => clearTimeout(hide);
  }, [visible]);

  useEffect(() => {
    if (visible) return;
    const t = setTimeout(() => appear((msgIdx + 1) % MESSAGES.length), 45000);
    return () => clearTimeout(t);
  }, [visible]);

  const handleClick = () => { onOpenChat(); setVisible(false); };

  return (
    <>
      <style>{`
        @keyframes mascot-wave {
          0%,100% { transform: rotate(0deg) scale(1); }
          20%      { transform: rotate(-18deg) scale(1.15); }
          50%      { transform: rotate(16deg) scale(1.1); }
          80%      { transform: rotate(-10deg) scale(1.05); }
        }
        @keyframes mascot-float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-5px); }
        }
        @keyframes bubble-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>

      <div style={{
        position: 'fixed', bottom: 24, left: 24, zIndex: 700,
        display: 'flex', alignItems: 'flex-end', gap: '0.7rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: visible ? 'all' : 'none',
      }}>

        {/* Speech bubble */}
        <div
          onClick={handleClick}
          style={{
            background: '#0a0a0a',
            border: '1px solid #1e1e1e',
            borderBottom: '2px solid #e8552a',
            padding: '0.65rem 0.9rem',
            maxWidth: 190,
            cursor: 'pointer',
            animation: visible ? 'bubble-in 0.4s cubic-bezier(0.16,1,0.3,1)' : 'none',
          }}
        >
          <div style={{ ...S.mono, fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.3rem' }}>
            :efua.ai
          </div>
          <div style={{ ...S.serif, fontStyle: 'italic', fontSize: '0.78rem', color: 'rgba(253,246,232,0.75)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
            {MESSAGES[msgIdx]}
          </div>
          <div style={{ ...S.mono, fontSize: '0.4rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,85,42,0.5)', marginTop: '0.4rem' }}>
            tap to chat →
          </div>
        </div>

        {/* Orb character */}
        <div
          onClick={handleClick}
          style={{
            animation: 'mascot-float 3s ease-in-out infinite',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(232,85,42,0.25), #0a0a0a)',
            border: '2px solid #e8552a',
            boxShadow: '0 0 18px rgba(232,85,42,0.35), inset 0 0 12px rgba(232,85,42,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
            animation: waving ? 'mascot-wave 0.6s ease 3' : 'mascot-float 3s ease-in-out infinite',
          }}>
            ✦
          </div>
        </div>
      </div>
    </>
  );
}
