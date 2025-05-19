"use client"

import { useEffect, useRef } from "react"

export default function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 200

    // Chart data
    const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]
    const values = [90, 60, 50, 80, 120, 60, 80, 60, 50, 90]

    // Chart settings
    const barWidth = canvas.width / (months.length * 2)
    const barSpacing = barWidth
    const maxValue = Math.max(...values)
    const scale = (canvas.height - 40) / maxValue

    // Draw bars
    ctx.fillStyle = "#10b981"

    months.forEach((month, i) => {
      const x = i * (barWidth + barSpacing) + barSpacing
      const barHeight = values[i] * scale
      const y = canvas.height - barHeight - 20

      // Draw bar
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, 4)
      ctx.fill()

      // Draw month label
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(month, x + barWidth / 2, canvas.height - 5)

      // Reset fill style for next bar
      ctx.fillStyle = "#10b981"
    })

    // Draw y-axis values
    ctx.fillStyle = "#9ca3af"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"

    // Draw 0 line
    ctx.fillText("0", 5, canvas.height - 20)

    // Draw max value line
    ctx.fillText(maxValue.toString(), 5, 20)
  }, [])

  return (
    <div className="h-[250px] w-full">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  )
}
