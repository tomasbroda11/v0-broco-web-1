"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CreditCard,
  Factory,
  FileText,
  Package,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
  Menu,
  Linkedin,
  Wheat,
  Milk,
  Beef,
  Wrench,
  Fuel,
  Newspaper,
  Receipt,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { IndustryMagicBento, type IndustryMagicBentoItem } from "@/components/ui/industry-magic-bento"
import { MagicBento, type MagicBentoItem } from "@/components/ui/magic-bento"
import Image from "next/image"

export default function EternumPage() {
  const revealRefs = useRef<HTMLElement[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openWhatsApp = (text: string) => {
    const base = "https://api.whatsapp.com/send/"
    const params = new URLSearchParams({
      phone: "5493412795326",
      text,
      type: "phone_number",
      app_absent: "0",
    })
    window.open(`${base}?${params.toString()}`, "_blank")
  }

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const industryModules: IndustryMagicBentoItem[] = [
    {
      icon: <Wheat className="h-7 w-7" />,
      title: "Acopio de Granos",
      description: "Comercialización y acopio de granos",
      accent: "violet",
    },
    {
      icon: <Package className="h-7 w-7" />,
      title: "Molinos",
      description: "Producción de harinas",
      accent: "blue",
    },
    {
      icon: <Factory className="h-7 w-7" />,
      title: "Alimentos Balanceados",
      description: "Producción y formulación",
      accent: "violet",
    },
    {
      icon: <Wheat className="h-7 w-7" />,
      title: "Semillas",
      description: "Producción y comercialización",
      accent: "blue",
    },
    {
      icon: <Milk className="h-7 w-7" />,
      title: "Lácteos",
      description: "Producción de leche y quesos",
      accent: "violet",
    },
    {
      icon: <Beef className="h-7 w-7" />,
      title: "Hacienda y Ganadería",
      description: "Gestión de rodeos y comercialización",
      accent: "blue",
    },
    {
      icon: <Wrench className="h-7 w-7" />,
      title: "Metalmecánica",
      description: "Producción y órdenes de trabajo",
      accent: "violet",
    },
    {
      icon: <Truck className="h-7 w-7" />,
      title: "Transporte de Carga",
      description: "Fletes y logística",
      accent: "blue",
    },
    {
      icon: <Fuel className="h-7 w-7" />,
      title: "Combustibles",
      description: "Compra venta de combustibles y lubricantes",
      accent: "violet",
    },
    {
      icon: <Package className="h-7 w-7" />,
      title: "Distribución",
      description: "Distribución de alimentos",
      accent: "blue",
    },
    {
      icon: <Newspaper className="h-7 w-7" />,
      title: "Medios",
      description: "Avisos y clasificados para diarios",
      accent: "violet",
    },
    {
      icon: <Receipt className="h-7 w-7" />,
      title: "Billing",
      description: "Facturación recurrente por contratos",
      accent: "blue",
    },
  ]

  const featureModules: MagicBentoItem[] = [
    {
      id: 1,
      icon: <Calculator className="h-6 w-6" />,
      title: "Contabilidad General",
      description: "Gestión contable completa con plan de cuentas, asientos automáticos y estados financieros.",
      label: "Finanzas",
    },
    {
      id: 2,
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Compras",
      description: "Control total del ciclo de compras, desde órdenes hasta recepción y pagos a proveedores.",
      label: "Operaciones",
    },
    {
      id: 3,
      icon: <FileText className="h-6 w-6" />,
      title: "Ventas",
      description: "Facturación electrónica, presupuestos, remitos y seguimiento completo de operaciones comerciales.",
      label: "Operaciones",
    },
    {
      id: 4,
      icon: <Users className="h-6 w-6" />,
      title: "Cuentas por Cobrar",
      description: "Seguimiento de deudores, antigüedad de saldos, gestión de cobranzas y recibos.",
      label: "Finanzas",
    },
    {
      id: 5,
      icon: <CreditCard className="h-6 w-6" />,
      title: "Cuentas por Pagar",
      description: "Control de obligaciones, vencimientos, órdenes de pago y gestión de proveedores.",
      label: "Finanzas",
    },
    {
      id: 6,
      icon: <Factory className="h-6 w-6" />,
      title: "Producción",
      description: "Órdenes de producción, fórmulas, costos y control de procesos productivos.",
      label: "Planta",
    },
    {
      id: 7,
      icon: <Warehouse className="h-6 w-6" />,
      title: "Gestión de Inventarios",
      description: "Stock en tiempo real, múltiples depósitos, movimientos, ajustes y valorización.",
      label: "Stock",
    },
    {
      id: 8,
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Tesorería",
      description: "Gestión de cajas, bancos, cheques, transferencias y conciliaciones bancarias.",
      label: "Finanzas",
    },
  ]

  useEffect(() => {
    const html = document.documentElement
    html.classList.remove("page-transitioning", "is-scrolling")
    document.body.classList.remove("page-transitioning", "is-scrolling")

    const handleScroll = () => {
      revealRefs.current.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add("active")
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      html.classList.remove("page-transitioning", "is-scrolling")
      document.body.classList.remove("page-transitioning", "is-scrolling")
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top: Math.max(offsetTop, 0),
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-nav flex lg:inline-flex items-center rounded-full px-4 lg:px-8 py-3 w-[92vw] lg:w-auto justify-between lg:justify-start gap-0 lg:gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0" aria-label="Volver a Home">
            <Image src="/brand/bs-mark-neg.svg" alt="Eternum" width={28} height={28} />
            <span
              className="text-lg lg:text-xl font-bold tracking-wider"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Eter<span className="gradient-text">num</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-sm ml-4">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-[#7F5AF0] transition-colors whitespace-nowrap"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="hover:text-[#7F5AF0] transition-colors whitespace-nowrap"
            >
              Beneficios
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="hover:text-[#7F5AF0] transition-colors whitespace-nowrap"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="hover:text-[#7F5AF0] transition-colors whitespace-nowrap"
            >
              Planes
            </button>
          </div>

          <div className="hidden lg:block ml-auto">
            <Button
              className="gradient-primary hover:opacity-90 transition-opacity text-sm px-6 py-2 rounded-full"
              onClick={() => openWhatsApp("Hola! Me interesa solicitar una demo de Eternum")}
            >
              Solicitar Demo
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-white/5"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`lg:hidden transition-all duration-200 overflow-hidden mt-2 rounded-2xl glass-nav ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <div className="flex flex-col px-4 py-3 gap-2">
            <button
              onClick={() => {
                scrollToSection("features")
                setIsMenuOpen(false)
              }}
              className="py-2 text-left hover:text-[#7F5AF0]"
            >
              Características
            </button>
            <button
              onClick={() => {
                scrollToSection("benefits")
                setIsMenuOpen(false)
              }}
              className="py-2 text-left hover:text-[#7F5AF0]"
            >
              Beneficios
            </button>
            <button
              onClick={() => {
                scrollToSection("testimonials")
                setIsMenuOpen(false)
              }}
              className="py-2 text-left hover:text-[#7F5AF0]"
            >
              Testimonios
            </button>
            <button
              onClick={() => {
                scrollToSection("pricing")
                setIsMenuOpen(false)
              }}
              className="py-2 text-left hover:text-[#7F5AF0]"
            >
              Planes
            </button>
            <div className="pt-2">
              <Button
                className="w-full gradient-primary hover:opacity-90 transition-opacity text-sm rounded-full"
                onClick={() => {
                  openWhatsApp("Hola! Me interesa solicitar una demo de Eternum")
                  setIsMenuOpen(false)
                }}
              >
                Solicitar Demo
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden py-40 bg-black">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary opacity-50 rounded-full filter blur-3xl animate-float"></div>
            <div
              className="absolute top-20 right-20 w-80 h-80 bg-primary-blue opacity-40 rounded-full filter blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-10 left-1/3 w-60 h-60 bg-purple-600 opacity-35 rounded-full filter blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="container mx-auto relative z-10 flex flex-col items-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-left max-w-4xl">
              Menos operación <br />
              <span className="gradient-text">Mas decisión</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg sm:text-xl text-gray-300 animate-slide-right text-center">
              Eternum® es un sistema contable y de gestión integral para PyMES. Multi empresa, multi sucursal y multi
              monedas. Con una interfaz intuitiva y exportación a Excel, PDF y más.
            </p>
            <div
              className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <Button
                size="lg"
                className="gradient-primary hover:opacity-90 transition-opacity"
                onClick={() => openWhatsApp("Hola! Me gustaría comenzar ahora con Eternum")}
              >
                Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </section>

        {/* Features Section - Main Modules */}
        <section id="features" className="py-20 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center reveal" ref={addToRefs}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="gradient-text">Módulos Principales</span>
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Eternum integra todas las funcionalidades esenciales para la gestión completa de tu empresa.
              </p>
            </div>
            <div className="mt-16 reveal" ref={addToRefs}>
              <MagicBento
                items={featureModules}
                enableStars
                enableSpotlight
                enableBorderGlow
                enableMagnetism
                enableTilt={false}
                clickEffect
                glowColor="127, 90, 240"
                textAutoHide
              />
            </div>
          </div>
        </section>

        {/* Industry Modules Section */}
        <section id="industry-modules" className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-40 -right-20 w-96 h-96 bg-primary opacity-25 rounded-full filter blur-3xl animate-float"></div>
            <div
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-blue opacity-20 rounded-full filter blur-3xl animate-float"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          <div className="container mx-auto relative z-10 px-4">
            <div className="mx-auto max-w-2xl text-center reveal" ref={addToRefs}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="gradient-text">Módulos de Gestión</span> por Industria
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Soluciones específicas para diversos rubros, totalmente integradas con la gestión comercial y contable.
              </p>
            </div>
            <div className="mt-16 reveal" ref={addToRefs}>
              <IndustryMagicBento items={industryModules} />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-40 -right-20 w-96 h-96 bg-primary opacity-25 rounded-full filter blur-3xl animate-float"></div>
            <div
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-blue opacity-20 rounded-full filter blur-3xl animate-float"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          <div className="container mx-auto relative z-10 px-4">
            <div className="mx-auto max-w-2xl text-center reveal" ref={addToRefs}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                ¿Por qué elegir <span className="gradient-text">Eternum</span>?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Diseñado pensando en la eficiencia y facilidad de uso para transformar la gestión de tu negocio.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                number="01"
                title="Interfaz Intuitiva"
                description="Diseño minimalista y moderno que facilita la navegación y reduce la curva de aprendizaje."
                delay={0}
                addToRefs={addToRefs}
              />
              <BenefitCard
                number="02"
                title="Todo Integrado"
                description="Todas las funciones que necesitas en un solo lugar, eliminando la necesidad de múltiples plataformas."
                delay={0.1}
                addToRefs={addToRefs}
              />
              <BenefitCard
                number="03"
                title="Ahorro de Tiempo"
                description="Automatiza tareas repetitivas y optimiza procesos para que puedas enfocarte en lo importante."
                delay={0.2}
                addToRefs={addToRefs}
              />
              <BenefitCard
                number="04"
                title="Decisiones Informadas"
                description="Datos y análisis en tiempo real para tomar decisiones estratégicas basadas en información precisa."
                delay={0.3}
                addToRefs={addToRefs}
              />
              <BenefitCard
                number="05"
                title="Escalabilidad"
                description="Crece con tu negocio, adaptándose a tus necesidades cambiantes sin complicaciones."
                delay={0.4}
                addToRefs={addToRefs}
              />
              <BenefitCard
                number="06"
                title="Soporte Premium"
                description="Asistencia técnica especializada disponible cuando la necesites, garantizando la continuidad de tu operación."
                delay={0.5}
                addToRefs={addToRefs}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center reveal" ref={addToRefs}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Qué dicen las <span className="gradient-text">pymes</span> que usan Eternum
              </h2>
              <p className="mt-4 text-lg text-gray-400">Casos reales de rubros bien distintos en Argentina.</p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="Teníamos precios y stock repartidos entre Excel y el grupo de WhatsApp. Con Eternum unificamos todo, bajaron fuerte los faltantes y la reposición sale sola. Nos ahorra horas todos los días."
                author="Mariana A."
                company="Ferretería y construcción"
                delay={0}
                addToRefs={addToRefs}
              />
              <TestimonialCard
                quote="Pasamos de papelitos y planillas a órdenes de producción, compras e insumos en un mismo lugar. Ahora vemos márgenes por trabajo y cuándo nos conviene producir. Nos ordenó la fábrica."
                author="Sergio P."
                company="Taller y fabricación"
                delay={0.2}
                addToRefs={addToRefs}
              />
              <TestimonialCard
                quote="Tenemos varias cajas y distintas cotizaciones durante el día. Ahora armamos cajas, billeteras virtuales y bancos, hacemos el arqueo en dos clics y vemos el spread de cada operación. Queda todo registrado y el cierre de turno sale sin drama."
                author="Gaston M."
                company="Financiera minorista"
                delay={0.4}
                addToRefs={addToRefs}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-90"></div>
          <div className="container mx-auto relative z-10 text-center px-4">
            <div className="reveal" ref={addToRefs}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Impulsá la transformación de tu empresa
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg">
                Sumate a las organizaciones que ya optimizaron su gestión con Eternum. Solicitá una demostración
                personalizada y conocé todo su potencial.
              </p>
              <Button
                size="lg"
                className="mt-8 bg-black hover:bg-gray-900 border border-white/20"
                onClick={() => openWhatsApp("Hola! Me interesa una demostración gratuita de Eternum")}
              >
                Solicitar demostración gratuita
              </Button>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/3 w-96 h-96 bg-primary opacity-25 rounded-full filter blur-3xl animate-float"></div>
            <div
              className="absolute bottom-20 right-20 w-80 h-80 bg-primary-blue opacity-20 rounded-full filter blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="container mx-auto relative z-10 px-4">
            <div className="mx-auto max-w-2xl text-center reveal" ref={addToRefs}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="gradient-text">Planes</span> para cada necesidad
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Elegí el plan que mejor se adapte a tu empresa. Contactanos para recibir una cotización personalizada.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <PricingCard
                title="CENTURY"
                description="Startups y Pequeñas Empresas"
                features={["Implementación rápida, funciones esenciales y módulo base de E-commerce."]}
                delay={0}
                addToRefs={addToRefs}
                openWhatsApp={openWhatsApp}
              />
              <PricingCard
                title="MILLENNIUM"
                description="PyMEs en expansión"
                features={["Mayor personalización, módulos avanzados y gestión de procesos específicos."]}
                highlighted={true}
                delay={0.1}
                addToRefs={addToRefs}
                openWhatsApp={openWhatsApp}
              />
              <PricingCard
                title="ETERNUM"
                description="Nivel Corporativo"
                features={["Gestión compleja, multi-área, alto volumen de datos y auditoría total."]}
                delay={0.2}
                addToRefs={addToRefs}
                openWhatsApp={openWhatsApp}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center reveal" ref={addToRefs}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="gradient-text">Preguntas</span> frecuentes
              </h2>
              <p className="mt-4 text-lg text-gray-400">Resolvemos tus dudas sobre Eternum.</p>
            </div>
            <div className="mt-16 max-w-3xl mx-auto">
              <FAQItem
                question="¿Qué es Eternum?"
                answer="Eternum® es un sistema contable y de gestión para PyMES (ERP). Incluye módulos de contabilidad general, compras, ventas, gestión de inventarios, pagos, cobranzas, producción y módulos especializados para diversos rubros industriales."
                addToRefs={addToRefs}
              />
              <FAQItem
                question="¿Es multi empresa y multi sucursal?"
                answer="Sí, Eternum es multi empresa, multi sucursal y multi monedas. Podés gestionar varias empresas y sucursales desde una misma instalación, con diferentes monedas según tus necesidades."
                addToRefs={addToRefs}
              />
              <FAQItem
                question="¿Puedo exportar los reportes?"
                answer="Sí, Eternum permite exportar todos sus informes a formatos de planillas de cálculo (Excel), PDF, páginas HTML y procesadores de texto."
                addToRefs={addToRefs}
              />
              <FAQItem
                question="¿Tienen módulos para mi industria?"
                answer="Eternum cuenta con módulos especializados para acopio de granos, molinos, alimentos balanceados, lácteos, ganadería, metalmecánica, transporte, combustibles, distribución y más. Todos integrados con la gestión comercial y contable."
                addToRefs={addToRefs}
              />
              <FAQItem
                question="¿Cómo puedo conocer los precios?"
                answer="Para conocer los precios y recibir una cotización personalizada según las necesidades de tu empresa, contactanos por WhatsApp y te asesoraremos sin compromiso."
                addToRefs={addToRefs}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center gap-2">
              <Image src="/brand/bs-mark-neg.svg" alt="Eternum" width={24} height={24} />
              <span
                className="text-lg font-bold tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Eter<span className="gradient-text">num</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.tiktok.com/@broco.solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-blue transition-colors p-2 hover:bg-gray-800/50 rounded-full"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/broco.solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-blue transition-colors p-2 hover:bg-gray-800/50 rounded-full"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.668.072-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/broco-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-blue transition-colors p-2 hover:bg-gray-800/50 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Eternum. Un producto de Broco Solutions.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5493412795326?text=Hola! Me interesa conocer más sobre Eternum"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5C] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}

// Benefit Card Component
interface BenefitCardProps {
  number: string
  title: string
  description: string
  delay: number
  addToRefs: (el: HTMLElement | null) => void
}

function BenefitCard({ number, title, description, delay, addToRefs }: BenefitCardProps) {
  return (
    <div className="benefit-card reveal" ref={addToRefs} style={{ animationDelay: `${delay}s` }}>
      <span className="text-5xl font-bold gradient-text opacity-50">{number}</span>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  )
}

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string
  author: string
  company: string
  delay: number
  addToRefs: (el: HTMLElement | null) => void
}

function TestimonialCard({ quote, author, company, delay, addToRefs }: TestimonialCardProps) {
  return (
    <div className="testimonial-card reveal" ref={addToRefs} style={{ animationDelay: `${delay}s` }}>
      <p className="text-gray-300 italic">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">{company}</p>
      </div>
    </div>
  )
}

// Pricing Card Component
interface PricingCardProps {
  title: string
  description: string
  features: string[]
  highlighted?: boolean
  delay: number
  addToRefs: (el: HTMLElement | null) => void
  openWhatsApp: (text: string) => void
}

function PricingCard({ title, description, features, highlighted, delay, addToRefs, openWhatsApp }: PricingCardProps) {
  const handleClick = () => {
    const planMessages: Record<string, string> = {
      CENTURY: "Hola! Me interesa una cotización del plan CENTURY de Eternum",
      MILLENNIUM: "Hola! Quiero conocer más sobre el plan MILLENNIUM de Eternum",
      ETERNUM: "Hola! Necesito hablar sobre el plan ETERNUM de Eternum",
    }
    const msg = planMessages[title] ?? "Hola! Me interesa conocer más sobre Eternum"
    openWhatsApp(msg)
  }

  return (
    <div
      className={`pricing-card reveal ${highlighted ? "highlighted" : ""}`}
      ref={addToRefs}
      style={{ animationDelay: `${delay}s` }}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7F5AF0] to-[#3E6FA8] text-white text-xs font-semibold px-4 py-1 rounded-full">
          Más popular
        </div>
      )}
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
      <div className="mt-6 text-4xl font-bold gradient-text">Consultar</div>
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <svg className="h-5 w-5 text-[#7F5AF0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`mt-8 w-full ${highlighted ? "gradient-primary" : "bg-gray-800 hover:bg-gray-700"}`}
        onClick={handleClick}
      >
        Solicitar cotización
      </Button>
    </div>
  )
}

// FAQ Item Component
interface FAQItemProps {
  question: string
  answer: string
  addToRefs: (el: HTMLElement | null) => void
}

function FAQItem({ question, answer, addToRefs }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="faq-item reveal border-b border-gray-800" ref={addToRefs}>
      <button className="w-full py-4 flex justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium">{question}</span>
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? "max-h-40 pb-4" : "max-h-0"}`}>
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  )
}
