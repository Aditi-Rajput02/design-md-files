import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    gsap.fromTo(nav, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 })
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="navbar" ref={navRef}>
      <a href="/" className="navbar__logo">
        <span className="navbar__logo-dot" />
        Aurum
      </a>
      <div className="navbar__links">
        <a href="#work">Collections</a>
        <a href="#services">Craftsmanship</a>
        <a href="#about">Our Story</a>
        <a href="#contact" className="navbar__cta">Book Appointment</a>
      </div>
    </nav>
  )
}
