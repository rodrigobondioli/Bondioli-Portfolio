import type { Metadata } from "next"
import Home from "@/views/Home"
import { dict, alternates } from "@/i18n"

export const metadata: Metadata = {
  title: { absolute: dict.en.home.title },
  description: dict.en.home.bio,
  alternates: alternates("en", "/"),
}

export default function Page() {
  return <Home lang="en" />
}
