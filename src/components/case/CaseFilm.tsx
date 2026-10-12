"use client"

import { useEffect, useRef } from "react"
import YouTube from "@/components/YouTube"
import styles from "./CaseFilm.module.css"

/**
 * O vídeo do case, como no tumulto.ai (HeroVideo de lá): não sangra a
 * tela — no desktop vai da linha da coluna 3 até a do meio da 22 — e,
 * enquanto o topo dele sobe do pé da janela até 25% dela, a moldura abre
 * de um recorte (14% em cima, 9% dos lados) até o tamanho cheio, e o vídeo
 * de dentro assenta de 1.25 pra 1. Amarrado ao scroll, sem biblioteca.
 *
 * O player é o YouTube daqui, no modo que toca sozinho e mudo.
 */
export default function CaseFilm({
  id,
  title,
  start,
  className = "",
}: {
  id: string
  title: string
  start?: number
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const fig = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const f = fig.current
    const m = media.current
    if (!el || !f || !m) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const quadro = () => {
      raf = 0
      const top = el.getBoundingClientRect().top
      const vh = window.innerHeight
      // de "topo no pé da janela" (0) a "topo em 25% dela" (1)
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.75)))
      const k = 1 - p
      f.style.clipPath = `inset(${14 * k}% ${9 * k}% 0% ${9 * k}%)`
      m.style.scale = String(1 + 0.25 * k)
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(quadro)
    }
    quadro()
    window.addEventListener("scroll", pedir, { passive: true })
    window.addEventListener("resize", pedir)
    return () => {
      window.removeEventListener("scroll", pedir)
      window.removeEventListener("resize", pedir)
      cancelAnimationFrame(raf)
      f.style.clipPath = ""
      m.style.scale = ""
    }
  }, [])

  return (
    <div ref={root} className={`grid ${styles.wrap} ${className}`}>
      <div ref={fig} className={styles.figure}>
        <div ref={media} className={styles.media}>
          <YouTube id={id} title={title} start={start} autoplay />
        </div>
      </div>
    </div>
  )
}
