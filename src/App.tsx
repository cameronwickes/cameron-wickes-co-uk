/**
 * App — root component handling boot sequence, routing, and theme.
 *
 * Shows a terminal boot animation on first visit (with 1-hour cooldown),
 * then renders the main site with navigation and theme switcher.
 *
 * Boot sequence visibility is controlled via a localStorage timestamp.
 * The fade-out transition bridges the boot animation and main content.
 */
import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme/ThemeProvider'
import ThemeSwitcher from './components/theme/ThemeSwitcher'
import BootSequence from './components/effects/BootSequence'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'

/** Lazy-loaded blog post page — keeps markdown deps out of the main bundle. */
const BlogPost = lazy(() => import('./pages/BlogPost'))

/** How long before the boot animation plays again. */
const BOOT_COOLDOWN_MS = 1000 * 60 * 60 // 1 hour

/** Delay before fade-out begins / completes (ms). */
const FADE_START = 2200
const FADE_END = 2500

/** Check if the boot sequence should play based on last visit timestamp. */
function shouldShowBoot(): boolean {
  const visited = localStorage.getItem('cw:last-visit')
  return !visited || Date.now() - Number(visited) >= BOOT_COOLDOWN_MS
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowBoot)
  const [fading, setFading] = useState(false)

  // Manage boot sequence timing and localStorage persistence.
  useEffect(() => {
    if (!loading) return
    localStorage.setItem('cw:last-visit', String(Date.now()))
    const fadeTimer = setTimeout(() => setFading(true), FADE_START)
    const doneTimer = setTimeout(() => setLoading(false), FADE_END)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [loading])

  return (
    <ThemeProvider>
      {/* Boot sequence with fade-out transition */}
      {loading && (
        <div className={`transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}>
          <BootSequence />
        </div>
      )}

      {/* Main application */}
      {!loading && (
        <BrowserRouter>
          <Navbar />
          <div className="min-h-screen flex flex-col relative animate-fade-in-up">
            <main className="flex-1 pt-14">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/blog/:slug"
                  element={
                    <Suspense fallback={<div className="min-h-screen" />}>
                      <BlogPost />
                    </Suspense>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <ThemeSwitcher />
        </BrowserRouter>
      )}
    </ThemeProvider>
  )
}
