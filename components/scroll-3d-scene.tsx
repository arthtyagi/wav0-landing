"use client"

import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { useRef, useMemo, useState, useEffect } from "react"
import { useTransform, useScroll, motion } from "framer-motion"
import type * as THREE from "three"
import { useTheme } from "next-themes"

const INDUSTRIAL_COLORS = {
  steel: "#E0F0FF",
  gunmetal: "#6A8FC5",
  chrome: "#FFFFFF",
  accent_red: "#FF6777",
  accent_blue: "#40E2FF",
  accent_green: "#40FFA8",
}

const PSYCHEDELIC_COLORS = {
  neon_pink: "#FF40A0",
  electric_blue: "#40FFFF",
  acid_green: "#40FF40",
  cosmic_purple: "#CA40FF",
  solar_orange: "#FF8640",
  mystic_teal: "#40FFCA",
  tribal_gold: "#FFFF40",
  shamanic_red: "#FF4060",
}

const HieroglyphicSymbol = ({
  position,
  scrollProgress,
  index,
  symbolType,
}: {
  position: [number, number, number]
  scrollProgress: number
  index: number
  symbolType: "ankh" | "eye" | "pyramid" | "spiral"
}) => {
  const ref = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      const explosionForce = scrollProgress * 2

      const angle = index * 0.618 * Math.PI * 2
      const distance = 0.8 + explosionForce
      ref.current.position.x = position[0] + Math.cos(angle) * distance
      ref.current.position.z = position[2] + Math.sin(angle) * distance
      ref.current.position.y = position[1] + Math.sin(time + index) * explosionForce * 0.1

      ref.current.rotation.y = time * 0.3 + scrollProgress * 1
      ref.current.rotation.x = scrollProgress * 0.8

      const scale = 1 + scrollProgress * 0.3
      ref.current.scale.setScalar(scale)
    }
  })

  const getSymbolGeometry = () => {
    const symbolColor = safeTheme === "dark" ? "#40FFFF" : "#FF40A0"

    switch (symbolType) {
      case "ankh":
        return (
          <>
            <mesh position={[0, 0.5, 0]}>
              <torusGeometry args={[0.3, 0.05, 8, 16]} />
              <meshBasicMaterial color={symbolColor} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.1, 1, 0.1]} />
              <meshBasicMaterial color={symbolColor} />
            </mesh>
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[0.6, 0.1, 0.1]} />
              <meshBasicMaterial color={symbolColor} />
            </mesh>
          </>
        )
      case "eye":
        return (
          <>
            <mesh>
              <sphereGeometry args={[0.4, 8, 6]} />
              <meshBasicMaterial color={symbolColor} wireframe />
            </mesh>
            <mesh position={[0, 0, 0.35]}>
              <sphereGeometry args={[0.15, 6, 4]} />
              <meshBasicMaterial color={PSYCHEDELIC_COLORS.neon_pink} />
            </mesh>
          </>
        )
      case "pyramid":
        return (
          <mesh>
            <coneGeometry args={[0.5, 0.8, 4]} />
            <meshBasicMaterial color={symbolColor} />
          </mesh>
        )
      case "spiral":
        return (
          <>
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * Math.PI * 2
              const radius = 0.1 + i * 0.05
              const x = Math.cos(angle) * radius
              const z = Math.sin(angle) * radius
              const y = i * 0.1 - 0.4
              return (
                <mesh key={i} position={[x, y, z]}>
                  <sphereGeometry args={[0.05, 4, 4]} />
                  <meshBasicMaterial color={Object.values(PSYCHEDELIC_COLORS)[i % 8]} />
                </mesh>
              )
            })}
          </>
        )
    }
  }

  return (
    <group ref={ref} position={position}>
      {getSymbolGeometry()}
    </group>
  )
}

