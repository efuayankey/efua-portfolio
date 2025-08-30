import { Github } from 'lucide-react';

const ProjectDetailModal = ({ project, isDark, closeProjectModal }) => {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className={`max-w-6xl w-full max-h-[95vh] overflow-y-auto rounded-xl ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <header className={`sticky top-0 backdrop-blur-xl z-10 ${
          isDark 
            ? 'bg-slate-950/95' 
            : 'bg-white/95'
        }`}>
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {project.title}
            </h2>
            <button
              onClick={closeProjectModal}
              className={`text-2xl sm:text-3xl transition-colors ${
                isDark 
                  ? 'text-slate-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ×
            </button>
          </div>
        </header>

        <div className="p-0">
          <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent'
                : 'bg-gradient-to-t from-white via-white/20 to-transparent'
            }`}></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="max-w-5xl mx-auto">
                <div className={`inline-block px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium mb-3 sm:mb-4 ${
                  isDark 
                    ? 'bg-slate-900/80 text-slate-300' 
                    : 'bg-white/80 text-gray-700'
                }`}>
                  {project.category}
                </div>
                
                <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h1>
                
                <p className={`text-sm sm:text-base md:text-lg max-w-3xl ${
                  isDark ? 'text-slate-300' : 'text-gray-600'
                }`}>
                  {project.subtitle}
                </p>
              </div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            
            <section className="mb-12 sm:mb-16 lg:mb-20">
              <div className="grid md:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
                <div className="md:col-span-3">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Overview
                  </h2>
                  <p className={`text-base sm:text-lg leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    {project.fullDescription}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <div className={`p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Status
                    </h3>
                    <div className={`text-sm font-medium ${
                      project.status === 'Live' 
                        ? isDark ? 'text-green-400' : 'text-green-600'
                        : project.status === 'Research'
                        ? isDark ? 'text-purple-400' : 'text-purple-600'
                        : isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 sm:mb-16 lg:mb-20">
              <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                <div className="transition-all duration-500 hover:translate-y-[-4px]">
                  <h3 className={`text-lg sm:text-xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    The Challenge
                  </h3>
                  <p className={`leading-relaxed text-sm sm:text-base ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    {project.problemStatement}
                  </p>
                </div>
                <div className="transition-all duration-500 hover:translate-y-[-4px]">
                  <h3 className={`text-lg sm:text-xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    The Solution
                  </h3>
                  <p className={`leading-relaxed text-sm sm:text-base ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    {project.solutionApproach}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Technical Implementation
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                <div className="md:col-span-2 transition-all duration-500 hover:translate-x-2">
                  <p className={`text-base sm:text-lg leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    {project.technicalImplementation}
                  </p>
                </div>
                
                <div>
                  <h4 className={`font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Tech Stack
                  </h4>
                  <div className="space-y-2">
                    {project.tech.map((tech, index) => (
                      <div key={index} className={`text-sm transition-all duration-300 hover:translate-x-2 hover:text-opacity-100 ${
                        isDark ? 'text-slate-400 hover:text-slate-300' : 'text-gray-600 hover:text-gray-800'
                      }`}>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Results
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                {project.metrics.map((metric, index) => (
                  <div key={index} className={`p-4 sm:p-6 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                    isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {metric.split(' ')[0]}
                    </div>
                    <div className={`text-xs sm:text-sm ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      {metric.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="transition-all duration-500 hover:translate-y-[-4px]">
                <h3 className={`text-lg sm:text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Key Learnings
                </h3>
                <p className={`text-base sm:text-lg leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  {project.keyLearnings}
                </p>
              </div>
            </section>

            <section className="text-center">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm sm:text-base ${
                  isDark 
                    ? 'bg-white text-slate-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                View Source Code
              </a>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;