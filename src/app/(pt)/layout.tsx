import RootShell, { rootMetadata } from "@/components/RootShell"

/* O português mora em /pt (16/10/2026). Layout raiz próprio só pra o
   <html> nascer com lang="pt-BR". */
export const metadata = rootMetadata("pt")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="pt">{children}</RootShell>
}
