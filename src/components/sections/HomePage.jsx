import { ArrowRight, Play } from 'lucide-react';

const HomePage = ({ isDark, scrollToSection }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDark ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-20"
        >
          <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950/90 via-blue-950/70 to-slate-950/90'
          : 'bg-gradient-to-br from-blue-50/90 via-white/70 to-indigo-100/90'
      }`}></div>
      
      <div className="absolute inset-0">
        <div className={`absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-cyan-400/10' : 'bg-blue-400/20'
        }`}></div>
        <div className={`absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDark ? 'bg-blue-400/10' : 'bg-purple-400/20'
        }`}></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="select-none overflow-hidden flex items-center justify-center w-full" style={{height: '55vh', width: '100vw'}}>
          <div className="flex justify-center items-center w-full">
            {['E', 'F', 'U', 'A', '.', 'Y', 'A', 'N', 'K', 'E', 'Y'].map((letter, index) => (
              <div
                key={`letter-${index}`}
                className={`font-thin leading-none ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: '100',
                  fontSize: 'clamp(1.5rem, 8vw, 20rem)',
                  letterSpacing: '-0.15em',
                  lineHeight: '0.8',
                  animation: `smoothBounceIn${index % 2 === 0 ? 'Left' : 'Right'} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, colorFade 2s ease-in-out forwards`,
                  animationDelay: `${index * 0.3}s, ${index * 0.3 + 0.5}s`,
                  opacity: 0,
                  transform: index % 2 === 0 ? 'translateX(-400px)' : 'translateX(400px)',
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center -mt-8 sm:-mt-12 md:-mt-16 px-4">
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extralight ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: '200',
              letterSpacing: '0.05em',
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '4s',
              opacity: 0
            }}
          >
            I create intelligent systems
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8"
            style={{
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '4.8s',
              opacity: 0
            }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className={`inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
              style={{fontFamily: "'Inter', system-ui, sans-serif"}}
            >
              <Play size={16} className="mr-2" />
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 border backdrop-blur-sm ${
                isDark 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  : 'border-gray-300 text-gray-700 hover:bg-white/50 hover:text-gray-900'
              }`}
              style={{fontFamily: "'Inter', system-ui, sans-serif"}}
            >
              About Me
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;