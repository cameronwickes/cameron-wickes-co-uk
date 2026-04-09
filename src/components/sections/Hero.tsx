/**
 * Hero — full-screen landing section with animated name, particles, and CTAs.
 *
 * Features a canvas particle system, glitch text reveal for the name,
 * gradient background orbs, a status badge, tagline, navigation buttons,
 * and a scroll indicator. All content is driven by HERO profile data.
 */
import { Link } from 'react-router-dom'
import ScrollReveal from '../effects/ScrollReveal'
import HeroParticles from '../effects/HeroParticles'
import GlitchText from '../effects/GlitchText'
import { HERO } from '../../static/data/profile'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <HeroParticles />

      {/* Background gradient orbs for depth */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-terminal-green/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 -right-48 w-[500px] h-[500px] bg-terminal-cyan/6 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Status badge */}
        <ScrollReveal>
          <div className="inline-block mb-4 px-4 py-1.5 border border-terminal-border/50 rounded-full text-xs text-terminal-dim backdrop-blur-sm">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-terminal-green mr-2 animate-pulse" />
            {HERO.badge}
          </div>
        </ScrollReveal>

        {/* Name with glitch reveal */}
        <ScrollReveal delay={150}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
            <GlitchText text={HERO.firstName} className="block text-terminal-text" />
            <GlitchText
              text={HERO.lastName}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-terminal-green via-terminal-cyan to-terminal-green"
            />
          </h1>
        </ScrollReveal>

        {/* Tagline */}
        <ScrollReveal delay={400}>
          <p className="text-sm text-terminal-dim max-w-lg mx-auto mb-12 tracking-widest">{HERO.tagline}</p>
        </ScrollReveal>

        {/* Call-to-action buttons */}
        <ScrollReveal delay={500}>
          <div className="flex items-center justify-center gap-4 mb-16">
            <a
              href="#about"
              className="px-7 py-3.5 border border-terminal-border text-terminal-text text-sm rounded-lg hover:border-terminal-green/50 hover:text-terminal-green transition-all duration-300"
            >
              About Me
            </a>
            <Link
              to="/blog"
              className="group px-7 py-3.5 bg-terminal-green text-terminal-bg font-semibold text-sm rounded-lg hover:shadow-[0_0_30px_rgba(0,255,159,0.3)] transition-all duration-300"
            >
              Read my Blog
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal delay={900}>
          <div className="flex justify-center">
            <div className="w-5 h-8 border border-terminal-border/50 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-terminal-dim/50 rounded-full animate-bounce" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
