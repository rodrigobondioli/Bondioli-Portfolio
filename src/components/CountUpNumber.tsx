"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { aoAparecer, estaPronto } from "@/lib/ready"

/**
 * Um número que conta e desacelera até o valor final.
 * Portado de CountUpNumber.tsx do Framer.
 *
 * easeOutExpo: dispara rápido e rasteja até o número.
 * Dígitos tabulares para o label ao lado não tremer enquanto conta.
 *
 * Espera a tela de carregamento sair. A faixa de números fica no topo da
 * página: ela já está intersectando a viewport atrás da cortina, e sem
 * essa espera a contagem inteira acontecia antes de alguém ver.
 *
 * O HTML nasce com o valor FINAL (05/10). Antes nascia com 0 e o número só
 * existia via JS: o Google lia "0+", e sem JS a faixa dizia "0+ years". Agora
 * o servidor entrega "20+", e quem anima é o cliente — e só zera o número
 * quando ele está escondido: atrás da tela de carregamento ou fora da janela.
 * Se já está à vista (navegação interna, sem cortina), fica no valor final;
 * zerar ali seria ver "20+" virar "0+". prefers-reduced-motion: não anima.
 */

interface CountUpNumberProps {
  target?: number
  suffix?: string
  padTo?: number
  duration?: number
  startOnView?: boolean
  className?: string
  style?: CSSProperties
}

export default function CountUpNumber({
  target = 20,
  suffix = "+",
  padTo = 0,
  duration = 1600,
  startOnView = true,
  className,
  style,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(target)
  const done = useRef(false)

  useEffect(() => {
    done.current = false
    setValue(target)

    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce) return

    const node = ref.current
    const r = node?.getBoundingClientRect()
    const aVista =
      !!r && r.bottom > 0 && r.top < window.innerHeight
    // à vista e sem cortina: quem olha já está lendo o número, não anima
    if (estaPronto() && aVista) return

    setValue(0)

    let frame = 0
    let startedAt = 0

    const run = () => {
      if (done.current) return
      done.current = true

      const tick = (now: number) => {
        if (!startedAt) startedAt = now
        const p = Math.min((now - startedAt) / duration, 1)
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        setValue(Math.round(eased * target))
        if (p < 1) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
    }

    if (!startOnView || !node || typeof IntersectionObserver !== "function") {
      const delay = window.setTimeout(run, 180)
      return () => {
        window.clearTimeout(delay)
        cancelAnimationFrame(frame)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.35 }
    )

    const cancelarEspera = aoAparecer(() => observer.observe(node))

    return () => {
      cancelarEspera()
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration, startOnView])

  const digits = padTo > 0 ? String(value).padStart(padTo, "0") : String(value)

  return (
    <span
      ref={ref}
      className={className}
      style={{
        ...style,
        display: "inline-block",
        whiteSpace: "nowrap",
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: '"tnum"',
      }}
    >
      {digits}
      {suffix}
    </span>
  )
}
