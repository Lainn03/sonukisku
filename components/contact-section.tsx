"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Youtube, Instagram, Linkedin, Twitter, Video } from "lucide-react"
import { useState } from "react"

interface ContactSectionProps {
  personal: {
    email: string
    phone: string
    location: string
  }
  socialMedia: Array<{
    platform: string
    url: string
    icon: string
  }>
}

const iconMap = {
  youtube: Youtube,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  video: Video,
}

export default function ContactSection({ personal, socialMedia }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
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
                Let's Work Together
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ready to bring your vision to life? Get in touch and let's create something extraordinary together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Details */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Email</p>
                        <p className="text-white font-medium">{personal.email}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Phone</p>
                        <p className="text-white font-medium">{personal.phone}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Location</p>
                        <p className="text-white font-medium">{personal.location}</p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.map((social, index) => {
                      const IconComponent = iconMap[social.icon as keyof typeof iconMap]
                      return (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-all duration-300 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconComponent className="h-5 w-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                          <span className="text-white/80 group-hover:text-white transition-colors">
                            {social.platform}
                          </span>
                        </motion.a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <motion.div
                className="text-center p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-xl font-bold text-white mb-4">Ready to Start Your Project?</h4>
                <p className="text-white/70 mb-6">
                  Let's discuss your vision and bring it to life with professional video editing.
                </p>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                  onClick={() => window.open(`mailto:${personal.email}`, "_blank")}
                >
                  Start a Project
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
