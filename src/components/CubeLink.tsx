import TextRoll from "./TextRoll"

/**
 * CubeLink — link de texto externo (as redes da capa). O nome ficou da
 * época do cubo 3D; desde 14/10 o hover é o TextRoll, o mesmo de todos os
 * links de texto do site: o texto sobe, a cópia entra por baixo e o
 * sublinhado faz uma passada.
 */
export default function CubeLink({
  href,
  children,
  className,
}: {
  href: string
  children: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`no-underline ${className ?? ""}`}
      data-roll-host=""
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <TextRoll text={children} />
    </a>
  )
}
