"use client"

import { useEffect } from "react"

/**
 * Vídeo só baixa e só toca perto da tela.
 *
 * Tocar (17/10, auditoria de UX): a /work tem ~20 vídeos em loop, e todos
 * rodavam ao mesmo tempo, mesmo os que ninguém estava vendo. Pausa o que
 * sai da tela e retoma quando ele volta — com uma folga de 200px, pra já
 * estar andando quando aparecer.
 *
 * Baixar (17/10, auditoria de performance): com autoplay o navegador
 * baixava todos ao abrir a página (13MB na /work), mesmo com
 * preload="metadata". Os vídeos da colagem nascem com `data-src` e o
 * pôster (o primeiro quadro); o `src` entra quando o vídeo está a uma tela
 * de distância — tempo de carregar antes de alguém chegar nele.
 *
 * Sem mudança visual. Convive com o VideoSync: o par sincronizado está na
 * mesma fileira, então os dois ganham o `src` juntos e ele reacerta o
 * tempo.
 */
function carrega(v: HTMLVideoElement) {
  if (v.src || !v.dataset.src) return
  v.src = v.dataset.src
}

export default function VideoForaDaTela() {
  useEffect(() => {
    const videos = [...document.querySelectorAll<HTMLVideoElement>("main video[autoplay], main video[data-src]")]
    if (typeof IntersectionObserver !== "function") {
      // sem observador: carrega e toca tudo, como era antes
      videos.forEach((v) => {
        carrega(v)
        v.play().catch(() => {})
      })
      return
    }
    const perto = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue
          carrega(e.target as HTMLVideoElement)
          perto.unobserve(e.target)
        }
      },
      { rootMargin: "100% 0px" }
    )
    const naTela = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const v = e.target as HTMLVideoElement
          if (e.isIntersecting) {
            carrega(v)
            v.play().catch(() => {})
          } else v.pause()
        }
      },
      { rootMargin: "200px 0px" }
    )
    videos.forEach((v) => {
      if (v.dataset.src) perto.observe(v)
      naTela.observe(v)
    })
    return () => {
      perto.disconnect()
      naTela.disconnect()
    }
  }, [])
  return null
}
