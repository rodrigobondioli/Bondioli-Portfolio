"use client"

import { useEffect } from "react"

/**
 * Leva a posição do mouse pras fotos com `data-zoom` (--zx/--zy), pra o
 * zoom de hover nascer de onde o mouse está — portado do tumulto.ai
 * (components/HoverZoom de lá). O ponto anda devagar (transição do CSS),
 * então a foto "olha" pro cursor sem tremer. Um listener só pra página.
 */
export default function HoverZoom() {
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return
    let raf = 0
    let last: PointerEvent | null = null
    const apply = () => {
      raf = 0
      const e = last
      const alvo = (e?.target as Element | null)?.closest?.<HTMLElement>("[data-zoom]")
      if (!e || !alvo) return
      const r = alvo.getBoundingClientRect()
      // limitado a 20–80%: perto da borda o zoom não fica torto
      const x = Math.min(80, Math.max(20, ((e.clientX - r.left) / r.width) * 100))
      const y = Math.min(80, Math.max(20, ((e.clientY - r.top) / r.height) * 100))
      alvo.style.setProperty("--zx", `${x.toFixed(1)}%`)
      alvo.style.setProperty("--zy", `${y.toFixed(1)}%`)
    }
    const onMove = (e: PointerEvent) => {
      last = e
      if (!raf) raf = requestAnimationFrame(apply)
    }
    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
  return null
}
