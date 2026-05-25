import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import ASCIIPhoto from '../ui/ASCIIPhoto';

const TAGLINES = [
  'I build AI that solves real problems.',
  'I turn data into decisions.',
  'I ship things that actually work.',
];

const HomePage = ({ scrollToSection }) => {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = TAGLINES[taglineIdx];
    let i = 0;
    setDisplayed('');
    setTyping(true);

    const typeInterval = setInterval(() => {
      setDisplayed(target.slice(0, i + 1));
      i++;
      if (i >= target.length) {
        clearInterval(typeInterval);
        setTyping(false);
        setTimeout(() => {
          setTaglineIdx(prev => (prev + 1) % TAGLINES.length);
        }, 2800);
      }
    }, 48);

    return () => clearInterval(typeInterval);
  }, [taglineIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden dot-grid"
      style={{ background: '#080808' }}
    >
      {/* Faint lime glow top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,255,63,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

        {/* Left: ASCII photo */}
        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent 60%, #080808 100%)',
                zIndex: 1,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, #080808 0%, transparent 15%, transparent 85%, #080808 100%)',
                zIndex: 1,
              }}
            />
            <ASCIIPhoto src="/efua-photo.png" cols={80} />
          </div>
        </div>

        {/* Right: Text content */}
        <div className="order-1 lg:order-2 flex flex-col gap-6">
          <div className="section-label">Computer Science & Engineering @ Lehigh</div>

          <h1
            className="text-fg leading-none font-black"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '-0.03em' }}
          >
            Efua<br />Yankey
          </h1>

          <div className="flex gap-2 flex-wrap">
            {['AI / ML', 'Full-Stack', 'Embedded Systems'].map(tag => (
              <span
                key={tag}
                className="font-mono text-xs border px-3 py-1"
                style={{ borderColor: '#333', color: '#888' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="font-mono text-base" style={{ color: '#c8ff3f', minHeight: '1.6em' }}>
            {displayed}
            <span
              className="inline-block w-[2px] h-[1em] bg-lime ml-[2px] align-middle"
              style={{ animation: typing ? 'none' : 'cursorBlink 1s step-end infinite' }}
            />
          </p>

          <p className="text-muted leading-relaxed max-w-md" style={{ fontSize: '0.95rem' }}>
            Ghanaian CS student building intelligent systems — from AI chatbots and computer vision
            to full-stack platforms and embedded firmware. Based at Lehigh University.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-7 py-3 bg-lime text-bg font-semibold text-sm hover:bg-lime-dim transition-colors lime-glow"
            >
              View Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3 border border-border text-muted font-medium text-sm hover:border-lime hover:text-lime transition-colors"
            >
              Get in touch
            </button>
          </div>

          <div className="flex gap-5 pt-1">
            <a
              href="https://github.com/efuayankey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-dim hover:text-lime transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/efuayankey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-dim hover:text-lime transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-dim hover:text-lime transition-colors flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HomePage;
