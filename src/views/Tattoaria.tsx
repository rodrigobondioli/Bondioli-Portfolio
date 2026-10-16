import Link from "next/link"
import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { SiteFooter } from "@/components/SiteFooter"
import MeetingBar from "@/components/MeetingBar"
import ClosingSection from "@/components/ClosingSection"
import PillButton from "@/components/PillButton"
import StripReveal from "@/components/StripReveal"
import CaseFilm from "@/components/case/CaseFilm"
import LitText from "@/components/case/LitText"
import Tour from "@/components/case/Tour"
import HoverZoom from "@/components/case/HoverZoom"
import { imageSize } from "@/lib/imageSize"
import { caseTattoaria, type Chapter, type Media } from "@/content/cases/tattoaria"
import { dict, href, type Lang } from "@/i18n"
import s from "./case.module.css"

/**
 * /projects/tattoaria — o case completo, portado do tumulto.ai (12/10/2026,
 * pedido do Rodrigo: é o projeto principal dele, o único com um case deste
 * tamanho). Esta rota fixa ganha da dinâmica /projects/[slug], que segue
 * servindo os outros projetos no template do CMS.
 *
 * Estrutura de lá, roupa daqui: abertura com ficha (a.)–(d.), filme,
 * objetivo que acende com o scroll, números, nove capítulos — "(01)" e
 * título à esquerda, texto numa coluna larga à direita, mídia depois —,
 * o que a Tattoaria virou, fecho e créditos. Barra, rodapé, pílula, grade
 * e a revelação em faixas são os do portfólio. Grade de lá (768/1200)
 * traduzida pros degraus daqui (640/1100): as colunas são as mesmas.
 */

const MARK = ["(a.)", "(b.)", "(c.)", "(d.)"]

