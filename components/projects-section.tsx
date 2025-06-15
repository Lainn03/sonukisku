"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface Project {
  id: number
  title: string
  description: string
  youtubeId: string
  category: string
  duration: string
  tags: string[]
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  // Get unique categories from projects
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

  // Filter projects whenever selectedCategory changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory))
    }
  }, [selectedCategory, projects])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Explore my latest video editing projects showcasing creativity, technical skill, and storytelling
              excellence.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {projects.filter((p) => p.category === category).length}
                  </span>
                )}
                {category === "All" && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">{projects.length}</span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key={selectedCategory} // Force re-render when category changes
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${selectedCategory}-${project.id}`} // Unique key for animations
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group">
                  <CardContent className="p-0">
                    {/* YouTube Video Embed */}
                    <div className="relative aspect-video bg-gray-800 overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
                        title={project.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-white/10"
                        >
                          {project.category}
                        </Badge>
                        <div className="flex items-center text-white/60 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {project.duration}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-white/60 text-lg">No projects found in this category.</p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-white/70 text-lg mb-6">Interested in working together on your next project?</p>
            <motion.button
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Create Something Amazing
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
