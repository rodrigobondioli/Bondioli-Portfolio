"use client"

import { Fragment, useEffect, useRef } from "react"
import styles from "./LitText.module.css"

/**
 * Frase que acende com o scroll, portada do tumulto.ai (components/LitText
 * de lá, que é GSAP + SplitText). Aqui sem biblioteca: as palavras já
 * nascem separadas no HTML (o servidor e o navegador chegam no mesmo
 * markup) e o progresso sai da posição da frase na tela.
 *
 * Mesmas contas de lá: cada palavra leva "1" de tempo e começa 0.1 depois
 * da anterior; o trecho vai do topo da frase em 85% da janela até o pé
 * dela em 50%. Na primeira metade da palavra a opacidade sobe de 0.16 pra
 * 1 e a cor vai pro acento; na segunda, a cor volta pro texto. Quem está
 * na frente da leitura fica verde, o que já passou fica branco.
 *
 * Sem JS ou com movimento reduzido, o texto aparece inteiro.
 */
export default function LitText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"))
    const n = words.length
    const total = 1 + (n - 1) * 0.1
    el.dataset.lit = ""

    let raf = 0
    const quadro = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const inicio = vh * 0.85 // topo da frase aqui: começa
      const fim = vh * 0.5 // pé da frase aqui: terminou
      const curso = inicio - fim + r.height
      const p = Math.min(1, Math.max(0, (inicio - r.top) / curso))
      const t = p * total
      for (let i = 0; i < n; i++) {
        const local = Math.min(1, Math.max(0, t - i * 0.1))
        const op = local < 0.5 ? 0.16 + (local / 0.5) * 0.84 : 1
        const acento = local < 0.5 ? local / 0.5 : (1 - local) / 0.5
        const w = words[i]
        w.style.opacity = String(op)
        w.style.setProperty("--k", `${Math.round(acento * 100)}%`)
      }
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(quadro)
    }
    quadro()
    window.addEventListener("scroll", pedir, { passive: true })
    window.addEventListener("resize", pedir)
    return () => {
      window.removeEventListener("scroll", pedir)
      window.removeEventListener("resize", pedir)
      cancelAnimationFrame(raf)
      delete el.dataset.lit
      for (const w of words) {
        w.style.opacity = ""
        w.style.removeProperty("--k")
      }
    }
  }, [children])

  const linhas = children.split("\n")
  return (
    <p ref={ref} className={`${styles.text} ${className}`}>
      {linhas.map((linha, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {linha.split(" ").map((palavra, wi, arr) => (
            <Fragment key={wi}>
              <span data-w="" className={styles.word}>
                {palavra}
              </span>
              {wi < arr.length - 1 ? " " : null}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </p>
  )
}
