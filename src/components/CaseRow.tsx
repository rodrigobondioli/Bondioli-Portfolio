import Link from "next/link"
import StripReveal from "./StripReveal"
import { imageSize } from "@/lib/imageSize"
import styles from "./CaseRow.module.css"

/**
 * Uma linha do "Selected work" (12/10, a partir da lista do aboutmarco.com,
 * medida lá: duas metades com 32 entre elas, régua de 1px em cima da
 * metade do texto, imagem 16:9 na outra, 64 entre uma linha e outra).
 *
 * Esquerda: régua, cliente (peso 600), o que foi entregue e o ano, e a
 * frase do case em caixa alta embaixo. Direita: a thumb, aberta em faixas
 * (StripReveal, a revelação do tumulto.ai) e com o zoom de hover dos cards.
 * A linha inteira é o link.
 *
 * Os campos vêm do projects.json: projectName, what, year e headline.
 */
export default function CaseRow({
  slug,
  name,
  what,
  year,
  headline,
  thumb,
}: {
  slug: string
  name: string
  what?: string | null
  year?: string | null
  headline?: string | null
  thumb?: string | null
}) {
  const size = imageSize(thumb ?? undefined)
  const meta = [what, year].filter(Boolean)

  return (
    <Link href={`/projects/${slug}`} className={`no-underline ${styles.row}`}>
      <div className={`g-left to-line ${styles.text}`}>
        <div className={styles.meta}>
          <h3 className={styles.client}>{name}</h3>
          {meta.length ? (
            <p className={`body-sm ${styles.kind}`}>
              {meta.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </p>
          ) : null}
        </div>
        {headline ? <p className={`h3 ${styles.headline}`}>{headline}</p> : null}
      </div>

      <StripReveal className={`g-right ${styles.media}`}>
        {thumb ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={thumb} alt="" loading="lazy" width={size?.w} height={size?.h} />
        ) : (
          <span />
        )}
      </StripReveal>
    </Link>
  )
}