const IndustrialBlock = ({
  position,
  scrollProgress,
  index,
  blockType,
}: {
  position: [number, number, number]
  scrollProgress: number
  index: number
  blockType: "cube" | "cylinder" | "octahedron"
}) => {
  const ref = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  const getBlockColor = () => {
    if (index % 7 === 0) return INDUSTRIAL_COLORS.accent_red
    if (index % 11 === 0) return INDUSTRIAL_COLORS.accent_blue
    if (index % 13 === 0) return INDUSTRIAL_COLORS.accent_green
    return safeTheme === "dark" ? "#F0FFFF" : "#4A6FA5"
  }

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      const explosionForce = scrollProgress * 1.5

      const angle = index * 0.618 * Math.PI * 2
      const distance = 0.6 + explosionForce
      ref.current.position.x = position[0] + Math.cos(angle) * distance
      ref.current.position.z = position[2] + Math.sin(angle) * distance
      ref.current.position.y = position[1] + Math.sin(time + index) * explosionForce * 0.1

      ref.current.rotation.x = time * 0.3 + scrollProgress * 1
      ref.current.rotation.y = time * 0.2 + index * 0.1
      ref.current.rotation.z = time * 0.1 + scrollProgress * 0.8

      const scale = 1 + scrollProgress * 0.5
      ref.current.scale.setScalar(scale)
    }
  })

  const getGeometry = () => {
    switch (blockType) {
      case "cube":
        return <boxGeometry args={[0.6, 0.6, 0.6]} />
      case "cylinder":
        return <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />
      default:
        return <octahedronGeometry args={[0.4, 0]} />
    }
  }

  return (
    <mesh ref={ref} position={position}>
      {getGeometry()}
      <meshBasicMaterial color={getBlockColor()} transparent opacity={0.95} />
    </mesh>
  )
}

const IndustrialCore = ({ scrollProgress }: { scrollProgress: number }) => {
  const ref = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime

      ref.current.rotation.x = time * 0.1 + scrollProgress * 0.8
      ref.current.rotation.y = time * 0.2 + scrollProgress * 1
      ref.current.rotation.z = time * 0.05 + scrollProgress * 0.5

      const pulse = 1 + Math.sin(time * 2) * 0.1
      const scrollScale = 1 + scrollProgress * 0.8
      ref.current.scale.setScalar(pulse * scrollScale)
    }
  })

  const coreElements = useMemo(() => {
    const elements = []
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const radius = 1.8
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      elements.push(
        <mesh key={`outer-${i}`} position={[x, 0, z]}>
          {i % 3 === 0 ? <boxGeometry args={[0.6, 0.6, 0.6]} /> : <tetrahedronGeometry args={[0.7, 0]} />}
          <meshBasicMaterial
            color={
              i % 4 === 0
                ? INDUSTRIAL_COLORS.accent_blue
                : safeTheme === "dark"
                  ? "#FFFFFF"
                  : INDUSTRIAL_COLORS.gunmetal
            }
            transparent
            opacity={0.98}
          />
        </mesh>,
      )

      if (i % 2 === 0) {
        const innerX = Math.cos(angle + Math.PI / 6) * 1.0
        const innerZ = Math.sin(angle + Math.PI / 6) * 1.0
        elements.push(
          <mesh key={`inner-${i}`} position={[innerX, 0, innerZ]}>
            <cylinderGeometry args={[0.2, 0.2, 0.8, 6]} />
            <meshBasicMaterial
              color={i % 6 === 0 ? INDUSTRIAL_COLORS.accent_red : "#F0FFFF"}
              transparent
              opacity={0.95}
            />
          </mesh>,
        )
      }
    }
    return elements
  }, [safeTheme])

  return <group ref={ref}>{coreElements}</group>
}

const CrystalShard = ({
  position,
  scrollProgress,
  index,
}: { position: [number, number, number]; scrollProgress: number; index: number }) => {
  const ref = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      const explosionForce = scrollProgress * 2

      const angle = index * 0.618 * Math.PI * 2
      const distance = 0.5 + explosionForce
      ref.current.position.x = position[0] + Math.cos(angle) * distance
      ref.current.position.z = position[2] + Math.sin(angle) * distance
      ref.current.position.y = position[1] + Math.sin(time + index) * explosionForce * 0.1

      ref.current.rotation.x = time * 0.4 + scrollProgress * 2
      ref.current.rotation.y = time * 0.3 + index
      ref.current.rotation.z = time * 0.1 + scrollProgress * 1

      const scale = 1 + scrollProgress * 0.5 + Math.sin(time * 1 + index) * 0.1
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial
        color={safeTheme === "dark" ? "#FFFFFF" : "#000000"}
        transparent
        opacity={0.95 - scrollProgress * 0.3}
        wireframe
      />
    </mesh>
  )
}

