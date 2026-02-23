export type ProjectCategory =
  | "Automatización"
  | "Desarrollo a Medida"
  | "ERP / Cloud"
  | "Desarrollo Web"
  | "Producto Propio"

const MONO_BADGE_STYLE =
  "border-white/20 bg-white/[0.045] text-white/90 shadow-[0_0_14px_rgba(255,255,255,0.08)] hover:border-white/35 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.14)]"

const CATEGORY_BADGE_STYLES: Record<ProjectCategory, string> = {
  "Automatización": MONO_BADGE_STYLE,
  "Desarrollo a Medida": MONO_BADGE_STYLE,
  "ERP / Cloud": MONO_BADGE_STYLE,
  "Desarrollo Web": MONO_BADGE_STYLE,
  "Producto Propio": MONO_BADGE_STYLE,
}

export function getCategoryBadgeClass(category: ProjectCategory): string {
  return CATEGORY_BADGE_STYLES[category]
}
