"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { marcarCarregando, marcarPronto } from "@/lib/ready"
import { irProTopo, soltarScroll, travarScroll } from "@/lib/lenis"
import { Logo } from "./Logo"
import styles from "./Preloader.module.css"

/**
 * A abertura do site, portada do tumulto.ai (components/Loader.tsx de lá,
 * pedido do Rodrigo em 12/10) — com a marca dele no lugar do asterisco:
 *
 * 1. a marca, a 55% do tamanho, gira enquanto o contador sobe de 0 a 100%
 *    e os rótulos ("Loading" · "rodrigobondioli.com") se afastam;
 * 2. aos 100% ela desacelera e cresce até o tamanho cheio;
 * 3. dá uma volta rápida e some num ponto, de onde a cortina #121211 (o
 *    fundo do tema escuro) cresce até cobrir a tela;
 * 4. a cortina sobe e revela a página.
 *
 * Lá é GSAP; aqui são as animações nativas do navegador (WAAPI), com as
 * mesmas curvas (expo / power1 em cubic-bezier) e os mesmos tempos — sem
 * mais uma biblioteca no site.
 *
 * Continua fazendo o que a tela anterior fazia: trava o scroll (o CSS e o
 * Lenis), volta pro topo, e só avisa "o site apareceu" (marcarPronto)
 * quando a cortina começa a subir — é por esse sinal que a contagem dos
 * números do herói espera. Espera as fontes antes de começar (no máximo
 * 2,5s), pra nada trocar de fonte já à vista. Sem JS ela não aparece
 * (noscript no layout); com movimento reduzido, não roda.
 */

// curvas do GSAP em cubic-bezier
const EXPO_IN_OUT = "cubic-bezier(0.87, 0, 0.13, 1)"
const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)"
const EXPO_IN = "cubic-bezier(0.7, 0, 0.84, 0)"
const power1InOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

/* Os tempos (ms). Eram os do tumulto (~6s no total); o Rodrigo achou
   longo e com a marca parada tempo demais depois do giro (12/10). Agora
   ~4,3s: contador mais curto, desaceleração mais curta e quase sem pausa
   antes de sumir, cortina mais rápida. */
const LOAD = 1400 // o contador e o giro de spinner
const CRESCE = 600 // desacelera e cresce até o tamanho cheio
const SEGURA = 120 // a pausa antes de sumir (era 350)
const SOME = 450 // volta rápida até virar um ponto
const CORTINA = 800 // o ponto cresce até cobrir a tela
const SOBE = 750 // a cortina sobe
/* a marca nasce a 55% e cresce até o tamanho cheio — no tumulto nasce a
   22%; em 12/10 ela chegou a nascer cheia, e ficou grande demais */
const INICIO = 0.55
const ESPERA_FONTES = 2500

/* Só a /work tem abertura (14/10, pedido do Rodrigo: a capa entra direto).
   E só quando a pessoa CHEGA nela — navegando da capa pra /work, a página
   já está aberta e a abertura não volta. */
const COM_ABERTURA = (path: string | null) => (path ?? "").replace(/\/$/, "") === "/work"

/* Fora de qualquer efeito, de propósito: a marca tem que existir antes do
   primeiro `useEffect` da página rodar, senão os efeitos que esperam por
   ela acham que já podem começar. Só onde há abertura. */
if (typeof window !== "undefined" && COM_ABERTURA(window.location.pathname)) marcarCarregando()

