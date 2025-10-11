"use client"

import { Water } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

export function WaterShaderBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
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

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <Water
          width={dimensions.width}
          height={dimensions.height}
          colorBack="#000000"
          colorHighlight="#3265e7"
          highlights={0.3}
          layering={0.5}
          edges={0.4}
          waves={0.6}
          caustic={0.7}
          effectScale={1.5}
          scale={1}
          speed={0.2}
          fit="cover"
        />
      </div>
    </div>
  )
}
