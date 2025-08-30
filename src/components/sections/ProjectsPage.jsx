import { Github, ExternalLink, Users, Brain, Eye, TrendingUp, Target } from 'lucide-react';
import { projects } from '../../data/projects';

const iconMap = {
  Users,
  Brain,
  Eye,
  TrendingUp,
  Target
};

const ProjectsPage = ({ isDark, openProjectModal }) => {
  return (
    <div className={`pt-20 sm:pt-24 pb-16 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My Projects
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            A collection of projects spanning AI research, computer vision, and full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {projects.map((project) => {
            const IconComponent = iconMap[project.iconName];
            return (
            <div 
              key={project.id}
              className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 shadow-xl'
                  : 'bg-white hover:shadow-xl border border-gray-200'
              }`}
              onClick={() => openProjectModal(project.id)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full ${
                    isDark 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {project.category}
                  </span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    project.status === 'Live' 
                      ? 'bg-green-100 text-green-700'
                      : project.status === 'Beta'
                      ? 'bg-yellow-100 text-yellow-700'
                      : project.status === 'Training'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {project.status}
                  </div>
                </div>
                
                <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {project.subtitle}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>
                    {project.year}
                  </span>
                  <div className={`flex items-center space-x-1 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                    {IconComponent && <IconComponent className="w-4 h-4 sm:w-5 md:w-6 lg:w-6" />}
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>
        
        <div className="text-center px-4">
          <a
            href="https://github.com/efuayankey"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base md:text-lg font-medium ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
            <span className="hidden sm:inline">View All Projects on GitHub</span>
            <span className="sm:hidden">View on GitHub</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;