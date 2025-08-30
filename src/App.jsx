import { useState, useEffect } from 'react';

// Components
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import ProjectDetailModal from './components/modals/ProjectDetailModal';
import ContactForm from './components/modals/ContactForm';
import HomePage from './components/sections/HomePage';
import AboutPage from './components/sections/AboutPage';
import SkillsPage from './components/sections/SkillsPage';
import ProjectsPage from './components/sections/ProjectsPage';
import ResumePage from './components/sections/ResumePage';
import ContactPage from './components/sections/ContactPage';

// Data
import { projects } from './data/projects';

// Hooks
import { useScrollSpy } from './hooks/useScrollSpy';

const App = () => {
  // Theme and UI state
  const [isDark, setIsDark] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Custom hook for scroll spy functionality
  const { activeSection, scrollToSection } = useScrollSpy();

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = '#020617';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1e293b';
    }
  }, [isDark]);

  // Project modal functions
  const openProjectModal = (projectId) => {
    setScrollPosition(window.scrollY);
    setSelectedProject(projectId);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  // Enhanced scroll function that closes mobile menu
  const handleScrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  // Get selected project object
  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen transition-all duration-300">
      <Navigation 
        isDark={isDark}
        setIsDark={setIsDark}
        activeSection={activeSection}
        scrollToSection={handleScrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Single-page scrollable content */}
      <main className="relative">
        {/* Home Section */}
        <section id="home">
          <HomePage 
            isDark={isDark} 
            scrollToSection={handleScrollToSection}
          />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutPage isDark={isDark} />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SkillsPage isDark={isDark} />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsPage 
            isDark={isDark} 
            openProjectModal={openProjectModal}
          />
        </section>

        {/* Resume Section */}
        <section id="resume">
          <ResumePage isDark={isDark} />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactPage 
            isDark={isDark} 
            setShowContactForm={setShowContactForm}
          />
        </section>
      </main>

      <Footer isDark={isDark} />
      
      {/* Modals */}
      {showContactForm && (
        <ContactForm 
          isDark={isDark} 
          setShowContactForm={setShowContactForm} 
        />
      )}
      
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProjectData}
          isDark={isDark} 
          closeProjectModal={closeProjectModal}
        />
      )}
    </div>
  );
};

export default App;