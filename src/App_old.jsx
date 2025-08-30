import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Sun, Moon, ExternalLink, Users, Brain, Eye, TrendingUp, Target, Star, Clock, ChevronLeft, Play, Instagram, Menu, X } from 'lucide-react';

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = '#020617';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1e293b';
    }
  }, [isDark]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
      let currentSection = 'home';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save scroll position before opening modal
  const openProjectModal = (projectId) => {
    setScrollPosition(window.scrollY);
    setSelectedProject(projectId);
    document.body.style.overflow = 'hidden';
  };

  // Restore scroll position when closing modal
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  const projects = [
    {
      id: 'nexttointern',
      title: 'NextToIntern',
      subtitle: 'Connecting students for internship prep and networking',
      category: 'Full-Stack',
      year: '2024',
      rating: '92%',
      status: 'Live',
      description: 'A platform that helps Lehigh students find internship preparation partners. Built with Next.js, Firebase, and AI-powered matching.',
      fullDescription: 'I built this because I was tired of seeing students struggle to find study partners for internship prep. The platform uses AI to match students based on their goals, availability, and preferences. In just 3 weeks, we had 70+ active users and over 120 posts.',
      problemStatement: 'Students at Lehigh were struggling to find peers with similar internship goals for preparation and practice. Most were studying alone or in random groups that didn\'t match their target roles or preparation style.',
      solutionApproach: 'I designed an intelligent matching system that connects students based on their target roles, preparation timeline, and availability. The platform features real-time chat, group formation tools, and gamified engagement to keep users active.',
      technicalImplementation: 'Built the frontend with Next.js and React for fast, responsive user experience. Used Firebase for authentication and real-time data storage. Integrated GPT-4 APIs to power the matching algorithm, which analyzes user profiles and suggests compatible study partners. Implemented Tailwind CSS for consistent, mobile-first design.',
      keyLearnings: 'This project taught me how to balance technical complexity with user experience. I learned that launching early and iterating based on user feedback is crucial - our initial matching algorithm was too complex, but user testing showed us what actually mattered to students.',
      tech: ['Next.js', 'Firebase', 'GPT-4', 'Tailwind CSS'],
      metrics: ['70+ users in 3 weeks', '120+ posts generated', '65% increase in session duration'],
      icon: <Users className="w-4 h-4 sm:w-5 md:w-6 lg:w-6" />,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center',
      github: 'https://github.com/efuayankey',
      featured: true
    },
    {
      id: 'aimes',
      title: 'AIMES Chatbot',
      subtitle: 'AI mental health support with cultural awareness',
      category: 'AI Research',
      year: '2025',
      rating: '89%',
      status: 'Research',
      description: 'A culturally adaptive mental health chatbot that understands different backgrounds and adjusts its responses accordingly.',
      fullDescription: 'This research project focused on making AI more culturally aware. I worked with psychology researchers to build a chatbot that adapts its tone and responses based on cultural context. We tested it with 30+ participants and saw significant improvements in user engagement.',
      problemStatement: 'Generic mental health chatbots often fail to connect with users from diverse cultural backgrounds because they don\'t understand cultural nuances in communication styles, values, and help-seeking behaviors.',
      solutionApproach: 'I developed a modular prompt engineering system that dynamically adjusts GPT-4 responses based on user cultural profiles. The system considers communication directness, family dynamics, and cultural attitudes toward mental health.',
      technicalImplementation: 'Built the core system with Python and integrated GPT-4 through OpenAI\'s API. Created a cultural profile database and response modification engine. Used Firebase for user data storage and React for the frontend interface. Implemented A/B testing framework to measure engagement differences.',
      keyLearnings: 'I learned that cultural sensitivity in AI requires both technical innovation and deep collaboration with domain experts. The most impactful improvements came from understanding subtle communication patterns rather than obvious cultural markers.',
      tech: ['Python', 'GPT-4', 'Firebase', 'React'],
      metrics: ['83% emotional connection increase', '78% cultural relevance improvement', '30+ participant study'],
      icon: <Brain className="w-4 h-4 sm:w-5 md:w-6 lg:w-6" />,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center',
      github: 'https://github.com/efuayankey',
      featured: false
    },
    {
      id: 'facefit',
      title: 'FaceFit',
      subtitle: 'AI-powered glasses recommendation system',
      category: 'Computer Vision',
      year: '2025',
      rating: '85%',
      status: 'Beta',
      description: 'Computer vision app that analyzes face shape and recommends glasses frames that actually look good on you.',
      fullDescription: 'Shopping for glasses online sucks because you never know how they\'ll look. I built a computer vision system that analyzes your face shape in real-time and recommends frames that complement your features. The system achieved 82% accuracy in classification.',
      problemStatement: 'Online glasses shopping is frustrating because customers can\'t effectively judge how frames will look on their face shape. Most people end up with ill-fitting glasses or avoid online purchases entirely, leading to poor user experience and lost sales.',
      solutionApproach: 'I developed a real-time computer vision system that captures facial landmarks, analyzes geometric ratios to classify face shapes, and matches users with frame styles that complement their features. The system provides instant recommendations with visual explanations.',
      technicalImplementation: 'Built using OpenCV and MediaPipe for real-time facial landmark detection, extracting 468 facial points per frame. Engineered custom features from distance ratios and angles, then trained a scikit-learn classifier on face shape categories. Integrated the ML pipeline with a React frontend for live camera analysis and recommendation display.',
      keyLearnings: 'This project taught me that computer vision accuracy isn\'t just about the model - user experience design is equally important. I learned to balance technical precision with practical usability, and discovered that explaining WHY a recommendation works builds user trust in AI systems.',
      tech: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-learn', 'React'],
      metrics: ['82% classification accuracy', '40% reduction in decision time', '90% user satisfaction'],
      icon: <Eye className="w-4 h-4 sm:w-5 md:w-6 lg:w-6" />,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center',
      github: 'https://github.com/efuayankey',
      featured: false
    },
    {
      id: 'lstm',
      title: 'Market Predictor',
      subtitle: 'LSTM model for stock market volatility forecasting',
      category: 'Machine Learning',
      year: '2024',
      rating: '78%',
      status: 'Training',
      description: 'A deep learning model that predicts market volatility using historical data and technical indicators.',
      fullDescription: 'Personal project exploring financial machine learning. I built an LSTM model that learns from market data to predict volatility patterns. The system includes automated data collection, model retraining, and performance tracking over 100+ trading days.',
      problemStatement: 'Financial markets are notoriously difficult to predict, but volatility patterns often contain exploitable signals. Traditional technical analysis methods struggle with the complexity and non-linear relationships in market data, missing subtle patterns that could inform trading strategies.',
      solutionApproach: 'I designed an LSTM neural network that processes sequential market data including OHLCV prices, rolling returns, and technical indicators. The model learns temporal dependencies and volatility clustering patterns, with automated retraining to adapt to changing market conditions.',
      technicalImplementation: 'Built with PyTorch for the LSTM architecture, using yfinance for automated data ingestion and NumPy for feature engineering. Implemented rolling window validation, automated backtesting framework, and real-time performance monitoring. Created custom loss functions optimized for volatility prediction rather than price prediction.',
      keyLearnings: 'This project deepened my understanding of time series modeling and the challenges of financial ML. I learned that feature engineering and data preprocessing are often more impactful than model complexity, and that rigorous backtesting is essential to avoid overfitting to historical patterns.',
      tech: ['PyTorch', 'Python', 'NumPy', 'Matplotlib', 'yfinance'],
      metrics: ['100+ day testing period', 'Automated retraining pipeline', 'Real-time performance tracking'],
      icon: <TrendingUp className="w-4 h-4 sm:w-5 md:w-6 lg:w-6" />,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center',
      github: 'https://github.com/efuayankey',
      featured: false
    },
    {
      id: 'nsmq',
      title: 'NSMQ Recruit',
      subtitle: 'Academic competition recruitment platform',
      category: 'Web Development',
      year: '2022',
      rating: '95%',
      status: 'Live',
      description: 'Platform for selecting academic competition teams with automated testing and ranking.',
      fullDescription: 'Built this for my old high school in Ghana to replace manual academic tryouts. The system handles timed quizzes, automatic scoring, and instructor analytics. It\'s been serving 100+ students since 2022 and reduced grading time by 95%.',
      problemStatement: 'My former school was manually conducting academic competition tryouts using paper tests, which was time-consuming, error-prone, and provided limited analytics. Teachers spent hours grading, students received delayed feedback, and the selection process lacked transparency and consistency.',
      solutionApproach: 'I built a comprehensive web-based assessment platform with timed quizzes, automatic scoring, and real-time leaderboards. The system includes role-based access for instructors and students, detailed performance analytics, and automated team selection based on customizable criteria.',
      technicalImplementation: 'Developed with React for the frontend interface and Firebase for backend services including authentication, real-time database, and cloud functions. Implemented secure quiz timing mechanisms, automatic scoring algorithms, and comprehensive analytics dashboard. Used Tailwind CSS for responsive, mobile-first design.',
      keyLearnings: 'This early project taught me the importance of understanding user workflows before building solutions. I learned that successful software isn\'t just about features - it\'s about solving real pain points efficiently. The project also showed me how technology can democratize access to fair, transparent selection processes.',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Cloud Functions'],
      metrics: ['95% grading time reduction', '100+ active users', '40% completion rate increase'],
      icon: <Target className="w-4 h-4 sm:w-5 md:w-6 lg:w-6" />,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=center',
      github: 'https://github.com/efuayankey',
      featured: false
    }
  ];

  const skillsData = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg' },
        { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg' },
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg' },
        { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg' }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg' },
        { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/firebase.svg' },
        { name: 'REST APIs', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/fastapi.svg' },
        { name: 'AWS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonwebservices.svg' }
      ]
    },
    {
      title: 'AI/ML',
      skills: [
        { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pytorch.svg' },
        { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg' },
        { name: 'OpenCV', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/opencv.svg' },
        { name: 'GPT-4', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg' }
      ]
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg' },
        { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg' },
        { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jupyter.svg' },
        { name: 'Linux', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linux.svg' }
      ]
    }
  ];

  const Navigation = () => (
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
                  onClick={() => scrollToSection(item.page)}
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

  // Home Page with full responsiveness
  const HomePage = () => (
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
            {['E', 'F', 'U', 'A', 'Y', 'A', 'N', 'K', 'E', 'Y'].map((letter, index) => (
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
      
      <style jsx>{`
        @keyframes smoothBounceInLeft {
          0% {
            opacity: 0;
            transform: translateX(-400px);
          }
          70% {
            opacity: 1;
            transform: translateX(15px);
          }
          85% {
            transform: translateX(-5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes smoothBounceInRight {
          0% {
            opacity: 0;
            transform: translateX(400px);
          }
          70% {
            opacity: 1;
            transform: translateX(-15px);
          }
          85% {
            transform: translateX(5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes colorFade {
          0% {
            opacity: 1;
            filter: brightness(1);
          }
          25% {
            opacity: 0.4;
            filter: brightness(0.6);
          }
          50% {
            opacity: 0.6;
            filter: brightness(0.8);
          }
          75% {
            opacity: 0.8;
            filter: brightness(0.9);
          }
          100% {
            opacity: 1;
            filter: brightness(1);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

  // Projects Page - Fully responsive
  const ProjectsPage = () => (
    <div className={`min-h-screen pt-20 sm:pt-24 pb-16 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My Projects
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            A collection of projects spanning AI research, computer vision, and full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 shadow-xl'
                  : 'bg-white hover:shadow-xl border border-gray-200'
              }`}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full ${
                    isDark 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {project.category}
                  </span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    project.status === 'Live' 
                      ? 'bg-green-100 text-green-700'
                      : project.status === 'Beta'
                      ? 'bg-yellow-100 text-yellow-700'
                      : project.status === 'Training'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {project.status}
                  </div>
                </div>
                
                <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {project.subtitle}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>
                    {project.year}
                  </span>
                  <div className={`flex items-center space-x-1 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                    {project.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center px-4">
          <a
            href="https://github.com/efuayankey"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base md:text-lg font-medium ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
            <span className="hidden sm:inline">View All Projects on GitHub</span>
            <span className="sm:hidden">View on GitHub</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );

  // Project Detail Modal - Fully responsive  
  const ProjectDetailModal = () => {
    const project = projects.find(p => p.id === selectedProject);
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

  // Skills Page - Fully responsive
  const SkillsPage = () => (
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
      
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUpStagger {
          from { opacity: 0; transform: translateY(50px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slideInSkill {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );

  // About Page - Fully responsive
  const AboutPage = () => (
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
      
      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes rotateBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  // Contact Form Component - Fully responsive
  const ContactForm = () => (
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

  // Contact Page - Fully responsive
  const ContactPage = () => (
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
              value: '@efuayankey',
              href: 'https://instagram.com/efuayankey'
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

  // Footer Component - Fully responsive
  const Footer = () => (
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

  return (
    <div className="min-h-screen transition-all duration-300">
      <Navigation />
      
      {/* Single-page scrollable content */}
      <main className="relative">
        {/* Home Section */}
        <section id="home">
          <HomePage />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutPage />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SkillsPage />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <div className={`pt-20 sm:pt-24 pb-16 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  My Projects
                </h1>
                <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  A collection of projects spanning AI research, computer vision, and full-stack development.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-slate-900 hover:bg-slate-800 shadow-xl'
                        : 'bg-white hover:shadow-xl border border-gray-200'
                    }`}
                    onClick={() => openProjectModal(project.id)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full ${
                          isDark 
                            ? 'bg-cyan-500/20 text-cyan-400' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {project.category}
                        </span>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          project.status === 'Live' 
                            ? 'bg-green-100 text-green-700'
                            : project.status === 'Beta'
                            ? 'bg-yellow-100 text-yellow-700'
                            : project.status === 'Training'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {project.status}
                        </div>
                      </div>
                      
                      <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {project.title}
                      </h3>
                      
                      <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                        {project.subtitle}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>
                          {project.year}
                        </span>
                        <div className={`flex items-center space-x-1 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                          {project.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center px-4">
                <a
                  href="https://github.com/efuayankey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base md:text-lg font-medium ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  <span className="hidden sm:inline">View All Projects on GitHub</span>
                  <span className="sm:hidden">View on GitHub</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume">
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
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactPage />
        </section>
      </main>

      <Footer />
      
      {/* Modals */}
      {showContactForm && <ContactForm />}
      {selectedProject && <ProjectDetailModal />}
    </div>
  );
};

export default App;