'use client';
import { PANEL_DATA, TaggedItem } from '@/lib/nodes';

interface PanelProps {
  activeNode: string | null;
  onClose: () => void;
}


function RDFBlock({ code }: { code: string }) {
  const tokenize = (line: string) => {
    return line
      .replace(/(".*?")/g, '<span style="color:#f0c674">$1</span>')
      .replace(/\b(a)\b/g, '<span style="color:#7ab8e8">$1</span>')
      .replace(/([;.,])/g, '<span style="color:rgba(253,246,232,0.2)">$1</span>');
  };

  return (
    <pre style={{
      fontFamily: 'var(--font-mono), monospace',
      background: 'rgba(7,6,5,0.04)', border: '1px solid #1e1e1e',
      padding: '0.9rem 1rem', marginBottom: '2rem',
      fontSize: '0.58rem', lineHeight: 1.9, overflowX: 'auto',
    }}>
      {code.split('\n').map((line, i) => {
        const subjectMatch = line.match(/^(:[\w]+)/);
        const predicateMatch = line.match(/^\s+(:\w+|schema:\w+|a)\s/);

        let html = line
          .replace(/(".*?")/g, '<span style="color:#f0c674">$1</span>')
          .replace(/([;.,])/g, '<span style="color:rgba(253,246,232,0.12)">$1</span>');

        if (subjectMatch) {
          html = html.replace(subjectMatch[1], `<span style="color:#e8552a">${subjectMatch[1]}</span>`);
        }
        if (predicateMatch) {
          html = html.replace(predicateMatch[1], `<span style="color:#7ab8e8">${predicateMatch[1]}</span>`);
        }
        // Objects that are :identifiers → green
        html = html.replace(/(^|[,\s])(:[\w]+)(?=[,\s;.])/g, '$1<span style="color:#a8d8a8">$2</span>');

        return <span key={i} dangerouslySetInnerHTML={{ __html: html + '\n' }} />;
      })}
    </pre>
  );
}

const S = {
  mono: { fontFamily: 'var(--font-mono), monospace' } as React.CSSProperties,
  serif: { fontFamily: 'var(--font-serif), serif' } as React.CSSProperties,
  bebas: { fontFamily: 'var(--font-bebas), sans-serif' } as React.CSSProperties,
};

