"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"
import { aCadaQuadro } from "@/lib/lenis"
import { expoInOut, stripsWithin, type Strip } from "@/lib/strips"

/**
 * A revelação das imagens e vídeos, portada do tumulto.ai (stripReveal):
 * a peça se abre em faixas verticais (~30px, nas linhas de uma grade da
 * página), cada uma subindo de baixo pra cima, da esquerda pra direita.
 *
 * Um clip-path em polígono "escada": cada faixa tem a sua altura. Roda uma
 * vez, por TEMPO (1.3s, expo.inOut), quando o topo da peça passa de 85% da
 * janela — não amarrado ao scroll. `lag` é a fração do tempo espalhada
 * entre a primeira e a última faixa (0.5 lá).
 *
 * Herdou do MaskReveal, que esta substitui (12/10), as três lições que
 * custaram caro:
 * - o HTML nasce SEM máscara: quem põe é o efeito, e só em quem ainda não
 *   passou do gatilho. Reload no meio da página não faz nada saltar.
 * - a "porta": se a imagem ainda não chegou, a revelação espera ela (até
 *   1,2s) — senão as faixas abririam uma caixa vazia.
 * - a rede: se o laço não terminar por qualquer motivo, a máscara sai
 *   sozinha. Peça invisível pra sempre não é aceitável.
 */
export default function StripReveal({
  children,
  className,
  style,
  duration = 1.3,
  lag = 0.5,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** segundos */
  duration?: number
  /** fração do tempo espalhada entre a primeira e a última faixa */
  lag?: number
  /** segundos de espera depois do gatilho */
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (typeof IntersectionObserver !== "function") return

    const r0 = el.getBoundingClientRect()
    // já passou inteira pra cima da janela: não tem o que revelar
    if (r0.bottom < 0) return

    let strips: Strip[] = []
    const measure = () => {
      const r = el.getBoundingClientRect()
      strips = stripsWithin(r.left, r.width)
    }

    const apply = (p: number) => {
      const n = strips.length
      const points: string[] = ["0 100%"]
      strips.forEach((s, i) => {
        const local = Math.min(
          1,
          Math.max(0, (p - (i / Math.max(1, n - 1)) * lag) / (1 - lag))
        )
        const top = ((1 - expoInOut(local)) * 100).toFixed(2)
        points.push(`${s.left.toFixed(1)}px ${top}%`, `${(s.left + s.width).toFixed(1)}px ${top}%`)
      })
      points.push("100% 100%")
      el.style.clipPath = `polygon(${points.join(", ")})`
    }

    const limpar = () => {
      el.style.clipPath = ""
    }

    measure()
    apply(0)

    // a porta: imagem ainda sem pixels segura a revelação
    const img = el.querySelector("img")
    let portaAberta = !img || img.complete
    const abrirPorta = () => {
      portaAberta = true
    }
    if (img && !img.complete) {
      img.addEventListener("load", abrirPorta, { once: true })
      img.addEventListener("error", abrirPorta, { once: true })
    }

    let desligar: (() => void) | null = null
    let rede = 0
    let espera = 0
    let comecou = false

    const rodar = () => {
      if (comecou) return
      comecou = true
      measure()
      let inicio = 0
      desligar = aCadaQuadro((time) => {
        if (!inicio) inicio = time + delay * 1000
        const p = Math.min(1, Math.max(0, (time - inicio) / (duration * 1000)))
        apply(p)
        if (p >= 1) {
          desligar?.()
          desligar = null
          limpar()
        }
      })
      // a rede: o que quer que aconteça, a máscara sai
      rede = window.setTimeout(limpar, (delay + duration) * 1000 + 1500)
    }

    const disparar = () => {
      if (portaAberta) return rodar()
      // imagem preguiçosa: pede agora e espera no máximo 1,2s
      if (img && img.loading === "lazy") img.loading = "eager"
      const t0 = performance.now()
      const checar = () => {
        if (portaAberta || performance.now() - t0 > 1200) rodar()
        else espera = window.setTimeout(checar, 50)
      }
      checar()
    }

    /* O gatilho do tumulto é "top 85%": o topo da peça cruza 85% da altura
       da janela. A margem de baixo de -15% faz o observer avisar
       exatamente aí. Se ela já estiver acima disso na montagem (reload no
       meio da página, peça no topo), o observer avisa na primeira
       observação e a revelação roda na hora. */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          io.disconnect()
          disparar()
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    )
    io.observe(el)

    const onResize = () => {
      measure()
      if (!comecou) apply(0)
    }
    window.addEventListener("resize", onResize)

    return () => {
      io.disconnect()
      desligar?.()
      window.clearTimeout(rede)
      window.clearTimeout(espera)
      window.removeEventListener("resize", onResize)
      if (img) {
        img.removeEventListener("load", abrirPorta)
        img.removeEventListener("error", abrirPorta)
      }
      limpar()
    }
  }, [duration, lag, delay])

  return (
    <div className={className} style={style} ref={ref}>
      {children}
    </div>
  )
}
