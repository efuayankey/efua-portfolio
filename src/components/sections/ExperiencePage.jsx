import useReveal from '../../hooks/useReveal';

const EXPERIENCE = [
  {
    role: 'Founder & Lead Developer',
    org: 'NextToIntern',
    period: '2024 — Present',
    type: 'Startup',
    desc: 'Built and launched an AI-powered internship prep matching platform for Lehigh students. 70+ users in 3 weeks, 120+ posts, GPT-4 matching algorithm.',
    tags: ['Next.js', 'Firebase', 'GPT-4', 'Product'],
  },
  {
    role: 'AI Research Contributor',
    org: 'AIMES Project — Lehigh University',
    period: '2025',
    type: 'Research',
    desc: 'Developed a culturally adaptive mental health chatbot with psychology researchers. 83% improvement in emotional connection across diverse user groups.',
    tags: ['Python', 'GPT-4', 'Prompt Engineering', 'A/B Testing'],
  },
  {
    role: 'Python Instructor',
    org: 'Lehigh University',
    period: '2023 — Present',
    type: 'Teaching',
    desc: 'Teaching Python programming to fellow students. Curriculum design, hands-on labs, and mentorship for beginners breaking into software.',
    tags: ['Python', 'Teaching', 'Curriculum Design'],
  },
  {
    role: 'B.S. Computer Science & Engineering',
    org: 'Lehigh University',
    period: '2022 — Present',
    type: 'Education',
    desc: 'Focusing on AI/ML systems, embedded programming, and full-stack development. Coursework in algorithms, computer architecture, and data structures.',
    tags: ['AI/ML', 'Embedded Systems', 'Algorithms'],
  },
];

const TYPE_COLORS = {
  Startup: '#c8ff3f',
  Research: '#60a5fa',
  Teaching: '#f97316',
  Education: '#a78bfa',
};

const ExperiencePage = () => {
  const sectionRef = useReveal(0.08);

  return (
    <section id="experience" style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }} className="py-32">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="reveal mb-16">
          <div className="section-label mb-3">02 — Experience</div>
          <h2
            className="text-fg font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            What I've built
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
            style={{ background: 'linear-gradient(to bottom, #c8ff3f, #1e1e1e)' }}
          />

          <div className="space-y-0">
            {EXPERIENCE.map((item, i) => (
              <div
                key={item.role}
                className="reveal lg:pl-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12 py-10 border-b border-border group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex items-start justify-end pr-0 relative">
                  <div
                    className="absolute -left-[13px] top-1.5 w-[10px] h-[10px] rounded-full border-2 border-bg group-hover:scale-125 transition-transform"
                    style={{ background: TYPE_COLORS[item.type] }}
                  />
                  <div className="text-right">
                    <div className="font-mono text-xs text-muted">{item.period}</div>
                    <div
                      className="font-mono text-xs mt-1"
                      style={{ color: TYPE_COLORS[item.type] }}
                    >
                      {item.type}
                    </div>
                  </div>
                </div>

                <div>
                  {/* Mobile period */}
                  <div className="lg:hidden font-mono text-xs text-muted mb-2">{item.period} · {item.type}</div>

                  <h3 className="text-fg font-bold text-xl mb-1 group-hover:text-lime transition-colors">
                    {item.role}
                  </h3>
                  <div className="text-muted text-sm font-medium mb-3">{item.org}</div>
                  <p className="text-muted leading-relaxed text-sm max-w-xl mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1"
                        style={{ background: '#111', border: '1px solid #2a2a2a', color: '#666' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperiencePage;