export default function Panel({ activeNode, onClose }: PanelProps) {
  const data = activeNode ? PANEL_DATA[activeNode] : null;
  const open = Boolean(data);

  return (
    <div
      className="panel-scroll"
      style={{
        position: 'fixed', top: 0, right: 0,
        width: 'min(460px, 100vw)', height: '100%',
        background: '#0a0a0a', borderLeft: '1px solid #1e1e1e',
        zIndex: 600, overflowY: 'auto',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, background: '#0a0a0a',
        borderBottom: '1px solid #1e1e1e', padding: '0.9rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10, backdropFilter: 'blur(8px)',
      }}>
        <span style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8552a' }}>
          {data?.eyebrow}
        </span>
        <button onClick={onClose} style={{
          ...S.mono, background: 'none', border: 'none', cursor: 'none',
          fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(253,246,232,0.4)', transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#e8552a')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,246,232,0.4)')}
        >
          ✕ close
        </button>
      </div>

      {data && (
        <div style={{ padding: '2rem 1.5rem' }}>
          {/* Title */}
          <div style={{ ...S.mono, fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.6rem' }}>
            {data.eyebrow}
          </div>
          <h1 style={{ ...S.bebas, fontSize: '3.2rem', letterSpacing: '0.02em', lineHeight: 0.92, marginBottom: '0.6rem', color: '#fdf6e8' }}>
            {data.title}
          </h1>
          <p style={{ ...S.serif, fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(253,246,232,0.4)', marginBottom: '2rem', lineHeight: 1.55 }}>
            {data.subtitle}
          </p>

          {/* RDF block */}
          <RDFBlock code={data.rdf} />

          {/* Stats */}
          {data.stats && (
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {data.stats.map(s => (
                <div key={s.label} style={{ flex: 1, minWidth: 70, borderTop: '2px solid #e8552a', paddingTop: '0.5rem' }}>
                  <div style={{ ...S.bebas, fontSize: '2rem', color: '#e8552a', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(253,246,232,0.12)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Text sections */}
          {data.sections?.map(sec => (
            <div key={sec.label} style={{ marginBottom: '1.8rem' }}>
              <div style={{ ...S.mono, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {sec.label}
                <span style={{ flex: 'none', width: 24, height: 1, background: 'rgba(232,85,42,0.4)', display: 'inline-block' }} />
              </div>
              {sec.text.split('\n\n').map((para, i) => (
                <p key={i} style={{ ...S.serif, fontSize: '0.97rem', lineHeight: 1.85, color: 'rgba(253,246,232,0.4)', marginBottom: i < sec.text.split('\n\n').length - 1 ? '1rem' : 0 }}
                  dangerouslySetInnerHTML={{ __html: para.replace(/\*(.+?)\*/g, '<em style="color:#fdf6e8;font-style:italic">$1</em>') }}
                />
              ))}
            </div>
          ))}

          {/* Contact copy */}
          {data.contactCopy && (
            <div style={{ marginBottom: '1.8rem' }}>
              <p style={{ ...S.serif, fontSize: '0.97rem', lineHeight: 1.85, color: 'rgba(253,246,232,0.4)' }}>
                {data.contactCopy}
              </p>
            </div>
          )}

          {/* Tagged items */}
          {data.items && (() => {
            const hasGroups = data.items.some(item => item.group);
            const groupNames = hasGroups
              ? Array.from(new Set(data.items.map(item => item.group ?? '')))
              : [''];

            const renderItem = (item: TaggedItem) => (
              <div
                key={item.name}
                style={{ border: '1px solid #1e1e1e', padding: '1.1rem', transition: 'border-color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,85,42,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.15rem' }}>
                  <div style={{ ...S.bebas, fontSize: '1.2rem', letterSpacing: '0.04em', color: '#fdf6e8' }}>{item.name}</div>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ ...S.mono, fontSize: '0.48rem', color: '#e8552a', textDecoration: 'none', cursor: 'none' }}>↗</a>
                  )}
                </div>
                <div style={{ ...S.mono, fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.4rem' }}>{item.meta}</div>
                {item.hook && (
                  <p style={{ ...S.serif, fontStyle: 'italic', fontSize: '0.85rem', color: '#fdf6e8', lineHeight: 1.5, marginBottom: '0.5rem' }}>{item.hook}</p>
                )}
                <p style={{ ...S.serif, fontSize: '0.75rem', color: 'rgba(253,246,232,0.4)', lineHeight: 1.65 }}>{item.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {item.tags.map(t => (
                    <span key={t} style={{ ...S.mono, fontSize: '0.48rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,246,232,0.12)', border: '1px solid #1e1e1e', padding: '0.18rem 0.5rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            );

            return groupNames.map(groupName => (
              <div key={groupName || 'ungrouped'} style={{ marginBottom: '1.8rem' }}>
                <div style={{ ...S.mono, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {hasGroups ? groupName : (activeNode === 'projects' ? 'Projects' : activeNode === 'experience' ? 'Roles' : 'Work')}
                  <span style={{ width: 24, height: 1, background: 'rgba(232,85,42,0.4)', display: 'inline-block' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {data.items!.filter(item => (hasGroups ? item.group === groupName : true)).map(renderItem)}
                </div>
              </div>
            ));
          })()}

          {/* Skill groups */}
          {data.skillGroups && (
            <div style={{ marginBottom: '1.8rem' }}>
              {data.skillGroups.map(grp => (
                <div key={grp.category} style={{ marginBottom: '1.2rem' }}>
                  <div style={{ ...S.mono, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {grp.category}
                    <span style={{ width: 24, height: 1, background: 'rgba(232,85,42,0.4)', display: 'inline-block' }} />
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {grp.skills.map(sk => (
                      <span
                        key={sk}
                        style={{ ...S.mono, fontSize: '0.6rem', letterSpacing: '0.04em', color: '#fdf6e8', background: 'rgba(253,246,232,0.04)', border: '1px solid #1e1e1e', padding: '0.28rem 0.7rem', transition: 'all 0.2s', cursor: 'default' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e8552a'; (e.currentTarget as HTMLElement).style.borderColor = '#e8552a'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(253,246,232,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e'; }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Memberships */}
          {data.memberships && (
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ ...S.mono, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8552a', marginBottom: '0.6rem' }}>Memberships</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {data.memberships.map(m => (
                  <span key={m} style={{ ...S.mono, fontSize: '0.55rem', color: 'rgba(253,246,232,0.4)', border: '1px solid #1e1e1e', padding: '0.3rem 0.8rem' }}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {data.links && (
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1e1e1e' }}>
              {data.links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    ...S.mono,
                    fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '0.6rem 1.1rem', textDecoration: 'none', cursor: 'none',
                    transition: 'all 0.2s', display: 'inline-block',
                    background: link.primary ? '#e8552a' : 'none',
                    color: link.primary ? 'white' : 'rgba(253,246,232,0.4)',
                    border: link.primary ? '1px solid #e8552a' : '1px solid #1e1e1e',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    if (link.primary) { el.style.background = 'transparent'; el.style.color = '#e8552a'; }
                    else { el.style.color = '#fdf6e8'; el.style.borderColor = '#fdf6e8'; }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    if (link.primary) { el.style.background = '#e8552a'; el.style.color = 'white'; }
                    else { el.style.color = 'rgba(253,246,232,0.4)'; el.style.borderColor = '#1e1e1e'; }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
