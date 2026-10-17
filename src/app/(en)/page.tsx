import type { Metadata } from "next"
import Home from "@/views/Home"
import { dict, alternates, og } from "@/i18n"

export const metadata: Metadata = {
  title: { absolute: dict.en.home.title },
  description: dict.en.home.description,
  alternates: alternates("en", "/"),
  openGraph: og("en", "/"),
}

export default function Page() {
  return <Home lang="en" />
}
