import type { Metadata } from "next"
import Home from "@/views/Home"
import { dict, alternates, og } from "@/i18n"

export const metadata: Metadata = {
  title: { absolute: dict.pt.home.title },
  description: dict.pt.home.description,
  alternates: alternates("pt", "/"),
  openGraph: og("pt", "/"),
}

export default function Page() {
  return <Home lang="pt" />
}
