"use client"

import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import styles from "./magic-bento.module.css"

export type MagicBentoItem = {
  id: number
  title: string
  description: string
  label?: string
  icon?: ReactNode
}

type MagicBentoProps = {
  items: MagicBentoItem[]
  className?: string
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  glowColor?: string
  textAutoHide?: boolean
}

const mobileBreak = 768
type LayoutVariant = "hero" | "wide" | "tall" | "regular"

const layoutById: Record<number, LayoutVariant> = {
  1: "hero",
  2: "regular",
  3: "tall",
  4: "regular",
  5: "wide",
  6: "tall",
  7: "regular",
  8: "wide",
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}

function getLayoutVariant(id: number): LayoutVariant {
  return layoutById[id] ?? "regular"
}

function getLayoutClass(variant: LayoutVariant) {
  if (variant === "hero") return styles["mbento-item-hero"]
  if (variant === "wide") return styles["mbento-item-wide"]
  if (variant === "tall") return styles["mbento-item-tall"]
  return styles["mbento-item-regular"]
}

export function MagicBento({
  items,
  className,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  glowColor = "127, 90, 240",
  textAutoHide = true,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [heavyEffectsDisabled, setHeavyEffectsDisabled] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mobileQuery = window.matchMedia(`(max-width: ${mobileBreak - 1}px)`)
    const coarseQuery = window.matchMedia("(pointer: coarse)")
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const update = () => {
      setHeavyEffectsDisabled(mobileQuery.matches || coarseQuery.matches || reducedQuery.matches)
    }

    update()

    const queries = [mobileQuery, coarseQuery, reducedQuery]
    const cleanups = queries.map((query) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", update)
        return () => query.removeEventListener("change", update)
      }

      query.addListener(update)
      return () => query.removeListener(update)
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || !enableSpotlight || heavyEffectsDisabled) return

    const setX = gsap.quickSetter(grid, "--mbento-spot-x")
    const setY = gsap.quickSetter(grid, "--mbento-spot-y")
    const setOpacity = gsap.quickTo(grid, "--mbento-spot-opacity", { duration: 0.24, ease: "power2.out" })

    const onEnter = () => setOpacity(1)
    const onLeave = () => setOpacity(0)
    const onMove = (pointer: globalThis.PointerEvent) => {
      const rect = grid.getBoundingClientRect()
      setX(`${pointer.clientX - rect.left}px`)
      setY(`${pointer.clientY - rect.top}px`)
    }

    grid.addEventListener("pointerenter", onEnter)
    grid.addEventListener("pointerleave", onLeave)
    grid.addEventListener("pointermove", onMove)

    return () => {
      grid.removeEventListener("pointerenter", onEnter)
      grid.removeEventListener("pointerleave", onLeave)
      grid.removeEventListener("pointermove", onMove)
      setOpacity(0)
    }
  }, [enableSpotlight, heavyEffectsDisabled])

  useEffect(() => {
    return () => {
      const grid = gridRef.current
      if (!grid) return
      const transientNodes = Array.from(grid.querySelectorAll("[data-mbento-star], [data-mbento-ripple]"))
      gsap.killTweensOf(transientNodes)
      transientNodes.forEach((node) => node.remove())
    }
  }, [])

  const canRunPointerEffects = !heavyEffectsDisabled

  const emitStars = (target: HTMLElement) => {
    if (!enableStars || !canRunPointerEffects) return

    const starCount = 8
    for (let index = 0; index < starCount; index += 1) {
      const star = document.createElement("span")
      star.dataset.mbentoStar = "true"
      star.className = styles["mbento-particle"]

      const size = gsap.utils.random(2, 4)
      const angle = (Math.PI * 2 * index) / starCount + gsap.utils.random(-0.25, 0.25)
      const distance = gsap.utils.random(16, 40)
      const startX = gsap.utils.random(target.clientWidth * 0.3, target.clientWidth * 0.7)
      const startY = gsap.utils.random(target.clientHeight * 0.24, target.clientHeight * 0.54)

      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.left = `${startX}px`
      star.style.top = `${startY}px`
      star.style.background = `rgba(${glowColor}, 0.95)`
      star.style.boxShadow = `0 0 10px rgba(${glowColor}, 0.85)`

      target.appendChild(star)

      gsap.fromTo(
        star,
        { x: 0, y: 0, opacity: 0.9, scale: 1 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          duration: gsap.utils.random(0.42, 0.72),
          ease: "power2.out",
          onComplete: () => star.remove(),
        },
      )
    }
  }

  const emitRipple = (target: HTMLElement, x: number, y: number) => {
    if (!clickEffect || !canRunPointerEffects) return

    const ripple = document.createElement("span")
    ripple.dataset.mbentoRipple = "true"
    ripple.className = styles["mbento-ripple"]

    const maxSize = Math.max(target.clientWidth, target.clientHeight) * 1.25
    ripple.style.width = `${maxSize}px`
    ripple.style.height = `${maxSize}px`
    ripple.style.left = `${x - maxSize / 2}px`
    ripple.style.top = `${y - maxSize / 2}px`
    ripple.style.borderColor = `rgba(${glowColor}, 0.46)`
    ripple.style.background = `radial-gradient(circle, rgba(${glowColor}, 0.24) 0%, rgba(${glowColor}, 0.08) 48%, transparent 72%)`

    target.appendChild(ripple)

    gsap.fromTo(
      ripple,
      { scale: 0.24, opacity: 0.88 },
      {
        scale: 1.14,
        opacity: 0,
        duration: 0.62,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      },
    )
  }

  const handlePointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return
    emitStars(event.currentTarget)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType && event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    emitRipple(event.currentTarget, event.clientX - rect.left, event.clientY - rect.top)
  }

  const handleKeyboardActivation = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    const target = event.currentTarget
    emitRipple(target, target.clientWidth / 2, target.clientHeight / 2)
    emitStars(target)
  }

  return (
    <section
      ref={gridRef}
      className={cx(styles["mbento-section"], className)}
      style={
        {
          "--mbento-spot-x": "50%",
          "--mbento-spot-y": "0px",
          "--mbento-spot-opacity": 0,
          "--mbento-glow-color": glowColor,
        } as CSSProperties
      }
    >
      {enableSpotlight && !heavyEffectsDisabled && <div className={styles["mbento-spotlight"]} aria-hidden />}

      <div className={styles["mbento-grid"]}>
        {items.map((item) => {
          const variant = getLayoutVariant(item.id)
          const descriptionClampClass =
            textAutoHide && variant === "hero"
              ? styles["mbento-desc-clamp-hero"]
              : textAutoHide && (variant === "wide" || variant === "tall")
                ? styles["mbento-desc-clamp-expanded"]
                : textAutoHide
                  ? styles["mbento-desc-clamp-regular"]
                  : ""

          return (
            <div key={item.id} className={cx(styles["mbento-item"], getLayoutClass(variant))}>
              <article
                tabIndex={0}
                onPointerEnter={handlePointerEnter}
                onPointerDown={handlePointerDown}
                onKeyDown={handleKeyboardActivation}
                className={cx(
                  styles["mbento-card"],
                  enableBorderGlow && styles["mbento-card-glow"],
                  canRunPointerEffects && styles["mbento-card-motion"],
                  !canRunPointerEffects && styles["mbento-card-lite"],
                )}
                style={
                  {
                    transformStyle: enableTilt || enableMagnetism ? "preserve-3d" : "flat",
                  } as CSSProperties
                }
              >
                <div className={styles["mbento-card-ambient"]} aria-hidden />
                <div className={styles["mbento-card-hover"]} aria-hidden />

                <div className={styles["mbento-card-inner"]}>
                  <div className={styles["mbento-card-top"]}>
                    {item.label ? <span className={styles["mbento-card-label"]}>{item.label}</span> : <span />}
                    {item.icon && <span className={styles["mbento-card-icon"]}>{item.icon}</span>}
                  </div>

                  <div className={styles["mbento-card-content"]}>
                    <h3 className={styles["mbento-card-title"]}>{item.title}</h3>
                    <p className={cx(styles["mbento-card-description"], descriptionClampClass)}>{item.description}</p>
                  </div>
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
