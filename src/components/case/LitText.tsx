import { Fragment } from "react"
import styles from "./LitText.module.css"

/**
 * A frase solta do case (no tumulto.ai, "a frase que acende com o
 * scroll"). Desde 16/10/2026 é texto parado (pedido do Rodrigo: sem
 * animação de texto no site): as palavras não acendem mais uma a uma. O
 * "\n" no texto continua quebrando a linha.
 */
export default function LitText({ children, className = "" }: { children: string; className?: string }) {
  const linhas = children.split("\n")
  return (
    <p className={`${styles.text} ${className}`}>
      {linhas.map((linha, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {linha}
        </Fragment>
      ))}
    </p>
  )
}
