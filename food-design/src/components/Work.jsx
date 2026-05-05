import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../data/product.js'
gsap.registerPlugin(ScrollTrigger)

const FEATURED = products.slice(0, 6)

export default function Work() {
  const secRef = useRef(null)

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.work__header'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    gsap.fromTo(el.querySelectorAll('.work__item'),
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: el.querySelector('.work__grid'), start: 'top 80%' } })
  }, [])

  return (
    <section className="work" id="work" ref={secRef}>
      <div className="work__header">
        <div>
          <p className="work__label">Our Collections</p>
          <h2 className="work__title">Pieces that tell a story</h2>
        </div>
        <a href="#" className="btn-ghost">
          View all pieces
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <div className="work__grid">
        {FEATURED.map((p) => (
          <div key={p.id} className="work__item">
            <img
              src={p.image}
              alt={p.title}
              className="work__item-img"
              loading="lazy"
            />
            <div className="work__item-overlay">
              <div className="work__item-info">
                <div className="work__item-cat">{p.type}</div>
                <div className="work__item-name">{p.title}</div>
                <div className="work__item-price">${parseFloat(p.price).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
