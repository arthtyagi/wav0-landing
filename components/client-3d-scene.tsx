"use client"

import dynamic from "next/dynamic"
import { ErrorBoundary } from "react-error-boundary"
import { useEffect, useState } from "react"

const Scroll3DScene = dynamic(
  () => import("@/components/scroll-3d-scene").then((mod) => ({ default: mod.Scroll3DScene })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-gradient-to-br from-background via-background/80 to-background" />,
  },
)

function ErrorFallback() {
  return <div className="fixed inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
}

export function Client3DScene() {
  const [isClient, setIsClient] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(false)

  useEffect(() => {
    setIsClient(true)

    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  if (!isClient || !hasWebGL) {
    return <div className="fixed inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error("[v0] 3D Scene Error:", error)
      }}
    >
      <Scroll3DScene />
    </ErrorBoundary>
  )
}
