import Brands from "@/components/Brands"
import { dict, type Lang } from "@/i18n"
import s from "./AboutSection.module.css"

/* O "sobre" do site. Mora aqui, e não em cada página, porque a /work e a
   /mediakit têm que mostrar o mesmo bloco, igualzinho — a /mediakit tinha
   uma cópia (retrato no lugar do vídeo, texto e espaçamento próprios) que
   foi se descolando (14/10, pedido do Rodrigo). Mudou aqui, muda nas duas. */

export default function AboutSection({
  lang = "en",
  top = false,
}: {
  lang?: Lang
  /** abre a página (/info): o título na linha da barra e vira o h1 */
  top?: boolean
}) {
  const t = dict[lang]
  const Titulo = top ? "h1" : "h2"
  return (
    <section className={`section ${s.about} ${top ? `page-top ${s.top}` : ""}`} id="about">
      <div className={`container ${s.aboutInner}`}>
        <div className={s.aboutBody}>
          <div className={`to-line ${s.aboutVideo}`}>
            <video
              src="/video/eu-profile.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
          <div className={`g-right ${s.aboutText}`}>
            {/* O título veio pra cá (16/10, pedido do Rodrigo): "joga pra
                direita, junto com o texto". Ele e o cargo no topo da
                coluna, na altura do topo do vídeo. */}
            <div className={s.aboutHead}>
              <Titulo className="h3 page-title">{t.about.title}</Titulo>
              <p className={`overline ${s.aboutRole}`}>{t.role}</p>
            </div>
            <div className={s.aboutCopy}>
              <p className="body">{t.about.body}</p>
              <Brands label={t.about.brands} />
            </div>
          </div>
        </div>

        <ul className={s.credentials}>
          {t.about.credentials.map(([left, right]) => (
            <li key={left}>
              <span className="body-sm">&mdash; {left}</span>
              <span className="body-sm">&mdash; {right}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
