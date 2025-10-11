"use client"

import { useEffect, useRef, useState } from "react"
import { DesignPanel } from "@/components/design-panel"
import { type Vec2, vec2, mulN, dist, map } from "@/utils/math"

const DEFAULT_DENSITY = " ..._-:=+abcXW@#ÑÑÑ"
const FPS = 60

interface Context {
  time: number
  cols: number
  rows: number
  metrics: {
    aspect: number
  }
}

interface DesignParams {
  mode: number
  frequencyA: number
  frequencyB: number
  centerASpeed: number
  centerBSpeed: number
  alternatePattern: boolean
  density: number
  characterSet: string
  isDarkMode: boolean
  backgroundColor: string
  scale: number
}

export default function DesignTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const designParamsRef = useRef<DesignParams>({
    mode: 0,
    frequencyA: 2.12,
    frequencyB: 3.33,
    centerASpeed: 1,
    centerBSpeed: 1,
    alternatePattern: false,
    density: 0.5,
    characterSet: DEFAULT_DENSITY,
    isDarkMode: true,
    backgroundColor: "#000000",
    scale: 1,
  })

  const [, forceUpdate] = useState({})

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.style.cursor = "pointer"
    contextRef.current = canvas.getContext("2d")
    startTimeRef.current = performance.now()

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = contextRef.current
    if (!canvas || !ctx) return

    const render = () => {
      const { isDarkMode, backgroundColor, scale } = designParamsRef.current
      const time = (performance.now() - startTimeRef.current) * 0.1
      const cols = canvas.width
      const rows = canvas.height
      const m = Math.min(cols, rows)

      const context: Context = {
        time,
        cols,
        rows,
        metrics: {
          aspect: canvas.width / canvas.height,
        },
      }

      // Set background color
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, cols, rows)

      // Set text rendering properties
      ctx.fillStyle = isDarkMode ? "white" : "black"
      ctx.textBaseline = "top"
      ctx.textAlign = "left"
      const fontSize = Math.max(8, Math.floor(m / 60)) * scale
      ctx.font = `${fontSize}px "Courier New", monospace`
      ctx.imageSmoothingEnabled = false

      // Calculate character size with proper spacing
      const charWidth = fontSize * 0.6
      const charHeight = fontSize

      // Render ASCII art
      for (let y = 0; y < rows; y += charHeight) {
        for (let x = 0; x < cols; x += charWidth) {
          const coord = {
            x: Math.floor(x),
            y: Math.floor(y),
          }
          const char = main(coord, context, null)
          ctx.fillText(char, coord.x, coord.y)
        }
      }

      frameRef.current = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  // Main visualization function remains unchanged
  function main(coord: Vec2, context: Context, cursor: null) {
    const { mode, frequencyA, frequencyB, centerASpeed, centerBSpeed, alternatePattern, density, characterSet } =
      designParamsRef.current
    const t = context.time * 0.0001
    const m = Math.min(context.cols, context.rows)
    const st = {
      x: (2.0 * (coord.x - context.cols / 2)) / m,
      y: (2.0 * (coord.y - context.rows / 2)) / m,
    }
    st.x *= context.metrics.aspect

    const centerA = mulN(vec2(Math.cos(t * 3 * centerASpeed), Math.sin(t * 7 * centerASpeed)), 0.5)
    const centerB = mulN(vec2(Math.cos(t * 5 * centerBSpeed), Math.sin(t * 4 * centerBSpeed)), 0.5)

    const A = mode % 2 === 0 ? Math.atan2(centerA.y - st.y, centerA.x - st.x) : dist(st, centerA)
    const B = mode === 0 ? Math.atan2(centerB.y - st.y, centerB.x - st.x) : dist(st, centerB)

    const aMod = map(Math.cos(t * frequencyA), -1, 1, 6, 60)
    const bMod = map(Math.cos(t * frequencyB), -1, 1, 6, 60)

    const a = Math.cos(A * aMod)
    const b = Math.cos(B * bMod)

    const i = alternatePattern ? (a + b + 2) / 4 : (a * b + 1) / 2

    const idx = Math.floor(i * characterSet.length * density)
    return characterSet[Math.min(characterSet.length - 1, idx)]
  }

  const updateDesignParam = <K extends keyof DesignParams>(key: K, value: DesignParams[K]) => {
    designParamsRef.current[key] = value
    forceUpdate({})
  }

  return (
    <div
      className={`flex min-h-screen ${designParamsRef.current.isDarkMode ? "dark" : ""}`}
      data-theme={designParamsRef.current.isDarkMode ? "dark" : "light"}
    >
      <DesignPanel
        {...designParamsRef.current}
        onUpdateFrequencyA={(value) => updateDesignParam("frequencyA", value)}
        onUpdateFrequencyB={(value) => updateDesignParam("frequencyB", value)}
        onUpdateCenterASpeed={(value) => updateDesignParam("centerASpeed", value)}
        onUpdateCenterBSpeed={(value) => updateDesignParam("centerBSpeed", value)}
        onUpdateMode={(value) => updateDesignParam("mode", value)}
        onTogglePattern={(value) => updateDesignParam("alternatePattern", value)}
        onUpdateDensity={(value) => updateDesignParam("density", value)}
        onUpdateCharacterSet={(value) => updateDesignParam("characterSet", value)}
        onToggleDarkMode={(value) => updateDesignParam("isDarkMode", value)}
        onUpdateBackgroundColor={(value) => updateDesignParam("backgroundColor", value)}
        onUpdateScale={(value) => updateDesignParam("scale", value)}
      />
      <main className="flex-1 p-6">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-lg"
          style={{ backgroundColor: designParamsRef.current.backgroundColor }}
        />
      </main>
    </div>
  )
}
