import type { Metadata } from "next"
import Thanks from "@/views/Thanks"
import { dict, og } from "@/i18n"

export const metadata: Metadata = {
  title: dict.en.thanks.title,
  robots: { index: false, follow: false },
  openGraph: og("en", "/thanks"),
}

export default function Page() {
  return <Thanks lang="en" />
}
