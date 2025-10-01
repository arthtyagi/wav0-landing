"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { ThemeToggle } from "./theme-toggle"
import { HeatmapShaderBackground } from "./ui/heatmap-shader-background"
import HeroContent from "./hero-content"
import PulsingCircle from "./pulsing-circle"

export function HeroSection() {
  const ref = useRef(null)

  return (
    <section className="min-h-screen relative flex items-center justify-center p-4 md:p-8 bg-background" ref={ref}>
      <div className="relative w-full min-h-[80vh] md:w-[85vw] md:h-[75vh] md:max-w-5xl md:rounded-2xl md:border md:border-border overflow-hidden flex items-center justify-center">
        <HeatmapShaderBackground />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="px-8 md:px-16 w-full max-w-4xl relative z-20 flex items-center justify-center min-h-full"
        >
          <div className="w-full">
            <HeroContent />
          </div>
        </motion.div>

        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-40">
          <ThemeToggle />
        </div>
      </div>

      <PulsingCircle />
    </section>
  )
}
