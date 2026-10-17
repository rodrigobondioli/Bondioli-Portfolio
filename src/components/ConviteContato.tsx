import PillButton from "./PillButton"
import CopyEmail from "./CopyEmail"
import { dict, href, type Lang } from "@/i18n"
import styles from "./ConviteContato.module.css"

/**
 * O convite pro contato no fim de uma página (17/10, auditoria: a /work e o
 * case terminavam sem nenhuma ação, e o único caminho era o "Contact"
 * pequeno da barra). Discreto, sem voltar ao fecho amarelo: o rótulo
 * "Contact", o título da página de contato, o botão pra ela e o e-mail.
 * Os textos são os da própria página de contato — nada novo pra manter.
 *
 * `soAcao`: só o botão e o e-mail (no case, que já tem o próprio fecho
 * escrito, o texto do "flash book").
 */
export default function ConviteContato({ lang, soAcao = false }: { lang: Lang; soAcao?: boolean }) {
  const t = dict[lang]
  const acao = (
    <div className={styles.acao}>
      <PillButton href={href(lang, "/contact")}>{t.form.submit}</PillButton>
      <span className={styles.ou}>{t.contact.emailLabel}</span>
      <CopyEmail copiedLabel={t.emailCopied} failLabel={t.couldNotCopy} ariaLabel={t.copyEmail} className={styles.email} />
    </div>
  )
  if (soAcao) return acao
  return (
    <section className={styles.convite} aria-labelledby="convite-titulo">
      {/* tudo numa linha (17/10, pedido do Rodrigo): o rótulo e o título à
          esquerda, o botão e o e-mail à direita */}
      <div className={styles.texto}>
        <p className={styles.rotulo}>{t.contact.label}</p>
        <h2 id="convite-titulo" className={`h3 ${styles.titulo}`}>
          {t.contact.title}
        </h2>
      </div>
      {acao}
    </section>
  )
}
