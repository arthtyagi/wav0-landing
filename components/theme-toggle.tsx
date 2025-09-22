"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "motion/react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-8 right-8 z-50 bg-card/80 backdrop-blur-xl border border-border rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-card hover:border-border/50 hover:scale-105"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="relative w-5 h-5"
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sun className="absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 dark:opacity-0 dark:scale-0" />
        <Moon className="absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 opacity-0 scale-0 dark:opacity-100 dark:scale-100" />
      </motion.div>
    </motion.button>
  )
}
