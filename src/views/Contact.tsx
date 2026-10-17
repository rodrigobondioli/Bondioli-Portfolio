import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import ContactForm from "@/components/ContactForm"
import CopyEmail from "@/components/CopyEmail"
import { dict, type Lang } from "@/i18n"
import s from "./contact.module.css"

/**
 * /contact (16/10/2026, pedido do Rodrigo): a página do "Contact" do menu.
 *
 * Mesmo desenho da /info (depois de testar três colunas — texto ·
 * formulário · foto — e não gostar): a foto à esquerda, no mesmo lugar,
 * tamanho e espaçamento da foto de lá; à direita, o rótulo "Contact" na
 * linha da barra, o convite (escrito pra founder) e, embaixo, o
 * formulário (o de sempre, que envia por /api/contact).
 */
export default function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const c = t.contact

  return (
    <>
      <SmoothScroll />
      <SiteNav lang={lang} />

      <main>
        <section className={`section page-top ${s.body}`}>
          <div className={`container grid ${s.grid}`}>
            <div className={s.side}>
              <div className={s.photo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/rodrigo-contato.webp" alt={c.photoAlt} width={1000} height={1340} />
              </div>
              {/* o e-mail mora embaixo da foto (16/10), como as listas da /info */}
              <div className={s.meta}>
                <p className={s.muted}>{c.emailLabel}</p>
                <CopyEmail
                  copiedLabel={t.emailCopied}
                  failLabel={t.couldNotCopy}
                  ariaLabel={t.copyEmail}
                  className={s.email}
                />
              </div>
            </div>

            <div className={s.text}>
              <p className={s.label}>{c.label}</p>
              <h1 className={`h3 page-title ${s.title}`}>{c.title}</h1>
              {c.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className={s.paragraph}>
                  {p}
                </p>
              ))}

              <div className={s.form}>
                <ContactForm lang={lang} />
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  )
}
