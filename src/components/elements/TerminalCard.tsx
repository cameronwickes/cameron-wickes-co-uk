/**
 * TerminalCard — card styled as a macOS terminal window.
 *
 * Displays red/amber/green traffic light dots at the top with an
 * optional filename label. Content is rendered as children.
 */
import type { ReactNode } from 'react'

interface TerminalCardProps {
  /** Filename shown next to the traffic lights (e.g. "about.md"). */
  filename?: string
  /** Additional CSS classes for the outer container. */
  className?: string
  /** Card content. */
  children: ReactNode
}

export default function TerminalCard({ filename, className = '', children }: TerminalCardProps) {
  return (
    <div className={`bg-terminal-surface border border-terminal-border rounded-xl p-6 ${className}`}>
      {/* Traffic light dots */}
      <div className="flex items-center gap-2 mb-4 text-xs text-terminal-dim">
        <span className="w-3 h-3 rounded-full bg-terminal-red" />
        <span className="w-3 h-3 rounded-full bg-terminal-amber" />
        <span className="w-3 h-3 rounded-full bg-terminal-green" />
        {filename && <span className="ml-2">{filename}</span>}
      </div>
      {children}
    </div>
  )
}
