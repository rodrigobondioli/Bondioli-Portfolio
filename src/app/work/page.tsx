import type { Metadata } from "next"
import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { SiteFooter } from "@/components/SiteFooter"
import MeetingBar from "@/components/MeetingBar"
import CountUpNumber from "@/components/CountUpNumber"
import YouTube from "@/components/YouTube"
import ProjectShowcase from "@/components/ProjectShowcase"
import ClosingSection from "@/components/ClosingSection"
import AboutSection from "@/components/AboutSection"
import { orderedProjects, asset, galleryUrls, COM_CASE } from "@/lib/projects"
import order from "@/content/order.json"
import { SHOWCASE } from "@/content/showcase"
import s from "./work.module.css"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work: brand, product and interface for startups and global brands. Work that started with a problem, not a prompt.",
  alternates: { canonical: "/work" },
}

export default function WorkPage() {
  const projects = orderedProjects(order as string[])

  return (
    <>
      <SmoothScroll />
      <SiteNav />

      <main>
        {/* ---------- Hero ---------- */}
        <section className={s.hero}>
          <div className={`container ${s.heroInner}`}>
            {/* Frase de posicionamento no lugar da apresentação (12/10, pedido
                do Rodrigo, a partir de "Se o seu produto é difícil de
                entender, ele é impossível de vender."). Quem ele é já está na
                barra do topo; os 20 anos, na faixa de números logo abaixo. */}
            <h1 className={`h1 ${s.heroTitle}`}>
              If your product is hard to understand,{" "}
              <br className={s.heroBreak} />
              it&rsquo;s impossible to sell.
            </h1>
            <p className={s.heroSupport}>
              I shape the architecture, positioning and design of your product so
              any customer understands its value.
            </p>
          </div>

          <div className={s.stats}>
            <div className={`container ${s.statsInner}`}>
              <p className={s.stat}>
                <CountUpNumber target={20} className={s.statNumber} />
                <span className={s.statLabel}>years in the creative industry</span>
              </p>
              <p className={s.stat}>
                <CountUpNumber target={180} className={s.statNumber} />
                <span className={s.statLabel}>projects delivered</span>
              </p>
              <p className={s.stat}>
                <CountUpNumber target={6} padTo={2} className={s.statNumber} />
                <span className={s.statLabel}>countries served</span>
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Manifesto ---------- */}
        <section className={`section ${s.statement}`}>
          <div className={`container ${s.statementInner}`}>
            <div className={s.headLine}>
              <p className="overline">No point of view, no project.</p>
            </div>
            <p className={s.statementText}>
              Everyone is a prompt designer now. The result? Work that looks
              like it came from the same machine&mdash;because it did. I use the
              same tools. The difference is what I bring to them: a point of
              view, a problem worth solving, and the craft to make the answer
              feel inevitable. If you want fast and forgettable, plenty of
              people are waiting for your brief.
            </p>
          </div>
        </section>

        {/* ---------- Arquivo ---------- */}
        <section className={`section ${s.archive}`} id="projects">
          <div className={`container ${s.archiveInner}`}>
            <div className="head-row">
              <h2 className="h3">Selected work</h2>
              <p className="overline">
                Work that started with a problem, not a prompt.
              </p>
            </div>

            {/* Um projeto por bloco, no desenho do brandbeet.com (12/10):
                nome e serviços e uma colagem de quatro imagens que leva pro case. */}
            <ul className={s.cases}>
              {projects.map((p, i) => {
                // a galeria primeiro: a thumb costuma ser recorte da
                // primeira foto dela, e as duas lado a lado se repetiam
                const galeria = galleryUrls(p.gallery)
                const thumb = asset(p.thumb)
                // quem tem lista própria (content/showcase.ts) usa ela, na ordem
                // (até 8, duas linhas); os outros, as 4 primeiras da galeria —
                // a 5ª da Tattoaria (o caminhão) aparecia sobrando numa
                // segunda linha quando o limite subiu pra 8
                const fotos =
                  SHOWCASE[p.slug] ??
                  (galeria.length >= 4 || !thumb ? galeria : [thumb, ...galeria])
                    .filter((u, i, a) => a.indexOf(u) === i)
                    .slice(0, 4)
                return (
                  <li key={p.slug}>
                    <ProjectShowcase
                      slug={p.slug}
                      name={p.projectName ?? p.slug}
                      services={p.type}
                      linked={COM_CASE.has(p.slug)}
                      images={fotos}
                      index={i}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* ---------- Sobre ---------- */}
        <AboutSection />

        {/* ---------- YouTube ---------- */}
        <section className={`section on-accent ${s.youtube}`}>
          <div className={s.youtubeInner}>
            <div className="head-row">
              <h2 className="h4">Content creator</h2>
              <span className="rule rule-sm" />
              <p className="overline">YouTube @falabondioli</p>
            </div>

            <YouTube
              id="cSBSVxPP0as"
              start={1}
              title="O que você tem feito com IA, além de conversar?"
              hideLabel
            />

            <div className="head-row">
              <p className="overline">31K subscribers</p>
              <span className="rule rule-md" />
              <h3 className="h4">No bullshit</h3>
            </div>
          </div>
        </section>

        {/* ---------- Contato ---------- */}
        <ClosingSection />
      </main>

      <SiteFooter />
      <MeetingBar />
    </>
  )
}
