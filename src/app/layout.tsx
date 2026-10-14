import type { Metadata } from "next"
import Script from "next/script"
import Preloader from "@/components/Preloader"
import GridLines from "@/components/GridLines"
import { body, mono } from "./fonts"
// o CSS que o Lenis pede: altura automática no html, trava que respeita
// `stop()`, iframes sem ponteiro durante o scroll suave
import "lenis/dist/lenis.css"
import "@/styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://rodrigobondioli.com"),
  title: {
    default: "Rodrigo Bondioli — Creative Director",
    template: "%s — Rodrigo Bondioli",
  },
  description:
    "Rodrigo Bondioli brings design and AI together, with more than 20 years leading design for startups and global brands.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rodrigobondioli.com",
    siteName: "Rodrigo Bondioli",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

// GA4, Clarity e Meta Pixel são configurados dentro do container, não aqui.
const GTM_ID = "GTM-PBHQZ25"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /* `data-loading` entra no <html> quando o módulo do Preloader é
       avaliado — antes da hidratação, de propósito (é o que impede os
       efeitos de começarem atrás da cortina). O React compara o HTML do
       servidor com o do navegador e reclama do atributo a mais; é o mesmo
       caso do <body> logo abaixo, e a marca é justamente algo que o
       servidor não tem como ter. */
    <html
      lang="en"
      className={`${body.variable} ${mono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* O tema antes da primeira pintura: dark é o padrão; light só se a
            pessoa escolheu (ThemeToggle grava em localStorage). Inline e
            síncrono de propósito — depois da pintura seria um piscar. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem("tema")==="light"?"light":"dark"}catch(e){}`,
          }}
        />
      </head>
      {/* Extensões (ColorZilla, gramática, gerenciadores de senha) injetam
          atributos no <body> antes do React montar. O aviso de hidratação
          que sai disso não é do nosso código e não tem o que consertar. */}
      <body suppressHydrationWarning>
        {/* Sem JS a tela de carregamento nunca sairia — então sem JS ela
            também não entra. O conteúdo está no HTML de qualquer jeito. */}
        <noscript>
          <style>{`[data-preloader]{display:none!important}`}</style>
        </noscript>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Preloader />
        <GridLines />
        {children}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </body>
    </html>
  )
}
