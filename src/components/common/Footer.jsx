const Footer = () => {
  return (
    <footer className="border-t py-8" style={{ borderColor: '#1a1a1a', background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs" style={{ color: '#444' }}>
          © 2026 Efua Yankey
        </span>
        <span className="font-mono text-xs" style={{ color: '#333' }}>
          Built with React · Designed from scratch
        </span>
      </div>
    </footer>
  );
};

export default Footer;
