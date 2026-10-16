import type { Metadata } from "next"
import Info from "@/views/Info"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: dict.en.info.title,
  description: dict.en.info.description,
  alternates: alternates("en", "/info"),
}

export default function Page() {
  return <Info lang="en" />
}
