path = r'c:\Users\Admin\Downloads\rag-complete-system\TestingDesignmdfile\food-design\src\App.jsx'

part3 = r"""
/* Hero */
function Hero() {
  const mountRef = useRef(null)
  const eyeRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const bottomRef = useRef(null)
  const scrollRef = useRef(null)
  useThreeBackground(mountRef)
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.to(eyeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(line1Ref.current, { y: 0, duration: 1, ease: 'power4.out' }, '-=0.4')
      .to(line2Ref.current, { y: 0, duration: 1, ease: 'power4.out' }, '-=0.75')
      .to(line3Ref.current, { y: 0, duration: 1, ease: 'power4.out' }, '-=0.75')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  }, [])
  return (
    <section className="hero" id="hero">
      <div className="hero__webgl" ref={mountRef} />
      <div className="hero__overlay" />
      <div className="hero__noise" />
      <div className="hero__content">
        <div className="hero__eyebrow" ref={eyeRef} style={{opacity:0,transform:'translateY(20px)'}}>
          Vicenza, Italy &mdash; Communications &amp; Design Agency
        </div>
        <h1 className="hero__title">
          <span className="line"><span ref={line1Ref} style={{transform:'translateY(110%)',display:'block'}}>We are Studio375,</span></span>
          <span className="line"><span ref={line2Ref} style={{transform:'translateY(110%)',display:'block'}}><em>communications,</em> graphic</span></span>
          <span className="line"><span ref={line3Ref} style={{transform:'translateY(110%)',display:'block'}}>design &amp; <span className="dim">web agency</span></span></span>
        </h1>
        <div className="hero__bottom" ref={bottomRef} style={{opacity:0,transform:'translateY(30px)'}}>
          <p className="hero__desc">Based in Vicenza, we craft meaningful brand identities, digital products, and creative communications that connect people with ideas.</p>
          <div className="hero__actions">
            <a href="#work" className="btn-primary">
              View our work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#about" className="btn-ghost">
              About us
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="hero__scroll-hint" ref={scrollRef} style={{opacity:0}}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

/* Marquee */
function Marquee() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => <span key={i} className="marquee-item">{item}</span>)}
      </div>
    </div>
  )
}

/* About */
function About() {
  const secRef = useRef(null)
  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el.querySelectorAll('.reveal'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%' } })
    gsap.fromTo(el.querySelector('.reveal-right'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%' } })
  }, [])
  return (
    <section className="about" id="about" ref={secRef}>
      <div>
        <p className="about__label reveal">About us</p>
        <h2 className="about__title reveal">We believe design is <em>the language</em> of trust</h2>
        <p className="about__body reveal">Studio375 is a multidisciplinary creative agency based in Vicenza, Italy. We partner with ambitious brands to create visual identities, digital experiences, and communications that resonate deeply with their audiences.</p>
        <div className="about__stats reveal">
          <div><div className="about__stat-num">120+</div><div className="about__stat-lbl">Projects</div></div>
          <div><div className="about__stat-num">8+</div><div className="about__stat-lbl">Years</div></div>
          <div><div className="about__stat-num">40+</div><div className="about__stat-lbl">Clients</div></div>
        </div>
      </div>
      <div className="about__visual reveal-right">
        <div className="about__visual-inner">
          <div className="about__visual-ring">
            <div className="about__visual-ring2" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* Work */
function Work() {
  const secRef = useRef(null)
  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.work__header'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    gsap.fromTo(el.querySelectorAll('.work__item'), { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: el.querySelector('.work__grid'), start: 'top 80%' } })
  }, [])
  const gradients = [
    'linear-gradient(135deg,#0a0a1a 0%,#0d1a2a 100%)',
    'linear-gradient(135deg,#0d0d0d 0%,#1a0d0d 100%)',
    'linear-gradient(135deg,#0a0f1a 0%,#0a1a1a 100%)',
    'linear-gradient(135deg,#0f0a0a 0%,#1a0f0a 100%)',
    'linear-gradient(135deg,#0a0a0f 0%,#0f0a1a 100%)',
  ]
  return (
    <section className="work" id="work" ref={secRef}>
      <div className="work__header">
        <div>
          <p className="work__label">Selected Work</p>
          <h2 className="work__title">Projects that define us</h2>
        </div>
        <a href="#" className="btn-ghost">
          View all
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
      <div className="work__grid">
        {PROJECTS.map((p, i) => (
          <div key={i} className="work__item">
            <div className="work__item-bg" style={{background: gradients[i]}} />
            <div className="work__item-overlay">
              <div className="work__item-info">
                <div className="work__item-cat">{p.cat}</div>
                <div className="work__item-name">{p.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Services */
function Services() {
  const secRef = useRef(null)
  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.services__header'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    gsap.fromTo(el.querySelectorAll('.service-card'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el.querySelector('.services__grid'), start: 'top 80%' } })
  }, [])
  return (
    <section className="services" id="services" ref={secRef}>
      <div className="services__header">
        <p className="services__label">What we do</p>
        <h2 className="services__title">Full-spectrum creative services</h2>
      </div>
      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <div key={i} className="service-card">
            <div className="service-card__num">{s.num}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>
            <div className="service-card__arrow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Footer */
function Footer() {
  const secRef = useRef(null)
  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
  }, [])
  return (
    <footer className="footer" id="contact" ref={secRef}>
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo"><span className="footer__logo-dot" />Studio375</div>
          <p className="footer__tagline">A multidisciplinary creative agency crafting meaningful brand experiences from Vicenza, Italy.</p>
        </div>
        <div className="footer__links">
          <div className="footer__col"><h4>Studio</h4><ul><li><a href="#about">About</a></li><li><a href="#work">Work</a></li><li><a href="#services">Services</a></li></ul></div>
          <div className="footer__col"><h4>Services</h4><ul><li><a href="#">Branding</a></li><li><a href="#">Web Design</a></li><li><a href="#">Motion</a></li></ul></div>
          <div className="footer__col"><h4>Contact</h4><ul><li><a href="mailto:hello@studio375.it">hello@studio375.it</a></li><li><a href="#">+39 0444 000 000</a></li><li><a href="#">Vicenza, Italy</a></li></ul></div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">&copy; 2025 Studio375. All rights reserved.</p>
        <div className="footer__socials">
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">Behance</a>
        </div>
      </div>
    </footer>
  )
}

/* Main App */
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
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
"""

