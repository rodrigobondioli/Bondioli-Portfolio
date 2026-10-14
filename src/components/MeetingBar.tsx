"use client"

import { useEffect, useRef, useState } from "react"
import { Logo } from "./Logo"
import styles from "./MeetingBar.module.css"

const BOOKING =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1UyGf8Fce5HWHn1qa5HqhcLtC4i0BU0PvdqGtSUQgtjFGpwjcg6jUQHxSM-e4qygoZF21aSFaq?gv=true"

/**
 * Pílula flutuante de agendamento. Mesmo link do Framer.
 *
 * Desenho do brandbeet.com (12/10, pedido do Rodrigo): pílula pequena de
 * vidro com a nossa marca e "See if we're a fit". A marca gira com o
 * scroll — descendo, horário; subindo, anti-horário; parado, parada. Não é
 * o vento da capa: aqui ela responde a quem está lendo. atrás dela, um desfoque progressivo no pé da tela — quatro
 * camadas de blur crescente, cada uma com a sua faixa de máscara — que
 * aparece e some junto com a pílula.
 *
 * Ela existe pra cobrir o vão: o "Say hello" da navegação sai da tela nos
 * primeiros 100px de rolagem, e daí em diante a página fica sem nenhum
 * convite à mão.
 *
 * O piso é sempre a altura da navegação: enquanto o botão do topo estiver
 * na tela, a barra não entra — seriam dois convites ao mesmo tempo. Isso
 * não depende de tamanho de tela, porque sai da altura medida da barra.
 *
 * `entraApos` é um piso a mais, em frações da janela, pra quem precisa
 * esperar mais. O padrão de 0.9 é da /work: lá o herói termina com a faixa
 * de números presa no rodapé da tela, e uma barra flutuante entrando antes
 * disso sentaria em cima dela. Onde não há faixa — o media kit — o valor é
 * 0, e vale só a altura da navegação.
 *
 * E sai de novo ao chegar no amarelo: lá embaixo o convite já está na
 * página inteira, a barra só atrapalharia o formulário. Em página sem
 * contato, quem a esconde é o rodapé.
 */
export default function MeetingBar({
  label = "See if we\u2019re a fit",
  hideOver = ".on-accent, #contact",
  entraApos = 0.9,
}: {
  label?: string
  hideOver?: string
  /** piso extra, em frações da janela, além da altura da navegação */
  entraApos?: number
}) {
  const [visible, setVisible] = useState(false)
  const marca = useRef<HTMLSpanElement>(null)

  /* A marca gira com o scroll: 0.25° por pixel (uma volta a cada 1440px).
     O Lenis já suaviza o scrollY, então a rotação herda a inércia dele. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const girar = () => {
      raf = 0
      if (marca.current) marca.current.style.rotate = `${window.scrollY * 0.25}deg`
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(girar)
    }
    girar()
    window.addEventListener("scroll", pedir, { passive: true })
    return () => {
      window.removeEventListener("scroll", pedir)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const check = () => {
      /* enquanto o "Say hello" do topo estiver na tela, ela não entra */
      const nav = document.querySelector("header")?.offsetHeight ?? 96
      if (window.scrollY <= Math.max(nav, window.innerHeight * entraApos)) {
        setVisible(false)
        return
      }
      // a linha onde a pílula começa: ~50 de altura + até 32 do rodapé
      const line = window.innerHeight - 84
      const covered = Array.from(
        document.querySelectorAll<HTMLElement>(hideOver)
      ).some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < line && r.bottom > 0
      })
      setVisible(!covered)
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [hideOver, entraApos])

  return (
    <>
      <div className={`${styles.blur} ${visible ? styles.blurOn : ""}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <a
        className={`no-underline glass ${styles.bar} ${visible ? styles.on : ""}`}
        href={BOOKING}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden={!visible}
        tabIndex={visible ? undefined : -1}
      >
        <span className={styles.mark} aria-hidden="true">
          <span ref={marca} className={styles.giro}>
            <Logo size={28} />
          </span>
        </span>
        <span className={styles.label}>{label}</span>
      </a>
    </>
  )
}
