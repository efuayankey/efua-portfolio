const ContactForm = ({ isDark, setShowContactForm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`max-w-md w-full rounded-xl p-4 sm:p-6 lg:p-8 ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className={`text-lg sm:text-xl font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Send Message
          </h3>
          <button
            onClick={() => setShowContactForm(false)}
            className={`text-xl sm:text-2xl ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            ×
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={4}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors resize-none text-sm sm:text-base ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none`}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              isDark 
                ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;