"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { MessageCircle, ArrowRight, AudioWaveformIcon } from "lucide-react"

export function ChatPill() {
  const { scrollYProgress } = useScroll()

  const width = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["60px", "120px", "320px", "360px"])
  const height = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["60px", "60px", "52px", "52px"])
  const borderRadius = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["30px", "30px", "26px", "26px"])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.6, 0.8, 0.9, 1])

  return (
    <motion.button
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-xl border border-border flex items-center justify-start z-50 cursor-pointer transition-all duration-200 hover:bg-card hover:border-border/50 focus:bg-card focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black px-3 sm:px-4 bg-secondary max-w-[calc(100vw-2rem)] min-h-[44px] touch-manipulation"
      style={{
        width,
        height,
        borderRadius,
        opacity,
        WebkitTapHighlightColor: "rgba(255, 255, 255, 0.1)",
      }}
      aria-label="View open-source music studio on GitHub"
      onClick={() => window.open("https://github.com", "_blank", "noopener,noreferrer")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          window.open("https://github.com", "_blank", "noopener,noreferrer")
        }
      }}
    >
      <motion.div className="flex items-center w-full h-full relative overflow-hidden">
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 text-foreground"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
          }}
          aria-hidden="true"
        >
          <MessageCircle size={24} />
        </motion.span>
        <motion.div
          className="flex items-center justify-between w-full absolute left-0 right-0 px-2 sm:px-4"
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.7], [0, 1]),
          }}
        >
          <div className="flex items-center gap-2">
            <AudioWaveformIcon size={16} className="text-foreground/60" aria-hidden="true" />
            <span className="text-xs sm:text-sm text-foreground/80 font-medium whitespace-nowrap text-left tracking-tight truncate">
              Create with WAV0  
            </span>
          </div>
          <motion.span
            className="text-muted-foreground ml-2 flex-shrink-0"
            style={{
              opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
            }}
            aria-hidden="true"
          >
            <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
