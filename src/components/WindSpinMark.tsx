"use client"

import { motion } from "framer-motion"
import { useWindSpin } from "./useWindSpin"

/**
 * Uma marca girando com o vento da capa (useWindSpin: rajadas aleatórias,
 * inércia, sem ritmo fixo — "não linear e aleatório"), centralizada numa
 * vaga da colagem com fundo próprio. Primeira vez: o elemento do Orbness
 * no fundo branco (17/10, pedido do Rodrigo).
 */
export default function WindSpinMark({ src, bg = "#fff", tamanho = "34%" }: { src: string; bg?: string; tamanho?: string }) {
  const rotate = useWindSpin()
  return (
    <span
      style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", background: bg }}
      aria-hidden="true"
    >
      <motion.img src={src} alt="" style={{ rotate, width: tamanho, height: "auto", willChange: "transform" }} />
    </span>
  )
}
