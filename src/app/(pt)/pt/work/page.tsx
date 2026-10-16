import type { Metadata } from "next"
import Work from "@/views/Work"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: dict.pt.work.title,
  description: dict.pt.work.description,
  alternates: alternates("pt", "/work"),
}

export default function Page() {
  return <Work lang="pt" />
}
