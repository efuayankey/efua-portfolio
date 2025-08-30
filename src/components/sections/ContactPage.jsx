import { Mail, Linkedin, Github, Instagram } from 'lucide-react';

const ContactPage = ({ isDark, setShowContactForm }) => {
  return (
    <div className={`min-h-screen pt-20 sm:pt-24 pb-16 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Let's Connect
        </h1>
        
        <p className={`text-base sm:text-lg md:text-xl mb-12 sm:mb-16 leading-relaxed max-w-2xl mx-auto px-4 ${
          isDark ? 'text-slate-300' : 'text-gray-700'
        }`}>
          Interested in collaboration, internship opportunities, or discussing projects? 
          I'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: Mail,
              title: 'Email',
              value: 'efuayankey123@gmail.com',
              action: () => setShowContactForm(true)
            },
            {
              icon: Linkedin,
              title: 'LinkedIn',
              value: 'linkedin.com/in/efuayankey',
              href: 'https://linkedin.com/in/efuayankey'
            },
            {
              icon: Github,
              title: 'GitHub',
              value: 'github.com/efuayankey',
              href: 'https://github.com/efuayankey'
            },
            {
              icon: Instagram,
              title: 'Instagram',
              value: '@efua.yankey',
              href: 'https://instagram.com/efua.yankey'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className={`group p-4 sm:p-6 lg:p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800'
                  : 'bg-white hover:shadow-lg border border-gray-200'
              }`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto transition-transform duration-300 group-hover:scale-110 ${
                  isDark 
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'
                } text-white`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                </div>
                <div>
                  <div className={`font-semibold mb-2 text-sm sm:text-base lg:text-lg ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </div>
                  <div className={`text-xs sm:text-sm lg:text-base transition-colors ${
                    isDark 
                      ? 'text-slate-400 group-hover:text-cyan-400' 
                      : 'text-gray-600 group-hover:text-blue-600'
                  }`}>
                    {item.value}
                  </div>
                </div>
              </div>
            );

            return item.href ? (
              <a key={index} href={item.href} className="block" target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : item.action ? (
              <button key={index} onClick={item.action} className="block w-full text-left">
                {content}
              </button>
            ) : (
              <div key={index}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;