import { useState } from 'react'

const BASE = 'https://images.pexels.com/photos'
const q    = '?auto=compress&cs=tinysrgb'

const SERVICES = [
  {
    id: 'bespoke',
    title: 'Bespoke Design',
    category: 'Custom Design, Consultation',
    tagline: 'Work one-on-one with our master goldsmiths to create a completely unique piece tailored to your vision.',
    bgImg: `${BASE}/10474333/pexels-photo-10474333.jpeg${q}&w=1600&h=900&dpr=1`,
    mockImg: `${BASE}/8706570/pexels-photo-8706570.jpeg${q}&w=640&h=480&dpr=1`,
  },
  {
    id: 'bridal',
    title: 'Bridal Collections',
    category: 'Bridal, Fine Jewellery',
    tagline: 'Timeless engagement rings and wedding bands crafted to celebrate your most precious moments.',
    bgImg: `${BASE}/168927/pexels-photo-168927.jpeg${q}&w=1600&h=900&dpr=1`,
    mockImg: `${BASE}/230290/pexels-photo-230290.jpeg${q}&w=640&h=480&dpr=1`,
  },
  {
    id: 'pendants',
    title: 'Fine Pendants',
    category: 'Necklaces, Gemstones',
    tagline: 'Exquisite necklaces and pendants in gold, platinum, and rose gold set with rare gemstones.',
    bgImg: `${BASE}/7407595/pexels-photo-7407595.png${q}&w=1600&h=900&dpr=1`,
    mockImg: `${BASE}/39239/pendulum-cone-chain-gold-39239.jpeg${q}&w=640&h=480&dpr=1`,
  },
  {
    id: 'rings',
    title: 'Diamond Rings',
    category: 'Solitaires, Diamond',
    tagline: 'From solitaires to cluster bands — every ring is a masterpiece of precision and artistry.',
    bgImg: `${BASE}/2735981/pexels-photo-2735981.jpeg${q}&w=1600&h=900&dpr=1`,
    mockImg: `${BASE}/14058109/pexels-photo-14058109.jpeg${q}&w=640&h=480&dpr=1`,
  },
  {
    id: 'earrings',
    title: 'Gemstone Earrings',
    category: 'Earrings, Gemstones',
    tagline: 'Handcrafted drop, stud, and hoop earrings featuring diamonds, sapphires, emeralds, and more.',
    bgImg: `${BASE}/9649265/pexels-photo-9649265.jpeg${q}&w=1600&h=900&dpr=1`,
    mockImg: `${BASE}/17298688/pexels-photo-17298688.jpeg${q}&w=640&h=480&dpr=1`,
  },
  {
    id: 'care',
    title: 'Jewellery Care',
    category: 'Restoration, Cleaning',
    tagline: 'Expert cleaning, resizing, and restoration services to keep your treasured pieces radiant forever.',
    bgImg: `${BASE}/20858959/pexels-photo-20858959.jpeg${q}&w=1600&h=900&dpr=1`,
    mockImg: `${BASE}/29228980/pexels-photo-29228980.jpeg${q}&w=640&h=480&dpr=1`,
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const svc = SERVICES[active]

  return (
    <section className="portfolio" id="services">

      {/* ── Left sidebar ── */}
      <nav className="portfolio__sidebar">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            className={`portfolio__nav-btn${i === active ? ' portfolio__nav-btn--active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            {s.title}
          </button>
        ))}
        <button className="portfolio__nav-btn portfolio__nav-btn--all">
          All Services
        </button>
      </nav>

      {/* ── Main stage ── */}
      <div className="portfolio__stage">

        {/* Background image — cross-fades via opacity key trick */}
        {SERVICES.map((s, i) => (
          <div
            key={s.id}
            className="portfolio__bg"
            style={{
              backgroundImage: `url(${s.bgImg})`,
              opacity: i === active ? 1 : 0,
            }}
          />
        ))}

        {/* Dark scrim over BG */}
        <div className="portfolio__scrim" />

        {/* Top-center tagline — slides in from LEFT */}
        <p key={`tag-${svc.id}`} className="portfolio__tagline">{svc.tagline}</p>

        {/* Top-right phone mockup — slides in from RIGHT */}
        <div key={`mock-${svc.id}`} className="portfolio__mockup">
          <div className="portfolio__phone">
            <div className="portfolio__phone-notch" />
            <div className="portfolio__phone-screen">
              <img
                src={svc.mockImg}
                alt={svc.title}
                className="portfolio__phone-img"
              />
            </div>
          </div>
        </div>

        {/* Bottom-left big serif title — slides in from LEFT */}
        <h2 key={`title-${svc.id}`} className="portfolio__big-title">{svc.title}</h2>

        {/* Bottom-right category — slides in from RIGHT */}
        <div key={`meta-${svc.id}`} className="portfolio__meta">
          <p className="portfolio__category">{svc.category}</p>
        </div>

      </div>
    </section>
  )
}
