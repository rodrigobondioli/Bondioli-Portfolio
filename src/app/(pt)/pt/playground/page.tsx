import type { Metadata } from "next"
import Playground from "@/views/Playground"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: dict.pt.playground.title,
  description: dict.pt.playground.description,
  alternates: alternates("pt", "/playground"),
}

export default function Page() {
  return <Playground lang="pt" />
}
