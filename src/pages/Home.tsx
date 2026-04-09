/**
 * Home — main portfolio page composed of section components.
 *
 * Each section is a self-contained component that imports its own
 * data and renders via reusable UI primitives.
 */
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Whitepapers from '../components/sections/Whitepapers'
import Certifications from '../components/sections/Certifications'
import Technologies from '../components/sections/Technologies'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <Whitepapers />
      <Certifications />
      <Technologies />
      <Contact />
    </div>
  )
}
