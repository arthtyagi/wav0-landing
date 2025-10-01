"use client"

import { Heatmap } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

export const HeatmapShaderBackground = () => {
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 })

  useEffect(() => {
    setIsClient(true)

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  if (!isClient) {
    return <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-900 to-black" />
  }

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-full h-full [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:object-cover">
        <Heatmap
          width={dimensions.width}
          height={dimensions.height}
          image="/logo-wav0.svg"
          colors={["#8c8c8c", "#ffffff", "#3265e7", "#6bd8ff", "#ffe77a"]}
          colorBack="#000000"
          contour={0.5}
          angle={0}
          noise={0.75}
          innerGlow={0.5}
          outerGlow={0.5}
          speed={0.5}
          scale={0.75}
          rotation={0}
          offsetX={0}
          offsetY={0}
        />
      </div>
    </div>
  )
}
