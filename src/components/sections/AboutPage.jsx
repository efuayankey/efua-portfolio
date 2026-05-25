import useReveal from '../../hooks/useReveal';

const STATS = [
  { value: '6+', label: 'Projects shipped' },
  { value: '70+', label: 'Users in 3 weeks' },
  { value: '2', label: 'Research projects' },
  { value: '4+', label: 'Years coding' },
];

const AboutPage = () => {
  const sectionRef = useReveal(0.1);

  return (
    <section id="about" className="py-32" style={{ background: '#080808' }}>
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="reveal mb-16">
          <div className="section-label mb-3">01 — About</div>
          <h2
            className="text-fg font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Who I am
          </h2>
        </div>

        {/* Stats row */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px mb-20" style={{ border: '1px solid #1e1e1e' }}>
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="p-8 flex flex-col gap-1 hover:bg-surface transition-colors"
              style={{ background: '#0d0d0d' }}
            >
              <span
                className="font-black leading-none text-lime"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}
              >
                {value}
              </span>
              <span className="text-muted text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 stagger">
          <div className="reveal space-y-6">
            <p className="text-fg leading-relaxed text-lg">
              I'm a Computer Science & Engineering student at Lehigh University, originally from Ghana.
              I build things at the intersection of AI, software, and hardware — and I care deeply about
              making technology that actually <em className="text-lime not-italic">works for people</em>.
            </p>
            <p className="text-muted leading-relaxed">
              I founded NextToIntern to solve a problem I lived through — finding the right study partner
              for internship prep. 70 users in 3 weeks. I've also done research on culturally adaptive AI,
              built computer vision systems, written embedded firmware in C, and taught Python to fellow students.
            </p>
            <p className="text-muted leading-relaxed">
              I'm driven by problems that seem unsolvable until you look closely enough. If there's a
              harder, more interesting version of a project, that's the one I want to build.
            </p>
          </div>

          <div className="reveal space-y-6">
            <div className="border border-border p-6 space-y-4">
              <div className="section-label">Currently</div>
              <ul className="space-y-3">
                {[
                  'CS & Engineering @ Lehigh University',
                  'Building AI/ML projects',
                  'Open to internship opportunities',
                  'Teaching Python to students',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-muted text-sm">
                    <span className="text-lime mt-1 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border p-6 space-y-4">
              <div className="section-label">Interests</div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Machine Learning', 'Computer Vision', 'Full-Stack Dev',
                  'Embedded Systems', 'AI Ethics', 'Cultural Tech',
                ].map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1.5"
                    style={{ background: '#1a1a1a', color: '#888' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;
