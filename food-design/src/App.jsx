import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor      from './components/Cursor'
import Scrollbar   from './components/Scrollbar'
import Navbar      from './components/Navbar'
import Hero        from './components/HeroGL'
import Collections from './components/Collections'
import Marquee     from './components/Marquee'
import About       from './components/About'
import StatsScroll from './components/StatsScroll'
import Work        from './components/Work'
import Services    from './components/Services'
import Footer      from './components/Footer'

import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, syncTouch: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Cursor />
      <Scrollbar />
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <Marquee />
        <About />
        <StatsScroll />
        <Work />
        <Services />
        <Footer />
      </main>
    </>
  )
}
