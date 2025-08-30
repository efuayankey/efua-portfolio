const ResumePage = ({ isDark }) => {
  return (
    <div className={`py-20 sm:py-24 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Resume
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-gray-700'
          }`}>
            Download my complete resume to see my full experience, education, and technical skills.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
              : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
          }`}>
            <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </div>

          <button
            onClick={() => {
              // For now, we'll create a placeholder action
              // In a real implementation, this would download the actual resume
              const link = document.createElement('a');
              link.href = '#'; // Replace with actual resume URL
              link.download = 'Efua_Yankey_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className={`inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base md:text-lg ${
              isDark 
                ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg hover:shadow-cyan-500/25'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Resume
          </button>

          <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            PDF • Updated December 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;