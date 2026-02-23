"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, useMotionValue, type PanInfo } from "motion/react"

export interface ProjectCarouselItem {
  id: number
  title: string
  description: string
  logoSrc: string
  logoAlt: string
  category?: string
}

export interface ProjectCarouselProps {
  items?: ProjectCarouselItem[]
  cardWidth?: number
  slotWidth?: number
  viewportWidth?: number | string
  baseWidth?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  className?: string
}

const DEFAULT_ITEMS: ProjectCarouselItem[] = [
  {
    id: 1,
    title: "PACSA",
    description: "Automatización corporativa, RRHH y difusión gerencial.",
    logoSrc: "/brand/projects/PacsaLogo.png",
    logoAlt: "Logo PACSA",
    category: "Automatización",
  },
  {
    id: 2,
    title: "Colegio de Odontólogos",
    description: "Transformación digital institucional y estampilla digital.",
    logoSrc: "/brand/projects/ColegioLogo.png",
    logoAlt: "Logo Colegio de Odontólogos",
    category: "Desarrollo a Medida",
  },
  {
    id: 3,
    title: "Bar Levain",
    description: "Despliegue y mantenimiento cloud para ERP Odoo.",
    logoSrc: "/brand/projects/LevainLogo.jpeg",
    logoAlt: "Logo Bar Levain",
    category: "ERP / Cloud",
  },
]

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 22
const MOBILE_BREAKPOINT = 768
const MOBILE_CARD_GUTTER = 28
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 }

type CardSlotState = "active" | "side-left" | "side-right" | "far"

type CarouselCardProps = {
  item: ProjectCarouselItem
  cardWidth: number
  slotWidth: number
  slotState: CardSlotState
  isDesktopFocus: boolean
  relativeIndex: number
}

function ProjectCard({
  item,
  cardWidth,
  slotWidth,
  slotState,
  isDesktopFocus,
  relativeIndex,
}: CarouselCardProps) {
  const stateMotion = (() => {
    if (!isDesktopFocus) {
      return {
        rotateY: 0,
        scale: slotState === "active" ? 1 : 0.98,
        opacity: 1,
        y: 0,
      }
    }

    if (slotState === "active") {
      return { rotateY: 0, scale: 1.02, opacity: 1, y: 0 }
    }
    if (slotState === "side-left") {
      return { rotateY: 12, scale: 0.94, opacity: 0.66, y: 8 }
    }
    if (slotState === "side-right") {
      return { rotateY: -12, scale: 0.94, opacity: 0.66, y: 8 }
    }

    return {
      rotateY: relativeIndex < 0 ? 14 : -14,
      scale: 0.9,
      opacity: 0.45,
      y: 10,
    }
  })()

  const zIndex = slotState === "active" ? 30 : slotState === "side-left" || slotState === "side-right" ? 20 : 10
  const visualClass = isDesktopFocus
    ? slotState === "active"
      ? "border-white/24 shadow-[0_18px_44px_rgba(0,0,0,0.38),0_0_0_1px_rgba(255,255,255,0.08),0_0_24px_rgba(255,255,255,0.06)]"
      : slotState === "side-left" || slotState === "side-right"
        ? "border-white/14 shadow-[0_8px_22px_rgba(0,0,0,0.24)]"
        : "border-white/10 shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
    : "border-white/16 shadow-[0_12px_30px_rgba(0,0,0,0.26)]"

  return (
    <div className="relative flex shrink-0 justify-center" style={{ width: slotWidth, zIndex }}>
      <motion.article
        className={`relative overflow-hidden rounded-2xl border bg-[#141414] cursor-grab active:cursor-grabbing p-5 sm:p-6 flex h-[320px] sm:h-[340px] flex-col transition-[box-shadow,border-color] duration-300 ${visualClass}`}
        style={{ width: cardWidth }}
        animate={stateMotion}
        transition={SPRING_OPTIONS}
      >
        {slotState === "active" && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        )}
        <div className="mb-5 flex h-[92px] w-full items-center justify-center">
          <div className="relative h-[64px] w-full max-w-[220px]">
            <Image
              src={item.logoSrc}
              alt={item.logoAlt}
              fill
              className="object-contain object-center"
              sizes={`${Math.max(220, cardWidth)}px`}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <h3 className="text-white text-xl font-semibold leading-tight min-h-[3.25rem] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
            {item.title}
          </h3>
          <p className="mt-3 min-h-[4.2rem] text-sm text-white/70 leading-relaxed [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
            {item.description}
          </p>

          {item.category && (
            <div className="mt-auto pt-4">
              <span className="inline-flex rounded-full border border-white/20 bg-white/[0.04] px-3 py-1 text-xs text-white/85">
                {item.category}
              </span>
            </div>
          )}
        </div>
      </motion.article>
    </div>
  )
}

