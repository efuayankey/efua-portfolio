const Footer = ({ isDark }) => {
  return (
    <footer className={`border-t py-4 sm:py-6 text-center ${
      isDark 
        ? 'border-slate-800 bg-slate-950' 
        : 'border-gray-200 bg-gray-50'
    }`}>
      <p className={`text-xs sm:text-sm ${
        isDark ? 'text-slate-400' : 'text-gray-600'
      }`} style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
        © 2025 Efua Yankey. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;