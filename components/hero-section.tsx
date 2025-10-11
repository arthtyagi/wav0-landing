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
    <section className="min-h-screen relative flex items-center justify-center p-6 md:p-12 bg-background" ref={ref}>
      <div className="relative w-full min-h-[85vh] md:w-[90vw] md:h-[80vh] md:max-w-6xl md:rounded-3xl md:border md:border-border overflow-hidden flex items-center justify-center">
        <HeatmapShaderBackground />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="px-8 md:px-20 w-full max-w-5xl relative z-20 flex items-center justify-center min-h-full"
        >
          <div className="w-full">
            <HeroContent />
          </div>
        </motion.div>

        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-40">
          <ThemeToggle />
        </div>
      </div>

      <PulsingCircle />
    </section>
  )
}
