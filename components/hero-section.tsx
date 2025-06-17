"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
    data: {
        name: string;
        title: string;
        tagline: string;
    };
}

export default function HeroSection({ data }: HeroSectionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        // Hide cursor after typewriter animation completes
        const timer = setTimeout(() => {
            setShowCursor(false);
        }, 3500); // 1s delay + 2s animation + 0.5s buffer

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle system
        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            color: string;
            type: "circle" | "triangle" | "square";
        }> = [];

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.5 ? "#a855f7" : "#ec4899",
                type: ["circle", "triangle", "square"][Math.floor(Math.random() * 3)] as "circle" | "triangle" | "square",
            });
        }

        // Floating geometric shapes
        const shapes: Array<{
            x: number;
            y: number;
            rotation: number;
            rotationSpeed: number;
            size: number;
            opacity: number;
            color: string;
            type: "triangle" | "square" | "hexagon";
        }> = [];

        for (let i = 0; i < 15; i++) {
            shapes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                size: Math.random() * 40 + 20,
                opacity: Math.random() * 0.1 + 0.05,
                color: Math.random() > 0.5 ? "#a855f7" : "#ec4899",
                type: ["triangle", "square", "hexagon"][Math.floor(Math.random() * 3)] as "triangle" | "square" | "hexagon",
            });
        }

        // Draw functions
        const drawCircle = (x: number, y: number, size: number, color: string, opacity: number) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        const drawTriangle = (x: number, y: number, size: number, color: string, opacity: number, rotation = 0) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(-size * 0.866, size * 0.5);
            ctx.lineTo(size * 0.866, size * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const drawSquare = (x: number, y: number, size: number, color: string, opacity: number, rotation = 0) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.fillRect(-size / 2, -size / 2, size, size);
            ctx.restore();
        };

        const drawHexagon = (x: number, y: number, size: number, color: string, opacity: number, rotation = 0) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const px = Math.cos(angle) * size;
                const py = Math.sin(angle) * size;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                if (particle.type === "circle") {
                    drawCircle(particle.x, particle.y, particle.size, particle.color, particle.opacity);
                } else if (particle.type === "triangle") {
                    drawTriangle(particle.x, particle.y, particle.size, particle.color, particle.opacity);
                } else {
                    drawSquare(particle.x, particle.y, particle.size, particle.color, particle.opacity);
                }
            });

            // Update and draw shapes
            shapes.forEach((shape) => {
                shape.rotation += shape.rotationSpeed;

                if (shape.type === "triangle") {
                    drawTriangle(shape.x, shape.y, shape.size, shape.color, shape.opacity, shape.rotation);
                } else if (shape.type === "square") {
                    drawSquare(shape.x, shape.y, shape.size, shape.color, shape.opacity, shape.rotation);
                } else {
                    drawHexagon(shape.x, shape.y, shape.size, shape.color, shape.opacity, shape.rotation);
                }
            });

            // Draw connecting lines between nearby particles
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = ((100 - distance) / 100) * 0.1;
                        ctx.strokeStyle = "#a855f7";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const scrollToProjects = () => {
        const element = document.getElementById("projects");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToContact = () => {
        const element = document.getElementById("contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                style={{ background: "linear-gradient(135deg, #0f0f23 0%, #1a0b2e 50%, #16213e 100%)" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 z-5 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
                        backgroundSize: "50px 50px",
                        animation: "grid-move 20s linear infinite",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                    {/* Animated Title */}
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                            style={{
                                backgroundSize: "200% 200%",
                            }}
                        >
                            {data.name}
                        </motion.span>
                    </motion.h1>

                    {/* Subtitle with typewriter effect */}
                    <motion.h2
                        className="text-xl md:text-2xl lg:text-3xl font-light mb-6 text-white/90"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            transition={{ duration: 2, delay: 1 }}
                            className={`inline-block overflow-hidden whitespace-nowrap ${showCursor ? "border-r-2 border-purple-400" : ""}`}
                        >
                            {data.title}
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/70"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {data.tagline}
                    </motion.p>

                    {/* Animated Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                onClick={scrollToProjects}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-purple-500/25"
                            >
                                <Play className="mr-2 h-5 w-5" />
                                View My Work
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={scrollToContact}
                                className="border-white/30 text-black z-10 hover:bg-white/10 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Get In Touch
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Floating Action Indicators */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
                        onClick={scrollToProjects}
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes grid-move {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(50px, 50px);
                    }
                }
            `}</style>
        </section>
    );
}
