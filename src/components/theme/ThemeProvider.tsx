/**
 * ThemeProvider — manages colour theme state and applies CSS variables.
 * Persists the selected theme to localStorage.
 */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { THEMES, type Theme } from '../../static/data/themes'

export { THEMES, type Theme }

const STORAGE_KEY = 'cw:theme'

/** Maps theme properties to their corresponding CSS custom property names. */
const CSS_VAR_MAP: Record<string, string> = {
  bg: '--color-terminal-bg',
  surface: '--color-terminal-surface',
  border: '--color-terminal-border',
  primary: '--color-terminal-green',
  secondary: '--color-terminal-cyan',
  accent: '--color-terminal-purple',
  text: '--color-terminal-text',
  dim: '--color-terminal-dim',
  red: '--color-terminal-red',
  amber: '--color-terminal-amber',
}

/** Apply a theme's colours as CSS custom properties on the document root. */
function applyTheme(theme: Theme) {
  const root = document.documentElement
  for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
    root.style.setProperty(cssVar, theme[key as keyof Theme])
  }
}

/** Retrieve the saved theme from localStorage, falling back to the first theme. */
function getSavedTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY)
  return THEMES.find((t) => t.name === saved) ?? THEMES[0]
}

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (t: Theme) => void
}>({
  theme: THEMES[0],
  setTheme: () => {},
})

/** Hook to access the current theme and setter. */
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getSavedTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme.name)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
