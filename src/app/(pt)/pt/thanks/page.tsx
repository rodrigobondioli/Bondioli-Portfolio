import type { Metadata } from "next"
import Thanks from "@/views/Thanks"
import { dict, og } from "@/i18n"

export const metadata: Metadata = {
  title: dict.pt.thanks.title,
  robots: { index: false, follow: false },
  openGraph: og("pt", "/thanks"),
}

export default function Page() {
  return <Thanks lang="pt" />
}