# Read current file, find the start of new content (our imports line)
# and rewrite from scratch
full = """import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import * as THREE from 'three'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_ITEMS = ['Communications','Graphic Design','Web Agency','Brand Identity','UI/UX Design','Creative Direction','Motion Design','Communications','Graphic Design','Web Agency','Brand Identity','UI/UX Design','Creative Direction','Motion Design']

const PROJECTS = [
  { cat: 'Brand Identity', name: 'Lumina Studio' },
  { cat: 'Web Design', name: 'Forma Agency' },
  { cat: 'Motion', name: 'Pulse Creative' },
  { cat: 'UI/UX', name: 'Orbit Platform' },
  { cat: 'Branding', name: 'Vela Studio' },
]

const SERVICES = [
  { num: '01', title: 'Brand Identity', desc: 'We craft distinctive visual identities that communicate your brand values with clarity and impact.' },
  { num: '02', title: 'Web Design & Dev', desc: 'Premium digital experiences built with performance, accessibility, and motion at the core.' },
  { num: '03', title: 'Motion & Film', desc: 'Cinematic storytelling through animation, video production, and interactive media.' },
  { num: '04', title: 'Creative Direction', desc: 'Strategic creative leadership that aligns your visual language with business objectives.' },
  { num: '05', title: 'UI/UX Design', desc: 'Human-centered interfaces that balance beauty with intuitive, frictionless interaction.' },
  { num: '06', title: 'Communications', desc: 'Integrated communication strategies that build lasting connections with your audience.' },
]
""" + part3

with open(path, 'w', encoding='utf-8') as f:
    f.write(full)

print('App.jsx fully rewritten successfully')
