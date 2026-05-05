import { useEffect, useRef } from 'react'

export default function Scrollbar() {
  const thumbRef = useRef(null)

  useEffect(() => {
    const thumb = thumbRef.current
    const update = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const pct = total > 0 ? scrolled / total : 0
      const trackH = window.innerHeight
      const thumbH = Math.max(40, trackH * (window.innerHeight / document.body.scrollHeight))
      if (thumb) {
        thumb.style.height = thumbH + 'px'
        thumb.style.top = pct * (trackH - thumbH) + 'px'
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="scrollbar-track">
      <div className="scrollbar-thumb" ref={thumbRef} />
    </div>
  )
}
