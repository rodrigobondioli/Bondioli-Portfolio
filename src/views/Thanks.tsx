import { dict, type Lang } from "@/i18n"
import styles from "./thanks.module.css"

/**
 * /thanks — confirmação pós-formulário.
 *
 * No Framer eram duas linhas separadas por réguas de 1px dentro de uma caixa
 * com borda branca, sobre uma foto de fundo. Mantido, mas:
 *   - a altura era 100vh fixa, que no iOS corta por causa da barra de URL →
 *     agora é 100svh
 *   - o padding de 124px lateral virou o gutter fluido
 */
export default function Thanks({ lang }: { lang: Lang }) {
  const t = dict[lang].thanks
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <hr className={styles.rule} />
        <p className="h4">{t.a}</p>
        <hr className={styles.rule} />
        <p className="h4">{t.b}</p>
        <hr className={styles.rule} />
      </div>
    </main>
  )
}
