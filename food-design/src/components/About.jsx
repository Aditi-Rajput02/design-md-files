import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { end: 2400, step: 100, suffix: '+', label: 'Pieces Created' },
  { end: 15,   step: 1,   suffix: '+', label: 'Years of Craft' },
  { end: 98,   step: 1,   suffix: '%', label: 'Client Satisfaction' },
]

function useCountUp(ref, end, step, suffix) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: end, duration: 3.9, ease: 'power2.out', paused: true,
      onUpdate:  () => { el.textContent = (Math.round(obj.val / step) * step).toLocaleString() + suffix },
      onComplete: () => { el.textContent = end.toLocaleString() + suffix },
    })
    ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      onEnter:     () => tween.restart(),
      onEnterBack: () => tween.restart(),
    })
    return () => tween.kill()
  }, [ref, end, step, suffix])
}

function StatItem({ end, step, suffix, label }) {
  const numRef = useRef(null)
  useCountUp(numRef, end, step, suffix)
  return (
    <div>
      <div className="about__stat-num" ref={numRef}>0{suffix}</div>
      <div className="about__stat-lbl">{label}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Canvas jewellery animation
───────────────────────────────────────────── */
function JewelCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t = 0

    /* Mouse state — normalised 0..1, starts at centre */
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - rect.left) / rect.width
      mouse.ty = (e.clientY - rect.top)  / rect.height
    }
    const onMouseLeave = () => { mouse.tx = 0.5; mouse.ty = 0.5 }
    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    /* Sparkle crosses — physics-based: home pos + velocity + displacement */
    const sparkles = Array.from({ length: 55 }, () => ({
      hx:    Math.random(),   // normalised home x (0-1)
      hy:    Math.random(),   // normalised home y (0-1)
      dx:    0,               // current displacement x (px)
      dy:    0,               // current displacement y (px)
      vx:    0,               // velocity x
      vy:    0,               // velocity y
      size:  Math.random() * 2.5 + 0.6,
      speed: Math.random() * 0.4 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }))

    /* Orbiting gem dots — 3 rings */
    const rings = [
      { r: 148, count: 7,  speed:  0.0028, tilt: 0.32 },
      { r: 108, count: 5,  speed: -0.0038, tilt: 0.55 },
      { r:  72, count: 4,  speed:  0.005,  tilt: 0.20 },
    ]
    const orbiters = rings.flatMap(({ r, count, speed, tilt }, ri) =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2 + ri,
        radius: r, speed, tilt,
        size: 2.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      }))
    )

    /* Aurora blobs — each has a base position + mouse pull strength */
    const blobs = [
      { x: 0.28, y: 0.35, r: 180, col: [201, 169, 110], phase: 0.0, pull: 0.18 },
      { x: 0.72, y: 0.60, r: 140, col: [255, 200, 100], phase: 2.1, pull: 0.12 },
      { x: 0.50, y: 0.80, r: 110, col: [180, 130,  80], phase: 4.3, pull: 0.22 },
    ]

    /* Diamond vertices */
    const gem = (cx, cy, s, angle) =>
      [
        [0,           -s],
        [ s * 0.80,  -s * 0.18],
        [ s * 0.48,   s],
        [-s * 0.48,   s],
        [-s * 0.80,  -s * 0.18],
      ].map(([x, y]) => [
        cx + x * Math.cos(angle) - y * Math.sin(angle),
        cy + x * Math.sin(angle) + y * Math.cos(angle),
      ])

    const drawGem = (cx, cy, s, angle, alpha) => {
      const pts = gem(cx, cy, s, angle)
      const gold    = `rgba(201,169,110,${alpha})`
      const goldDim = `rgba(201,169,110,${alpha * 0.45})`

      ctx.lineWidth = 1.2
      ctx.beginPath()
      pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.closePath()
      ctx.strokeStyle = gold
      ctx.stroke()

      ctx.strokeStyle = goldDim
      ctx.lineWidth = 0.8
      ;[1, 2, 3, 4].forEach(i => {
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        ctx.lineTo(pts[i][0], pts[i][1])
        ctx.stroke()
      })

      const gY = cy - s * 0.18
      ctx.beginPath()
      ctx.strokeStyle = goldDim
      ctx.moveTo(cx - s * 0.80, gY)
      ctx.lineTo(cx + s * 0.80, gY)
      ctx.stroke()
    }

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      if (!W || !H) { raf = requestAnimationFrame(draw); return }
      const cx = W / 2, cy = H / 2
      ctx.clearRect(0, 0, W, H)
      t += 0.012

      /* Smooth-follow mouse (lerp) */
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      const mx = mouse.x * W
      const my = mouse.y * H
      /* Offset from centre (-0.5 → 0.5) */
      const mdx = mouse.x - 0.5
      const mdy = mouse.y - 0.5

      /* ── Mouse spotlight ── */
      const spot = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
      spot.addColorStop(0,   'rgba(255,220,140,0.07)')
      spot.addColorStop(0.5, 'rgba(255,200,100,0.03)')
      spot.addColorStop(1,   'transparent')
      ctx.fillStyle = spot
      ctx.fillRect(0, 0, W, H)

      /* ── Aurora blobs attracted to mouse ── */
      blobs.forEach(b => {
        const baseX = b.x * W + Math.sin(t * 0.4 + b.phase) * 18
        const baseY = b.y * H + Math.cos(t * 0.3 + b.phase) * 14
        const bx = baseX + (mx - baseX) * b.pull
        const by = baseY + (my - baseY) * b.pull
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r)
        const [r, gv, bl] = b.col
        g.addColorStop(0,   `rgba(${r},${gv},${bl},0.18)`)
        g.addColorStop(0.5, `rgba(${r},${gv},${bl},0.07)`)
        g.addColorStop(1,   'transparent')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      })

      /* ── Elliptical orbit rings — tilt toward mouse ── */
      rings.forEach(({ r, speed, tilt }, i) => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(t * speed * 60)
        ctx.scale(1, tilt + mdy * 0.15)
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(201,169,110,${0.18 - i * 0.04})`
        ctx.lineWidth = 1
        ctx.setLineDash([4, 8])
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      })

      /* ── Orbiting dot gems ── */
      orbiters.forEach(o => {
        o.angle += o.speed
        const x = cx + Math.cos(o.angle) * o.radius + mdx * 12
        const y = cy + Math.sin(o.angle) * o.radius * o.tilt + mdy * 8
        const pulse = 0.6 + 0.4 * Math.sin(t * 3 + o.phase)

        const g = ctx.createRadialGradient(x, y, 0, x, y, o.size * 4)
        g.addColorStop(0, `rgba(201,169,110,${0.5 * pulse})`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, o.size * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, o.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,220,150,${0.85 * pulse})`
        ctx.fill()
      })

      /* ── Central diamond — rotates + tilts toward mouse ── */
      const pulse   = 1 + 0.04 * Math.sin(t * 1.8)
      const gemAngle = t * 0.4 + mdx * 0.6
      const gemX    = cx + mdx * 18
      const gemY    = cy - 8 + mdy * 12
      drawGem(gemX, gemY, 42 * pulse, gemAngle, 0.92)

      /* Centre glow follows gem */
      const cg = ctx.createRadialGradient(gemX, gemY, 0, gemX, gemY, 60)
      cg.addColorStop(0, 'rgba(255,235,180,0.22)')
      cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg
      ctx.beginPath()
      ctx.arc(gemX, gemY, 60, 0, Math.PI * 2)
      ctx.fill()

      /* ── Twinkling sparkles — spring physics + mouse repulsion ── */
      sparkles.forEach(s => {
        /* Home position (floats gently on its own) */
        const hx = s.hx * W
        const hy = s.hy * H + Math.sin(t * s.speed + s.phase) * 7

        /* Current world position = home + accumulated displacement */
        const px = hx + s.dx
        const py = hy + s.dy

        /* Repulsion: push away from cursor */
        const distX = px - mx
        const distY = py - my
        const dist  = Math.sqrt(distX * distX + distY * distY) || 1
        const repelRadius = 130
        if (dist < repelRadius) {
          const strength = ((repelRadius - dist) / repelRadius) ** 2 * 5.5
          s.vx += (distX / dist) * strength
          s.vy += (distY / dist) * strength
        }

        /* Spring force: pull displacement back to zero (home) */
        s.vx += -s.dx * 0.045
        s.vy += -s.dy * 0.045

        /* Damping */
        s.vx *= 0.82
        s.vy *= 0.82

        /* Integrate */
        s.dx += s.vx
        s.dy += s.vy

        /* Draw at current position */
        const alpha = ((Math.sin(t * 2.5 * s.speed + s.phase) + 1) / 2) * 0.78
        const sz = s.size
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.strokeStyle = '#e8c97a'
        ctx.lineWidth = 0.9
        ctx.beginPath()
        ctx.moveTo(px - sz, py); ctx.lineTo(px + sz, py)
        ctx.moveTo(px, py - sz); ctx.lineTo(px, py + sz)
        const d = sz * 0.6
        ctx.moveTo(px - d, py - d); ctx.lineTo(px + d, py + d)
        ctx.moveTo(px + d, py - d); ctx.lineTo(px - d, py + d)
        ctx.stroke()
        ctx.restore()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="about__canvas" />
}

/* ─────────────────────────────────────────────
   Main About component
───────────────────────────────────────────── */
export default function About() {
  const secRef    = useRef(null)
  const textRef   = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const sec  = secRef.current
    const text = textRef.current
    const vis  = visualRef.current
    if (!sec || !text || !vis) return

    gsap.set([text, vis], { clearProps: 'all' })

    gsap.fromTo(text,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: sec, start: 'top 85%', end: 'center 55%', scrub: 2 } }
    )
    gsap.fromTo(vis,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: sec, start: 'top 85%', end: 'center 55%', scrub: 2 } }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section className="about" id="about" ref={secRef}>
      {/* Left text column */}
      <div ref={textRef} style={{ willChange: 'transform, opacity' }}>
        <p className="about__label">Our Heritage</p>
        <h2 className="about__title">
          Jewellery born from <em>passion</em> and precision
        </h2>
        <p className="about__body">
          Aurum was founded by master goldsmith Aryan Mehta in 2010. Every piece
          is handcrafted in our atelier using ethically sourced gold, platinum,
          and conflict-free gemstones — blending centuries-old techniques with
          contemporary design sensibility.
        </p>
        <div className="about__stats">
          {STATS.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </div>

      {/* Right visual column */}
      <div className="about__visual" ref={visualRef} style={{ willChange: 'transform, opacity' }}>
        <JewelCanvas />

        {/* Floating badge — top-left */}
        <div className="about__badge about__badge--tl">
          <span className="about__badge-dot" />
          <span>Est. 2010</span>
        </div>

        {/* Floating badge — bottom-right */}
        <div className="about__badge about__badge--br">
          <span className="about__badge-icon">✦</span>
          <span>100% Handcrafted</span>
        </div>

        {/* Floating material pill */}
        <div className="about__pill about__pill--tr">18k Gold · Platinum · Diamonds</div>
        <div className="about__pill about__pill--bl">Ethically Sourced</div>
      </div>
    </section>
  )
}
