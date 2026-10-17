import styles from "./TextRoll.module.css"

/**
 * O texto dos links do site. Desde 16/10/2026 (pedido do Rodrigo: "tira
 * todas as animações de texto") não rola mais: no hover só muda a cor
 * (--hover), e o sublinhado, quando há, fica parado.
 *
 * Histórico: era um rolo 2D (o texto subia e uma cópia entrava por baixo,
 * com uma passada no sublinhado), que em 14/10 tinha substituído o cubo
 * 3D do CubeLink. O nome e a API ficaram pra não mexer em quem usa.
 *
 * `back` é o texto que aparece no lugar quando `show` liga (o CopyEmail usa
 * pra "Email copied"). Quem dá o hover é o elemento com `data-roll-host`.
 */
export default function TextRoll({
  text,
  back,
  show = false,
  underline = true,
}: {
  text: string
  back?: string
  show?: boolean
  underline?: boolean
}) {
  return (
    <span className={`${styles.root} ${underline ? styles.underlined : ""}`}>
      {show ? (back ?? text) : text}
    </span>
  )
}
