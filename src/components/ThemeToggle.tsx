"use client"

import { useEffect, useState } from "react"
import styles from "./ThemeToggle.module.css"

/**
 * A barra lateral: idioma (EN / BR) em cima, o ícone do tema e o de baixar
 * o portfólio em Markdown (/portfolio.md) embaixo, em
 * pé no canto direito, no meio da altura da tela, em todas as páginas —
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
      {/* O portfólio inteiro em Markdown (/portfolio.md), pra baixar */}
      <a
        className={`no-underline ${styles.button}`}
        href="/portfolio.md"
        download="rodrigo-bondioli-portfolio.md"
        aria-label="Download portfolio as Markdown (.md)"
        title="Download portfolio (.md)"
      >
        <Arquivo />
      </a>
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

/* folha com a dobra no canto e uma seta pra baixo: "baixar o arquivo" */
function Arquivo() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11.5 2.5H5.5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V6.5l-4-4Z" />
      <path d="M11.5 2.5v4h4" />
      <path d="M10 9.5v5M7.8 12.4 10 14.6l2.2-2.2" />
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
