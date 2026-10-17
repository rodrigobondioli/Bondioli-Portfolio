import YouTube from "@/components/YouTube"
import type { Lang } from "@/i18n"
import styles from "./CaseFilm.module.css"

/**
 * O vídeo do case: na largura do conteúdo, parado (16/10, pedido do
 * Rodrigo). Era o HeroVideo do tumulto.ai — colunas 3 a 22 e uma moldura
 * que abria com o scroll (recorte de 14%/9% e zoom de 1.25 pra 1); os dois
 * saíram.
 *
 * O player é o YouTube daqui, no modo que toca sozinho e mudo.
 */
export default function CaseFilm({
  id,
  title,
  start,
  className = "",
  lang = "en",
}: {
  id: string
  title: string
  start?: number
  className?: string
  lang?: Lang
}) {
  return (
    <div className={`grid ${styles.wrap} ${className}`}>
      <div className={styles.figure}>
        <YouTube id={id} title={title} start={start} autoplay lang={lang} />
      </div>
    </div>
  )
}
