import { SpinningLogo } from "@/components/Logo"
import CopyEmail from "@/components/CopyEmail"
import CubeLink from "@/components/CubeLink"
import { dict, type Lang } from "@/i18n"
import styles from "./home.module.css"

const SOCIAL = [
  { label: "YouTube", href: "https://www.youtube.com/@falabondioli" },
  { label: "Instagram", href: "https://www.instagram.com/falabondioli/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bondioli/" },
  { label: "Substack", href: "https://falabondioli.substack.com/" },
]

/* Duas instâncias, uma por lugar: no desktop as redes ficam no canto de
   cima, no celular descem pro fim da página. O CSS mostra uma e esconde a
   outra com `display: none`, que também a tira da leitura de tela — quem
   usa leitor ouve a lista uma vez só. Reordenar uma instância única por
   CSS exigiria desmontar o header e o footer (`display: contents`), e os
   dois são marcos de navegação que valem mais que a economia. */
function Social({ className, label }: { className: string; label: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ul className={styles.social}>
        {SOCIAL.map(({ label, href }) => (
          <li key={href}>
            <CubeLink className={styles.socialLink} href={href}>
              {label}
            </CubeLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Home — pôster de uma tela só, sem rolagem.
 *
 * Elementos ancorados nos cantos e a marca girando no centro. No canto de
 * cima à direita, as redes — não existiam no Framer, entraram em 22/09.
 * No Framer isso era um `Main` absoluto em top:174px/left:244px com um
 * padding de 56px que não renderizava nada (todos os filhos eram absolutos).
 * Aqui é um grid de três linhas: topo, centro, base.
 *
 * O bloqueio de rolagem no Framer era um override de JS. Aqui é
 * `overflow: hidden` no próprio layout — não precisa de script pra isso.
 */
export default function Home({ lang }: { lang: Lang }) {
  const t = dict[lang]
  return (
    <main className={styles.page}>
      <header className={styles.top}>
        {/* O mesmo desenho do nome da barra das outras páginas (SiteNav):
            nome, ponto apagado, cargo em cinza — e o cargo some no celular,
            como lá. */}
        <p className={`${styles.label} ${styles.brand}`}>
          <span>Rodrigo Bondioli</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span className={styles.role}>{t.role}</span>
        </p>

        <Social className={styles.socialTop} label={t.social} />
      </header>

      <div className={styles.center}>
        <SpinningLogo size={76} title="Rodrigo Bondioli" />
      </div>

      <footer className={styles.bottom}>
        <p className={`${styles.label} ${styles.bio}`}>{t.home.bio}</p>

        <div className={styles.contact}>
          <p className={styles.label}>{t.home.getInTouch}</p>
          <CopyEmail
            email="hello@rodrigobondioli.com"
            copiedLabel={t.emailCopied}
            failLabel={t.couldNotCopy}
            ariaLabel={t.copyEmail}
            className={`${styles.label} ${styles.email}`}
          />
        </div>

        <Social className={styles.socialBottom} label={t.social} />
      </footer>
    </main>
  )
}
