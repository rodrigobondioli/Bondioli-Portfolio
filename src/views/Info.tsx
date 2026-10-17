import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import CopyEmail from "@/components/CopyEmail"
import SideColumn from "@/components/SideColumn"
import { BRANDS } from "@/components/Brands"
import { info, type InfoContent } from "@/content/info"
import { semSolta } from "@/lib/semSolta"
import Link from "next/link"
import { dict, href, type Lang } from "@/i18n"
import s from "./info.module.css"

/**
 * /info (16/10/2026, pedido do Rodrigo): o texto novo dele — a história
 * inteira, das agências ao estúdio de tatuagem, à pandemia e ao que sobrou
 * ("julgamento") — na estrutura do torgo.work/info:
 *
 *   - sem faixa no topo ("Oi & Hello &" e depois "No bullshit design"
 *     foram testadas e saíram: "já tem texto pra caralho"); o rótulo
 *     "About" fica na linha da barra e a foto desce até a primeira frase;
 *   - à esquerda, presa na tela, a foto (o retrato de perfil) e listas que
 *     abrem e fecham: experiência, prêmios, ensino, marcas;
 *   - à direita, o texto longo, sob o rótulo "About".
 *
 * Substitui a versão de antes (o bloco "sobre" da /work, o manifesto e o
 * canal do YouTube). Também atende por /about (redireciona).
 *
 * Sem a pílula "See if we're a fit" e o desfoque do pé da tela (16/10,
 * pedido do Rodrigo): aqui o convite é o fim do texto.
 */
export default function Info({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const c = info[lang]

  return (
    <>
      <SmoothScroll />
      <SiteNav lang={lang} />

      <main>
        <section className={`section page-top ${s.body}`}>
          <div className={`container grid ${s.grid}`}>
            {/* com uma lista grande aberta, a coluna rola por dentro */}
            <SideColumn className={s.side}>
              <div className={s.photo}>
                {/* foto parada, não o vídeo (16/10): o glitch do vídeo, preso
                    do lado de um texto longo, puxava o olho a cada piscada */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/rodrigo-info.webp"
                  alt={c.photoAlt}
                  width={760}
                  height={950}
                />
              </div>

              <div className={s.lists}>
                {/* Experiência, Marcas (16/10: logo embaixo da experiência),
                    Prêmios, Ensino */}
                <Lista lista={c.lists[0]} />
                <Lista lista={{ title: c.brandsTitle, groups: [{ items: BRANDS.map(([name]) => name) }] }} />
                {c.lists.slice(1).map((l) => (
                  <Lista key={l.title} lista={l} />
                ))}
              </div>
            </SideColumn>

            <article className={s.text}>
              <p className={s.label}>{c.aboutLabel}</p>
              {/* Sem o "I'm Rodrigo Bondioli / Creative director…" (16/10):
                  o nome e o cargo já estão na barra; repetia. O h1 fica só
                  pra leitura de tela e pro Google. */}
              <h1 className="sr-only">Rodrigo Bondioli — {c.aboutLabel}</h1>
              <p className={s.lead}>{semSolta(c.lead)}</p>

              <h2 className={s.label}>{c.storyTitle}</h2>
              <div className={s.story}>
                {c.story.map((p) => (
                  <p key={p.slice(0, 32)}>{comLinks(p, lang)}</p>
                ))}
              </div>
              <p className={s.closing}>{semSolta(c.closing)}</p>

              <h2 className={s.label}>{c.workTitle}</h2>
              <p className={s.work}>{semSolta(c.work)}</p>
              <CopyEmail
                copiedLabel={t.emailCopied}
                failLabel={t.couldNotCopy}
                ariaLabel={t.copyEmail}
                className={s.email}
              />
            </article>
          </div>
        </section>
      </main>
    </>
  )
}

/* "[texto](/caminho)" no meio do parágrafo vira link (na língua da página) */
function comLinks(texto: string, lang: Lang) {
  const partes = semSolta(texto).split(/\[([^\]]+)\]\(([^)]+)\)/)
  return partes.map((parte, i) =>
    i % 3 === 1 ? (
      <Link key={i} href={href(lang, partes[i + 1])}>
        {parte}
      </Link>
    ) : i % 3 === 2 ? null : (
      parte
    )
  )
}

function Lista({ lista }: { lista: InfoContent["lists"][number] }) {
  return (
    <details className={s.details}>
      <summary className={s.summary}>
        <Seta />
        {lista.title}
      </summary>
      <div className={s.panel}>
        {lista.groups.map((g, i) => (
          <div key={g.label ?? i} className={s.group}>
            {g.label ? <p className={s.groupLabel}>{g.label}</p> : null}
            <ul>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  )
}

function Seta() {
  return (
    <svg className={s.seta} viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <path d="M2 1l4 3-4 3z" fill="currentColor" />
    </svg>
  )
}
