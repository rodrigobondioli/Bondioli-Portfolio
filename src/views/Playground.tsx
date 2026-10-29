import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { PLAYGROUND } from "@/content/playground"
import { dict, type Lang } from "@/i18n"
import s from "./playground.module.css"

/**
 * /playground (16/10/2026, pedido do Rodrigo): a página do "Playground"
 * da barra — experimentos. O título na linha da barra (.page-top), a
 * frase, e uma grade masonry (4 colunas em duas metades, cada peça num formato, empilhadas
 * sem alinhar as linhas — o desencontro da colagem da /work). Por enquanto
 * as peças são vagas numeradas; o conteúdo mora em content/playground.ts.
 */
export default function Playground({ lang }: { lang: Lang }) {
  const t = dict[lang].playground

  return (
    <>
      <SmoothScroll />
      <SiteNav lang={lang} />

      <main id="conteudo" tabIndex={-1} className={s.page}>
        <section className="section page-top">
          <div className={`container ${s.inner}`}>
            {/* rótulo no topo, como as outras páginas (17/10, auditoria: era
                o único com título grande) */}
            <h1 className={s.label}>{t.title}</h1>
            <p className={s.lead}>{t.lead}</p>

            {/* duas metades de duas colunas (29/10): é o que deixa uma peça
                ocupar duas colunas, coisa que o masonry de colunas não faz */}
            <div className={s.grid}>
              {PLAYGROUND.map((metade, m) => (
                <ul key={m} className={s.half}>
                  {metade.map((p, i) => (
                    <li
                      key={i}
                      className={p.wide ? `${s.piece} ${s.wide}` : s.piece}
                      style={{ aspectRatio: p.ratio }}
                    >
                      {p.src ? (
                        p.src.endsWith(".mp4") ? (
                          <video src={p.src} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={p.src} alt={p.title ?? ""} loading="lazy" />
                        )
                      ) : (
                        // vaga: "Coming soon", até o experimento chegar (17/10;
                        // era o número da vaga)
                        <span className={s.num} aria-hidden="true">
                          {t.soon}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
