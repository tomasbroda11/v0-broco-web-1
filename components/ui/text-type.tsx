"use client"

import { gsap } from "gsap"
import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react"

type AnimationPhase = "idle" | "typing" | "pausing" | "deleting"

export interface TextTypeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  text: string | string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  showCursor?: boolean
  cursorCharacter?: string
  startOnVisible?: boolean
}

export function TextType({
  text,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1200,
  showCursor = true,
  cursorCharacter = "|",
  startOnVisible = false,
  className,
  ...props
}: TextTypeProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<number | null>(null)

  const textItems = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [canAnimate, setCanAnimate] = useState(!startOnVisible)
  const [phase, setPhase] = useState<AnimationPhase>(startOnVisible ? "idle" : "typing")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const currentText = textItems[textIndex] ?? ""
  const renderedText = prefersReducedMotion ? textItems[0] ?? "" : currentText.slice(0, charIndex)

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setPrefersReducedMotion(media.matches)
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    setTextIndex(0)
    setCharIndex(0)
    setCanAnimate(!startOnVisible)
    setPhase(startOnVisible ? "idle" : "typing")
  }, [textItems, startOnVisible])

  useEffect(() => {
    if (!startOnVisible || prefersReducedMotion || canAnimate) return
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCanAnimate(true)
          setPhase("typing")
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [startOnVisible, canAnimate, prefersReducedMotion])

  useEffect(() => {
    if (!showCursor || prefersReducedMotion || !cursorRef.current) return
    const blinkTween = gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.55,
      ease: "power1.inOut",
    })

    return () => {
      blinkTween.kill()
      gsap.set(cursorRef.current, { opacity: 1 })
    }
  }, [showCursor, prefersReducedMotion])

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (prefersReducedMotion || !canAnimate || phase === "idle" || textItems.length === 0) return

    if (phase === "typing") {
      if (charIndex < currentText.length) {
        timerRef.current = window.setTimeout(() => setCharIndex((value) => value + 1), typingSpeed)
      } else {
        setPhase("pausing")
      }
    }

    if (phase === "pausing") {
      timerRef.current = window.setTimeout(() => setPhase("deleting"), pauseDuration)
    }

    if (phase === "deleting") {
      if (charIndex > 0) {
        timerRef.current = window.setTimeout(() => setCharIndex((value) => value - 1), deletingSpeed)
      } else {
        setTextIndex((value) => (value + 1) % textItems.length)
        setPhase("typing")
      }
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [
    canAnimate,
    charIndex,
    currentText.length,
    deletingSpeed,
    pauseDuration,
    phase,
    prefersReducedMotion,
    textItems.length,
    typingSpeed,
  ])

  return (
    <span ref={containerRef} className={className} {...props}>
      <span>{renderedText}</span>
      {showCursor && <span ref={cursorRef} aria-hidden>{cursorCharacter}</span>}
    </span>
  )
}

export default TextType
