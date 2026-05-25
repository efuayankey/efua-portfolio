import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import useReveal from '../../hooks/useReveal';

const LINKS = [
  {
    label: 'Email',
    value: 'efuayankey123@gmail.com',
    href: 'mailto:efuayankey123@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: '/in/efuayankey',
    href: 'https://linkedin.com/in/efuayankey',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: '/efuayankey',
    href: 'https://github.com/efuayankey',
    icon: Github,
  },
];

const ContactPage = () => {
  const sectionRef = useReveal(0.1);

  return (
    <section id="contact" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }} className="py-32">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="reveal mb-16">
          <div className="section-label mb-3">05 — Contact</div>
          <h2
            className="text-fg font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Let's talk
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="reveal space-y-6">
            <p className="text-muted leading-relaxed text-lg max-w-md">
              Open to internship opportunities, research collaborations, and interesting projects.
              If you've got something worth building, reach out.
            </p>

            <a
              href="mailto:efuayankey123@gmail.com"
              className="block text-fg font-bold hover:text-lime transition-colors group"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
            >
              efuayankey123@gmail.com
              <ArrowUpRight
                size={20}
                className="inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: '#c8ff3f' }}
              />
            </a>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-muted">Open to work — Summer 2025 internships</span>
            </div>
          </div>

          <div className="reveal space-y-px stagger" style={{ background: '#1a1a1a' }}>
            {LINKS.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 group transition-colors"
                style={{ background: '#0d0d0d' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#111'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0d0d0d'; }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-lime group-hover:text-lime transition-colors text-muted"
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-dim mb-0.5">{label}</div>
                    <div className="text-fg text-sm font-medium group-hover:text-lime transition-colors">{value}</div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted-dim group-hover:text-lime transition-colors" />
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactPage;
