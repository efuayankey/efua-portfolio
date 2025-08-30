import { skillsData } from '../../data/skills';

const SkillsPage = ({ isDark }) => {
  return (
    <div className={`min-h-screen pt-20 sm:pt-24 pb-16 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16" style={{
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Skills & Technologies
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${
            isDark ? 'text-slate-300' : 'text-gray-700'
          }`}>
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {skillsData.map((category, categoryIndex) => (
            <div 
              key={category.title} 
              className={`rounded-xl p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:scale-105 hover:rotate-1 ${
                isDark ? 'bg-slate-900 hover:bg-slate-800 shadow-2xl' : 'bg-white hover:shadow-2xl border border-gray-200'
              }`}
              style={{
                animation: `slideUpStagger 0.6s ease-out ${categoryIndex * 0.2}s both`
              }}
            >
              <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 text-center ${
                isDark ? 'text-cyan-400' : 'text-blue-600'
              }`}>
                {category.title}
              </h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name} 
                    className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:translate-x-2 group ${
                      isDark 
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md'
                    }`}
                    style={{
                      animation: `slideInSkill 0.4s ease-out ${(categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3}s both`
                    }}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 flex items-center justify-center">
                      <img 
                        src={skill.logo} 
                        alt={`${skill.name} logo`}
                        className={`w-full h-full object-contain transition-all duration-300 ${
                          isDark 
                            ? 'filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:filter-none' 
                            : 'opacity-70 group-hover:opacity-100'
                        }`}
                        style={{
                          filter: isDark ? 'brightness(0) invert(1)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (isDark) {
                            e.target.style.filter = 'none';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isDark) {
                            e.target.style.filter = 'brightness(0) invert(1)';
                          }
                        }}
                      />
                    </div>
                    <span className="flex-1 text-xs sm:text-sm lg:text-base">{skill.name}</span>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:w-3 group-hover:h-3 ${
                      isDark ? 'bg-cyan-400' : 'bg-blue-500'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? 'bg-cyan-400' : 'bg-blue-400'
          }`} style={{animationDelay: '0s'}}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-12 sm:w-18 lg:w-24 h-12 sm:h-18 lg:h-24 rounded-full blur-2xl opacity-20 animate-pulse ${
            isDark ? 'bg-blue-400' : 'bg-purple-400'
          }`} style={{animationDelay: '2s'}}></div>
          <div className={`absolute top-1/2 right-1/3 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 rounded-full blur-xl opacity-20 animate-pulse ${
            isDark ? 'bg-purple-400' : 'bg-cyan-400'
          }`} style={{animationDelay: '4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;