const MorphingCore = ({ scrollProgress }: { scrollProgress: number }) => {
  const ref = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime

      ref.current.rotation.x = time * 0.1 + scrollProgress * 0.6
      ref.current.rotation.y = time * 0.15 + scrollProgress * 0.8
      ref.current.rotation.z = time * 0.05 + scrollProgress * 0.4

      const breathe = 1 + Math.sin(time * 2) * 0.1
      const scrollScale = 1 + scrollProgress * 0.8
      ref.current.scale.setScalar(breathe * scrollScale)
    }
  })

  const coreElements = useMemo(() => {
    const elements = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 1.2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      elements.push(
        <mesh key={`outer-${i}`} position={[x, 0, z]}>
          <tetrahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial color={safeTheme === "dark" ? "#FFFFFF" : "#000000"} transparent opacity={0.9} wireframe />
        </mesh>,
      )

      const innerX = Math.cos(angle + Math.PI / 8) * 0.6
      const innerZ = Math.sin(angle + Math.PI / 8) * 0.6
      elements.push(
        <mesh key={`inner-${i}`} position={[innerX, 0, innerZ]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color={safeTheme === "dark" ? "#FFFFFF" : "#000000"} transparent opacity={0.8} />
        </mesh>,
      )
    }
    return elements
  }, [safeTheme])

  return <group ref={ref}>{coreElements}</group>
}

const TribalTotem = ({
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

  const getTribalColor = () => {
    const colors = Object.values(PSYCHEDELIC_COLORS)
    return colors[index % colors.length]
  }

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      const explosionForce = scrollProgress * 3

      const angle = index * 0.618 * Math.PI * 2
      const distance = 1 + explosionForce
      ref.current.position.x = position[0] + Math.cos(angle) * distance
      ref.current.position.z = position[2] + Math.sin(angle) * distance
      ref.current.position.y = position[1] + Math.sin(time * 1 + index) * explosionForce * 0.2

      ref.current.rotation.x = time * 0.3 + scrollProgress * 1.5
      ref.current.rotation.y = time * 0.4 + index * 0.2
      ref.current.rotation.z = time * 0.1 + scrollProgress * 0.8

      const breathe = 1 + Math.sin(time * 2 + index) * 0.1
      const scale = 1 + scrollProgress * 0.8 + breathe * 0.1
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.8, 2.4, 8]} />
        <meshBasicMaterial color={getTribalColor()} transparent opacity={0.95} />
      </mesh>
      {[0, 1, 2].map((ringIndex) => (
        <mesh key={ringIndex} position={[0, ringIndex * 0.8 - 1.2, 0]}>
          <torusGeometry args={[0.6 + ringIndex * 0.2, 0.1, 8, 16]} />
          <meshBasicMaterial
            color={Object.values(PSYCHEDELIC_COLORS)[(index + ringIndex) % 8]}
            transparent
            opacity={0.9}
            wireframe
          />
        </mesh>
      ))}
      {Array.from({ length: 6 }, (_, spikeIndex) => {
        const spikeAngle = (spikeIndex / 6) * Math.PI * 2
        const spikeX = Math.cos(spikeAngle) * 1.2
        const spikeZ = Math.sin(spikeAngle) * 1.2
        return (
          <mesh key={spikeIndex} position={[spikeX, 0, spikeZ]}>
            <coneGeometry args={[0.15, 1.5, 6]} />
            <meshBasicMaterial
              color={Object.values(PSYCHEDELIC_COLORS)[(index + spikeIndex) % 8]}
              transparent
              opacity={0.85}
            />
          </mesh>
        )
      })}
    </group>
  )
}

