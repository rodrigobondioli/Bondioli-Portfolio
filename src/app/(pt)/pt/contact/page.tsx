import type { Metadata } from "next"
import Contact from "@/views/Contact"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: dict.pt.contact.title.replace(/\.$/, ""),
  description: dict.pt.contact.description,
  alternates: alternates("pt", "/contact"),
}

export default function Page() {
  return <Contact lang="pt" />
}
