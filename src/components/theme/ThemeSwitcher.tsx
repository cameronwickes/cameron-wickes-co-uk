/**
 * ThemeSwitcher — floating button (bottom-right) that opens a theme picker.
 *
 * Displays a settings icon that toggles a dropdown of available themes.
 * Each theme shows a gradient colour swatch and name. Selection is
 * applied immediately via ThemeProvider.
 */
import { useState } from 'react'
import { THEMES, useTheme } from './ThemeProvider'
import SettingsIcon from '../icons/Settings'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className="relative">
        {/* Theme menu */}
        {open && (
          <div className="absolute bottom-12 right-0 bg-terminal-surface border border-terminal-border rounded-xl p-3 shadow-lg min-w-[160px] max-h-[400px] overflow-y-auto">
            <div className="text-[10px] text-terminal-dim mb-2 uppercase tracking-wider">Theme</div>
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => {
                  setTheme(t)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  theme.name === t.name
                    ? 'bg-terminal-green/10 text-terminal-green'
                    : 'text-terminal-dim hover:text-terminal-text hover:bg-terminal-border/30'
                }`}
              >
                {/* Colour swatch */}
                <span
                  className="w-3 h-3 rounded-full shrink-0 border border-white/10"
                  style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }}
                />
                {t.name}
              </button>
            ))}
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-terminal-surface border border-terminal-border flex items-center justify-center text-terminal-dim hover:text-terminal-green hover:border-terminal-green/50 transition-colors shadow-lg"
          aria-label="Switch theme"
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}
