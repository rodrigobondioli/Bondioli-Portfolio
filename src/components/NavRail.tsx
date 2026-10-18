"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollSpinLogo } from "./Logo"
import TextRoll from "./TextRoll"
import ThemeToggle from "./ThemeToggle"
import { SOCIAL } from "@/lib/redes"
import { soltarScroll, travarScroll } from "@/lib/lenis"
import { dict, href, type Lang } from "@/i18n"
import styles from "./SiteNav.module.css"


export default function NavRail({
  brandHref,
  lang,
  projects,
  simples = false,
}: {
  brandHref: string
  lang: Lang
  projects: { slug: string; name: string; caso: boolean }[]
  /** só a marca com o nome e, no canto, idioma e tema — sem o menu (o
   *  media kit, 18/10, pedido do Rodrigo) */
  simples?: boolean
}) {
  const t = dict[lang]
  const pathname = usePathname()
  // a lista de projetos começa fechada, como no torgo
  const [projetos, setProjetos] = useState(false)
  // o menu do celular
  const [menu, setMenu] = useState(false)

  // trocou de página (ou de âncora pela lista): o menu do celular fecha
  useEffect(() => setMenu(false), [pathname])

  // Menu aberto no celular (17/10, auditoria de acessibilidade): Esc fecha;
  // o resto da página fica inerte (o Tab passava pros links escondidos
  // atrás do menu) e parado; ao fechar, o foco volta pro botão "Menu" (ia
  // pro começo da página).
  const header = useRef<HTMLElement>(null)
  const burger = useRef<HTMLButtonElement>(null)
  const abriu = useRef(false)
  useEffect(() => {
    if (!menu) {
      if (abriu.current) burger.current?.focus()
      return
    }
    abriu.current = true
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false)
    window.addEventListener("keydown", esc)
    // os irmãos do menu, subindo até o <body>, saem do Tab e da leitura
    const inertes: Element[] = []
    for (let el: Element | null = header.current; el && el !== document.body; el = el.parentElement) {
      for (const irmao of el.parentElement?.children ?? []) {
        if (irmao !== el && !irmao.hasAttribute("inert")) {
          irmao.setAttribute("inert", "")
          inertes.push(irmao)
        }
      }
    }
    travarScroll()
    document.documentElement.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", esc)
      inertes.forEach((el) => el.removeAttribute("inert"))
      soltarScroll()
      document.documentElement.style.overflow = ""
    }
  }, [menu])

  const work = href(lang, "/work")

  if (simples)
    return (
      <header className={styles.topo} data-topo="">
        <Link href={href(lang, brandHref)} className={`no-underline ${styles.brand}`} data-roll-host="">
          <ScrollSpinLogo size={32} className={styles.logoTopo} />
          <TextRoll text="Rodrigo Bondioli" underline={false} />
        </Link>
        <div className={styles.prefsTopo}>
          <ThemeToggle lang={lang} />
        </div>
      </header>
    )

  // fechou indo pra um link: o foco fica com a página nova, não no botão
  const fechar = () => {
    abriu.current = false
    setMenu(false)
  }

  return (
    <>
    {/* Pular pro conteúdo (17/10, auditoria de acessibilidade): o primeiro
        Tab da página. Invisível até receber o foco do teclado; leva ao
        <main id="conteudo"> e poupa as ~11 paradas da barra. */}
    <a
      href="#conteudo"
      className={styles.pular}
      // o scroll suave (Lenis) segura a âncora: o foco vai na mão
      onClick={(e) => {
        const alvo = document.getElementById("conteudo")
        if (!alvo) return
        e.preventDefault()
        alvo.focus()
      }}
    >
      {t.skipToContent}
    </a>
    {/* No desktop o idioma e o tema ficam fora da barra fixa: rolam junto
        com a página (16/10 — presos no canto, passavam por cima do
        "Services" dos projetos). Abaixo de 1100 quem aparece é o de dentro
        da linha do "Menu". */}
    <div className={styles.prefsPage}>
      <ThemeToggle lang={lang} />
    </div>
    <header ref={header} className={`${styles.nav} ${menu ? styles.open : ""}`} data-rail="">
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
        ref={burger}
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
                        {/* o projeto com case abre outra página; os outros
                            rolam a /work — a marca diz qual é qual (17/10,
                            auditoria) */}
                        {p.caso ? <span className={styles.caseTag}>{t.showcase.navTag}</span> : null}
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
