import type { Metadata } from "next"
import Work from "@/views/Work"
import { dict, alternates, og } from "@/i18n"

export const metadata: Metadata = {
  title: dict.pt.work.title,
  description: dict.pt.work.description,
  alternates: alternates("pt", "/work"),
  openGraph: og("pt", "/work"),
}

export default function Page() {
  return <Work lang="pt" />
}
