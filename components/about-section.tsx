"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Film, Zap, Palette, Volume2 } from "lucide-react"

interface AboutSectionProps {
  data: {
    description: string
    skills: string[]
    experience: string
    projectsCompleted: string
    clientsSatisfied: string
  }
  services: Array<{
    title: string
    description: string
    icon: string
  }>
}

const iconMap = {
  film: Film,
  zap: Zap,
  palette: Palette,
  volume2: Volume2,
}

export default function AboutSection({ data, services }: AboutSectionProps) {
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
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-8 mb-16">
            {[
              { label: "Experience", value: data.experience },
              { label: "Projects Completed", value: data.projectsCompleted },
              // { label: "Clients Satisfied", value: data.clientsSatisfied },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-lg text-white/80 leading-relaxed text-center">{data.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">What I Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap]
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="bg-black/30 border-white/20 backdrop-blur-sm h-full">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                        <p className="text-white/70 text-sm">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">Skills & Tools</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
