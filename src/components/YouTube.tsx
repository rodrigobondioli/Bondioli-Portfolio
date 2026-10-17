"use client"

import { useEffect, useRef, useState } from "react"
import { dict, type Lang } from "@/i18n"
import styles from "./YouTube.module.css"

/**
 * Dois modos.
 *
 * Padrão: fachada. Só a thumb até o clique — o iframe do YouTube pesa
 * perto de 1MB e não vale carregar três deles na abertura da página.
 *
 * autoplay: toca sozinho, mudo e em loop, sem controles. O clique liga o
 * som (unMute pela API do iframe, sem carregar a biblioteca do YouTube:
 * é um postMessage). Só monta quando entra na tela — no topo da página
 * ele seria 1MB baixado antes de alguém ver.
 */

/**
 * Capas guardadas no próprio site (17/10, auditoria de performance): no
 * case da Tattoaria a capa do filme é o maior elemento da primeira tela, e
 * buscar no i.ytimg.com custava uma conexão nova e a imagem grande do
 * YouTube — LCP de 5,6s no celular em 4G. Aqui ela vem do mesmo servidor,
 * em WebP, com prioridade. Vídeo sem capa local segue com a do YouTube.
 */
// `celular`: a versão de 720px pra tela de até 640 (o degrau do celular) —
// lá a capa ocupa ~360px, e a de 1280 era peso à toa no 4G
const CAPA_LOCAL: Record<string, { src: string; celular: string }> = {
  oHxfuNjpOuo: {
    src: "/projects/tattoaria/case/filme-capa.webp",
    celular: "/projects/tattoaria/case/filme-capa-720.webp",
  },
}

type Props = {
  id: string
  title: string
  start?: number
  className?: string
  hideLabel?: boolean
  autoplay?: boolean
  lang?: Lang
}

export default function YouTube({
  id,
  title,
  start,
  className,
  hideLabel = false,
  autoplay = false,
  lang = "en",
}: Props) {
  const t = dict[lang]
  const [on, setOn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sound, setSound] = useState(false)
  const [playing, setPlaying] = useState(false)
  // a capa sai só uns segundos depois do iframe carregar: é o tempo em que o
  // YouTube mostra título, canal e "More videos" por cima (o tumulto.ai faz
  // igual — a capa cobre a interface do começo)
  const [capaFora, setCapaFora] = useState(false)
  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => setCapaFora(true), 3500)
    return () => window.clearTimeout(t)
  }, [playing])
  const host = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)

  // no modo autoplay o iframe só nasce quando a seção chega na tela
  useEffect(() => {
    if (!autoplay || mounted) return
    const node = host.current
    if (!node || typeof IntersectionObserver !== "function") {
      setMounted(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          io.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [autoplay, mounted])

  /* Depois de montado, toca só enquanto está na tela: sai da janela, pausa;
     volta, dá o play de novo. Um player rodando fora da vista disputa
     processador com o scroll suave, e quem volta até ele encontra o vídeo
     em movimento, não parado. (A montagem acima tem 200px de folga pra o
     YouTube já estar carregado quando o vídeo aparece; aqui é sem folga.) */
  useEffect(() => {
    if (!autoplay || !playing) return
    const node = host.current
    if (!node || typeof IntersectionObserver !== "function") return
    const io = new IntersectionObserver(([entry]) => {
      command(entry.isIntersecting ? "playVideo" : "pauseVideo")
    })
    io.observe(node)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, playing])

  /* O player recarrega o módulo de legenda sozinho — quando o vídeo começa,
     e de novo a cada volta do loop. Uma rajada no load não segura: tem que
     insistir enquanto ele estiver tocando. Um postMessage a cada 2s não
     custa nada perto de deixar legenda aparecendo num vídeo de campanha. */
  useEffect(() => {
    if (!playing) return
    const tick = () => {
      command("unloadModule", ["captions"])
      command("unloadModule", ["cc"])
    }
    const bursts = [0, 250, 700, 1500].map((ms) => window.setTimeout(tick, ms))
    const id = window.setInterval(tick, 2000)
    return () => {
      bursts.forEach(window.clearTimeout)
      window.clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  function command(func: string, args: unknown[] = []) {
    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    )
  }


  function toggleSound() {
    const next = !sound
    setSound(next)
    command(next ? "unMute" : "mute")
  }

  const base = "https://www.youtube-nocookie.com/embed/" + id
  const clickSrc = `${base}?autoplay=1&rel=0${start ? `&start=${start}` : ""}`
  const autoSrc =
    `${base}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0` +
    `&playsinline=1&modestbranding=1&disablekb=1&cc_load_policy=0&iv_load_policy=3&enablejsapi=1`

  if (autoplay) {
    return (
      <div className={`${styles.frame} ${className ?? ""}`} ref={host}>
        {mounted ? (
          <iframe
            ref={frame}
            src={autoSrc}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            onLoad={() => setPlaying(true)}
          />
        ) : null}
        <picture>
          {CAPA_LOCAL[id] ? <source media="(max-width: 640px)" srcSet={CAPA_LOCAL[id].celular} /> : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.poster}
            src={CAPA_LOCAL[id]?.src ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            fetchPriority={CAPA_LOCAL[id] ? "high" : undefined}
            alt=""
            aria-hidden="true"
            data-hidden={capaFora || undefined}
            // nem todo vídeo tem a capa grande; a média existe sempre
            onError={(e) => {
              const img = e.currentTarget
              if (!img.src.includes("hqdefault")) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
            }}
          />
        </picture>
        <button
          className={styles.soundToggle}
          onClick={toggleSound}
          type="button"
          aria-pressed={sound}
        >
          <span className="sr-only">
            {sound ? `Mute ${title}` : `Play sound for ${title}`}
          </span>
          <span className={styles.soundBadge} aria-hidden="true">
            {sound ? <IconSoundOn /> : <IconSoundOff />}
            {sound ? t.soundOn : t.soundOff}
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      {on ? (
        <iframe
          src={clickSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button className={styles.facade} onClick={() => setOn(true)} type="button">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" />
          <span className={styles.play} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {hideLabel ? null : <span className={styles.label}>{title}</span>}
        </button>
      )}
    </div>
  )
}

function IconSoundOff() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="m17 9 4 6M21 9l-4 6" />
    </svg>
  )
}

function IconSoundOn() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  )
}
