"use client"

import { useRef, type ReactNode } from "react"
import styles from "./CaseCursor.module.css"

/**
 * A bolinha de vidro com uma seta que segue o mouse por cima das fotos de
 * um projeto com case (14/10, pedido do Rodrigo: só a Tattoaria tem página
 * interna, e precisa de um sinal de que ela abre). Era uma pílula escrita
 * "View case study"; ficou só a seta, que já diz "abre". Mesmo vidro das
 * outras pílulas (.glass). Ela nasce crescendo do ponto do mouse, segue o
 * cursor com um leve atraso, e a seta faz um vaivém lento enquanto está à
 * vista. Só aparece em cima de uma foto — o vão entre/embaixo delas não é
 * link.
 *
 * Só em quem tem mouse: no toque não existe "passar por cima", e a foto já
 * é o link. Com movimento reduzido ela aparece fixa no centro.
 */
export default function CaseCursor({ children }: { children: ReactNode }) {
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
        <svg className={styles.arrow} viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 14 14 6M7.5 6H14v6.5" />
        </svg>
      </span>
    </div>
  )
}