/** Foto de qualquer bloco: recorte no formato pedido, aberta em faixas. */
function Figure({ m, className = "" }: { m: Media; className?: string }) {
  const size = imageSize(m.src)
  return (
    <StripReveal className={`${s.figure} ${className}`} style={{ aspectRatio: m.ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={m.src}
        alt={m.alt}
        loading="lazy"
        width={size?.w}
        height={size?.h}
        data-zoom=""
        style={{ objectPosition: m.focus ?? "50% 50%" }}
      />
    </StripReveal>
  )
}

function ChapterSection({ ch, lang }: { ch: Chapter; lang: Lang }) {
  // "side": uma foto só, embaixo do título, com o texto ao lado
  const side = ch.media?.find((b) => b.layout === "side")?.items[0]
  const blocks = ch.media?.filter((b) => b.layout !== "side")

  return (
    <section id={ch.id} className={`grid ${s.chapter}`} aria-labelledby={`${ch.id}-t`}>
      <p className={`${s.label} ${s.chNum}`} aria-hidden="true">
        ({ch.n})
      </p>
      <h2 id={`${ch.id}-t`} className={`${s.title} ${s.chTitle}`}>
        <span className="sr-only">{ch.n}. </span>
        {ch.title}
      </h2>

      {side ? (
        <>
          <div className={s.chSide}>
            <Figure m={side} />
            {side.caption ? <p className={`${s.label} ${s.caption}`}>{side.caption}</p> : null}
          </div>
          {/* foto ao lado: o primeiro parágrafo no topo da foto, o resto no pé */}
          <div className={`${s.bodyText} ${s.chText} ${s.chLead}`}>
            <p>{ch.body[0]}</p>
          </div>
          {ch.body.length > 1 ? (
            <div className={`${s.bodyText} ${s.chText} ${s.chRest}`}>
              {ch.body.slice(1).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className={`${s.bodyText} ${s.chText}`}>
          {ch.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      )}

      {ch.list ? (
        <ul className={s.list}>
          {ch.list.map((item) => (
            <li key={item.title} className={s.listRow}>
              <h3 className={`${s.title} ${s.listTitle}`}>{item.title}</h3>
              <p className={`${s.bodyText} ${s.listText}`}>{item.text}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {ch.press ? (
        <ul className={s.press}>
          {ch.press.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={`no-underline ${s.pressRow}`}>
                <span className={`${s.small} ${s.pressOutlet}`}>{item.outlet}</span>
                <span className={`${s.bodyText} ${s.pressTitle}`}>{item.title}</span>
                <span className={s.pressArrow} aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only">{dict[lang].caseUi.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {ch.quote ? <LitText className={s.quote}>{ch.quote}</LitText> : null}

      {ch.youtube ? (
        <CaseFilm id={ch.youtube.id} title={ch.youtube.title} start={ch.youtube.start} lang={lang} />
      ) : null}

      {blocks?.map((block, i) =>
        block.layout === "tour" ? (
          <Tour key={`${ch.id}-${i}`} items={block.items} label={ch.title} />
        ) : (
          <div key={`${ch.id}-${i}`} className={`${s.media} ${s[block.layout]}`}>
            {/* sem legenda embaixo: no tumulto.ai no ar só as fotos ao lado
                do texto ("side") mostram legenda (conferido em 12/10) */}
            {block.items.map((m) => (
              <figure key={m.src} className={s.mediaItem}>
                <Figure m={m} />
              </figure>
            ))}
          </div>
        )
      )}
    </section>
  )
}

export default function Tattoaria({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const { place, title, summary, film, objective, facts, numbers, chapters, result, closing, credits } =
    caseTattoaria(lang)

  return (
    <>
      <SmoothScroll />
      <HoverZoom />
      <SiteNav brandHref="/work" lang={lang} />

      <main className={`on-project ${s.page}`}>
        <div className="section">
          <div className="container">
            {/* ---------- Abertura ---------- */}
            <section className={`grid ${s.head}`} aria-labelledby="case-title">
              <div className={`${s.small} ${s.top}`}>
                <span>{place}</span>
                <Link href={href(lang, "/work") + "#projects"} className={`no-underline ${s.back}`}>
                  {t.caseUi.allProjects}
                </Link>
              </div>
              <h1 id="case-title" className={`h1 ${s.caseTitle}`}>
                {title}
              </h1>
              <p className={`${s.title} ${s.summary}`}>{summary}</p>
              <dl className={s.facts}>
                {facts.map((f, i) => (
                  <div key={f.label} className={s.fact}>
                    <dt className={s.label}>
                      {MARK[i]} {f.label}
                    </dt>
                    <dd className={s.small}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <CaseFilm id={film.id} title={film.title} lang={lang} />

            {/* O objetivo, logo depois do filme: acende com o scroll */}
            <section className={`grid ${s.objective}`} aria-label={t.caseUi.objective}>
              <LitText>{objective}</LitText>
            </section>

            {/* Números: dois cards grandes em cima; três fotos em retrato embaixo, com o número fora */}
            <section className={`grid ${s.numbers}`} aria-label={t.caseUi.numbers}>
              {numbers.map((n, i) => {
                const index = <p className={`${s.label} ${s.numIndex}`}>({String(i + 1).padStart(2, "0")})</p>
                const value = <p className={s.numValue}>{n.value}</p>
                const label = <p className={`${s.small} ${s.numLabel}`}>{(n.photo && n.text) || n.label}</p>
                return n.photo ? (
                  <div key={n.value} className={s.numPhotoItem}>
                    <Figure m={n.photo} />
                    <div className={s.numData}>
                      {index}
                      {value}
                      {label}
                    </div>
                  </div>
                ) : (
                  <div key={n.value} className={s.numCard}>
                    {index}
                    {value}
                    {label}
                  </div>
                )
              })}
            </section>

            {chapters.map((ch) => (
              <ChapterSection key={ch.id} ch={ch} lang={lang} />
            ))}

            {/* O que a Tattoaria virou: os números voltam, compactos */}
            <section className={`grid ${s.result}`} aria-labelledby="case-result">
              <h2 id="case-result" className={`${s.title} ${s.chTitle}`}>
                {result.title}
              </h2>
              <p className={`${s.bodyText} ${s.body}`}>{result.text}</p>
              <ul className={s.strip}>
                {numbers.map((n) => (
                  <li key={n.value}>
                    <span className={`${s.title} ${s.stripValue}`}>{n.value}</span>
                    <span className={`${s.small} ${s.stripLabel}`}>{n.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Fecho: espelha o capítulo 01 */}
            <section className={`grid ${s.closing}`} aria-label={t.caseUi.closing}>
              <LitText>{closing.quote}</LitText>
              <div className={`${s.bodyText} ${s.body}`}>
                <p>{closing.text}</p>
                <PillButton href={closing.cta.href} className={s.cta}>
                  {closing.cta.label}
                </PillButton>
              </div>
            </section>

            {/* Créditos */}
            <section className={`grid ${s.credits}`} aria-labelledby="case-credits">
              <h2 id="case-credits" className={`${s.label} ${s.creditsLabel}`}>
                {credits.title}
              </h2>
              <dl className={s.creditList}>
                {credits.items.map((c) => (
                  <div key={c.role} className={s.creditRow}>
                    <dt className={s.small}>{c.role}</dt>
                    <dd className={s.small}>{c.who}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

      </main>

      <ClosingSection lang={lang} />
      <SiteFooter lang={lang} />
      <MeetingBar label={t.pill} />
    </>
  )
}
