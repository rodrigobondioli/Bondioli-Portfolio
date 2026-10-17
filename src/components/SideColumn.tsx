"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A coluna presa da /info (foto + listas). Quando uma lista aberta faz ela
 * passar da altura da tela, a coluna rola por dentro, com o mouse em cima
 * dela — e só nesse caso: o Lenis (scroll suave) larga a roda aqui
 * (`data-lenis-prevent`) apenas enquanto há o que rolar. Sem isso, com
 * tudo fechado, a roda em cima da foto não rolava nem a coluna nem a
 * página (16/10).
 */
export default function SideColumn({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [transborda, setTransborda] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => setTransborda(el.scrollHeight > el.clientHeight + 1)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    for (const filho of Array.from(el.children)) ro.observe(filho)
    // abrir/fechar uma lista muda a altura de dentro
    el.addEventListener("toggle", medir, true)
    window.addEventListener("resize", medir)
    return () => {
      ro.disconnect()
      el.removeEventListener("toggle", medir, true)
      window.removeEventListener("resize", medir)
    }
  }, [])

  return (
    <aside ref={ref} className={className} data-lenis-prevent={transborda ? "" : undefined}>
      {children}
    </aside>
  )
}
