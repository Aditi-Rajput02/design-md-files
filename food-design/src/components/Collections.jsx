import { useRef } from 'react'
import bridalVideo from '../assets/bridalVideo.mp4'
import minimalVideo from "../assets/Minimal-jewerllery.mp4"
import gemVideo from "../assets/gemstone.mp4";
import kundanVideo from "../assets/kundanVideo.mp4"
const COLLECTIONS = [
  {
    num: '01',
    title: 'Bridal',
    subtitle: 'Rings, Necklaces, Earrings, Bangles',
    desc: 'Timeless pieces crafted for your most precious moments — from engagement rings to wedding bands, each one a promise in gold.',
    cta: 'Explore Bridal',
    bg: '#f5f0e8',
    textColor: '#1a1a1a',
    accentColor: '#c9a96e',
    imgBg: 'linear-gradient(135deg, #e8d5b7 0%, #c9a96e 100%)',
    videoUrl: bridalVideo,
  },
  {
    num: '02',
    title: 'Heritage',
    subtitle: 'Antique, Temple, Kundan, Polki',
    desc: 'Inspired by ancient motifs and royal craftsmanship, reimagined for the modern connoisseur who values tradition.',
    cta: 'Explore Heritage',
    bg: '#e8f4f0',
    textColor: '#1a1a1a',
    accentColor: '#2a9d8f',
    imgBg: 'linear-gradient(135deg, #a8d8d0 0%, #2a9d8f 100%)',
    videoUrl: kundanVideo,
  },
  {
    num: '03',
    title: 'Celestial',
    subtitle: 'Diamond, Gemstone, Star, Moon',
    desc: 'Star-born designs set with rare gemstones — each piece a constellation of artistry and light, worn close to the heart.',
    cta: 'Explore Celestial',
    bg: '#f0e8f5',
    textColor: '#1a1a1a',
    accentColor: '#9b5de5',
    imgBg: 'linear-gradient(135deg, #d4b8f0 0%, #9b5de5 100%)',
    videoUrl: gemVideo,
  },
  {
    num: '04',
    title: 'Minimal',
    subtitle: 'Gold, Silver, Platinum, Rose Gold',
    desc: 'Clean lines, pure gold, understated elegance. For those who believe less is always more — refined simplicity at its finest.',
    cta: 'Explore Minimal',
    bg: '#e8eef5',
    textColor: '#1a1a1a',
    accentColor: '#264653',
    imgBg: 'linear-gradient(135deg, #b8ccd8 0%, #264653 100%)',
    videoUrl: minimalVideo,
  },
]

export default function Collections() {
  const sectionRef = useRef(null)

  return (
    <section className="coll-section" ref={sectionRef}>
      {COLLECTIONS.map((col, i) => (
        <div
          key={col.num}
          className="coll-card"
          style={{
            '--card-bg': col.bg,
            '--card-text': col.textColor,
            '--card-accent': col.accentColor,
            '--card-img-bg': col.imgBg,
            '--card-index': i,
          }}
        >
          <div className="coll-card__inner">
            {/* Left side */}
            <div className="coll-card__left">
              <div className="coll-card__num">{col.num}</div>
              <div className="coll-card__body">
                <h2 className="coll-card__title">{col.title}</h2>
                <p className="coll-card__subtitle">{col.subtitle}</p>
                <p className="coll-card__desc">{col.desc}</p>
                <a href="#work" className="coll-card__cta">
                  <span>{col.cta}</span>
                  <div className="coll-card__cta-arrow">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Right side */}
            <div className="coll-card__right">
              <div className="coll-card__img">
                {col.videoUrl ? (
                  /* ── Cinematic luxury video ── */
                  <video
                    className="coll-card__video"
                    src={col.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                ) : (
                  /* ── Decorative placeholder for other cards ── */
                  <div className="coll-card__img-inner">
                    <div className="coll-card__ring coll-card__ring--1" />
                    <div className="coll-card__ring coll-card__ring--2" />
                    <div className="coll-card__ring coll-card__ring--3" />
                    <span className="coll-card__img-label">{col.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
