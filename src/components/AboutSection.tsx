import Brands from "@/components/Brands"
import s from "./AboutSection.module.css"

/* O "sobre" do site. Mora aqui, e não em cada página, porque a /work e a
   /mediakit têm que mostrar o mesmo bloco, igualzinho — a /mediakit tinha
   uma cópia (retrato no lugar do vídeo, texto e espaçamento próprios) que
   foi se descolando (14/10, pedido do Rodrigo). Mudou aqui, muda nas duas. */

const CREDENTIALS: [string, string][] = [
  ["Orpetron X3 / 2024", "Cannes Lion 2014 / Silver / Cyber"],
  ["Clio Awards / 2009", "UI Design mentor @ Designer Singular"],
  ["YouTube content creator", "Dora Ambassador"],
  ["Webflow Partner", "Framer PRO Partner"],
]

export default function AboutSection() {
  return (
    <section className={`section ${s.about}`} id="about">
      <div className={`container ${s.aboutInner}`}>
        <div className={s.aboutHead}>
          <h2 className="h3">I&rsquo;m Rodrigo Bondioli</h2>
        </div>

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
            {/* O cargo sai do cabeçalho e vem pra cá: encostado no topo
                do vídeo e na esquerda do texto. */}
            <p className={`overline ${s.aboutRole}`}>Creative Director</p>
            <div className={s.aboutCopy}>
              <p className="body">
                Big projects rarely fail because of execution. They fail because
                someone chose to build the wrong thing, and no one in the room
                had the nerve to say so. I&rsquo;ve been in that room. I was
                Head of Creative at Netshoes and Americanas.com, two of
                Brazil&rsquo;s largest digital businesses. Before that, I spent
                years at agencies including Wunderman Thompson and McCann.
                You&rsquo;re hiring my judgment. I join the conversation where
                decisions are made, speak up before the wrong call becomes an
                expensive problem, and stay through launch&mdash;until the
                brand, product, and experience work as one.
              </p>
              <Brands label="Brands I've worked with" />
            </div>
          </div>
        </div>

        <ul className={s.credentials}>
          {CREDENTIALS.map(([left, right]) => (
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
