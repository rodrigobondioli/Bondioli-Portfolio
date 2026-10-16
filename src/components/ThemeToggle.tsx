"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { dict, trocarLingua, type Lang } from "@/i18n"
import styles from "./ThemeToggle.module.css"

/**
 * A barra lateral, em pé na margem direita, em todas as páginas: idioma
 * (EN / BR) no topo, na linha do "Get in touch", um tracinho e o tema
 * logo embaixo.
 * (O download do portfólio em .md foi pro rodapé, junto das redes.) —
 * desenho do Rodrigo a partir da referência "EN | PT ☼" (12/10). O tema
 * troca de verdade (dark é o padrão); o idioma, por enquanto, só mostra
 * como vai ficar. Desde 16/10 o idioma funciona: EN leva pra raiz, BR
 * pra /pt, na mesma página (ou na /pt/work, se a página não existe em
 * português).
 *
 * O tema mora no `data-theme` do <html>. Quem aplica no carregamento é o
 * script do <head> (sem piscar); aqui só se troca e se grava a escolha.
 */
type Tema = "dark" | "light"

export default function ThemeToggle({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang]
  const pathname = usePathname() ?? "/"
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
      {/* Idioma (16/10): a língua atual acesa, a outra é link pro mesmo
          lugar na outra língua. */}
      <nav className={styles.langs} aria-label={t.langLabel}>
        {(["en", "pt"] as const).map((l) => {
          const rotulo = l === "en" ? "EN" : "BR"
          const idioma = l === "en" ? "en" : "pt-BR"
          return l === lang ? (
            <span key={l} className={styles.lang} aria-current="true" lang={idioma}>
              {rotulo}
            </span>
          ) : (
            <Link
              key={l}
              href={trocarLingua(pathname, l)}
              className={`no-underline ${styles.lang} ${styles.other}`}
              hrefLang={idioma}
              lang={idioma}
              aria-label={l === "en" ? "English" : "Português"}
            >
              {rotulo}
            </Link>
          )
        })}
      </nav>
      <span className={styles.divider} aria-hidden="true" />
      <button
        type="button"
        className={styles.button}
        onClick={trocar}
        aria-label={t.themeTo(destino)}
        title={t.themeTo(destino)}
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
