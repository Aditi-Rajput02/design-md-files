import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import heroBg from '../assets/Recording 2026-05-04 190826.mp4'

export default function Hero() {
  const eyeRef    = useRef(null)
  const line1Ref  = useRef(null)
  const line2Ref  = useRef(null)
  const line3Ref  = useRef(null)
  const bottomRef = useRef(null)
  const scrollRef = useRef(null)
  const heroRef   = useRef(null)
  const spotRef   = useRef(null)

  const [isHovering, setIsHovering] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const raf   = useRef(null)

  /* ── GSAP entrance ── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.to(eyeRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(line1Ref.current,  { y: 0, duration: 1,   ease: 'power4.out' }, '-=0.4')
      .to(line2Ref.current,  { y: 0, duration: 1,   ease: 'power4.out' }, '-=0.75')
      .to(line3Ref.current,  { y: 0, duration: 1,   ease: 'power4.out' }, '-=0.75')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  }, [])

  /* ── Blur spotlight mouse tracking ── */
  useEffect(() => {
    const hero = heroRef.current
    const spot = spotRef.current
    if (!hero || !spot) return

    let curX = 0, curY = 0

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }

    const onEnter = () => {
      setIsHovering(true)
      // tell Cursor component to hide ring
      document.body.classList.add('hero-hover')
    }

    const onLeave = () => {
      setIsHovering(false)
      document.body.classList.remove('hero-hover')
      gsap.to(spot, { opacity: 0, duration: 0.4 })
    }

    const loop = () => {
      curX += (mouse.current.x - curX) * 0.1
      curY += (mouse.current.y - curY) * 0.1
      spot.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(loop)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseenter', onEnter)
    hero.addEventListener('mouseleave', onLeave)
    raf.current = requestAnimationFrame(loop)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseenter', onEnter)
      hero.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
      document.body.classList.remove('hero-hover')
    }
  }, [])

  /* show spotlight when hovering */
  useEffect(() => {
    if (spotRef.current) {
      gsap.to(spotRef.current, { opacity: isHovering ? 1 : 0, duration: 0.4 })
    }
  }, [isHovering])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Video background */}
      <video
        className="hero__video"
        src={heroBg}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Blur spotlight that follows mouse */}
      <div className="hero__blur-spot" ref={spotRef} style={{ opacity: 0 }} />

      <div className="hero__overlay" />
      <div className="hero__noise" />

      <div className="hero__content">
        <div
          className="hero__eyebrow"
          ref={eyeRef}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          Vicenza, Italy &mdash; Communications &amp; Design Agency
        </div>

        {/* <h1 className="hero__title">
          <span className="line">
            <span ref={line1Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              We are Studio375,
            </span>
          </span>
          <span className="line">
            <span ref={line2Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              <em>communications,</em> graphic
            </span>
          </span>
          <span className="line">
            <span ref={line3Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              design &amp; <span className="dim">web agency</span>
            </span>
          </span>
        </h1> */}

        <div
          className="hero__bottom"
          ref={bottomRef}
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <p className="hero__desc">
            Based in Vicenza, we craft meaningful brand identities, digital products,
            and creative communications that connect people with ideas.
          </p>
          <div className="hero__actions">
            <a href="#work" className="btn-primary">
              View our work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#about" className="btn-ghost">
              About us
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" ref={scrollRef} style={{ opacity: 0 }}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
