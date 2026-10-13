"use client"

import { useEffect, useRef } from "react"
import { expoInOut, stripsWithin } from "@/lib/strips"
import type { Media } from "@/content/cases/tattoaria"
import styles from "./Tour.module.css"

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * Passeio pelo galpão, portado do tumulto.ai (components/case/Tour de lá,
 * que é GSAP ScrollTrigger com pin): a foto prende na tela e, com o
 * scroll, o próximo espaço sobe por cima em faixas cortadas nas linhas da
 * grade (a mesma escada do StripReveal), assentando com um zoom leve de
 * 1.12 pra 1. Só o contador no canto.
 *
 * Aqui o "pin" é `position: sticky`: o passeio tem a altura de uma tela
 * por foto, e o palco fica preso no topo enquanto ela passa. O progresso
 * sai da posição do passeio — sem biblioteca.
 *
 * Celular (até 640) ou movimento reduzido: as fotos empilhadas, uma
 * embaixo da outra, cada uma com o número embaixo. É assim que o HTML
 * nasce; quem prende é o efeito, depois de montar.
 */
export default function Tour({ items, label }: { items: Media[]; label: string }) {
  const root = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = root.current
    const el = stage.current
    if (!wrap || !el) return
    const telaLarga = window.matchMedia("(min-width: 641px)")
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)")
    const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"))
    const steps = slides.length - 1
    const LAG = 0.55 // quanto da troca fica espalhado entre as faixas
    let raf = 0
    let ligado = false

    const clip = (slide: HTMLElement, p: number) => {
      if (p >= 1) {
        slide.style.clipPath = "none"
        return
      }
      const r = el.getBoundingClientRect()
      const strips = stripsWithin(r.left, r.width)
      const n = strips.length
      const pts = ["0 100%"]
      strips.forEach((st, i) => {
        const local = Math.min(1, Math.max(0, (p - (i / Math.max(1, n - 1)) * LAG) / (1 - LAG)))
        const top = (1 - expoInOut(local)) * 100
        pts.push(`${st.left}px ${top}%`, `${st.left + st.width}px ${top}%`)
      })
      pts.push("100% 100%")
      slide.style.clipPath = `polygon(${pts.join(", ")})`
    }

    const quadro = () => {
      raf = 0
      const r = wrap.getBoundingClientRect()
      const curso = r.height - window.innerHeight
      const prog = curso > 0 ? Math.min(1, Math.max(0, -r.top / curso)) : 0
      const t = prog * steps
      slides.forEach((sl, i) => {
        if (i === 0) return
        const p = Math.min(1, Math.max(0, t - (i - 1)))
        clip(sl, p)
        const media = sl.querySelector<HTMLElement>("img")
        // a que entra assenta de 1.12 pra 1 (power2.out)
        if (media) media.style.scale = String(1.12 - 0.12 * (1 - (1 - p) * (1 - p)))
      })
      if (counter.current) counter.current.textContent = pad(Math.min(steps, Math.round(t)) + 1)
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(quadro)
    }

    const ligar = () => {
      if (ligado) return
      ligado = true
      wrap.dataset.pinned = ""
      wrap.style.height = `${slides.length * 100}svh`
      quadro()
      window.addEventListener("scroll", pedir, { passive: true })
      window.addEventListener("resize", pedir)
    }
    const desligar = () => {
      if (!ligado) return
      ligado = false
      delete wrap.dataset.pinned
      wrap.style.height = ""
      window.removeEventListener("scroll", pedir)
      window.removeEventListener("resize", pedir)
      cancelAnimationFrame(raf)
      for (const sl of slides) {
        sl.style.clipPath = ""
        const media = sl.querySelector<HTMLElement>("img")
        if (media) media.style.scale = ""
      }
    }
    const decidir = () => (telaLarga.matches && !reduzido.matches ? ligar() : desligar())
    decidir()
    telaLarga.addEventListener("change", decidir)
    reduzido.addEventListener("change", decidir)
    return () => {
      telaLarga.removeEventListener("change", decidir)
      reduzido.removeEventListener("change", decidir)
      desligar()
    }
  }, [])

  return (
    <div ref={root} className={styles.tour} role="region" aria-label={label}>
      <div ref={stage} className={styles.stage}>
        {items.map((item, i) => (
          <div key={item.src} className={styles.slide} data-slide="" style={{ zIndex: i + 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className={styles.img}
              style={{ objectPosition: item.focus ?? "50% 50%" }}
            />
            <p className={styles.slideMeta}>
              <span>
                {pad(i + 1)} / {pad(items.length)}
              </span>
            </p>
          </div>
        ))}
        <p className={styles.meta} aria-hidden="true">
          <span>
            <span ref={counter}>01</span> / {pad(items.length)}
          </span>
        </p>
      </div>
    </div>
  )
}
