import Link from "next/link"
import CardReveal from "./CardReveal"
import Flipbook from "./Flipbook"
import WindSpinMark from "./WindSpinMark"
import { FORMATO_ESPELHADO, type Midia } from "@/content/showcase"
import { SHOWCASE_ALT } from "@/content/showcase-alt"
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
  // O formato de cada vaga é da mídia (17/10): quem montou a lista pros
  // formatos espelhados (FORMATO_ESPELHADO) fica com eles onde quer que o
  // projeto caia na página. A alternância de um projeto pro outro só troca
  // a ordem na tela (`order`): assim mudar a ordem dos projetos não muda o
  // recorte de peça nenhuma.
  const invertido = FORMATO_ESPELHADO.has(slug)
  const linha1 = !duasLinhas && invertido ? [...SLOTS].reverse() : SLOTS
  const slots = duasLinhas ? [...linha1, ...[...SLOTS].reverse()] : linha1
  // espelhado na tela = os formatos lidos 6:5 · 1:1 · 4:5 · quase quadrada
  const espelha = !duasLinhas && index % 2 === 1
  const aoContrario = espelha !== invertido
  const lista = services
    ? services.split("•").map((s) => servico(lang, s.trim())).filter(Boolean).join(", ")
    : null

  // Com case, cada foto é o seu próprio link: o vão embaixo das menores
  // (as alturas variam) não pode virar área de clique. Só a primeira entra
  // no Tab; as outras levam ao mesmo lugar.
  const fotosEl = fotos.map((item, i) => {
    if (!item) return null // vaga guardada: a mídia ainda não chegou
    // foto/vídeo com formato próprio ({ src, ratio }): o resto é igual
    const proprio = typeof item === "object" && "src" in item ? item : null
    const src = proprio ? proprio.src : item
    // formato próprio (ratio/span) vale pra foto, vídeo e marca girando
    const fmt = typeof item === "object" && item && ("ratio" in item || "span" in item) ? (item as { ratio?: string; span?: number; vaos?: number }) : null
    const flip = typeof src === "object" && "flipbook" in src ? src.flipbook : null
    const framed = typeof src === "object" && "framed" in src ? src.framed : null
    const spin = typeof src === "object" && "spin" in src ? src : null
    const framedList = framed ? (Array.isArray(framed) ? framed : [framed]) : null
    const key = flip ? flip.join() : framedList ? framedList.join() : spin ? spin.spin : (src as string)
    const video = !flip && !framed && !spin && (src as string).endsWith(".mp4")
    const size = video || flip || spin ? null : imageSize(framedList ? framedList[0] : (src as string))
    const poster = video ? (src as string).replace(/\.mp4$/, ".poster.webp") : null
    // o texto alternativo (showcase-alt.ts); sem texto, a peça segue decorativa
    const alt = SHOWCASE_ALT[flip ? flip[0] : framedList ? framedList[0] : spin ? spin.spin : (src as string)]?.[lang] ?? ""
    const midia = spin ? (
      <WindSpinMark src={spin.spin} bg={spin.bg} tamanho={spin.tamanho} />
    ) : flip ? (
      <Flipbook srcs={flip} label={alt} />
    ) : framed ? (
      // o print pequeno, centralizado num fundo claro, com respiro em volta
      <span className={styles.frame}>
        {framedList && framedList.length > 1 ? (
          // vários prints: trocam em corte seco, como um gif
          <Flipbook srcs={framedList} label={alt} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={framedList?.[0]} alt={alt} loading="lazy" width={size?.w} height={size?.h} />
        )}
      </span>
    ) : video ? (
      // vídeo curto: mudo, em loop. Nasce sem `src` e sem autoplay (17/10,
      // auditoria de performance: com autoplay o navegador baixava os 20
      // vídeos da /work ao abrir, 13MB): o VideoForaDaTela põe o `src` quando
      // ele chega perto da tela e toca. Até lá aparece o pôster, que é o
      // primeiro quadro exato do vídeo (<nome>.poster.webp) — não pisca
      // quando o vídeo começa.
      <video
        data-src={src as string}
        poster={poster && imageSize(poster) ? poster : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        data-sync={proprio?.sync}
      />
    ) : (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={src as string} alt={alt} loading="lazy" width={size?.w} height={size?.h} />
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
    const pos = aoContrario ? fotos.length - 1 - i : i
    const estilo = { ["--span" as string]: fmt?.span ?? slots[i].span, ["--vaos" as string]: fmt?.vaos ?? 0, aspectRatio: fmt?.ratio ?? slots[i].ratio, order: pos }
    // a entrada do brandbeet, em sequência na linha (de 4 em 4), na ordem da tela
    return (
      <CardReveal
        key={key}
        className={styles.shot}
        style={estilo}
        ordem={pos % 4}
        largo={!!fmt?.vaos}
        // o texto do vídeo vai na caixa dele: <video> não aceita o papel de
        // imagem (17/10, auditoria de acessibilidade). Com case, quem fala
        // é o link.
        rotulo={video && !linked && alt ? alt : undefined}
      >
        {conteudo}
      </CardReveal>
    )
  })

  return (
    <article id={slug} className={`${styles.project} ${linked ? styles.linked : ""}`}>
      <header className={styles.head}>
        <h3 className={`h3 ${styles.name}`}>
          {linked ? (
            <>
              <Link href={href} className="no-underline">
                {name}
              </Link>
              {/* o "(case study)" ao lado do nome saiu (17/10): o projeto com
                  case já fica sob o título "Case study" da /work */}
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
