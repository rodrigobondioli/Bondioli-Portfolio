"use client"

import { useRef, type ReactNode } from "react"
import styles from "./CaseCursor.module.css"

/**
 * A pílula "View case study" que segue o mouse por cima das fotos de um
 * projeto com case (14/10, pedido do Rodrigo: só a Tattoaria tem página
 * interna, e precisa de um sinal de que ela abre). Mesmo vidro das outras
 * pílulas (.glass). Ela aparece crescendo do ponto do mouse e acompanha o
 * cursor com um leve atraso (transição curta no translate), sem tremer.
 *
 * Só em quem tem mouse: no toque não existe "passar por cima", e a foto já
 * é o link. Com movimento reduzido ela aparece fixa no centro.
 */
export default function CaseCursor({ label = "View case study", children }: { label?: string; children: ReactNode }) {
  const area = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  const mover = (e: React.PointerEvent) => {
    const el = area.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--cx", `${x}px`)
      el.style.setProperty("--cy", `${y}px`)
    })
  }

  return (
    <div ref={area} className={styles.area} onPointerMove={mover} onPointerEnter={mover}>
      {children}
      <span className={`glass ${styles.pill}`} aria-hidden="true">
        {label}
        <span className={styles.arrow}>→</span>
      </span>
    </div>
  )
}
