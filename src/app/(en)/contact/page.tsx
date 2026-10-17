import type { Metadata } from "next"
import Contact from "@/views/Contact"
import { dict, alternates, og } from "@/i18n"

export const metadata: Metadata = {
  title: dict.en.contact.title.replace(/\.$/, ""),
  description: dict.en.contact.description,
  alternates: alternates("en", "/contact"),
  openGraph: og("en", "/contact"),
}

export default function Page() {
  return <Contact lang="en" />
}