export function ProjectCarousel({
  items = DEFAULT_ITEMS,
  cardWidth,
  slotWidth,
  viewportWidth,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  className,
}: ProjectCarouselProps) {
  const resolvedViewportWidth = viewportWidth ?? baseWidth
  const resolvedCardWidth = Math.max(220, cardWidth ?? baseWidth)
  const resolvedSlotWidthBase = Math.max(resolvedCardWidth, slotWidth ?? resolvedCardWidth + 40)

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(
    typeof resolvedViewportWidth === "number" ? resolvedViewportWidth : baseWidth,
  )
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const x = useMotionValue(0)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      if (typeof resolvedViewportWidth === "number") {
        setContainerWidth(resolvedViewportWidth)
        return
      }
      setContainerWidth(Math.max(220, Math.round(entry.contentRect.width)))
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [resolvedViewportWidth])

  const isMobileViewport = containerWidth < MOBILE_BREAKPOINT
  const effectiveCardWidth = isMobileViewport
    ? Math.max(220, Math.min(resolvedCardWidth, containerWidth - MOBILE_CARD_GUTTER))
    : resolvedCardWidth
  const showThreeUp = !isMobileViewport && containerWidth >= resolvedSlotWidthBase * 2 + GAP + 48
  const effectiveSlotWidth = showThreeUp ? resolvedSlotWidthBase : effectiveCardWidth
  const trackItemOffset = effectiveSlotWidth + GAP
  const centerOffset = Math.max((containerWidth - effectiveSlotWidth) / 2, 0)

  const hasLoopClones = loop && items.length > 1
  const itemsForRender = useMemo(() => {
    if (!hasLoopClones) return items
    return [items[items.length - 1], ...items, items[0]]
  }, [items, hasLoopClones])

  const [position, setPosition] = useState(hasLoopClones ? 1 : 0)

  useEffect(() => {
    const start = hasLoopClones ? 1 : 0
    setPosition(start)
    x.set(centerOffset - start * trackItemOffset)
  }, [centerOffset, hasLoopClones, items.length, trackItemOffset, x])

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return
    if (pauseOnHover && isHovered) return

    const timer = window.setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1))
    }, autoplayDelay)

    return () => window.clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, itemsForRender.length, pauseOnHover])

  useEffect(() => {
    if (hasLoopClones) return
    setPosition((prev) => Math.max(0, Math.min(prev, itemsForRender.length - 1)))
  }, [itemsForRender.length, hasLoopClones])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0

    if (direction === 0) return

    setPosition((prev) => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return Math.max(0, Math.min(next, max))
    })
  }

  const handleAnimationStart = () => setIsAnimating(true)

  const handleAnimationComplete = () => {
    if (!hasLoopClones || itemsForRender.length <= 1) {
      setIsAnimating(false)
      return
    }

    const lastCloneIndex = itemsForRender.length - 1

    if (position === lastCloneIndex) {
      setIsJumping(true)
      const target = 1
      setPosition(target)
      x.set(centerOffset - target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    if (position === 0) {
      setIsJumping(true)
      const target = items.length
      setPosition(target)
      x.set(centerOffset - target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    setIsAnimating(false)
  }

  const dragProps = hasLoopClones
    ? {}
    : {
        dragConstraints: {
          left: centerOffset - trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: centerOffset,
        },
      }

  const activeIndex =
    items.length === 0
      ? 0
      : hasLoopClones
        ? (position - 1 + items.length) % items.length
        : Math.min(Math.max(position, 0), items.length - 1)

  const computedViewportWidth = typeof resolvedViewportWidth === "number" ? `${resolvedViewportWidth}px` : resolvedViewportWidth
  const containerStyle: CSSProperties = { width: computedViewportWidth, maxWidth: "100%" }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0F0F10] p-3 sm:p-4 md:p-5 ${className ?? ""}`}
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex touch-pan-y"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: "max-content",
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${centerOffset + effectiveSlotWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: centerOffset - position * trackItemOffset }}
        transition={isJumping ? { duration: 0 } : SPRING_OPTIONS}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => {
          const relativeIndex = index - position
          const slotState: CardSlotState = showThreeUp
            ? relativeIndex === 0
              ? "active"
              : relativeIndex === -1
                ? "side-left"
                : relativeIndex === 1
                  ? "side-right"
                  : "far"
            : relativeIndex === 0
              ? "active"
              : "far"

          return (
            <ProjectCard
              key={`${item.id}-${index}`}
              item={item}
              cardWidth={effectiveCardWidth}
              slotWidth={effectiveSlotWidth}
              slotState={slotState}
              isDesktopFocus={showThreeUp}
              relativeIndex={relativeIndex}
            />
          )
        })}
      </motion.div>

      <div className="mt-5 flex w-full justify-center">
        <div className="flex w-[150px] justify-between px-8">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              className={`h-2 w-2 rounded-full transition-colors duration-150 ${
                activeIndex === index ? "bg-white" : "bg-white/35 hover:bg-white/55"
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(hasLoopClones ? index + 1 : index)}
              transition={{ duration: 0.15 }}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCarousel
