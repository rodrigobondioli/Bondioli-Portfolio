import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { SiteFooter } from "@/components/SiteFooter"
import MeetingBar from "@/components/MeetingBar"
import CountUpNumber from "@/components/CountUpNumber"
import YouTube from "@/components/YouTube"
import ClosingSection from "@/components/ClosingSection"
import AboutSection from "@/components/AboutSection"
import { dict, type Lang } from "@/i18n"
import s from "./info.module.css"

/**
 * /info (16/10/2026, pedido do Rodrigo): a página do "Info" da barra.
 * Junta o que a gente já tinha e que morava na /work — os três números do
 * antigo herói, o sobre, o manifesto e o canal do YouTube —, e a /work
 * fica só com os projetos. Também atende por /about (redireciona).
 *
 * O título começa na linha do nome da barra (.page-top), como em toda
 * página interna.
 */
const NUMEROS = [
  { target: 20, padTo: 0 },
  { target: 180, padTo: 0 },
  { target: 6, padTo: 2 },
]

export default function Info({ lang }: { lang: Lang }) {
  const t = dict[lang]

  return (
    <>
      <SmoothScroll />
      <SiteNav lang={lang} />

      <main>
        <section className={`section page-top ${s.top}`}>
          <div className={`container ${s.topInner}`}>
            <h1 className="h3 page-title">{t.info.title}</h1>
            <ul className={s.stats}>
              {NUMEROS.map((n, i) => (
                <li key={n.target} className={s.stat}>
                  <CountUpNumber target={n.target} padTo={n.padTo} className={s.statNumber} />
                  <span className={s.statLabel}>{t.info.stats[i]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AboutSection lang={lang} />

        {/* ---------- Manifesto ---------- */}
        <section className={`section ${s.statement}`}>
          <div className={`container ${s.statementInner}`}>
            <div className={s.headLine}>
              <p className="overline">{t.work.manifestoLabel}</p>
            </div>
            <p className={s.statementText}>{t.work.manifesto}</p>
          </div>
        </section>

        {/* ---------- YouTube ---------- */}
        <section className={`section on-accent ${s.youtube}`}>
          <div className={s.youtubeInner}>
            <div className="head-row">
              <h2 className="h4">{t.work.contentCreator}</h2>
              <p className="overline">YouTube @falabondioli</p>
            </div>

            <YouTube
              id="cSBSVxPP0as"
              start={1}
              title="O que você tem feito com IA, além de conversar?"
              hideLabel
              lang={lang}
            />

            <div className="head-row">
              <p className="overline">{t.work.subscribers}</p>
              <h3 className="h4">{t.work.noBullshit}</h3>
            </div>
          </div>
        </section>

        <ClosingSection lang={lang} />
      </main>

      <SiteFooter lang={lang} />
      <MeetingBar label={t.pill} entraApos={0} />
    </>
  )
}
