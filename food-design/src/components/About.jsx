import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const secRef = useRef(null)

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.reveal'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' } }
    )
    gsap.fromTo(
      el.querySelector('.reveal-right'),
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%' } }
    )
  }, [])

  return (
    <section className="about" id="about" ref={secRef}>
      <div>
        <p className="about__label reveal">Our Heritage</p>
        <h2 className="about__title reveal">
          Jewellery born from <em>passion</em> and precision
        </h2>
        <p className="about__body reveal">
          Aurum was founded by master goldsmith Aryan Mehta in 2010. Every piece
          is handcrafted in our atelier using ethically sourced gold, platinum,
          and conflict-free gemstones — blending centuries-old techniques with
          contemporary design sensibility.
        </p>
        <div className="about__stats reveal">
          <div>
            <div className="about__stat-num">2,400+</div>
            <div className="about__stat-lbl">Pieces Created</div>
          </div>
          <div>
            <div className="about__stat-num">15+</div>
            <div className="about__stat-lbl">Years of Craft</div>
          </div>
          <div>
            <div className="about__stat-num">98%</div>
            <div className="about__stat-lbl">Client Satisfaction</div>
          </div>
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
