import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { PLAYGROUND } from "@/content/playground"
import { dict, type Lang } from "@/i18n"
import s from "./playground.module.css"

/**
 * /playground (16/10/2026, pedido do Rodrigo): a página do "Playground"
 * da barra — experimentos. O título na linha da barra (.page-top), a
 * frase, e uma grade masonry (4 colunas, cada peça num formato, empilhadas
 * sem alinhar as linhas — o desencontro da colagem da /work). Por enquanto
 * as peças são vagas numeradas; o conteúdo mora em content/playground.ts.
 */
export default function Playground({ lang }: { lang: Lang }) {
  const t = dict[lang].playground

  return (
    <>
      <SmoothScroll />
      <SiteNav lang={lang} />

      <main className={s.page}>
        <section className="section page-top">
          <div className={`container ${s.inner}`}>
            <h1 className="h3 page-title">{t.title}</h1>
            <p className={s.lead}>{t.lead}</p>

            <ul className={s.grid}>
              {PLAYGROUND.map((p, i) => (
                <li key={i} className={s.piece} style={{ aspectRatio: p.ratio }}>
                  {p.src ? (
                    p.src.endsWith(".mp4") ? (
                      <video src={p.src} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={p.src} alt={p.title ?? ""} loading="lazy" />
                    )
                  ) : (
                    // vaga: só o número, até o experimento chegar
                    <span className={s.num} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
