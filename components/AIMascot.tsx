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

export default function AIMascot({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [msgIdx, setMsgIdx]   = useState(0);
  const [waving, setWaving]   = useState(false);

  const showBubble = (idx: number) => {
    setMsgIdx(idx);
    setBubbleVisible(true);
    setWaving(true);
    setTimeout(() => setWaving(false), 1800);
  };

  // First pop-up 10s after load
  useEffect(() => {
    const t = setTimeout(() => showBubble(0), 10000);
    return () => clearTimeout(t);
  }, []);

  // Auto-hide bubble after 7s, reappear every 45s
  useEffect(() => {
    if (!bubbleVisible) return;
    const t = setTimeout(() => setBubbleVisible(false), 7000);
    return () => clearTimeout(t);
  }, [bubbleVisible]);

  useEffect(() => {
    if (bubbleVisible) return;
    const t = setTimeout(() => showBubble((msgIdx + 1) % MESSAGES.length), 45000);
    return () => clearTimeout(t);
  }, [bubbleVisible]);

  // Hide bubble when chat opens
  useEffect(() => { if (open) setBubbleVisible(false); }, [open]);

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
          from { opacity: 0; transform: translateX(10px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
      `}</style>

      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 700,
        display: 'flex', alignItems: 'flex-end', gap: '0.7rem',
      }}>

        {/* Speech bubble — pops up to the left of the orb */}
        {bubbleVisible && (
          <div
            onClick={() => { onToggle(); setBubbleVisible(false); }}
            style={{
              background: '#0a0a0a',
              border: '1px solid #1e1e1e',
              borderBottom: '2px solid #e8552a',
              padding: '0.65rem 0.9rem',
              maxWidth: 190,
              cursor: 'pointer',
              animation: 'bubble-in 0.4s cubic-bezier(0.16,1,0.3,1)',
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
        )}

        {/* Orb — always visible, replaces the old chat button */}
        <div
          onClick={onToggle}
          style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: open
              ? '#e8552a'
              : 'radial-gradient(circle at 35% 35%, rgba(232,85,42,0.2), #0a0a0a)',
            border: '2px solid #e8552a',
            boxShadow: '0 0 20px rgba(232,85,42,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: open ? '1rem' : '1.2rem',
            cursor: 'pointer',
            transition: 'background 0.3s, font-size 0.2s',
            animation: waving
              ? 'mascot-wave 0.6s ease 3'
              : 'mascot-float 3s ease-in-out infinite',
          }}
        >
          {open ? '✕' : '✦'}
        </div>
      </div>
    </>
  );
}
