"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function DynamicBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.05, 0.15, 0.25, 0.2, 0.3, 0.4])
  const accentOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
    [0, 0.2, 0.4, 0.6, 0.5, 0.7, 0.8],
  )

  const gridX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 150])
  const gridY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 75, 200])
  const gridRotation = useTransform(scrollYProgress, [0, 1], [0, 2])

  const glitchOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.05, 0.15, 0.08, 0.2, 0.12, 0.25],
  )
  const dataStreamY = useTransform(scrollYProgress, [0, 1], [0, -400])
  const circuitOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0.15, 0.35, 0.45])

  const floatingElementsY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const sophisticatedOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.02, 0.08, 0.12, 0.15, 0.2])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" ref={containerRef}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/30"
        style={{ y: backgroundY }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          x: gridX,
          y: gridY,
          rotate: gridRotation,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: circuitOpacity,
          y: dataStreamY,
        }}
      >
        {/* Vertical data streams with varying intensities */}
        <div className="absolute top-0 left-1/6 w-px h-full bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        <div className="absolute top-0 left-2/6 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <div className="absolute top-0 left-3/6 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 left-4/6 w-px h-full bg-gradient-to-b from-transparent via-white/12 to-transparent" />
        <div className="absolute top-0 left-5/6 w-px h-full bg-gradient-to-b from-transparent via-white/18 to-transparent" />

        {/* Horizontal circuit lines with varying positions */}
        <div className="absolute top-1/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute top-2/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-3/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        <div className="absolute bottom-1/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ opacity: accentOpacity, y: floatingElementsY }}>
        {/* Enhanced accent elements with more variety */}
        <motion.div
          className="absolute top-16 left-16 w-3 h-3 bg-white/30 rounded-full blur-sm"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-24 right-24 w-1 h-12 bg-white/25 opacity-40"
          animate={{
            scaleY: [1, 2, 1],
            opacity: [0.05, 0.3, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        <motion.div
          className="absolute bottom-32 left-20 w-12 h-1 bg-white/20 opacity-30"
          animate={{
            scaleX: [1, 2.5, 1],
            opacity: [0.02, 0.25, 0.02],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* Enhanced corner brackets with more sophistication */}
        <div className="absolute top-12 left-12 w-10 h-10 border-l-2 border-t-2 border-white/15" />
        <div className="absolute top-12 right-12 w-10 h-10 border-r-2 border-t-2 border-white/12" />
        <div className="absolute bottom-12 left-12 w-10 h-10 border-l-2 border-b-2 border-white/10" />
        <div className="absolute bottom-12 right-12 w-10 h-10 border-r-2 border-b-2 border-white/20" />

        {/* Additional sophisticated floating elements */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-2 h-2 bg-white/25 rounded-full"
          animate={{
            y: [-30, 30, -30],
            opacity: [0.05, 0.3, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-2/3 right-1/5 w-4 h-4 border border-white/20 rounded-sm"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-6 h-1 bg-white/15"
          animate={{
            scaleX: [1, 1.8, 1],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ opacity: glitchOpacity }}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_97%,rgba(255,255,255,0.08)_100%)] bg-[size:120px_3px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_98%,rgba(255,255,255,0.05)_100%)] bg-[size:3px_100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_99%,rgba(255,255,255,0.04)_100%)] bg-[size:80px_80px]" />
      </motion.div>

      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: sophisticatedOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)",
          y: useTransform(scrollYProgress, [0, 1], [0, 75]),
        }}
      />
    </div>
  )
}
