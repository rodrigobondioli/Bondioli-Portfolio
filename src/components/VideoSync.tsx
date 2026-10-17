"use client"

import { useEffect } from "react"

/**
 * Vídeos que contam a mesma cena em cards separados (o vídeo e o canvas da
 * IA do Orbness, 17/10) andam juntos: quem tem o mesmo `data-sync` segue o
 * primeiro do grupo. Cada um carrega e começa no seu tempo; sem isto, a
 * fala e o card que ela cria se desencontrariam. Corrige só quando a
 * diferença passa de 1/10 s, pra não ficar dando trancos.
 */
export default function VideoSync() {
  useEffect(() => {
    const grupos = new Map<string, HTMLVideoElement[]>()
    document.querySelectorAll<HTMLVideoElement>("video[data-sync]").forEach((v) => {
      const k = v.dataset.sync!
      grupos.set(k, [...(grupos.get(k) ?? []), v])
    })
    const tique = window.setInterval(() => {
      for (const [, vs] of grupos) {
        const [lider, ...resto] = vs
        if (lider.paused || lider.readyState < 2) continue
        for (const v of resto) {
          if (v.readyState < 2) continue
          if (v.paused) v.play().catch(() => {})
          if (Math.abs(v.currentTime - lider.currentTime) > 0.1) v.currentTime = lider.currentTime
        }
      }
    }, 400)
    return () => window.clearInterval(tique)
  }, [])
  return null
}
