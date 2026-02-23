"use client"

import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

export interface IndustryMagicBentoItem {
  title: string
  description: string
  icon: ReactNode
  accent?: "violet" | "blue"
}

interface IndustryMagicBentoProps {
  items: IndustryMagicBentoItem[]
  className?: string
}

const accentClasses: Record<NonNullable<IndustryMagicBentoItem["accent"]>, string> = {
  violet: "from-[#7F5AF0]/25 to-[#3E6FA8]/15 text-[#B7A0FF]",
  blue: "from-[#3E6FA8]/25 to-[#7F5AF0]/15 text-[#9AC6FF]",
}

function handleCardPointerMove(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return

  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  event.currentTarget.style.setProperty("--spot-x", `${x}px`)
  event.currentTarget.style.setProperty("--spot-y", `${y}px`)
}

function handleCardPointerLeave(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--spot-x", "50%")
  event.currentTarget.style.setProperty("--spot-y", "35%")
}

export function IndustryMagicBento({ items, className }: IndustryMagicBentoProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className ?? ""}`}>
      {items.map((item) => {
        const accent = item.accent ? accentClasses[item.accent] : accentClasses.violet

        return (
          <motion.article
            key={item.title}
            tabIndex={0}
            onPointerMove={handleCardPointerMove}
            onPointerLeave={handleCardPointerLeave}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-colors duration-300 hover:border-white/20 focus-visible:border-white/25"
            style={{ "--spot-x": "50%", "--spot-y": "35%" } as CSSProperties}
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
            whileFocus={reduceMotion ? undefined : { y: -2, scale: 1.005 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{
                background:
                  "radial-gradient(240px circle at var(--spot-x) var(--spot-y), rgba(127,90,240,0.18), rgba(62,111,168,0.12) 30%, rgba(255,255,255,0.04) 55%, transparent 72%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_40%)] opacity-65" />

            <div className="relative z-10 flex items-start gap-3.5">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-gradient-to-br ${accent} transition-all duration-300 group-hover:border-white/25 group-focus-visible:border-white/25 group-hover:shadow-[0_8px_20px_rgba(127,90,240,0.18)]`}
              >
                {item.icon}
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-white leading-snug transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300 group-focus-visible:text-gray-300">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}

