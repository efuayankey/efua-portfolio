import { Sun, Moon, Menu, X } from 'lucide-react';

const Navigation = ({ 
  isDark, 
  setIsDark, 
  activeSection, 
  scrollToSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all ${
      isDark 
        ? 'bg-slate-950/95 border-slate-800/50' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('home')}
            className={`text-lg sm:text-xl md:text-2xl font-bold tracking-wide transition-colors ${
              isDark ? 'text-white hover:text-cyan-400' : 'text-gray-900 hover:text-blue-600'
            }`}
          >
            Efua Yankey
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {[
              {label: 'Home', page: 'home'},
              {label: 'About', page: 'about'},
              {label: 'Skills', page: 'skills'},
              {label: 'Projects', page: 'projects'},
              {label: 'Resume', page: 'resume'},
              {label: 'Contact', page: 'contact'}
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => scrollToSection(item.page)}
                className={`font-medium transition-colors text-sm lg:text-base ${
                  activeSection === item.page
                    ? (isDark ? 'text-cyan-400' : 'text-blue-600')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 border-b transition-all ${
            isDark 
              ? 'bg-slate-950/98 border-slate-800/50 backdrop-blur-xl' 
              : 'bg-white/98 border-gray-200 backdrop-blur-xl'
          }`}>
            <div className="px-4 py-4 space-y-2">
              {[
                {label: 'Home', page: 'home'},
                {label: 'About', page: 'about'},
                {label: 'Skills', page: 'skills'},
                {label: 'Projects', page: 'projects'},
                {label: 'Resume', page: 'resume'},
                {label: 'Contact', page: 'contact'}
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    scrollToSection(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeSection === item.page
                      ? (isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-600')
                      : (isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;