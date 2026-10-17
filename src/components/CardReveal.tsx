"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"
import styles from "./CardReveal.module.css"

/**
 * A entrada das peças do Selected work, medida no brandbeet.com/work
 * (14/10, pedido do Rodrigo: "bem parecido, com o refinamento"): a peça
 * sobe 24px, aparece e se abre de cima pra baixo (recorte de 100% a 0),
 * enquanto a mídia de dentro assenta de 1.08 pra 1 — ~1s, desacelerando.
 * Em sequência: cada peça espera `ordem × 150ms`.
 *
 * Por TEMPO, quando o topo passa de 85% da janela. Lições herdadas do
 * StripReveal: o HTML nasce sem efeito (quem esconde é o efeito, e só o
 * que ainda está abaixo do gatilho — reload no meio da página não faz
 * nada sumir) e há uma rede que mostra a peça se algo falhar.
 */
export default function CardReveal({
  children,
  className = "",
  style,
  ordem = 0,
  largo = false,
  rotulo,
}: {
  /** descrição da peça pro leitor de tela (vídeo: ele não aceita a dele) */
  rotulo?: string
  /** peça que vale por duas (data-largo: linha inteira no tablet/celular) */
  largo?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
  ordem?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (typeof IntersectionObserver !== "function") return
    // já passou do gatilho: fica como está
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return
    el.dataset.rv = "espera"
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.dataset.rv = "entra"
        io.disconnect()
      },
      { rootMargin: "0px 0px -15% 0px" }
    )
    io.observe(el)
    // rede: se em 30s nada disparou, mostra
    const rede = window.setTimeout(() => (el.dataset.rv = "entra"), 30000)
    return () => {
      io.disconnect()
      window.clearTimeout(rede)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.card} ${className}`}
      style={{ ...style, ["--ordem" as string]: ordem }}
      data-largo={largo || undefined}
      {...(rotulo ? { role: "img", "aria-label": rotulo } : {})}
    >
      {children}
    </div>
  )
}
