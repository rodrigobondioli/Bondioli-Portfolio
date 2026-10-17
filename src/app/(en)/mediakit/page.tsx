import type { Metadata } from "next"
import { og } from "@/i18n"
import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import YouTube from "@/components/YouTube"
import AboutSection from "@/components/AboutSection"
import TypeBand from "@/components/TypeBand"
import { dadosDoCanal } from "@/lib/youtube"
import kit from "@/content/mediakit.json"
import s from "./mediakit.module.css"

/* Media kit do canal. A estrutura e os números saíram do Framer
   (/mediakit/home, medido com getComputedStyle); a roupa é a da /work —
   mesma navegação, mesmo rodapé, mesmas réguas de cabeçalho, mesmas
   grades de 3 → 2 → 1 coluna, canto vivo em tudo.

   O conteúdo mora em src/content/mediakit.json porque ele envelhece: os
   números mudam todo mês, e trocar um número não pode pedir mexida em
   JSX. */

export const metadata: Metadata = {
  title: "Media kit",
  description:
    "YouTube media kit for @falabondioli: audience, performance, partnership options and rates.",
  alternates: { canonical: "/mediakit" },
  openGraph: og("en", "/mediakit"),
}

/* Uma vez por dia a página se refaz sozinha com os números novos. Ela
   continua estática: quem visita recebe HTML pronto, e a busca acontece no
   servidor, fora do caminho de ninguém. */
export const revalidate = 86400

type Stat = {
  label: string
  value: string
  span?: number
  second?: string
  /** campo vivo que substitui o valor do JSON, quando a API responde */
  live?: "inscritos" | "videos"
}
type Package = { format: string; length: string; delivers: string; price: string }

const stats = kit.stats as Stat[]
const packages = kit.packages as Package[]
const countries = kit.countries as string[][]
const ages = kit.ages as string[][]
const cases = kit.case.cards as string[][]


