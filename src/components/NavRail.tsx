"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import CopyEmail from "./CopyEmail"
import TextRoll from "./TextRoll"
import ThemeToggle from "./ThemeToggle"
import { dict, href, type Lang } from "@/i18n"
import styles from "./SiteNav.module.css"

/* As redes, na ordem do Rodrigo (16/10): LinkedIn, YouTube, Substack, X */
const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bondioli/" },
  { label: "YouTube", href: "https://www.youtube.com/@falabondioli" },
  { label: "Substack", href: "https://falabondioli.substack.com/" },
  { label: "X", href: "https://x.com/falabondioli" },
]

export default function NavRail({
  brandHref,
  lang,
  projects,
}: {
  brandHref: string
  lang: Lang
  projects: { slug: string; name: string }[]
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
    <header className={`${styles.nav} ${menu ? styles.open : ""}`} data-rail="">
      <Link href={href(lang, brandHref)} className={`no-underline ${styles.brand}`} data-roll-host="">
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
                <svg className={styles.chevron} viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              <ul id="nav-projects" className={styles.sub} hidden={!projetos}>
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`${work}#${p.slug}`} className={`no-underline ${styles.item}`} data-roll-host="" onClick={fechar}>
                      <TextRoll text={p.name} underline={false} />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href={`${work}#about`} className={`no-underline ${styles.item}`} data-roll-host="" onClick={fechar}>
                <TextRoll text={t.nav.info} underline={false} />
              </Link>
            </li>
            <li>
              {/* ainda não existe: apagado, sem link morto */}
              <span className={`${styles.item} ${styles.soon}`} title={t.nav.soon}>
                {t.nav.playground}
              </span>
            </li>
          </ul>

          <hr className={styles.rule} />

          <ul className={styles.list}>
            {SOCIAL.map(({ label, href: url }) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer" className={`no-underline ${styles.item}`} data-roll-host="">
                  <TextRoll text={label} underline={false} />
                </a>
              </li>
            ))}
            <li>
              <CopyEmail
                label={t.nav.email}
                copiedLabel={t.emailCopied}
                failLabel={t.couldNotCopy}
                ariaLabel={t.copyEmail}
                className={styles.item}
                underline={false}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
