import Link from "next/link"
import { SpinningLogo } from "./Logo"
import TextRoll from "./TextRoll"
import { dict, href, type Lang } from "@/i18n"
import styles from "./SiteFooter.module.css"

/**
 * Rodapé do site.
 *
 * Três blocos: logo à esquerda, redes ao centro, assinatura à direita.
 * No Framer isso era um space-between de três filhos, que no celular
 * espremia tudo numa linha só. Aqui vira coluna centralizada abaixo de
 * 720px — cada bloco ganha a própria linha.
 *
 * O separador "/" entre as redes é desenhado com ::before em vez de virar
 * nó de texto. Assim ele nunca sobra sozinho se um link for removido —
 * que foi exatamente o bug do separador órfão nos metadados de projeto.
 *
 * A marca gira com as mesmas rajadas da capa: é o mesmo SpinningLogo, não
 * uma cópia da física. Se um dia o vento mudar, muda nos dois.
 *
 * E os links de rede usam o hover dos links de texto do site (TextRoll):
 * o texto sobe e o sublinhado faz uma passada.
 */

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/falabondioli" },
  { label: "Substack", href: "https://falabondioli.substack.com" },
  { label: "Youtube", href: "https://youtube.com/@falabondioli" },
  { label: "Linkedin", href: "https://linkedin.com/in/bondioli" },
]

/* O portfólio inteiro em Markdown, pra baixar — veio da barra lateral pra
   cá (12/10, pedido do Rodrigo): sem ícone, só ".md", irmão das redes. */
const MD = { label: ".md", href: "/portfolio.md", file: "rodrigo-bondioli-portfolio.md" }

export function SiteFooter({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang]
  const year = new Date().getFullYear()

  return (
    <footer className={`${styles.footer} section`}>
      <div className={`${styles.inner} container`}>
        <Link href={href(lang, "/")} className={`no-underline ${styles.logo}`} aria-label={t.footer.home}>
          {/* sem title: o aria-label do link já nomeia isto */}
          <SpinningLogo size={44} />
        </Link>

        <nav aria-label={t.social}>
          <ul className={styles.social}>
            {SOCIAL.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  data-roll-host=""
                >
                  <TextRoll text={label} />
                </a>
              </li>
            ))}
            <li>
              <a
                href={MD.href}
                download={MD.file}
                className={styles.link}
                data-roll-host=""
                aria-label={t.footer.md}
                title={t.footer.mdTitle}
              >
                <TextRoll text={MD.label} />
              </a>
            </li>
          </ul>
        </nav>

        <p className={styles.signature}>
          {t.footer.signature}
          <span className={styles.mark} aria-hidden="true" />
          {year}
        </p>
      </div>
    </footer>
  )
}
