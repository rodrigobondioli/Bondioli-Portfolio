"use client"

/**
 * CopyEmail — e-mail sublinhado; o clique copia. Portado do Copy_Email.tsx
 * do Framer.
 *
 * O hover é o TextRoll, o mesmo dos links de texto do site (14/10: era um
 * cubo 3D numa mola, que passava do ponto e "parecia bugado"). Ao clicar,
 * a cópia que entra por baixo traz "Email copied" e fica à vista o tempo
 * do aviso, mesmo sem o mouse em cima; depois volta pro e-mail.
 */

import { startTransition, useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react"
import TextRoll from "./TextRoll"

interface CopyEmailProps {
  email?: string
  copiedLabel?: string
  color?: string
  copiedDuration?: number
  className?: string
  style?: CSSProperties
}
async function writeToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // segue para o fallback
    }
  }

  if (typeof document === "undefined") return false

  const field = document.createElement("textarea")
  field.value = text
  field.setAttribute("readonly", "")
  field.style.position = "fixed"
  field.style.top = "-1000px"
  field.style.opacity = "0"
  document.body.appendChild(field)
  field.select()

  let copied = false
  try {
    copied = document.execCommand("copy")
  } catch {
    copied = false
  }
  document.body.removeChild(field)

  return copied
}

export default function CopyEmail({
  email = "hello@rodrigobondioli.com",
  copiedLabel = "Email copied",
  /* a cor de quem está em volta: serve os dois temas (12/10) */
  color = "currentColor",
  copiedDuration = 1800,
  className,
  style,
}: CopyEmailProps) {
  const [copiado, setCopiado] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState("")
  const resetTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    }
  }, [])

  const handleActivate = useCallback(async () => {
    const copied = await writeToClipboard(email)
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    const aviso = copied ? copiedLabel : "Could not copy"
    startTransition(() => {
      setCopiado(aviso)
      setAnnouncement(aviso)
    })
    resetTimer.current = window.setTimeout(() => {
      resetTimer.current = null
      startTransition(() => {
        setCopiado(null)
        setAnnouncement("")
      })
    }, copiedDuration)
  }, [copiedDuration, copiedLabel, email])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        handleActivate()
      }
    },
    [handleActivate]
  )

  return (
    <button
      type="button"
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={`Copy email ${email}`}
      className={className}
      data-roll-host=""
      style={{
        ...style,
        position: "relative",
        display: "inline-block",
        margin: 0,
        padding: 0,
        border: "none",
        background: "none",
        color,
        /* nada de `font: inherit` aqui: estilo inline ganha da classe, e a
           classe que vem de fora é justamente quem define o tamanho. O
           reset global já faz o botão herdar a fonte. */
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <TextRoll text={email} back={copiado ?? email} show={copiado !== null} />

      <span
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        {announcement}
      </span>
    </button>
  )
}
