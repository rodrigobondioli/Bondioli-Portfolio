import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { SiteFooter } from "@/components/SiteFooter"
import { dict, type Lang } from "@/i18n"
import s from "./playground.module.css"

/**
 * /playground (16/10/2026, pedido do Rodrigo): a página do "Playground"
 * da barra. Ainda não há material separado pra ela — por enquanto é o
 * título, na linha do nome da barra (.page-top), e uma frase dizendo o
 * que vem aí.
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
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
