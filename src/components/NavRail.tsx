"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollSpinLogo } from "./Logo"
import TextRoll from "./TextRoll"
import ThemeToggle from "./ThemeToggle"
import { dict, href, type Lang } from "@/i18n"
import styles from "./SiteNav.module.css"

/* As redes, na ordem do Rodrigo (16/10): LinkedIn, YouTube, Substack, X —
   em ícones pequenos e discretos, numa linha (teste, 16/10). Desenhos
   simplificados das marcas, num quadro de 24, preenchidos com a cor do
   texto. */
const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bondioli/",
    d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@falabondioli",
    d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z",
  },
  {
    label: "Substack",
    href: "https://falabondioli.substack.com/",
    d: "M21.5 6.2h-19V3.5h19v2.7Zm-19 2.6h19v2.7h-19V8.8Zm0 5.2V23l9.5-5.3 9.5 5.3V14h-19Z",
  },
  {
    label: "X",
    href: "https://x.com/falabondioli",
    d: "M17.8 2.5h3.3l-7.2 8.2 8.4 11.1h-6.6l-5.2-6.8-5.9 6.8H1.3l7.7-8.8L1 2.5h6.8l4.7 6.2 5.3-6.2Zm-1.2 17.4h1.8L6.6 4.3H4.7l11.9 15.6Z",
  },
]

export default function NavRail({
  brandHref,
  lang,
  projects,
}: {
  brandHref: string
  lang: Lang
  projects: { slug: string; name: string; caso: boolean }[]
}) {
  const t = dict[lang]
  const pathname = usePathname()
  // a lista de projetos começa fechada, como no torgo
  const [projetos, setProjetos] = useState(false)
  // o menu do celular
  const [menu, setMenu] = useState(false)

  // trocou de página (ou de âncora pela lista): o menu do celular fecha
  useEffect(() => setMenu(false), [pathname])

  // menu aberto no celular: Esc fecha
  useEffect(() => {
    if (!menu) return
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false)
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [menu])

  const work = href(lang, "/work")
  const fechar = () => setMenu(false)

  return (
    <>
    {/* No desktop o idioma e o tema ficam fora da barra fixa: rolam junto
        com a página (16/10 — presos no canto, passavam por cima do
        "Services" dos projetos). Abaixo de 1100 quem aparece é o de dentro
        da linha do "Menu". */}
    <div className={styles.prefsPage}>
      <ThemeToggle lang={lang} />
    </div>
    <header className={`${styles.nav} ${menu ? styles.open : ""}`} data-rail="">
      <Link href={href(lang, brandHref)} className={`no-underline ${styles.brand}`} data-roll-host="">
        {/* a marca gira com o scroll, com embalo no fim (16/10; antes
            girava sozinha, no vento da capa) */}
        <ScrollSpinLogo size={32} className={styles.logo} />
        <TextRoll text="Rodrigo Bondioli" underline={false} />
      </Link>

      <div className={styles.prefs}>
        <ThemeToggle lang={lang} />
      </div>

      <button
        type="button"
        className={styles.burger}
        aria-expanded={menu}
        aria-controls="site-menu"
        onClick={() => setMenu((m) => !m)}
      >
        {menu ? t.nav.close : t.nav.menu}
      </button>

      <div id="site-menu" className={styles.panel}>
        <p className={styles.group}>
          <span>{t.role}</span>
          <span>{t.place}</span>
        </p>

        <nav aria-label="Menu" className={styles.menu}>
          <ul className={styles.list}>
            <li>
              <button
                type="button"
                className={styles.item}
                data-roll-host=""
                aria-expanded={projetos}
                aria-controls="nav-projects"
                onClick={() => setProjetos((p) => !p)}
              >
                <TextRoll text={t.nav.projects} underline={false} />
                <sup className={styles.count} aria-hidden="true">({projects.length})</sup>
                <svg className={styles.chevron} viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              {/* A lista abre deslizando (a altura cresce de 0 até a dela) e
                  os nomes entram um depois do outro, alinhados com
                  "Projects" — "estava muito seca" (16/10). Fechada, sai da
                  leitura e do Tab (inert). */}
              <div className={`${styles.subWrap} ${projetos ? styles.subOpen : ""}`} inert={!projetos}>
                <ul id="nav-projects" className={styles.sub}>
                  {projects.map((p, i) => (
                    <li key={p.slug} style={{ ["--i" as string]: i }}>
                      <Link
                        /* com case (a Tattoaria), a página do case — a âncora
                           dela na /work fica logo no topo e parecia "voltar
                           pro início" (16/10) */
                        href={p.caso ? href(lang, `/projects/${p.slug}`) : `${work}#${p.slug}`}
                        className={`no-underline ${styles.item}`}
                        data-roll-host=""
                        onClick={fechar}
                      >
                        <span className={styles.num} aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <TextRoll text={p.name} underline={false} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href={href(lang, "/info")} className={`no-underline ${styles.item}`} data-roll-host="" onClick={fechar}>
                <TextRoll text={t.nav.info} underline={false} />
              </Link>
            </li>
            <li>
              <Link href={href(lang, "/playground")} className={`no-underline ${styles.item}`} data-roll-host="" onClick={fechar}>
                <TextRoll text={t.nav.playground} underline={false} />
              </Link>
            </li>
            <li>
              {/* a página de contato (16/10; antes o item copiava o e-mail) */}
              <Link href={href(lang, "/contact")} className={`no-underline ${styles.item}`} data-roll-host="" onClick={fechar}>
                <TextRoll text={t.nav.contact} underline={false} />
              </Link>
            </li>
          </ul>

          <hr className={styles.rule} />

          <ul className={styles.icons}>
            {SOCIAL.map(({ label, href: url, d }) => (
              <li key={label}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`no-underline ${styles.icon}`}
                  aria-label={label}
                  title={label}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <path d={d} fill="currentColor" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

        </nav>
      </div>
    </header>
    </>
  )
}
