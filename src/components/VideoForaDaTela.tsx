"use client"

import { useEffect } from "react"

/**
 * Vídeo fora da tela não toca (17/10, auditoria: a /work tem ~20 vídeos em
 * loop, e todos rodavam ao mesmo tempo, mesmo os que ninguém estava
 * vendo). Pausa o que sai da tela e retoma quando ele volta — com uma
 * folga de 200px, pra já estar andando quando aparecer. Sem mudança
 * visual. Convive com o VideoSync: o par sincronizado sai e entra junto
 * (estão na mesma fileira), e ele reacerta o tempo quando voltam.
 */
export default function VideoForaDaTela() {
  useEffect(() => {
    if (typeof IntersectionObserver !== "function") return
    const videos = [...document.querySelectorAll<HTMLVideoElement>("main video[autoplay]")]
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const v = e.target as HTMLVideoElement
          if (e.isIntersecting) v.play().catch(() => {})
          else v.pause()
        }
      },
      { rootMargin: "200px 0px" }
    )
    videos.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])
  return null
}
