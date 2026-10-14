import type { Metadata } from "next"
import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { SiteFooter } from "@/components/SiteFooter"
import MeetingBar from "@/components/MeetingBar"
import CountUpNumber from "@/components/CountUpNumber"
import YouTube from "@/components/YouTube"
import ProjectVideo from "@/components/ProjectVideo"
import ProjectShowcase from "@/components/ProjectShowcase"
import ClosingSection from "@/components/ClosingSection"
import Brands from "@/components/Brands"
import { orderedProjects, asset, galleryUrls, COM_CASE } from "@/lib/projects"
import order from "@/content/order.json"
import s from "./work.module.css"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work: brand, product and interface for startups and global brands. Work that started with a problem, not a prompt.",
  alternates: { canonical: "/work" },
}

const CREDENTIALS: [string, string][] = [
  ["Orpetron X3 / 2024", "Cannes Lion 2014 / Silver / Cyber"],
  ["Clio Awards / 2009", "UI Design mentor @ Designer Singular"],
  ["YouTube content creator", "Dora Ambassador"],
  ["Webflow Partner", "Framer PRO Partner"],
]

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
              If your product is hard to understand, it&rsquo;s impossible to sell.
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

        {/* ---------- Video de abertura ---------- */}
        <section className={`section ${s.reel}`}>
          <div className={`container ${s.reelInner}`}>
            <ProjectVideo file="/video/reel-home.mp4" title="Reel" />
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
                const fotos = (galeria.length >= 4 || !thumb ? galeria : [thumb, ...galeria])
                  .filter((u, i, a) => a.indexOf(u) === i)
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
