import Link from "next/link"
import StripReveal from "./StripReveal"
import { imageSize } from "@/lib/imageSize"
import styles from "./ProjectShowcase.module.css"

/**
 * Um projeto no "Selected work", no desenho do brandbeet.com (12/10,
 * pedido do Rodrigo): o nome grande à esquerda e "Services" à direita; uma
 * colagem de quatro imagens em larguras alternadas, alinhadas pelo topo —
 * com a mesma proporção, a largura diferente já dá a altura diferente, e
 * é esse desencontro que faz a colagem; e uma barra da largura da página
 * no fim. Lá a barra abre mais imagens ("View more"); aqui ela leva pra
 * página do projeto, e o nome e as imagens também.
 *
 * Larguras em colunas de 24 (as linhas da grade): 4 · 7 · 6 · 7. Com três
 * imagens, 7 · 10 · 7. As imagens abrem em faixas (StripReveal).
 */

const SPANS: Record<number, number[]> = {
  1: [24],
  2: [10, 14],
  3: [7, 10, 7],
  4: [4, 7, 6, 7],
}

export default function ProjectShowcase({
  slug,
  name,
  services,
  images,
}: {
  slug: string
  name: string
  services?: string | null
  images: string[]
}) {
  const href = `/projects/${slug}`
  const fotos = images.slice(0, 4)
  const spans = SPANS[fotos.length] ?? SPANS[4]
  const lista = services
    ? services.split("•").map((s) => s.trim()).filter(Boolean).join(", ")
    : null

  return (
    <article className={styles.project}>
      <header className={styles.head}>
        <h3 className={`h2 ${styles.name}`}>
          <Link href={href} className="no-underline">
            {name}
          </Link>
        </h3>
        {lista ? (
          <p className={styles.services}>
            <span className={styles.servicesLabel}>Services</span>
            <span className={styles.servicesList}>{lista}</span>
          </p>
        ) : null}
      </header>

      <Link href={href} className={`no-underline ${styles.collage}`} tabIndex={-1} aria-hidden="true">
        {fotos.map((src, i) => {
          const size = imageSize(src)
          return (
            <StripReveal
              key={src}
              className={styles.shot}
              style={{ ["--span" as string]: spans[i] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" width={size?.w} height={size?.h} />
            </StripReveal>
          )
        })}
      </Link>

      <Link href={href} className={`no-underline ${styles.bar}`}>
        View project <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
