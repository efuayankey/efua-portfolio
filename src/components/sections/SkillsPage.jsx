import { skillsData } from '../../data/skills';
import useReveal from '../../hooks/useReveal';

const SkillsPage = () => {
  const sectionRef = useReveal(0.08);

  return (
    <section id="skills" style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }} className="py-32">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="reveal mb-16">
          <div className="section-label mb-3">04 — Skills</div>
          <h2
            className="text-fg font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            My stack
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
          {skillsData.map((category) => (
            <div key={category.title} className="p-8" style={{ background: '#0a0a0a' }}>
              <div className="section-label mb-6">{category.title}</div>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        style={{ filter: 'brightness(0) invert(0.5)' }}
                        onMouseEnter={e => { e.currentTarget.style.filter = 'none'; }}
                        onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(0) invert(0.5)'; }}
                      />
                    </div>
                    <span className="text-muted text-sm font-medium group-hover:text-fg transition-colors">
                      {skill.name}
                    </span>
                    <div
                      className="ml-auto w-0 h-px group-hover:w-8 transition-all duration-300"
                      style={{ background: '#c8ff3f' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hardware row */}
        <div className="reveal mt-px" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: 'none' }}>
          <div className="p-8">
            <div className="section-label mb-4">Hardware & Other</div>
            <div className="flex flex-wrap gap-3">
              {['MSP430', 'C / C++', 'Code Composer Studio', 'IoT Analytics', 'MediaPipe', 'OpenCV', 'scikit-learn', 'ThingSpeak'].map(item => (
                <span
                  key={item}
                  className="font-mono text-xs px-3 py-2 border border-border text-muted hover:border-lime hover:text-lime transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsPage;
