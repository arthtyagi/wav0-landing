"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo, useState, useEffect } from "react"
import { useScroll, motion } from "framer-motion"
import type * as THREE from "three"
import { useTheme } from "next-themes"

const SpaceshipPanel = ({
  position,
  scrollProgress,
  index,
}: {
  position: [number, number, number]
  scrollProgress: number
  index: number
}) => {
  const ref = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime

      // Smooth assembly animation based on scroll
      const assemblyProgress = Math.min(scrollProgress * 1.5, 1)
      const angle = (index / 8) * Math.PI * 2
      const targetRadius = 0.5
      const startRadius = 4
      const currentRadius = startRadius - (startRadius - targetRadius) * assemblyProgress

      ref.current.position.x = Math.cos(angle) * currentRadius
      ref.current.position.z = Math.sin(angle) * currentRadius
      ref.current.position.y = position[1] + Math.sin(time * 0.3 + index) * 0.1

      // Smooth rotation as parts come together
      ref.current.rotation.y = time * 0.1 + angle
      ref.current.rotation.x = (1 - assemblyProgress) * Math.PI * 0.5
    }
  })

  const panelColor = safeTheme === "dark" ? "#E0F0FF" : "#6A8FC5"

  return (
    <group ref={ref} position={position}>
      {/* Main panel */}
      <mesh>
        <boxGeometry args={[1.5, 0.05, 1]} />
        <meshBasicMaterial color={panelColor} transparent opacity={0.8} />
      </mesh>

      {/* Panel details */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[1.3, 0.02, 0.8]} />
        <meshBasicMaterial color={safeTheme === "dark" ? "#FFFFFF" : "#000000"} transparent opacity={0.3} />
      </mesh>

      {/* Corner bolts */}
      {[
        [-0.6, 0, -0.4],
        [0.6, 0, -0.4],
        [-0.6, 0, 0.4],
        [0.6, 0, 0.4],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 0.06, 8]} />
          <meshBasicMaterial color="#40E2FF" />
        </mesh>
      ))}
    </group>
  )
}

const SpaceshipCore = ({ scrollProgress }: { scrollProgress: number }) => {
  const ref = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      ref.current.rotation.y = time * 0.05

      // Gentle pulse
      const pulse = 1 + Math.sin(time * 0.5) * 0.02
      ref.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={ref}>
      {/* Central core */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 8]} />
        <meshBasicMaterial color={safeTheme === "dark" ? "#FFFFFF" : "#000000"} transparent opacity={0.9} wireframe />
      </mesh>

      {/* Energy rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, i * 0.5 - 0.5, 0]}>
          <torusGeometry args={[0.4 + i * 0.1, 0.02, 8, 16]} />
          <meshBasicMaterial color="#40E2FF" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

const SpaceshipStrut = ({
  position,
  scrollProgress,
  index,
}: {
  position: [number, number, number]
  scrollProgress: number
  index: number
}) => {
  const ref = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime

      // Assembly animation
      const assemblyProgress = Math.min(scrollProgress * 1.5, 1)
      const angle = (index / 4) * Math.PI * 2
      const targetRadius = 1.2
      const startRadius = 5
      const currentRadius = startRadius - (startRadius - targetRadius) * assemblyProgress

      ref.current.position.x = Math.cos(angle) * currentRadius
      ref.current.position.z = Math.sin(angle) * currentRadius
      ref.current.position.y = position[1]

      ref.current.rotation.y = angle
      ref.current.rotation.z = (1 - assemblyProgress) * Math.PI * 0.25
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshBasicMaterial color={safeTheme === "dark" ? "#E0F0FF" : "#6A8FC5"} transparent opacity={0.9} />
      </mesh>

      {/* Strut connectors */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial color="#40E2FF" />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial color="#40E2FF" />
      </mesh>
    </group>
  )
}

function Scene() {
  const { scrollYProgress } = useScroll()
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  const scrollProgress = scrollYProgress?.get() || 0

  useFrame(({ camera }) => {
    if (!camera) return

    const time = Date.now() * 0.001
    // Smooth camera movement
    camera.position.y = 2 + scrollProgress * 2
    camera.position.z = 10 - scrollProgress * 3
    camera.position.x = Math.sin(time * 0.1) * 0.5
    camera.lookAt(0, 0, 0)
  })

  const panels = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => (
      <SpaceshipPanel key={`panel-${i}`} position={[0, 0, 0]} scrollProgress={scrollProgress} index={i} />
    ))
  }, [scrollProgress])

  const struts = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => (
      <SpaceshipStrut key={`strut-${i}`} position={[0, 0, 0]} scrollProgress={scrollProgress} index={i} />
    ))
  }, [scrollProgress])

  return (
    <>
      <SpaceshipCore scrollProgress={scrollProgress} />
      {panels}
      {struts}

      {/* Minimal lighting */}
      <ambientLight intensity={1.5} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#40E2FF" />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#FFFFFF" />
    </>
  )
}

export function Scroll3DScene() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const safeTheme = theme || "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  try {
    return (
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      >
        <Canvas
          gl={{ antialias: true, alpha: true }}
          className="transition-colors duration-1000"
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            if (gl && gl.setPixelRatio) {
              gl.setPixelRatio(0.8)
            }
          }}
        >
          <Scene />
        </Canvas>
      </motion.div>
    )
  } catch (error) {
    console.error("[v0] 3D Scene error:", error)
    return null
  }
}