const PsychedelicMandala = ({
  position,
  scrollProgress,
  index,
}: {
  position: [number, number, number]
  scrollProgress: number
  index: number
}) => {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      const explosionForce = scrollProgress * 4

      const angle = index * 0.618 * Math.PI * 2
      const distance = 1.5 + explosionForce
      ref.current.position.x = position[0] + Math.cos(angle) * distance
      ref.current.position.z = position[2] + Math.sin(angle) * distance
      ref.current.position.y = position[1] + Math.cos(time * 1 + index) * explosionForce * 0.15

      ref.current.rotation.x = time * 0.15 + scrollProgress * 0.6
      ref.current.rotation.y = time * 0.5 + index * 0.15
      ref.current.rotation.z = time * 0.2 + scrollProgress * 1

      const pulse = 1 + Math.sin(time * 3 + index) * 0.15
      const scale = 1.2 + scrollProgress * 1 + pulse * 0.1
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={ref} position={position}>
      {Array.from({ length: 12 }, (_, layerIndex) => {
        const layerAngle = (layerIndex / 12) * Math.PI * 2
        const layerRadius = 0.8 + layerIndex * 0.1
        const layerX = Math.cos(layerAngle) * layerRadius
        const layerZ = Math.sin(layerAngle) * layerRadius
        return (
          <mesh key={layerIndex} position={[layerX, 0, layerZ]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshBasicMaterial
              color={Object.values(PSYCHEDELIC_COLORS)[layerIndex % 8]}
              transparent
              opacity={0.9}
              wireframe={layerIndex % 2 === 0}
            />
          </mesh>
        )
      })}
      <mesh>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color={PSYCHEDELIC_COLORS.cosmic_purple} transparent opacity={0.95} wireframe />
      </mesh>
    </group>
  )
}

