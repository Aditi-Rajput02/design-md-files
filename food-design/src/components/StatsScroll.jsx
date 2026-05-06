import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const BASE = 'https://images.pexels.com/photos'
const q    = '?auto=compress&cs=tinysrgb'

const STATS = [
  {
    number: '2,400+',
    title: 'Pieces\nCreated',
    desc: 'Every piece handcrafted with devotion — each one a story told in gold.',
    image: `${BASE}/10474333/pexels-photo-10474333.jpeg${q}&w=1600&h=900&dpr=1`,
  },
  {
    number: '15+',
    title: 'Years of\nCraft',
    desc: 'Over a decade of mastering the art of fine jewellery.',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
  },
  {
    number: '500+',
    title: 'Bridal\nMoments',
    desc: 'Designed for unforgettable wedding stories.',
    image: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg',
  },
  {
    number: '10,000+',
    title: 'Happy\nClients',
    desc: 'Trusted by thousands across generations.',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
  },
]

const STEP = 120

export default function StatsScroll() {
  const sectionRef  = useRef(null)
  const numRef      = useRef(null)
  const titleRef    = useRef(null)
  const descRef     = useRef(null)
  const imgRef      = useRef(null)
  const ghostColRef = useRef(null)   // the ghost column div
  const progressRef = useRef(null)
  const dotsRef     = useRef([])
  const activeRef   = useRef(0)

  // Build ghost column content for a given index
  const updateGhostCol = (i) => {
    const col = ghostColRef.current
    if (!col) return
    const prev = STATS[i - 1]?.number ?? ''
    const curr = STATS[i].number
    const next = STATS[i + 1]?.number ?? ''
    col.innerHTML = [prev, curr, next]
      .filter(Boolean)
      .map(n => `<span class="ss-ghost">${n}</span>`)
      .join('')
  }

  const setContent = (i, animate = true) => {
    const s     = STATS[i]
    const num   = numRef.current
    const title = titleRef.current
    const desc  = descRef.current
    const img   = imgRef.current
    if (!num) return

    if (animate) {
      gsap.to([title, num, desc], {
        y: -40, opacity: 0, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          num.textContent  = s.number
          title.innerHTML  = s.title.replace('\n', '<br/>')
          desc.textContent = s.desc

          // Swap image
          if (img) {
            gsap.to(img, {
              opacity: 0, duration: 0.2,
              onComplete: () => {
                img.src = s.image
                gsap.to(img, { opacity: 1, duration: 0.4 })
              },
            })
          }

          // Animate ghost column
          updateGhostCol(i)
          gsap.fromTo(ghostColRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          )

          gsap.fromTo(
            [title, num, desc],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.05 }
          )
        },
      })
      // Ghost slides out
      gsap.to(ghostColRef.current, { y: -60, opacity: 0, duration: 0.22, ease: 'power2.in' })
    } else {
      num.textContent  = s.number
      title.innerHTML  = s.title.replace('\n', '<br/>')
      desc.textContent = s.desc
      if (img) img.src = s.image
      updateGhostCol(i)
    }

    dotsRef.current.forEach((d, idx) => {
      if (!d) return
      d.classList.toggle('ss-dot--active', idx === i)
    })
    activeRef.current = i
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const total = STATS.length
    setContent(0, false)
    gsap.set([numRef.current, titleRef.current, descRef.current], { y: 0, opacity: 1 })
    gsap.set(ghostColRef.current, { y: 0, opacity: 1 })

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${(total - 1) * STEP}vh`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate(self) {
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }
        const rawIndex = self.progress * (total - 1)
        const newIndex = Math.min(Math.round(rawIndex), total - 1)
        if (newIndex !== activeRef.current) {
          setContent(newIndex, true)
        }
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <section ref={sectionRef} className="ss-section">

      {/* Top progress bar */}
      <div className="ss-progress-track">
        <div className="ss-progress-bar" ref={progressRef} />
      </div>

      {/* 3-column layout */}
      <div className="ss-layout">

        {/* Left: big bold title */}
        <div className="ss-left">
          <h2 className="ss-title" ref={titleRef} />
        </div>

        {/* Centre: ghost numbers behind + tilted card */}
        <div className="ss-centre">
          {/* Ghost numbers column (prev / current / next) */}
          <div className="ss-ghost-col" ref={ghostColRef} />

          {/* Tilted image card with accent number */}
          <div className="ss-card">
            <img
              ref={imgRef}
              className="ss-card-img"
              src={STATS[0].image}
              alt="stat visual"
            />
            <div className="ss-card-overlay" />
            <span className="ss-card-num" ref={numRef} />
          </div>
        </div>

        {/* Right: description */}
        <div className="ss-right">
          <p className="ss-desc" ref={descRef} />
        </div>

      </div>

      {/* Dot indicators */}
      <div className="ss-dots">
        {STATS.map((_, i) => (
          <span
            key={i}
            className="ss-dot"
            ref={el => (dotsRef.current[i] = el)}
          />
        ))}
      </div>

    </section>
  )
}
