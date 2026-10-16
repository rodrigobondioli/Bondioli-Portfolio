import type { Metadata } from "next"
import Work from "@/views/Work"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: dict.en.work.title,
  description: dict.en.work.description,
  alternates: alternates("en", "/work"),
}

export default function Page() {
  return <Work lang="en" />
}
