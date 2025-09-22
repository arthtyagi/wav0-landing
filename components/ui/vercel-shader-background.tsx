"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const VercelShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isClient, setIsClient] = useState(false)
  const animationRef = useRef<number>()
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const bufferRef = useRef<WebGLBuffer | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const createShader = (type: number, source: string) => {
    if (!glRef.current) return null
    const shader = glRef.current.createShader(type)
    if (!shader) return null
    glRef.current.shaderSource(shader, source)
    glRef.current.compileShader(shader)
    return shader
  }

  const animate = (time: number) => {
    const gl = glRef.current
    const program = programRef.current
    const buffer = bufferRef.current
    const canvas = canvasRef.current
    if (!gl || !program || !buffer || !canvas) return

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")

    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    gl.uniform1f(timeLocation, time * 0.001)
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
    gl.uniform2f(mouseLocation, mousePos.x, mousePos.y)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    animationRef.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    })
  }

  const resize = () => {
    const canvas = canvasRef.current
    const gl = glRef.current
    if (!canvas || !gl || typeof window === "undefined") return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas || typeof window === "undefined") return

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    if (!gl) return

    glRef.current = gl

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_uv;

      vec3 palette(float t) {
        vec3 a = vec3(0.8, 0.8, 0.8);
        vec3 b = vec3(0.8, 0.8, 0.8);
        vec3 c = vec3(2.0, 2.0, 2.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = v_uv;
        vec2 mouse = u_mouse;
        
        float pixelSize = 12.0 + sin(u_time * 0.8) * 4.0;
        uv = floor(uv * u_resolution / pixelSize) * pixelSize / u_resolution;
        
        float dist = distance(uv, mouse);
        float mouseInfluence = 1.0 - smoothstep(0.0, 0.4, dist);
        
        vec2 grid = fract(uv * 25.0 + u_time * 0.2);
        float gridPattern = smoothstep(0.01, 0.04, min(grid.x, grid.y));
        
        float noise = sin(uv.x * 15.0 + u_time * 1.5) * sin(uv.y * 15.0 + u_time * 1.2);
        noise += sin(dist * 30.0 - u_time * 3.0) * mouseInfluence;
        
        vec3 color = palette(noise * 0.8 + u_time * 0.2 + mouseInfluence);
        color = mix(color, vec3(0.2, 1.2, 1.8), mouseInfluence * 0.6);
        
        color *= gridPattern * 0.4 + 0.3;
        
        float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.3;
        color *= vignette;
        
        color *= 2.5;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    programRef.current = program

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    bufferRef.current = buffer

    resize()
    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient]) // Removed mousePos dependency to prevent infinite re-renders

  if (!isClient) {
    return <div className={cn("absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20")} />
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full")}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
