'use client';
import { useState, useRef, useEffect } from 'react';

interface Message { role: 'user' | 'assistant'; content: string; }

const STARTERS = [
  'What projects has she built?',
  'Is she open to internships?',
  'What does she research?',
  'How do I contact her?',
];

const S = {
  mono:  { fontFamily: 'var(--font-mono), monospace' }  as React.CSSProperties,
  serif: { fontFamily: 'var(--font-serif), serif' }      as React.CSSProperties,
  bebas: { fontFamily: 'var(--font-bebas), sans-serif' } as React.CSSProperties,
};

interface ChatbotProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function Chatbot({ open, onClose, onOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: full },
        ]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating bubble — always visible */}
      <button
        onClick={open ? onClose : onOpen}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 700,
          width: 48, height: 48, borderRadius: '50%',
          background: '#e8552a', border: 'none', cursor: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(232,85,42,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chat window */}
      <div style={{
        position: 'fixed', bottom: 84, right: 24, zIndex: 700,
        width: 'min(360px, calc(100vw - 32px))',
        height: 'min(480px, calc(100vh - 120px))',
        background: '#0a0a0a', borderTop: '2px solid #e8552a',
        border: '1px solid #1e1e1e', borderTopColor: '#e8552a',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        animation: open ? 'chatslide 0.3s ease' : 'none',
      }}>
        {/* Header */}
        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...S.mono, fontSize: '0.55rem', letterSpacing: '0.15em', color: '#e8552a' }}>:Ask Efua</span>
          <button onClick={onClose} style={{ ...S.mono, background: 'none', border: 'none', cursor: 'none', fontSize: '0.55rem', color: 'rgba(253,246,232,0.3)', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#e8552a')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(253,246,232,0.3)')}
          >✕</button>
        </div>

        {/* Messages */}
        <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {messages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <p style={{ ...S.serif, fontStyle: 'italic', fontSize: '0.75rem', color: 'rgba(253,246,232,0.25)', marginBottom: '0.8rem', lineHeight: 1.6 }}>
                Ask me anything about Efua.
              </p>
              {STARTERS.map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  ...S.mono, background: 'none', border: '1px solid #1e1e1e',
                  padding: '0.5rem 0.8rem', textAlign: 'left', cursor: 'none',
                  fontSize: '0.55rem', color: 'rgba(253,246,232,0.4)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,85,42,0.5)'; (e.currentTarget as HTMLElement).style.color = '#fdf6e8'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e'; (e.currentTarget as HTMLElement).style.color = 'rgba(253,246,232,0.4)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '0.55rem 0.8rem',
                    background: m.role === 'user' ? '#e8552a' : 'rgba(253,246,232,0.05)',
                    border: m.role === 'assistant' ? '1px solid #1e1e1e' : 'none',
                    ...S.serif, fontSize: '0.75rem', lineHeight: 1.65,
                    color: m.role === 'user' ? 'white' : 'rgba(253,246,232,0.75)',
                  }}>
                    {m.content || (loading && i === messages.length - 1 ? (
                      <span style={{ ...S.mono, fontSize: '0.5rem', color: 'rgba(253,246,232,0.3)' }}>thinking…</span>
                    ) : '')}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role === 'user' && (
                <div style={{ display: 'flex', gap: 4, padding: '0.3rem 0' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 5, height: 5, background: '#e8552a', borderRadius: '50%',
                      animation: `dotspin 1.2s ${i * 0.2}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid #1e1e1e', display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask anything..."
            style={{
              ...S.mono, flex: 1, background: 'rgba(253,246,232,0.03)',
              border: '1px solid #1e1e1e', padding: '0.5rem 0.7rem',
              fontSize: '0.6rem', color: '#fdf6e8', outline: 'none',
              cursor: 'none',
            }}
            onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,85,42,0.5)'; }}
            onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e'; }}
          />
          <button onClick={() => send(input)} disabled={loading} style={{
            ...S.mono, background: '#e8552a', border: 'none', cursor: 'none',
            padding: '0 0.9rem', fontSize: '0.6rem', color: 'white',
            opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s',
          }}>
            →
          </button>
        </div>
      </div>
    </>
  );
}
