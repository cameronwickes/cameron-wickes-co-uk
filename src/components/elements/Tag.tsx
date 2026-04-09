/**
 * Tag — small coloured pill label for metadata display.
 *
 * Two variants: green (default, for categories) and cyan (for reading time, dates).
 */

type TagVariant = 'green' | 'cyan'

/** Tailwind classes per variant. */
const VARIANTS: Record<TagVariant, string> = {
  green: 'bg-terminal-green/10 text-terminal-green border-terminal-green/20',
  cyan: 'bg-terminal-cyan/10 text-terminal-cyan border-terminal-cyan/20',
}

export default function Tag({ children, variant = 'green' }: { children: React.ReactNode; variant?: TagVariant }) {
  return <span className={`text-[10px] px-2 py-0.5 rounded border ${VARIANTS[variant]}`}>{children}</span>
}
