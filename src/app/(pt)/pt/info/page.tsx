import type { Metadata } from "next"
import Info from "@/views/Info"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: dict.pt.info.title,
  description: dict.pt.info.description,
  alternates: alternates("pt", "/info"),
}

export default function Page() {
  return <Info lang="pt" />
}
