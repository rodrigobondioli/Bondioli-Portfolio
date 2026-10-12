"use client"

import { useEffect, useRef } from "react"
import styles from "./GridLines.module.css"

/**
 * As linhas verticais da grade, fixas na tela — portadas do tumulto.ai
 * (components/GridLines.tsx de lá, 12/10/2026). 24 colunas; o CSS esconde
 * as que sobram no tablet (12) e no celular (6).
 *
 * Cada linha é um elemento próprio — borda esquerda da coluna, meio do
 * passo, fechamento —, pra poder ser encaixada no pixel: as colunas têm
 * largura fracionada e, em tela sem retina, uma linha em x,5px vira dois
 * pixels apagados (parece dupla). A cada mudança de tamanho, cada linha
 * anda no máximo meio pixel até o pixel inteiro mais próximo.
 *
 * Também publica --page-w (a largura sem a barra de rolagem): 100vw conta
 * a barra, e aí o --col do CSS sairia maior que a coluna desenhada.
 */
export default function GridLines() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    let frame = 0
    const snap = () => {
      frame = 0
      document.documentElement.style.setProperty(
        "--page-w",
        `${document.documentElement.clientWidth}px`
      )
      const dpr = window.devicePixelRatio || 1
      for (const line of el.querySelectorAll<HTMLElement>("[data-line]")) {
        line.style.translate = ""
        const x = line.getBoundingClientRect().left
        const d = Math.round(x * dpr) / dpr - x
        if (Math.abs(d) > 0.01) line.style.translate = `${d}px 0`
      }
    }
    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(snap)
    }
    snap()
    const ro = new ResizeObserver(agendar)
    ro.observe(el)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={root} className={styles.lines} aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        <span key={i}>
          <span className={styles.edge} data-line="" />
          <span className={styles.mid} data-line="" />
          <span className={styles.close} data-line="" />
        </span>
      ))}
    </div>
  )
}