export default function Preloader() {
  // decidido uma vez, na chegada: o layout não desmonta entre páginas
  const pathname = usePathname()
  const [ativo] = useState(() => COM_ABERTURA(pathname))
  const [fora, setFora] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!ativo || !el) return
    const html = document.documentElement

    const terminar = () => {
      html.style.overflowY = ""
      soltarScroll()
      irProTopo()
      marcarPronto()
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      terminar()
      setFora(true)
      return
    }

    /* Duas travas: o CSS pra quem não tem Lenis, o Lenis pra quem tem —
       rolagem programática passa por cima de `overflow: hidden`. */
    html.style.overflowY = "hidden"
    travarScroll()
    window.scrollTo(0, 0)

    const mark = el.querySelector<HTMLElement>("[data-mark]")!
    const panel = el.querySelector<HTMLElement>("[data-panel]")!
    const chrome = el.querySelector<HTMLElement>("[data-chrome]")!
    const bg = el.querySelector<HTMLElement>("[data-bg]")!
    const count = el.querySelector<HTMLElement>("[data-count]")!
    const left = el.querySelector<HTMLElement>("[data-left]")!
    const right = el.querySelector<HTMLElement>("[data-right]")!

    const animacoes: Animation[] = []
    const timers: number[] = []
    let frame = 0
    let vivo = true
    const depois = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))

    // rótulos se afastam até 22% da largura, sem passar da margem da página
    const spread = (label: HTMLElement, lado: "left" | "right") => {
      const r = label.getBoundingClientRect()
      const margem = parseFloat(getComputedStyle(chrome).getPropertyValue("--m")) || 16
      const sobra = lado === "left" ? r.left - margem : innerWidth - r.right - margem
      return Math.max(0, Math.min(innerWidth * 0.22, sobra))
    }

    const comecar = () => {
      if (!vivo) return
      const inicio = performance.now()

      // 1. contador
      const contar = () => {
        const t = Math.min(1, (performance.now() - inicio) / LOAD)
        count.textContent = `${Math.round(power1InOut(t) * 100)}%`
        if (t < 1 && vivo) frame = requestAnimationFrame(contar)
      }
      frame = requestAnimationFrame(contar)

      /* 1–3. a marca: gira constante (spinner), desacelera crescendo até o
         tamanho cheio parando numa volta inteira, segura um instante e dá
         uma volta rápida sumindo num ponto. */
      const GIRO_FIM = LOAD + CRESCE + SEGURA + SOME
      const k = (ms: number) => ms / GIRO_FIM
      animacoes.push(
        mark.animate(
          [
            { offset: 0, transform: `rotate(0deg) scale(${INICIO})`, easing: "linear" },
            { offset: k(LOAD), transform: `rotate(720deg) scale(${INICIO})`, easing: EXPO_OUT },
            { offset: k(LOAD + CRESCE), transform: "rotate(1080deg) scale(1)" },
            { offset: k(LOAD + CRESCE + SEGURA), transform: "rotate(1080deg) scale(1)", easing: EXPO_IN },
            { offset: 1, transform: "rotate(1440deg) scale(0)" },
          ],
          { duration: GIRO_FIM, fill: "forwards" }
        )
      )

      // os rótulos se afastam
      for (const [label, lado] of [[left, "left"], [right, "right"]] as const) {
        const d = spread(label, lado)
        animacoes.push(
          label.animate(
            [{ transform: "translateX(0)" }, { transform: `translateX(${lado === "left" ? -d : d}px)` }],
            { duration: LOAD - 300, delay: 200, easing: EXPO_IN_OUT, fill: "forwards" }
          )
        )
      }

      // 3. o ponto vira a cortina: nasce num quadradinho no centro da marca
      const G = GIRO_FIM
      depois(G, () => {
        const r = mark.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const h = 2
        const ponto = `inset(${cy - h}px ${innerWidth - cx - h}px ${innerHeight - cy - h}px ${cx - h}px)`
        panel.style.visibility = "visible"
        animacoes.push(
          panel.animate([{ clipPath: ponto }, { clipPath: "inset(0px 0px 0px 0px)" }], {
            duration: CORTINA,
            easing: EXPO_IN_OUT,
            fill: "forwards",
          })
        )
      })
      depois(G + CORTINA * 0.4, () => {
        animacoes.push(
          chrome.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 300,
            easing: "ease-out",
            fill: "forwards",
          })
        )
      })
      depois(G + CORTINA - 50, () => {
        bg.style.visibility = "hidden"
      })

      // 4. a cortina sobe e a página aparece por trás
      depois(G + CORTINA, () => {
        terminar()
        animacoes.push(
          panel.animate(
            [{ clipPath: "inset(0px 0px 0px 0px)" }, { clipPath: `inset(0px 0px ${innerHeight}px 0px)` }],
            { duration: SOBE, easing: EXPO_IN_OUT, fill: "forwards" }
          )
        )
      })
      depois(G + CORTINA + SOBE + 50, () => setFora(true))
    }

    /* As fontes antes de começar — no máximo 2,5s esperando. 200ms de
       respiro, como lá. */
    let comecou = false
    const largar = () => {
      if (comecou) return
      comecou = true
      depois(200, comecar)
    }
    document.fonts?.ready.then(largar)
    depois(ESPERA_FONTES, largar)

    return () => {
      vivo = false
      cancelAnimationFrame(frame)
      timers.forEach(window.clearTimeout)
      animacoes.forEach((a) => a.cancel())
      html.style.overflowY = ""
      soltarScroll()
    }
  }, [ativo])

  if (!ativo || fora) return null

  return (
    <div ref={root} data-preloader="" className={styles.screen} aria-hidden="true">
      <div className={styles.bg} data-bg="" />
      <div className={styles.chrome} data-chrome="">
        <div className={styles.row}>
          <span className={styles.left} data-left="">
            Loading
          </span>
          <span className={styles.mark} data-mark="">
            <Logo size={96} />
          </span>
          <span className={styles.right} data-right="">
            rodrigobondioli.com
          </span>
        </div>
        <p className={styles.count}>
          ( <span data-count="">0%</span> )
        </p>
      </div>
      <div className={styles.panel} data-panel="" />
    </div>
  )
}
