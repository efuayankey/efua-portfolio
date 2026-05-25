import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { projects } from '../../data/projects';
import useReveal from '../../hooks/useReveal';

const STATUS_COLORS = {
  Live: '#4ade80',
  Beta: '#facc15',
  Research: '#60a5fa',
  Training: '#a78bfa',
  Production: '#4ade80',
};

const ProjectCard = ({ project, featured = false, openProjectModal }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden border border-border group transition-all duration-300"
      style={{
        background: hovered ? '#111' : '#0d0d0d',
        borderColor: hovered ? '#333' : '#1e1e1e',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => openProjectModal(project.id)}
    >
      {/* Image */}
      <div className={`overflow-hidden ${featured ? 'h-56' : 'h-44'}`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'grayscale(40%) brightness(0.7)' }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent 30%, #0d0d0d 100%)',
            opacity: hovered ? 0.9 : 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs" style={{ color: '#666' }}>{project.category} · {project.year}</span>
          <span
            className="font-mono text-xs flex items-center gap-1.5"
            style={{ color: STATUS_COLORS[project.status] || '#888' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: STATUS_COLORS[project.status] || '#888' }} />
            {project.status}
          </span>
        </div>

        <h3
          className="font-bold text-fg mb-2 transition-colors duration-200 group-hover:text-lime"
          style={{ fontSize: featured ? '1.4rem' : '1.1rem' }}
        >
          {project.title}
        </h3>

        <p className="text-muted text-sm leading-relaxed mb-4">{project.subtitle}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map(t => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5"
              style={{ background: '#1a1a1a', color: '#666' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="font-mono text-xs px-2 py-0.5" style={{ background: '#1a1a1a', color: '#444' }}>
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Metrics (featured only) */}
        {featured && project.metrics && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map(m => (
              <div key={m} className="text-center py-2 border border-border">
                <div className="font-mono text-xs text-lime leading-tight">{m}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-muted-dim hover:text-lime transition-colors"
            >
              <Github size={15} />
            </a>
          </div>
          <span className="font-mono text-xs text-muted-dim group-hover:text-lime transition-colors flex items-center gap-1">
            View details <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = ({ openProjectModal }) => {
  const sectionRef = useReveal(0.05);
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }} className="py-32">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="reveal mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="section-label mb-3">03 — Projects</div>
            <h2
              className="text-fg font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              What I've made
            </h2>
          </div>
          <a
            href="https://github.com/efuayankey"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-lime transition-colors flex items-center gap-2 shrink-0"
          >
            All on GitHub <ExternalLink size={12} />
          </a>
        </div>

        {/* Bento grid */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
          {/* Featured — spans 2 cols */}
          {featured && (
            <div className="md:col-span-2 bg-bg">
              <ProjectCard project={featured} featured openProjectModal={openProjectModal} />
            </div>
          )}

          {/* First non-featured */}
          {rest[0] && (
            <div className="bg-bg">
              <ProjectCard project={rest[0]} openProjectModal={openProjectModal} />
            </div>
          )}

          {/* Remaining cards */}
          {rest.slice(1).map(p => (
            <div key={p.id} className="bg-bg">
              <ProjectCard project={p} openProjectModal={openProjectModal} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsPage;
