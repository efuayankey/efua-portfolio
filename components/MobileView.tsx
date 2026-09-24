'use client';
import { useState } from 'react';
import { PANEL_DATA } from '@/lib/nodes';
import Chatbot from './Chatbot';

const S = {
  mono:  { fontFamily: 'var(--font-mono), monospace' }  as React.CSSProperties,
  serif: { fontFamily: 'var(--font-serif), serif' }      as React.CSSProperties,
  bebas: { fontFamily: 'var(--font-bebas), sans-serif' } as React.CSSProperties,
};

const SECTIONS = ['research', 'projects', 'hackathons', 'experience', 'skills', 'leadership', 'contact'] as const;

const COLORS: Record<string, string> = {
  research: '#7ab8e8', projects: '#a8d8a8', hackathons: '#f4845f',
  experience: '#f0c674', skills: '#c4a8d8', leadership: '#6ecfbf', contact: '#e8552a',
};

export default function MobileView() {
  const [chatOpen, setChatOpen] = useState(false);
  const center = PANEL_DATA.center;

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#000', color: '#fdf6e8', overflowX: 'hidden' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1e1e1e', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...S.bebas, fontSize: '1.5rem', letterSpacing: '0.06em' }}>
          EY<span style={{ color: '#e8552a' }}>.</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 6, height: 6, background: '#e8552a', borderRadius: '50%' }} />
          <span style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#e8552a' }}>
            Open · 2027
          </span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '2.5rem 1.5rem 2rem', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src="/efua-photo.jpg"
              alt="Efua Yankey"
              style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e8552a', display: 'block' }}
            />
          </div>
          <div>
            <h1 style={{ ...S.bebas, fontSize: '2.6rem', letterSpacing: '0.04em', lineHeight: 0.92, color: '#fdf6e8', marginBottom: '0.4rem' }}>
              {center.title}
            </h1>
            <p style={{ ...S.mono, fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(253,246,232,0.4)' }}>
              {center.subtitle}
            </p>
          </div>
        </div>

        {center.sections?.map(sec => (
          <div key={sec.label} style={{ marginBottom: '1.2rem' }}>
            <div style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.4rem' }}>
              {sec.label}
            </div>
            <p style={{ ...S.serif, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(253,246,232,0.55)' }}>
              {sec.text}
            </p>
          </div>
        ))}

        {/* Action links */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          {center.links?.map(link => (
            <a key={link.label} href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                ...S.mono, fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '0.55rem 1rem', textDecoration: 'none',
                background: link.primary ? '#e8552a' : 'none',
                color: link.primary ? '#fff' : 'rgba(253,246,232,0.5)',
                border: link.primary ? '1px solid #e8552a' : '1px solid #1e1e1e',
              }}>
              {link.label}
            </a>
          ))}
          <button onClick={() => setChatOpen(true)} style={{
            ...S.mono, fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '0.55rem 1rem', background: 'none', border: '1px solid #e8552a',
            color: '#e8552a', cursor: 'pointer',
          }}>
            Ask AI Efua ↗
          </button>
        </div>
      </div>

      {/* Section cards */}
      {SECTIONS.map(id => {
        const data = PANEL_DATA[id];
        const color = COLORS[id] ?? '#e8552a';
        if (!data) return null;
        return (
          <div key={id} style={{ borderBottom: '1px solid #1e1e1e', padding: '2rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color }}>
                {data.eyebrow}
              </span>
            </div>
            <h2 style={{ ...S.bebas, fontSize: '2.2rem', letterSpacing: '0.03em', lineHeight: 0.95, color: '#fdf6e8', marginBottom: '0.4rem' }}>
              {data.title}
            </h2>
            <p style={{ ...S.serif, fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(253,246,232,0.35)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {data.subtitle}
            </p>

            {/* Stats */}
            {data.stats && (
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {data.stats.map(s => (
                  <div key={s.label} style={{ borderTop: `2px solid ${color}`, paddingTop: '0.4rem', minWidth: 60 }}>
                    <div style={{ ...S.bebas, fontSize: '1.6rem', color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ ...S.mono, fontSize: '0.45rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(253,246,232,0.3)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Text sections */}
            {data.sections?.map(sec => (
              <div key={sec.label} style={{ marginBottom: '1.2rem' }}>
                <div style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color, marginBottom: '0.4rem' }}>{sec.label}</div>
                <p style={{ ...S.serif, fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(253,246,232,0.5)' }}>{sec.text}</p>
              </div>
            ))}

            {/* Items */}
            {data.items && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {data.items.map(item => (
                  <div key={item.name} style={{ border: '1px solid #1e1e1e', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
                      <span style={{ ...S.bebas, fontSize: '1.1rem', letterSpacing: '0.03em', color: '#fdf6e8' }}>{item.name}</span>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                          style={{ ...S.mono, fontSize: '0.48rem', color, textDecoration: 'none' }}>↗</a>
                      )}
                    </div>
                    <div style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: '0.4rem' }}>{item.meta}</div>
                    <p style={{ ...S.serif, fontSize: '0.8rem', color: 'rgba(253,246,232,0.45)', lineHeight: 1.6, marginBottom: '0.5rem' }}>{item.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {item.tags.map(t => (
                        <span key={t} style={{ ...S.mono, fontSize: '0.44rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(253,246,232,0.25)', border: '1px solid #1e1e1e', padding: '0.15rem 0.4rem' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skill groups */}
            {data.skillGroups?.map(grp => (
              <div key={grp.category} style={{ marginBottom: '1rem' }}>
                <div style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color, marginBottom: '0.5rem' }}>{grp.category}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {grp.skills.map(sk => (
                    <span key={sk} style={{ ...S.mono, fontSize: '0.55rem', color: '#fdf6e8', background: 'rgba(253,246,232,0.04)', border: '1px solid #1e1e1e', padding: '0.25rem 0.6rem' }}>{sk}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Memberships */}
            {data.memberships && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color, marginBottom: '0.5rem' }}>Memberships</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {data.memberships.map(m => (
                    <span key={m} style={{ ...S.mono, fontSize: '0.5rem', color: 'rgba(253,246,232,0.4)', border: '1px solid #1e1e1e', padding: '0.25rem 0.7rem' }}>{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact copy */}
            {data.contactCopy && (
              <p style={{ ...S.serif, fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(253,246,232,0.5)', marginBottom: '1.2rem' }}>
                {data.contactCopy}
              </p>
            )}

            {/* Links */}
            {data.links && (
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #1e1e1e' }}>
                {data.links.map(link => (
                  <a key={link.label} href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      ...S.mono, fontSize: '0.5rem', letterSpacing: '0.13em', textTransform: 'uppercase',
                      padding: '0.55rem 1rem', textDecoration: 'none',
                      background: link.primary ? '#e8552a' : 'none',
                      color: link.primary ? '#fff' : 'rgba(253,246,232,0.5)',
                      border: link.primary ? '1px solid #e8552a' : '1px solid #1e1e1e',
                    }}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer */}
      <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
        <p style={{ ...S.mono, fontSize: '0.45rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(253,246,232,0.15)' }}>
          "I build systems that reason, scale, and stay reliable." · View desktop for the full experience
        </p>
      </div>

      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} onOpen={() => setChatOpen(true)} />
    </div>
  );
}
