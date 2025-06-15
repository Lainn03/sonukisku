"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import portfolioData from "@/data/portfolio.json"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation activeSection={activeSection} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <HeroSection data={portfolioData.personal} />
        <AboutSection data={portfolioData.about} services={portfolioData.services} />
        <ProjectsSection projects={portfolioData.projects} />
        <ContactSection personal={portfolioData.personal} socialMedia={portfolioData.socialMedia} />
      </motion.div>
    </div>
  )
}
