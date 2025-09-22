"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface FeatureSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
  index?: number
  metric?: string
  metricLabel?: string
}

export function FeatureSection({
  title,
  description,
  icon,
  delay = 0,
  index = 0,
  metric,
  metricLabel,
}: FeatureSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40])

  return (
    <section
      className="min-h-screen flex items-center justify-center relative px-6"
      ref={ref}
      aria-label={`Feature ${index + 1}: ${title}`}
    >
      <motion.div
        className="max-w-4xl w-full"
        style={{ opacity, y }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative border border-border/50 rounded-2xl bg-card/30 backdrop-blur-sm p-12 md:p-16">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.1}
            borderWidth={2}
            movementDuration={1.5}
          />

          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-foreground/20 rounded-tl-2xl" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                className="w-20 h-20 rounded-xl bg-muted/50 flex items-center justify-center text-foreground/80"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-foreground tracking-tight font-medium text-3xl">{title}</h2>
                <p className="text-muted-foreground leading-relaxed font-light text-sm">{description}</p>
              </div>
            </div>

            {metric && (
              <div className="text-center md:text-right">
                <div className="relative inline-block p-6 rounded-xl border border-border/30 bg-neutral-800">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={60}
                    inactiveZone={0.05}
                    borderWidth={1}
                    movementDuration={2}
                  />
                  <div className="text-4xl text-foreground mb-2 font-light tracking-tight md:text-4xl">{metric}</div>
                  <div className="text-muted-foreground uppercase tracking-wider font-normal font-mono text-xs">
                    {metricLabel}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-6 left-6">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground/60">
              <span>0{index + 1}</span>
              <div className="w-8 h-px bg-muted-foreground/20">
                <motion.div
                  className="h-full bg-foreground/40"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span>04</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
