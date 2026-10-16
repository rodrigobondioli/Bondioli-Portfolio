import type { Metadata } from "next"
import Tattoaria from "@/views/Tattoaria"
import { caseTattoaria } from "@/content/cases/tattoaria"
import { alternates } from "@/i18n"

const c = caseTattoaria("pt")

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: alternates("pt", "/projects/tattoaria"),
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    images: ["/projects/tattoaria/case/galpao-baias.webp"],
  },
}

export default function Page() {
  return <Tattoaria lang="pt" />
}
