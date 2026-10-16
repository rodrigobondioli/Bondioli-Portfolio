import type { Metadata } from "next"
import Home from "@/views/Home"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: { absolute: dict.pt.home.title },
  description: dict.pt.home.bio,
  alternates: alternates("pt", "/"),
}

export default function Page() {
  return <Home lang="pt" />
}
