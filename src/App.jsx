import { useState } from 'react';

import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ProjectDetailModal from './components/modals/ProjectDetailModal';
import ContactForm from './components/modals/ContactForm';

import HomePage from './components/sections/HomePage';
import AboutPage from './components/sections/AboutPage';
import ExperiencePage from './components/sections/ExperiencePage';
import SkillsPage from './components/sections/SkillsPage';
import ProjectsPage from './components/sections/ProjectsPage';
import ContactPage from './components/sections/ContactPage';

import { projects } from './data/projects';
import { useScrollSpy } from './hooks/useScrollSpy';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { activeSection, scrollToSection } = useScrollSpy();

  const openProjectModal = (projectId) => {
    setScrollPosition(window.scrollY);
    setSelectedProject(projectId);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    setTimeout(() => window.scrollTo(0, scrollPosition), 0);
  };

  const handleScrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      <CustomCursor />

      <Navigation
        activeSection={activeSection}
        scrollToSection={handleScrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main>
        <section id="home">
          <HomePage scrollToSection={handleScrollToSection} />
        </section>

        <section id="about">
          <AboutPage />
        </section>

        <section id="experience">
          <ExperiencePage />
        </section>

        <section id="projects">
          <ProjectsPage openProjectModal={openProjectModal} />
        </section>

        <section id="skills">
          <SkillsPage />
        </section>

        <section id="contact">
          <ContactPage setShowContactForm={setShowContactForm} />
        </section>
      </main>

      <Footer />

      {selectedProject && selectedProjectData && (
        <ProjectDetailModal
          project={selectedProjectData}
          closeProjectModal={closeProjectModal}
          isDark={true}
        />
      )}

      {showContactForm && (
        <ContactForm
          setShowContactForm={setShowContactForm}
          isDark={true}
        />
      )}
    </div>
  );
};

export default App;
