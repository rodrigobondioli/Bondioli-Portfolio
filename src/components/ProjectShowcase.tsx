import Link from "next/link"
import CardReveal from "./CardReveal"
import Flipbook from "./Flipbook"
import type { Midia } from "@/content/showcase"
import { imageSize } from "@/lib/imageSize"
import { dict, href as hrefLang, servico, type Lang } from "@/i18n"
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
 * passar o mouse numa foto dá o zoom, escurece e mostra "View case study"
 * por cima dela.
 * Os outros são só as imagens, pelo craft — sem link e sem o zoom de
 * hover, que prometeria um clique que não existe (14/10).
 *
 * Os formatos copiam os de lá, medidos: quase quadrada, retrato alto,
 * quadrada, quase quadrada — em 5 · 7 · 4 · 8 colunas de 24. As fotos
 * daqui são 16:9, então o recorte é `object-fit: cover`. Projeto sim,
 * projeto não, a ordem espelha, pra as linhas não se repetirem.
 * As peças entram como no brandbeet.com/work (CardReveal): sobem, aparecem
 * e se abrem de cima pra baixo, uma depois da outra.
 */

const SLOTS = [
  { span: 5, ratio: "24 / 25" },
  { span: 7, ratio: "4 / 5" },
  { span: 4, ratio: "1 / 1" },
  // mais deitada que a de lá (20/21): alta assim ela passava do retrato
  // vizinho; em 6:5 fica entre ele e a quadrada (14/10, pedido do Rodrigo)
  { span: 8, ratio: "6 / 5" },
]

export default function ProjectShowcase({
  slug,
  name,
  services,
  images,
  index = 0,
  linked = false,
  lang = "en",
}: {
  lang?: Lang
  slug: string
  name: string
  services?: string | null
  /** fotos e vídeos (.mp4); null guarda a vaga de uma mídia que falta */
  images: Midia[]
  /** posição na lista: os ímpares espelham a colagem */
  index?: number
  /** tem página interna (case) */
  linked?: boolean
}) {
  const t = dict[lang].showcase
  const href = hrefLang(lang, `/projects/${slug}`)
  // Até 8: com mais de 4, a linha de baixo espelha a de cima (como no
  // brandbeet). Com 4, o espelho alterna de um projeto pro outro.
  const fotos = images.slice(0, 8)
  const duasLinhas = fotos.length > 4
  const linha1 = !duasLinhas && index % 2 ? [...SLOTS].reverse() : SLOTS
  const slots = duasLinhas ? [...linha1, ...[...SLOTS].reverse()] : linha1
  const lista = services
    ? services.split("•").map((s) => servico(lang, s.trim())).filter(Boolean).join(", ")
    : null

  // Com case, cada foto é o seu próprio link: o vão embaixo das menores
  // (as alturas variam) não pode virar área de clique. Só a primeira entra
  // no Tab; as outras levam ao mesmo lugar.
  const fotosEl = fotos.map((src, i) => {
    if (!src) return null // vaga guardada: a mídia ainda não chegou
    const flip = typeof src === "object" ? src.flipbook : null
    const key = flip ? flip.join() : (src as string)
    const video = !flip && (src as string).endsWith(".mp4")
    const size = video || flip ? null : imageSize(src as string)
    const midia = flip ? (
      <Flipbook srcs={flip} />
    ) : video ? (
      // vídeo curto: toca sozinho, mudo, em loop
      <video src={src as string} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
    ) : (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={src as string} alt="" loading="lazy" width={size?.w} height={size?.h} />
    )
    const conteudo = linked ? (
      <Link
        href={href}
        className={`no-underline ${styles.shotLink}`}
        aria-label={i === 0 ? `${name} — ${t.viewCase}` : undefined}
        aria-hidden={i === 0 ? undefined : true}
        tabIndex={i === 0 ? undefined : -1}
      >
        {midia}
        <span className={styles.cta} aria-hidden="true">
          {t.viewCase}
        </span>
      </Link>
    ) : (
      midia
    )
    const estilo = { ["--span" as string]: slots[i].span, aspectRatio: slots[i].ratio }
    // a entrada do brandbeet, em sequência na linha (de 4 em 4)
    return (
      <CardReveal key={key} className={styles.shot} style={estilo} ordem={i % 4}>
        {conteudo}
      </CardReveal>
    )
  })

  return (
    <article className={`${styles.project} ${linked ? styles.linked : ""}`}>
      <header className={styles.head}>
        <h3 className={`h3 ${styles.name}`}>
          {linked ? (
            <>
              <Link href={href} className="no-underline">
                {name}
              </Link>
              {/* o que diferencia o projeto com página interna (14/10) */}
              <span className={styles.tag}>{t.caseTag}</span>
            </>
          ) : (
            name
          )}
        </h3>
        {lista ? (
          <p className={styles.services}>
            <span className={styles.servicesLabel}>{t.services}</span>
            <span className={styles.servicesList}>{lista}</span>
          </p>
        ) : null}
      </header>

      <div className={styles.collage}>{fotosEl}</div>
    </article>
  )
}
