"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

type SectionId = "inicio" | "servicios" | "proyectos" | "nosotros" | "contacto"

type SiteNavbarProps = {
  activeSection?: SectionId
  onSectionClick?: (sectionId: SectionId) => void
}

const sections: Array<{ id: SectionId; label: string; href: string }> = [
  { id: "inicio", label: "Inicio", href: "/#inicio" },
  { id: "servicios", label: "Servicios", href: "/#servicios" },
  { id: "proyectos", label: "Proyectos", href: "/#proyectos" },
  { id: "nosotros", label: "Nosotros", href: "/#nosotros" },
  { id: "contacto", label: "Contacto", href: "/#contacto" },
]

export function SiteNavbar({ activeSection, onSectionClick }: SiteNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const renderNavAction = (section: (typeof sections)[number], mobile = false) => {
    const baseClass = mobile ? "py-2 text-left transition-colors" : "transition-colors"
    const stateClass =
      activeSection === section.id
        ? "text-white font-medium"
        : "text-white/85 hover:text-[#7F5AF0]"

    if (onSectionClick) {
      return (
        <button
          key={section.id}
          onClick={() => {
            onSectionClick(section.id)
            setIsMenuOpen(false)
          }}
          className={`${baseClass} ${stateClass}`}
        >
          {section.label}
        </button>
      )
    }

    return (
      <Link
        key={section.id}
        href={section.href}
        onClick={() => setIsMenuOpen(false)}
        className={`${baseClass} ${stateClass}`}
      >
        {section.label}
      </Link>
    )
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-nav inline-flex items-center gap-6 px-6 py-3 rounded-full">
        {onSectionClick ? (
          <button
            onClick={() => onSectionClick("inicio")}
            className="flex items-center gap-3 hover:opacity-90 transition"
            aria-label="Ir al inicio"
          >
            <Image src="/brand/bs-mark-neg.svg" alt="Broco" width={28} height={28} priority />
            <span className="text-lg font-bold">Broco</span>
          </button>
        ) : (
          <Link href="/#inicio" className="flex items-center gap-3 hover:opacity-90 transition" aria-label="Ir al inicio">
            <Image src="/brand/bs-mark-neg.svg" alt="Broco" width={28} height={28} priority />
            <span className="text-lg font-bold">Broco</span>
          </Link>
        )}

        <div className="hidden md:flex items-center gap-6 text-sm">
          {sections.map((section) => renderNavAction(section))}
        </div>

        <button
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls="site-mobile-menu"
          className="md:hidden inline-flex items-center justify-center rounded p-2 focus:outline-none"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div
        id="site-mobile-menu"
        className={`md:hidden transition-all duration-200 overflow-hidden mt-2 rounded-2xl glass-nav ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-4 py-3 gap-2">
          {sections.map((section) => renderNavAction(section, true))}
        </div>
      </div>
    </nav>
  )
}