export default async function MediaKitPage() {
  /* Sem chave, sem rede, ou API fora do ar: `canal` vem nulo e tudo abaixo
     cai no JSON. Um número velho é melhor que uma página que não sobe. */
  const canal = await dadosDoCanal()

  const numeros = stats.map((st) =>
    st.live && canal?.[st.live] ? { ...st, value: canal[st.live] as string } : st
  )

  /* Quem fecha cada fileira dos números, pra encostar na borda em vez de
     parar na linha do meio (CSS). Em terços acima de 900 (o largo vale
     dois), em metades no tablet (o largo é a fileira inteira). */
  let tercos = 0
  let metades = 0
  const fimDaFileira = numeros.map((st) => {
    tercos += st.span === 2 ? 2 : 1
    metades += st.span === 2 ? 2 : 1
    return [tercos % 3 === 0 ? s.fim3 : "", metades % 2 === 0 ? s.fim2 : ""]
  })

  /* Os quatro mais vistos do canal, calculados na hora. Sem chave, valem os
     quatro escolhidos à mão no JSON. */
  const videos = canal?.maisVistos.length ? canal.maisVistos : kit.picks

  /* A data é a da busca, não uma constante escrita à mão. Sem API, ela volta
     a ser a do JSON — que é a verdade nesse caso. */
  const atualizado = canal?.atualizado ?? kit.updated

  return (
    <>
      <SmoothScroll />
      {/* A página não tem formulário: o "Say hello" atravessa pra /work */}
      <SiteNav brandHref="/work" />

      <main id="conteudo" tabIndex={-1}>
        {/* ---------- Capa ---------- */}
        <section className={s.hero}>
          <h1 className="sr-only">
            Media kit — Rodrigo Bondioli on YouTube, @falabondioli
          </h1>

          {/* A faixa gigante é textura: o título de verdade está acima,
              e ela corre por trás do vídeo. */}
          <TypeBand text="Media kit —" className={s.band} />

          <div className={`container ${s.heroInner}`}>
            <p className={s.meta}>
              <span className="overline">{kit.window}</span>
              <span className="overline">Last updated &mdash; {atualizado}</span>
            </p>

            <div className={s.stage}>
              <video
                src="/video/eu-profile.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              />
            </div>
          </div>
        </section>

        {/* ---------- Audiência ---------- */}
        <section className={`section ${s.sec}`} id="audience">
          <div className={`container ${s.secInner}`}>
            <div className="head-row">
              <h2 className="h3">Audience &amp; niche</h2>
              {/* O selo era uma pílula amarela do tamanho de um título. Aqui
                  ele é o que sempre foi: uma legenda. O "@falabondioli" que
                  ocupava este lugar já aparece na frase logo abaixo. */}
              <p className="overline">
                <span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>{" "}
                {kit.badge}
              </p>
            </div>

            <div className={s.claim}>
              <p className="body">{kit.claim}</p>

              <ul className={s.facts}>
                <li className="body">
                  <strong>Who watches:</strong> {kit.audience.watches}
                </li>
                <li className="body">
                  <strong>Key interests:</strong> {kit.audience.interests}
                </li>
              </ul>
            </div>

            <ul className={s.stats}>
              {numeros.map((st, i) => (
                <li
                  className={[st.span === 2 ? s.wide : "", ...fimDaFileira[i]]
                    .filter(Boolean)
                    .join(" ") || undefined}
                  key={st.label}
                >
                  <div className={`on-accent ${s.stat}`}>
                    <p className="overline">{st.label}</p>
                    <p className="h3">
                      {st.value}
                      {st.second ? (
                        <>
                          <br />
                          {st.second}
                        </>
                      ) : null}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={s.tables}>
              <div className={s.table}>
                <h3 className="h4">Top countries</h3>
                <ul className={s.rows}>
                  {countries.map(([place, share]) => (
                    <li key={place}>
                      <span className="body">{place}</span>
                      <span className="h4">{share}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={s.table}>
                <h3 className="h4">Age range</h3>
                <ul className={s.rows}>
                  {ages.map(([range, share]) => (
                    <li key={range}>
                      <span className="body">{range}</span>
                      <span className="h4">{share}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Desempenho ---------- */}
        <section className={`section ${s.sec}`} id="performance">
          <div className={`container ${s.secInner}`}>
            <div className="head-row">
              <h2 className="h3">Elite performance</h2>
              <p className="overline">vs. creators with similar reach</p>
            </div>

            <ul className={s.pairs}>
              {kit.performance.map(({ title, note }) => (
                <li key={title}>
                  <div className={`on-accent ${s.tile} ${s.accent}`}>
                    <h3 className="h4">{title}</h3>
                    <p className="body">{note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Caso ---------- */}
        <section className={`section ${s.sec}`} id="case">
          <div className={`container ${s.secInner}`}>
            <div className="head-row">
              <h2 className="h3">{kit.case.title}</h2>
              <p className="overline">Case</p>
            </div>

            <ul className={s.trio}>
              {cases.map((lines) => (
                <li key={lines[0]}>
                  <div className={`${s.tile} ${s.violet}`}>
                    {lines.map((line) => (
                      <p className="h4" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Formatos ---------- */}
        <section className={`section ${s.sec}`} id="partnership">
          <div className={`container ${s.secInner}`}>
            <div className="head-row">
              <h2 className="h3">Partnership options</h2>
              <p className="overline">Investment in USD</p>
            </div>

            <table className={s.rates}>
              <colgroup>
                <col />
                <col className={s.delivers} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th className="overline" scope="col">Format</th>
                  <th className="overline" scope="col">What it delivers</th>
                  <th className="overline" scope="col">Investment</th>
                </tr>
              </thead>
              <tbody>
                {packages.map(({ format, length, delivers, price }) => (
                  <tr key={format}>
                    <td className="body">
                      <strong>{format}</strong> {length}
                    </td>
                    <td className="body">{delivers}</td>
                    <td className="h4">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={s.extensions}>
              <h3 className="h4">Audience extensions</h3>
              <p className="body">{kit.extensions}</p>
            </div>
          </div>
        </section>

        {/* ---------- Seleção ---------- */}
        <section className={`section ${s.sec}`} id="picks">
          <div className={`container ${s.secInner}`}>
            <div className="head-row">
              <h2 className="h3">Most watched</h2>
              <p className="overline">YouTube @falabondioli</p>
            </div>

            <ul className={s.picks}>
              {videos.map(({ id, title }) => (
                <li key={id}>
                  <YouTube id={id} title={title} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Sobre (o mesmo da /work) ---------- */}
        <AboutSection />
      </main>
      {/* Duas diferenças em relação à /work, e as duas são por falta de
          vizinho: aqui não há faixa de números no pé do herói, então a
          barra pode entrar assim que o "Say hello" do topo sai da tela; e
          não há contato, então quem a esconde no fim é o rodapé — senão
          ela termina a página sentada em cima das redes. */}
    </>
  )
}
