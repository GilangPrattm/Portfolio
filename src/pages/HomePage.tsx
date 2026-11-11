import React from 'react'
import { HeroSection } from '../sections/HeroSection'
import { AboutSection } from '../sections/AboutSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { ContactSection } from '../sections/ContactSection'

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}

export default HomePage
