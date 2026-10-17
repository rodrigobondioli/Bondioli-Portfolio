import type { Metadata } from "next"
import Info from "@/views/Info"
import { dict, alternates, og } from "@/i18n"

export const metadata: Metadata = {
  title: dict.en.info.title,
  description: dict.en.info.description,
  alternates: alternates("en", "/info"),
  openGraph: og("en", "/info"),
}

export default function Page() {
  return <Info lang="en" />
}
