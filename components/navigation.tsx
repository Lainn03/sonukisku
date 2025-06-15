"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
    activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" },
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
                        >
                            Sonu Kisku.
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                                        activeSection === item.id ? "text-purple-400" : "text-white/70 hover:text-white"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 md:hidden"
                >
                    <div className="container mx-auto px-4 py-4">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`block w-full text-left px-3 py-3 text-sm font-medium transition-colors ${
                                    activeSection === item.id ? "text-purple-400" : "text-white/70 hover:text-white"
                                }`}
                                whileHover={{ x: 10 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </>
    );
}
