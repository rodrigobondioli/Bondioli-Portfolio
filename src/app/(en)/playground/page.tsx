import type { Metadata } from "next"
import Playground from "@/views/Playground"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: dict.en.playground.title,
  description: dict.en.playground.description,
  alternates: alternates("en", "/playground"),
}

export default function Page() {
  return <Playground lang="en" />
}
