"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Flipbook: as fotos se alternam em corte seco, como as páginas de um
 * bloquinho (14/10, pedido do Rodrigo — a colagem da Tattoaria com uma
 * vaga animada sem ser vídeo). Sem arquivo de vídeo: são as próprias fotos
 * empilhadas, e só a da vez aparece. Fica mais leve que um MP4 e mantém a
 * nitidez de foto.
 *
 * Só roda com a vaga na tela (fora dela, para). Com movimento reduzido,
 * fica na primeira foto.
 */
export default function Flipbook({ srcs, intervalo = 700 }: { srcs: string[]; intervalo?: number }) {
  const [vez, setVez] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || srcs.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let timer = 0
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer)
      if (e.isIntersecting) timer = window.setInterval(() => setVez((v) => (v + 1) % srcs.length), intervalo)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [srcs.length, intervalo])

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%" }} aria-hidden="true">
      {srcs.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          width={720}
          height={720}
          style={{
            position: i === 0 ? "relative" : "absolute",
            inset: 0,
            opacity: i === vez ? 1 : 0,
          }}
        />
      ))}
    </div>
  )
}
