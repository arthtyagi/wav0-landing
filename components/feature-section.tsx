"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

interface FeatureSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
  index?: number
  metric?: string
  metricLabel?: string
}

export function FeatureSection({ title, description, index = 0 }: FeatureSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40])

  return (
    <motion.div ref={ref} className="w-full" style={{ opacity, y }}>
      <div className="border border-border/50 rounded-lg p-8 bg-background/50 backdrop-blur-sm hover:border-border transition-colors">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl font-mono text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground font-mono">0{index + 1}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
