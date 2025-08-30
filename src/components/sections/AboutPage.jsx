import { Linkedin } from 'lucide-react';

const AboutPage = ({ isDark }) => {
  return (
    <div className={`min-h-screen pt-20 sm:pt-24 pb-16 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Photo - Left Side with animations */}
          <div className="order-2 md:order-1 flex justify-center">
            <div 
              className="relative"
              style={{
                animation: 'slideInLeft 1s ease-out 0.3s both'
              }}
            >
              {/* Animated border */}
              <div className={`absolute inset-0 rounded-full animate-pulse ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`} style={{
                animation: 'rotateBorder 8s linear infinite'
              }}></div>
              
              {/* Photo */}
              <div className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold m-2 ${
                isDark 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
              } shadow-2xl transition-transform duration-500 hover:scale-105`}>
                EY
              </div>
              
              {/* Floating elements */}
              <div className={`absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full animate-bounce ${
                isDark ? 'bg-cyan-400' : 'bg-blue-500'
              }`} style={{animationDelay: '0s'}}></div>
              <div className={`absolute top-1/2 -left-1 sm:-left-2 lg:-left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full animate-bounce ${
                isDark ? 'bg-blue-400' : 'bg-purple-500'
              }`} style={{animationDelay: '1s'}}></div>
              <div className={`absolute -bottom-1 left-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full animate-bounce ${
                isDark ? 'bg-cyan-300' : 'bg-blue-400'
              }`} style={{animationDelay: '2s'}}></div>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="order-1 md:order-2" style={{
            animation: 'slideInRight 1s ease-out 0.5s both'
          }}>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              About Me
            </h1>
            
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed">
              <p className={`transition-all duration-500 hover:translate-x-2 ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                I'm a Computer Science & Engineering student at Lehigh University with a passion for building AI systems that solve real problems. My work spans machine learning research, computer vision, and full-stack development.
              </p>
              
              <p className={`transition-all duration-500 hover:translate-x-2 ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                I founded NextToIntern, a platform that helps students connect for internship preparation, and I've conducted research on culturally adaptive AI systems. I also teach Python to fellow students and lead development teams.
              </p>
              
              <p className={`transition-all duration-500 hover:translate-x-2 ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                When I'm not coding, I'm exploring how technology can be more inclusive and accessible. I believe in building systems that work for everyone, not just a select few.
              </p>
            </div>

            <div className="mt-6 sm:mt-8" style={{
              animation: 'fadeInUp 0.8s ease-out 1s both'
            }}>
              <a
                href="https://linkedin.com/in/efuayankey"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base ${
                  isDark 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg hover:shadow-cyan-500/25'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;