import type { Metadata } from "next"
import Tattoaria from "@/views/Tattoaria"
import { caseTattoaria } from "@/content/cases/tattoaria"
import { alternates, og } from "@/i18n"

const c = caseTattoaria("pt")

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: alternates("pt", "/projects/tattoaria"),
  // um case é "article" (17/10, auditoria de SEO); a URL é a da página
  openGraph: {
    ...og("pt", "/projects/tattoaria", "article"),
    title: c.meta.title,
    description: c.meta.description,
  },
}

export default function Page() {
  return <Tattoaria lang="pt" />
}
