import Link from "next/link"
import StripReveal from "./StripReveal"
import CaseCursor from "./CaseCursor"
import { imageSize } from "@/lib/imageSize"
import styles from "./ProjectShowcase.module.css"

/**
 * Um projeto no "Selected work", no desenho do brandbeet.com (12/10,
 * pedido do Rodrigo): o nome grande à esquerda e "Services" à direita; uma
 * colagem de quatro imagens em larguras alternadas, alinhadas pelo topo —
 * com a mesma proporção, a largura diferente já dá a altura diferente, e
 * é esse desencontro que faz a colagem.
 *
 * Só projeto com case (`linked`, hoje só a Tattoaria — COM_CASE em
 * lib/projects) leva pra página interna: o nome e as fotos são link, e
 * passar o mouse nas fotos mostra a bolinha com a seta (CaseCursor).
 * Os outros são só as imagens, pelo craft — sem link e sem o zoom de
 * hover, que prometeria um clique que não existe (14/10).
 *
 * Os formatos copiam os de lá, medidos: quase quadrada, retrato alto,
 * quadrada, quase quadrada — em 5 · 7 · 4 · 8 colunas de 24. As fotos
 * daqui são 16:9, então o recorte é `object-fit: cover`. Projeto sim,
 * projeto não, a ordem espelha, pra as linhas não se repetirem.
 * As imagens abrem em faixas (StripReveal).
 */

const SLOTS = [
  { span: 5, ratio: "24 / 25" },
  { span: 7, ratio: "4 / 5" },
  { span: 4, ratio: "1 / 1" },
  { span: 8, ratio: "20 / 21" },
]

export default function ProjectShowcase({
  slug,
  name,
  services,
  images,
  index = 0,
  linked = false,
}: {
  slug: string
  name: string
  services?: string | null
  images: string[]
  /** posição na lista: os ímpares espelham a colagem */
  index?: number
  /** tem página interna (case) */
  linked?: boolean
}) {
  const href = `/projects/${slug}`
  const fotos = images.slice(0, 4)
  const slots = index % 2 ? [...SLOTS].reverse() : SLOTS
  const lista = services
    ? services.split("•").map((s) => s.trim()).filter(Boolean).join(", ")
    : null

  // Com case, cada foto é o seu próprio link: o vão embaixo das menores
  // (as alturas variam) não pode virar área de clique. Só a primeira entra
  // no Tab; as outras levam ao mesmo lugar.
  const fotosEl = fotos.map((src, i) => {
    const size = imageSize(src)
    const img = (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={src} alt="" loading="lazy" width={size?.w} height={size?.h} />
    )
    return (
      <StripReveal
        key={src}
        className={styles.shot}
        style={{ ["--span" as string]: slots[i].span, aspectRatio: slots[i].ratio }}
      >
        {linked ? (
          <Link
            href={href}
            className={`no-underline ${styles.shotLink}`}
            aria-label={i === 0 ? `${name} — view case study` : undefined}
            aria-hidden={i === 0 ? undefined : true}
            tabIndex={i === 0 ? undefined : -1}
          >
            {img}
          </Link>
        ) : (
          img
        )}
      </StripReveal>
    )
  })

  return (
    <article className={`${styles.project} ${linked ? styles.linked : ""}`}>
      <header className={styles.head}>
        <h3 className={`h3 ${styles.name}`}>
          {linked ? (
            <Link href={href} className="no-underline">
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        {lista ? (
          <p className={styles.services}>
            <span className={styles.servicesLabel}>Services</span>
            <span className={styles.servicesList}>{lista}</span>
          </p>
        ) : null}
      </header>

      {linked ? (
        <CaseCursor>
          <div className={styles.collage}>{fotosEl}</div>
        </CaseCursor>
      ) : (
        <div className={styles.collage}>{fotosEl}</div>
      )}
    </article>
  )
}
