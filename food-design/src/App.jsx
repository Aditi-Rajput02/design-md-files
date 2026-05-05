import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor    from './components/Cursor'
import Scrollbar from './components/Scrollbar'
import Navbar    from './components/Navbar'
import Hero      from './components/HeroGL'
import Marquee   from './components/Marquee'
import About     from './components/About'
import Work      from './components/Work'
import Services  from './components/Services'
import Footer    from './components/Footer'

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
        <Marquee />
        <About />
        <Work />
        <Services />
        <Footer />
      </main>
    </>
  )
}
