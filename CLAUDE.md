# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite dev server with hot module replacement
- **Build**: `npm run build` - Creates production build using Vite
- **Lint**: `npm run lint` - Runs ESLint on the codebase
- **Preview**: `npm run preview` - Preview production build locally

## Project Architecture

This is a React portfolio website built with modern web technologies:

### Tech Stack
- **Frontend Framework**: React 19+ with JSX
- **Build Tool**: Vite 7+ for fast development and optimized builds
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Linting**: ESLint with React hooks and refresh plugins

### Code Structure
- **Single Page Application**: The entire application is contained in `src/App.jsx` as a comprehensive React component
- **State Management**: Uses React hooks (useState, useEffect) for local state management
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Dark/Light Theme**: Dynamic theme switching with body style manipulation
- **Page Navigation**: Client-side routing through state management (currentPage state)

### Key Features
- Animated name display on homepage with staggered letter animations
- Project showcase with detailed project pages
- Skills display with technology logos
- Contact form modal
- Mobile-responsive navigation with hamburger menu
- Theme persistence through local state

### Component Architecture
The app uses a single-component architecture with internal functions for different pages:
- `HomePage()` - Landing page with animated name and intro
- `ProjectsPage()` - Grid display of projects
- `ProjectDetailPage()` - Detailed view of individual projects
- `SkillsPage()` - Technology skills organized by category
- `AboutPage()` - Personal information and photo
- `ContactPage()` - Contact information and form modal
- `Navigation()` - Header navigation component
- `Footer()` - Site footer
- `ContactForm()` - Modal contact form

### Styling Approach
- Tailwind CSS classes for all styling
- Conditional classes based on dark/light theme state
- Custom CSS animations defined in `<style jsx>` blocks
- Mobile-first responsive design with sm:, md:, lg: breakpoints
- Gradient backgrounds and hover effects for interactive elements

### Data Structure
- Projects are stored as a static array with detailed metadata including tech stack, metrics, and descriptions
- Skills organized in categories (Frontend, Backend, AI/ML, Tools) with logo URLs
- All external links point to social profiles and GitHub

## Development Guidelines

- The application uses ESLint with React-specific rules and unused variable handling
- All styling should use Tailwind CSS utilities rather than custom CSS
- New features should maintain the mobile-first responsive design approach
- Icons should use Lucide React library for consistency
- External dependencies are minimal by design - avoid adding unnecessary packages