"use client"

import { useEffect } from "react"

/**
 * Publica em `--nav-meio` (no <html>) onde começa o bloco do meio da barra
 * do topo ("Creative Director"). A barra distribui os quatro blocos com o
 * mesmo espaço entre eles, então essa posição depende da largura do texto
 * de cada um — só dá pra saber medindo. A linha de apoio do herói da /work
 * usa a medida pra começar exatamente ali (14/10, pedido do Rodrigo).
 */
export default function NavMeio() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-nav-meio]")
    if (!el) return
    const html = document.documentElement
    const medir = () => html.style.setProperty("--nav-meio", `${el.getBoundingClientRect().left}px`)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    ro.observe(document.body)
    document.fonts?.ready.then(medir)
    return () => {
      ro.disconnect()
      html.style.removeProperty("--nav-meio")
    }
  }, [])
  return null
}
