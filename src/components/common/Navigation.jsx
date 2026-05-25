import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navigation = ({ activeSection, scrollToSection, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('home')}
          className="font-mono text-sm font-medium tracking-widest uppercase text-lime hover:text-white transition-colors"
        >
          EY<span className="animate-cursor-blink text-lime">_</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="relative text-sm font-medium transition-colors group"
              style={{ color: activeSection === id ? '#c8ff3f' : '#888888' }}
            >
              {label}
              <span
                className="absolute -bottom-1 left-0 h-px bg-lime transition-all duration-300"
                style={{ width: activeSection === id ? '100%' : '0%' }}
              />
            </button>
          ))}
          <a
            href="/Efua_Yankey_Resume_(2026).pdf"
            download
            className="font-mono text-xs border border-lime text-lime px-4 py-2 hover:bg-lime hover:text-bg transition-all duration-200"
          >
            Resume.pdf
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-muted hover:text-fg transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-bg/98 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-6">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => { scrollToSection(id); setIsMobileMenuOpen(false); }}
                className="text-left text-lg font-medium transition-colors"
                style={{ color: activeSection === id ? '#c8ff3f' : '#f0f0f0' }}
              >
                {label}
              </button>
            ))}
            <a
              href="/Efua_Yankey_Resume_(2026).pdf"
              download
              className="font-mono text-sm border border-lime text-lime px-4 py-3 text-center hover:bg-lime hover:text-bg transition-all"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
