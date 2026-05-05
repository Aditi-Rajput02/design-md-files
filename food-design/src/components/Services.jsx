import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { num: '01', title: 'Bespoke Design',      desc: 'Work one-on-one with our master goldsmiths to create a completely unique piece tailored to your vision.' },
  { num: '02', title: 'Bridal Collections',  desc: 'Timeless engagement rings and wedding bands crafted to celebrate your most precious moments.' },
  { num: '03', title: 'Fine Pendants',       desc: 'Exquisite necklaces and pendants in gold, platinum, and rose gold set with rare gemstones.' },
  { num: '04', title: 'Diamond Rings',       desc: 'From solitaires to cluster bands — every ring is a masterpiece of precision and artistry.' },
  { num: '05', title: 'Gemstone Earrings',   desc: 'Handcrafted drop, stud, and hoop earrings featuring diamonds, sapphires, emeralds, and more.' },
  { num: '06', title: 'Jewellery Care',      desc: 'Expert cleaning, resizing, and restoration services to keep your treasured pieces radiant forever.' },
]

export default function Services() {
  const secRef = useRef(null)

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.services__header'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    gsap.fromTo(el.querySelectorAll('.service-card'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el.querySelector('.services__grid'), start: 'top 80%' } })
  }, [])

  return (
    <section className="services" id="services" ref={secRef}>
      <div className="services__header">
        <p className="services__label">Our Expertise</p>
        <h2 className="services__title">Crafted with passion, worn with pride</h2>
      </div>
      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <div key={i} className="service-card">
            <div className="service-card__num">{s.num}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>
            <div className="service-card__arrow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
