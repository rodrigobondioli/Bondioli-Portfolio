"use client"

import { useEffect } from "react"

/**
 * Publica --page-w: a largura da página sem a barra de rolagem (100vw
 * conta a barra, e o --col do CSS sairia maior que a coluna de verdade).
 *
 * Era o trabalho extra do GridLines, as linhas verticais da grade; as
 * linhas saíram do site em 16/10/2026 (pedido do Rodrigo) e só isto ficou.
 */
export default function PageWidth() {
  useEffect(() => {
    const el = document.documentElement
    const medir = () => el.style.setProperty("--page-w", `${el.clientWidth}px`)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return null
}
