"use client"

import { Button } from "@/components/ui/button"
import { SiteNavbar } from "@/components/site-navbar"
import { ProjectCarousel, type ProjectCarouselItem } from "@/components/ui/project-carousel"
import { TextType } from "@/components/ui/text-type"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  Cloud,
  Database,
  Mail,
  MapPin,
  Phone,
  BarChart3,
  Zap,
  Code,
  Brain,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function BrocoSolutionsLanding() {
  const heroRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const [sending, setSending] = useState(false)
  const [sendStatus, setSendStatus] = useState<null | "ok" | "error">(null)

  const navigateWithTransition = (href: string) => {
    router.push(href)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    router.prefetch("/eternum")
    router.prefetch("/automatizaciones")
  }, [router])

  // Animaciones al hacer scroll
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("animate-in"))
    }, observerOptions)
    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Liberar cualquier lock heredado de otra ruta
    const html = document.documentElement
    html.classList.remove("page-transitioning", "is-scrolling")
    document.body.classList.remove("page-transitioning", "is-scrolling")
  }, [])

  const services = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Eternum ERP",
      description: "Sistema modular que centraliza y automatiza todas las operaciones de tu empresa.",
      highlight: "Producto estrella",
      link: "/eternum",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automatización de Procesos",
      description: "Automatización inteligente que elimina tareas repetitivas.",
      link: "/automatizaciones",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Soluciones en la Nube",
      description: "Infraestructura en la nube con arquitectura segura y escalable.",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Integración de IA",
      description: "Inteligencia artificial aplicada a procesos de negocio reales.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Desarrollos de Software a Medida",
      description: "Desarrollo web y aplicaciones a medida con tecnología moderna.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Análisis y Visualización de Datos",
      description: "Dashboards inteligentes para decisiones basadas en datos.",
    },
  ]

  const projectCarouselItems: ProjectCarouselItem[] = [
    {
      id: 1,
      title: "PACSA",
      description: "Automatización corporativa vía WhatsApp, enrutamiento inteligente, RRHH y difusión gerencial.",
      logoSrc: "/brand/projects/PacsaLogo.png",
      logoAlt: "Logo PACSA",
      category: "Automatización",
    },
    {
      id: 2,
      title: "Colegio de Odontólogos",
      description: "Transformación digital institucional, estampilla digital y documentos formales.",
      logoSrc: "/brand/projects/ColegioLogo.png",
      logoAlt: "Logo Colegio de Odontólogos",
      category: "Desarrollo a Medida",
    },
    {
      id: 3,
      title: "Levain",
      description: "Despliegue, parametrización y mantenimiento cloud para ERP Odoo.",
      logoSrc: "/brand/projects/LevainLogo.jpeg",
      logoAlt: "Logo Levain",
      category: "ERP / Cloud",
    },
    {
      id: 4,
      title: "Bertino Integrales",
      description: "Sitio web institucional para fábrica de aberturas.",
      logoSrc: "/brand/projects/BertinoLogo.png",
      logoAlt: "Logo Bertino Integrales",
      category: "Desarrollo Web",
    },
    {
      id: 5,
      title: "Argwines",
      description: "Plataforma web internacional para distribuidora de vinos argentinos en Australia.",
      logoSrc: "/brand/projects/ArgwinesLogo.jpeg",
      logoAlt: "Logo Argwines",
      category: "Desarrollo Web",
    },
    {
      id: 6,
      title: "Rasafertil",
      description: "Sitio web institucional para fertilizantes premium y nutrientes naturales para suelos.",
      logoSrc: "/brand/projects/RasafertilLogo.png",
      logoAlt: "Logo Rasafertil",
      category: "Desarrollo Web",
    },
    {
      id: 7,
      title: "BrocoAgro",
      description: "Plataforma integral para gestión del productor agropecuario.",
      logoSrc: "/brand/projects/BrocoAgroLogo.jpeg",
      logoAlt: "Logo BrocoAgro",
      category: "Producto Propio",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden overflow-y-auto touch-pan-y ios-smooth-scroll">
      {/* NAV: barra + dropdown mobile */}
      <SiteNavbar onSectionClick={scrollToSection} />

      {/* Hero */}
      <section
        ref={heroRef}
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32"
      >
        <div className="absolute inset-0 animated-bg pointer-events-none">
          <div className="floating-orbs" />
          <div className="grid-pattern" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 glass-badge px-4 py-2 rounded-full text-sm leading-6">
              <Sparkles className="h-4 w-4 text-[#7F5AF0]" />
              <span>Tecnología que transforma empresas</span>
            </div>

           <h1 className="mx-auto font-black leading-[0.95] text-white text-[clamp(2.1rem,8vw,7rem)]">
              <span className="block whitespace-nowrap">
                Menos operación.
              </span>

              <span className="mt-2 block h-[1.1em] whitespace-nowrap">
                <span className="inline-block min-w-[16ch] text-center">
                  <TextType
                    text={["Más decisión.", "Más control.", "Más productividad.", "Más trazabilidad."]}
                    typingSpeed={65}
                    deletingSpeed={35}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="▎"
                    startOnVisible={true}
                    className="inline-block"
                  />
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Sistemas a medida, automatización, IA y soluciones en la nube para empresas que buscan resultados reales
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 mb-12">
              <Button onClick={() => navigateWithTransition("/eternum")} className="hero-cta group cursor-pointer">
                <span>Ver Eternum</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection("servicios")}
                variant="ghost"
                className="text-white/80 hover:text-white border border-white/20 hover:border-[#7F5AF0]/50 cursor-pointer"
              >
                Explorar servicios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-32 relative">
        <div className="absolute inset-0 diagonal-bg pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 animate-on-scroll slide-in-left">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-badge px-3 py-1 rounded-full text-sm">
                  <Target className="h-4 w-4 text-[#3E6FA8]" />
                  <span>Nuestros servicios</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold">
                  <span className="gradient-text-section">Tecnología</span>
                  <br />
                  <span className="text-white">aplicada</span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Cada solución está diseñada para generar valor medible en tu empresa.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 animate-on-scroll slide-in-right">
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => {
                  const clickable = Boolean(service.link)
                  const go = () => service.link && navigateWithTransition(service.link!)

                  return (
                    <div key={index} className="relative">
                      {service.highlight && (
                        <div className="absolute -top-4 -right-4 z-50 bg-gradient-to-r from-[#7F5AF0] to-[#3E6FA8] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-2xl border border-white/20">
                          <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Estrella
                          </span>
                        </div>
                      )}

                      {/* CARD */}
                      <div
                        className={`service-card group rounded-xl
                                    p-5 min-h-[9.5rem] flex flex-col justify-start
                                    ${service.highlight ? "featured-service" : ""}
                                    ${clickable ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20" : ""}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={go}
                        onKeyDown={(e) => clickable && (e.key === "Enter" || e.key === " ") && go()}
                        role={clickable ? "button" : undefined}
                        tabIndex={clickable ? 0 : -1}
                        aria-label={clickable ? `Abrir ${service.title}` : undefined}
                      >
                        <div className="flex items-start gap-4">
                          <div className="service-icon flex-shrink-0">{service.icon}</div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-2 group-hover:text-[#7F5AF0] transition-colors">
                              {service.title}
                            </h3>

                            <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>

                            {/* Indicador de click: sólo si tiene link */}
                            {clickable && (
                              <span
                                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium
                                          text-white/80 border border-white/15 rounded-full px-3 py-1
                                          transition-all group-hover:text-white group-hover:border-[#7F5AF0]/50"
                              >
                                Conocé más
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 animate-on-scroll fade-in">
            <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-8">
              <div className="max-w-4xl mx-auto text-center space-y-5">
                <p className="text-base md:text-lg text-white/75 leading-relaxed">
                  Conozca nuestra metodología de trabajo. Explore nuestra presentación institucional para conocer en detalle
                  cómo estructuramos nuestras soluciones y generamos valor medible.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent text-white/85 border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <a
                    href="https://drive.google.com/file/d/1wDoyw6juQjp-FQvRBQDRnyc_xFFQqtbq/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Brochure Institucional online
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos y Casos de Éxito */}
      <section id="proyectos" className="py-12 md:py-[4.5rem] relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-8 animate-on-scroll fade-in">
              <h2 className="text-4xl md:text-6xl font-bold mb-3">
                <span className="gradient-text-section">Proyectos</span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">Algunas soluciones tecnológicas ya implementadas</p>
            </div>

            <div className="relative mx-auto w-full max-w-7xl animate-on-scroll fade-in rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_22px_56px_rgba(0,0,0,0.34)]">
              <div className="relative mx-auto flex w-full justify-center min-h-[334px] sm:min-h-[360px] md:min-h-[410px]">
                <ProjectCarousel
                  items={projectCarouselItems}
                  cardWidth={320}
                  viewportWidth="100%"
                  baseWidth={330}
                  autoplay
                  autoplayDelay={2000}
                  pauseOnHover
                  loop
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="nosotros" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll fade-in">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text-section">Equipo</span>
                <span className="text-white"> compacto,</span>
                <br />
                <span className="neon-text">resultados grandes</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-on-scroll slide-in-left space-y-6">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Rocket className="h-6 w-6 text-[#7F5AF0]" />
                    <h3 className="text-xl font-semibold">Nuestra realidad</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {
                      "Somos desarrolladores y consultores. Creamos soluciones confiables e innovadoras que ayudan a nuestros clientes a crecer, optimizar procesos y tomar mejores decisiones.\n"
                    }
                  </p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="h-6 w-6 text-[#3E6FA8]" />
                    <h3 className="text-xl font-semibold">Nuestro enfoque</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {
                      "Combinamos desarrollo ágil, tecnologías de vanguardia y automatización inteligente. Nos enfocamos en comprender a cada cliente para diseñar soluciones de alto impacto y valor sostenible."
                    }
                  </p>
                </div>
              </div>

              <div className="animate-on-scroll slide-in-right">
                <div className="relative">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="text-3xl font-bold neon-text">2+</div>
                      <div className="text-sm text-white/60">Años de experiencia</div>
                    </div>
                    <div className="stat-item">
                      <div className="text-3xl font-bold neon-text">10+</div>
                      <div className="text-sm text-white/60">Proyectos completados</div>
                    </div>
                    <div className="stat-item">
                      <div className="text-3xl font-bold neon-text">100%</div>
                      <div className="text-sm text-white/60">Enfoque en resultados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll fade-in">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">¿Listo para</span>
                <br />
                <span className="gradient-text-section">transformar</span>
                <span className="text-white"> tu empresa?</span>
              </h2>
              <p className="text-xl text-white/70">Hablemos de tu proyecto</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="animate-on-scroll slide-in-left">
                <div className="glass-card p-8 rounded-2xl">
                  <form
                    className="space-y-6"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const form = e.currentTarget as HTMLFormElement
                      const data = new FormData(form)

                      const payload = {
                        name: String(data.get("name") || ""),
                        email: String(data.get("email") || ""),
                        company: String(data.get("company") || ""),
                        message: String(data.get("message") || ""),
                        hp: String(data.get("hp") || ""), // honeypot
                      }

                      setSending(true)
                      setSendStatus(null)
                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        })
                        const json = await res.json()
                        if (!res.ok || !json.ok) throw new Error(json.error || "Error")
                        setSendStatus("ok")
                        form.reset()
                      } catch (err) {
                        setSendStatus("error")
                      } finally {
                        setSending(false)
                      }
                    }}
                  >
                    {/* Honeypot anti-bots (oculto a usuarios) */}
                    <input name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="name" placeholder="Nombre" className="modern-input" required />
                      <Input name="email" type="email" placeholder="Email" className="modern-input" required />
                    </div>

                    <Input name="company" placeholder="Empresa" className="modern-input" />
                    <Textarea
                      name="message"
                      placeholder="Contanos sobre tu proyecto..."
                      rows={4}
                      className="modern-input"
                      required
                    />

                    {sendStatus === "ok" && (
                      <div className="text-sm text-green-400">¡Gracias! Te escribimos a la brevedad.</div>
                    )}
                    {sendStatus === "error" && (
                      <div className="text-sm text-red-400">Ups, no pudimos enviar el mensaje. Probá de nuevo.</div>
                    )}

                    <Button className="w-full hero-cta" disabled={sending}>
                      {sending ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                </div>
              </div>

              <div className="animate-on-scroll slide-in-right space-y-8">
                <div className="contact-item">
                  <Mail className="h-6 w-6 text-[#7F5AF0]" />
                  <div>
                    <div className="font-semibold text-[#3E6FA8]">Email</div>
                    <div className="text-white/80">contacto@brocosolutions.com</div>
                  </div>
                </div>

                <div className="contact-item">
                  <Phone className="h-6 w-6 text-[#7F5AF0]" />
                  <div>
                    <div className="font-semibold text-[#3E6FA8]">WhatsApp</div>
                    <div className="text-white/80">{"+54 9 3412 79 5326"}</div>
                  </div>
                </div>

                <div className="contact-item">
                  <MapPin className="h-6 w-6 text-[#7F5AF0]" />
                  <div>
                    <div className="font-semibold text-[#3E6FA8]">Ubicación</div>
                    <div className="text-white/80">Rosario, Santa Fe, Argentina</div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="text-sm text-white/60 mb-4">Seguinos en</div>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.tiktok.com/@broco.solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#7F5AF0] transition-colors p-2 hover:bg-white/10 rounded-full"
                      aria-label="TikTok"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/broco.solutions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#7F5AF0] transition-colors p-2 hover:bg-white/10 rounded-full"
                      aria-label="Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/brocosolutions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#7F5AF0] transition-colors p-2 hover:bg-white/10 rounded-full"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href="/privacy"
                    className="block text-sm text-white/60 hover:text-[#7F5AF0] transition-colors"
                  >
                    Política de Privacidad
                  </a>
                  <div className="text-sm text-white/60">
                    © {new Date().getFullYear()} Broco Solutions. Tecnología que funciona.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/5493412795326?text=Hola! Me interesa conocer más sobre sus servicios"
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
