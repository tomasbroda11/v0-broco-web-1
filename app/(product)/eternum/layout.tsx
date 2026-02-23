import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Outfit, Inter } from "next/font/google"
import "../../../styles/globals-bm.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Eternum | Brocco Solutions",
  description: "Sistema de gestión empresarial innovador, minimalista y moderno",
  generator: "v0.app",
}

export default function EternumLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`dark min-h-screen ${spaceGrotesk.variable} ${outfit.variable} ${inter.variable} font-sans bg-black text-white`}
    >
      {children}
    </div>
  )
}
