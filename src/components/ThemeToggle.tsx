"use client"

import { useEffect, useState } from "react"
import styles from "./ThemeToggle.module.css"

/**
 * A barra lateral, em pé na margem direita, em todas as páginas: idioma
 * (EN / BR) no topo, na linha do "Get in touch", e o tema no meio da tela.
 * (O download do portfólio em .md foi pro rodapé, junto das redes.) —
 * desenho do Rodrigo a partir da referência "EN | PT ☼" (12/10). O tema
 * troca de verdade (dark é o padrão); o idioma, por enquanto, só mostra
 * como vai ficar.
 *
 * O tema mora no `data-theme` do <html>. Quem aplica no carregamento é o
 * script do <head> (sem piscar); aqui só se troca e se grava a escolha.
 */
type Tema = "dark" | "light"

export default function ThemeToggle() {
  const [tema, setTema] = useState<Tema>("dark")

  useEffect(() => {
    setTema(document.documentElement.dataset.theme === "light" ? "light" : "dark")
  }, [])

  const trocar = () => {
    const proximo: Tema = tema === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = proximo
    try {
      localStorage.setItem("tema", proximo)
    } catch {
      // navegação privada sem storage: troca vale só até sair da página
    }
    setTema(proximo)
  }

  const destino = tema === "dark" ? "light" : "dark"

  return (
    <div className={styles.rail}>
      {/* Idioma: por enquanto só a cara (12/10). O site é em inglês; o
          português ainda não existe, então BR aparece apagado e não leva a
          lugar nenhum — não é botão, pra ninguém clicar num link morto. */}
      <div className={styles.langs}>
        <span className={styles.lang} aria-current="true" lang="en">
          EN
        </span>
        <span className={`${styles.lang} ${styles.soon}`} title="Portuguese — coming soon" lang="pt-BR">
          BR
        </span>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={trocar}
        aria-label={`Switch to ${destino} mode`}
        title={`Switch to ${destino} mode`}
      >
        {tema === "dark" ? <Sol /> : <Lua />}
      </button>
    </div>
  )
}

function Sol() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="10" y1="1.8" x2="10" y2="3.6" transform={`rotate(${a} 10 10)`} />
      ))}
    </svg>
  )
}

function Lua() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
      <path d="M15.5 12.6A6.5 6.5 0 0 1 7.4 4.5a6.5 6.5 0 1 0 8.1 8.1Z" />
    </svg>
  )
}
