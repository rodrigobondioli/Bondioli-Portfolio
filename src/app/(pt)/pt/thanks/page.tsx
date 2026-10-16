import type { Metadata } from "next"
import Thanks from "@/views/Thanks"
import { dict } from "@/i18n"

export const metadata: Metadata = {
  title: dict.pt.thanks.title,
  robots: { index: false, follow: false },
}

export default function Page() {
  return <Thanks lang="pt" />
}
