import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const secRef = useRef(null)

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
  }, [])

  return (
    <footer className="footer" id="contact" ref={secRef}>
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-dot" />
            Aurum
          </div>
          <p className="footer__tagline">
            Handcrafted fine jewellery — sculpted in gold, set with rare gemstones, made to last a lifetime.
          </p>
        </div>
        <div className="footer__links">
          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#work">Collections</a></li>
              <li><a href="#services">Craftsmanship</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Collections</h4>
            <ul>
              <li><a href="#">Rings</a></li>
              <li><a href="#">Pendants</a></li>
              <li><a href="#">Earrings</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@aurum.com">hello@aurum.com</a></li>
              <li><a href="#">+91 98765 43210</a></li>
              <li><a href="#">Mumbai, India</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">&copy; 2025 Aurum Fine Jewellery. All rights reserved.</p>
        <div className="footer__socials">
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
          <a href="#">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}
