import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import { SiteFooter } from "@/components/SiteFooter"
import MeetingBar from "@/components/MeetingBar"
import YouTube from "@/components/YouTube"
import ProjectShowcase from "@/components/ProjectShowcase"
import ClosingSection from "@/components/ClosingSection"
import AboutSection from "@/components/AboutSection"
import { orderedProjects, asset, galleryUrls, COM_CASE } from "@/lib/projects"
import order from "@/content/order.json"
import { SHOWCASE } from "@/content/showcase"
import { dict, type Lang } from "@/i18n"
import s from "./work.module.css"

export default function Work({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const projects = orderedProjects(order as string[])

  return (
    <>
      <SmoothScroll />
      <SiteNav lang={lang} />

      <main>
        {/* ---------- Arquivo ---------- */}
        <section className={`section ${s.archive}`} id="projects">
          <div className={`container ${s.archiveInner}`}>
            {/* A página começa aqui (16/10): o título na mesma linha do nome
                da barra e do EN / BR. A frase da direita saiu. */}
            <h2 className={`h3 ${s.archiveTitle}`}>{t.work.selectedWork}</h2>

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
                      lang={lang}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* ---------- Manifesto ---------- */}
        <section className={`section ${s.statement}`}>
          <div className={`container ${s.statementInner}`}>
            <div className={s.headLine}>
              <p className="overline">{t.work.manifestoLabel}</p>
            </div>
            <p className={s.statementText}>{t.work.manifesto}</p>
          </div>
        </section>

        {/* ---------- Sobre ---------- */}
        <AboutSection lang={lang} />

        {/* ---------- YouTube ---------- */}
        <section className={`section on-accent ${s.youtube}`}>
          <div className={s.youtubeInner}>
            <div className="head-row">
              <h2 className="h4">{t.work.contentCreator}</h2>
              <p className="overline">YouTube @falabondioli</p>
            </div>

            <YouTube
              id="cSBSVxPP0as"
              start={1}
              title="O que você tem feito com IA, além de conversar?"
              hideLabel
              lang={lang}
            />

            <div className="head-row">
              <p className="overline">{t.work.subscribers}</p>
              <h3 className="h4">{t.work.noBullshit}</h3>
            </div>
          </div>
        </section>

        {/* ---------- Contato ---------- */}
        <ClosingSection lang={lang} />
      </main>

      <SiteFooter lang={lang} />
      <MeetingBar label={t.pill} />
    </>
  )
}
