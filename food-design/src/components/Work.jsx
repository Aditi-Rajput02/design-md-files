import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../data/product.js'
gsap.registerPlugin(ScrollTrigger)

/** Pick `n` random items from an array */
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export default function Work() {
  const secRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

  // Pick diverse products across all types, randomised on mount
  const featured = useMemo(() => {
    const pendants = pickRandom(products.filter(p => p.type === 'PENDANT'), 4)
    const rings    = pickRandom(products.filter(p => p.type === 'RING'),    4)
    const earrings = pickRandom(products.filter(p => p.type === 'EARRINGS'), 1)
    // Combine and shuffle to get 9 diverse items
    const pool = [...pendants, ...rings, ...earrings]
    return pickRandom(pool, Math.min(9, pool.length))
  }, [])

  // Pad to multiple of 3 if needed, split into rows of 3
  const padded = [...featured]
  while (padded.length % 3 !== 0) padded.pop()
  const rows = []
  for (let i = 0; i < padded.length; i += 3) {
    rows.push(padded.slice(i, i + 3))
  }

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.work__header'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' } })
    gsap.fromTo(el.querySelectorAll('.work__item'),
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el.querySelector('.work__grid'), start: 'top 80%' } })
  }, [])

  const renderItem = (p) => {
    const isActive = hoveredId === p.id
    return (
      <div
        key={p.id}
        className={`work__item${isActive ? ' work__item--active' : ''}`}
        onMouseEnter={() => setHoveredId(p.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
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
    )
  }

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
        {rows.map((row, i) => {
          const rowExpanded = row.some(p => p.id === hoveredId)
          return (
            <div key={i} className={`work__row${rowExpanded ? ' work__row--expanded' : ''}`}>
              {row.map(renderItem)}
            </div>
          )
        })}
      </div>
    </section>
  )
}
