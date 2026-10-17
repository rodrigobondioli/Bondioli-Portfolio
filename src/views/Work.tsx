import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import ProjectShowcase from "@/components/ProjectShowcase"
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
        <section className={`section page-top ${s.archive}`}>
          <div className={`container ${s.archiveInner}`}>
            {/* A apresentação (16/10, pedido do Rodrigo, a partir de uma
                referência: frase grande e texto pequeno; aqui, discreta — é
                só uma introduçãozinha). O texto é a bio da capa. Ela abre a
                página, na linha do nome da barra e do EN / BR. */}
            <p className={s.intro}>{t.home.bio}</p>

            <h2 className="h3 page-title" id="projects">{t.work.selectedWork}</h2>

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
      </main>
    </>
  )
}