const FractalCrystal = ({
  position,
  scrollProgress,
  index,
}: {
  position: [number, number, number]
  scrollProgress: number
  index: number
}) => {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      const explosionForce = scrollProgress * 5

      const angle = index * 0.618 * Math.PI * 2
      const distance = 2 + explosionForce
      ref.current.position.x = position[0] + Math.cos(angle) * distance
      ref.current.position.z = position[2] + Math.sin(angle) * distance
      ref.current.position.y = position[1] + Math.sin(time * 0.8 + index) * explosionForce * 0.3

      ref.current.rotation.x = time * 0.6 + scrollProgress * 2.5
      ref.current.rotation.y = time * 0.3 + index * 0.4
      ref.current.rotation.z = time * 0.4 + scrollProgress * 1.5

      const fractalPulse = 1 + Math.sin(time * 4 + index) * 0.2
      const scale = 1.5 + scrollProgress * 1.5 + fractalPulse * 0.15
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={ref} position={position}>
      {Array.from({ length: 8 }, (_, crystalIndex) => {
        const crystalAngle = (crystalIndex / 8) * Math.PI * 2
        const crystalRadius = 1.2
        const crystalX = Math.cos(crystalAngle) * crystalRadius
        const crystalZ = Math.sin(crystalAngle) * crystalRadius
        const crystalY = Math.sin(crystalAngle * 3) * 0.8
        return (
          <group key={crystalIndex} position={[crystalX, crystalY, crystalZ]}>
            <mesh>
              <octahedronGeometry args={[0.4, 0]} />
              <meshBasicMaterial
                color={Object.values(PSYCHEDELIC_COLORS)[crystalIndex % 8]}
                transparent
                opacity={0.9}
              />
            </mesh>
            {Array.from({ length: 4 }, (_, subIndex) => {
              const subAngle = (subIndex / 4) * Math.PI * 2
              const subRadius = 0.6
              const subX = Math.cos(subAngle) * subRadius
              const subZ = Math.sin(subAngle) * subRadius
              return (
                <mesh key={subIndex} position={[subX, 0, subZ]}>
                  <tetrahedronGeometry args={[0.15, 0]} />
                  <meshBasicMaterial
                    color={Object.values(PSYCHEDELIC_COLORS)[(crystalIndex + subIndex) % 8]}
                    transparent
                    opacity={0.85}
                    wireframe
                  />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

function Scene() {
  const gl = useThree((state) => state.gl)
  const { scrollYProgress } = useScroll()
  const { theme } = useTheme()
  const safeTheme = theme || "dark"

  const scrollProgress = scrollYProgress?.get() || 0

  const cameraY = useTransform(scrollYProgress, [0, 1], [2, 6])
  const cameraZ = useTransform(scrollYProgress, [0, 1], [8, 12])
  const cameraX = useTransform(scrollYProgress, [0, 1], [-2, 2])

  useFrame(({ camera }) => {
    if (!camera) return

    const time = Date.now() * 0.001
    camera.position.y = cameraY.get() + Math.sin(time * 0.3) * 0.1
    camera.position.z = cameraZ.get()
    camera.position.x = cameraX.get() + Math.cos(time * 0.2) * 0.1
    camera.lookAt(0, 0, 0)
  })

  const industrialBlocks = useMemo(() => {
    const blocks = []
    const positions = [
      [-3, 0, -3],
      [3, 0, -3],
      [-3, 0, 3],
      [3, 0, 3],
      [0, 2, -2],
      [0, -2, 2],
    ]

    const blockTypes: ("cube" | "cylinder" | "octahedron")[] = ["cube", "cylinder", "octahedron"]

    positions.forEach((pos, index) => {
      blocks.push(
        <IndustrialBlock
          key={index}
          position={pos as [number, number, number]}
          scrollProgress={scrollProgress}
          index={index}
          blockType={blockTypes[index % 3]}
        />,
      )
    })
    return blocks
  }, [scrollProgress])

  const hieroglyphicSymbols = useMemo(() => {
    const symbols = []
    const symbolPositions = [
      [-6, 1, -4],
      [6, -1, -4],
      [-4, 2, 6],
      [4, -2, 6],
      [0, 3, -8],
    ]
    const symbolTypes: ("ankh" | "eye" | "pyramid" | "spiral")[] = ["ankh", "eye", "pyramid", "spiral"]

    symbolPositions.forEach((pos, index) => {
      symbols.push(
        <HieroglyphicSymbol
          key={index}
          position={pos as [number, number, number]}
          scrollProgress={scrollProgress}
          index={index}
          symbolType={symbolTypes[index % 4]}
        />,
      )
    })
    return symbols
  }, [scrollProgress])

  return (
    <>
      <IndustrialCore scrollProgress={scrollProgress} />
      {industrialBlocks}
      {hieroglyphicSymbols}
      <CrystalShard scrollProgress={scrollProgress} index={0} position={[0, 0, 0]} />
      <TribalTotem scrollProgress={scrollProgress} index={0} position={[0, 0, 0]} />
      <PsychedelicMandala scrollProgress={scrollProgress} index={0} position={[0, 0, 0]} />
      <FractalCrystal scrollProgress={scrollProgress} index={0} position={[0, 0, 0]} />
      <ambientLight intensity={3.5} />
      <pointLight position={[10, 10, 10]} intensity={5.5} color="#40FFFF" />
      <pointLight position={[-10, -10, -10]} intensity={5.5} color="#FF40A0" />
      <pointLight position={[0, 15, 0]} intensity={4.0} color="#FFFFFF" />
      <pointLight position={[0, -15, 0]} intensity={4.0} color="#40FFA8" />
      <pointLight position={[15, 0, 0]} intensity={3.5} color="#FF8640" />
      <pointLight position={[-15, 0, 0]} intensity={3.5} color="#CA40FF" />
      <hemisphereLight skyColor="#FFFFFF" groundColor="#40FFFF" intensity={2.5} />
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
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <Canvas
          gl={{ antialias: true }}
          className={`transition-colors duration-1000 ${safeTheme === "dark" ? "bg-gray-950" : "bg-gray-50"}`}
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
