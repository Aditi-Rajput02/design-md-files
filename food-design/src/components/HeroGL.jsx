import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import videoSrc from '../assets/Screen Recording 2026-05-05 100458.mp4'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2      uMouse;
  uniform vec2      uResolution;
  uniform float     uTime;
  uniform float     uStrength;
  varying vec2      vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  /* VHS-style horizontal jitter */
  vec2 vhsJitter(vec2 uv, float strength, float time) {
    float band = step(0.98, fract(uv.y * 30.0 + time * 3.0));
    float jit  = (hash(vec2(floor(uv.y * 30.0), time)) - 0.5) * 0.012 * strength;
    return vec2(uv.x + jit * band, uv.y);
  }

  void main() {
    vec2 uv     = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 mouse  = uMouse;
    float str   = uStrength;

    /* Distance from mouse — drives effect radius */
    vec2  toMouse = (uv - mouse) * aspect;
    float dist    = length(toMouse);
    float radius  = 0.35;
    float falloff = 1.0 - smoothstep(0.0, radius, dist);
    float effect  = falloff * str;

    /* VHS jitter on strong effect */
    vec2 jitUV = vhsJitter(uv, effect, uTime);

    /* ── RYB Retro Chromatic Split ──
       Red   → offset away from mouse
       Yellow (R+G) → slight perpendicular drift
       Blue  → offset toward mouse
    */
    vec2 dir = normalize(toMouse + 0.0001);
    vec2 perp = vec2(-dir.y, dir.x);

    float splitAmt = 0.018 * effect;
    float perpAmt  = 0.008 * effect;

    /* Noise-warped offsets for organic feel */
    float wn = fbm(uv * 4.0 + uTime * 0.4) - 0.5;

    vec2 uvR = jitUV + dir  * splitAmt + perp * perpAmt * wn;
    vec2 uvG = jitUV + perp * perpAmt  * wn * 0.5;
    vec2 uvB = jitUV - dir  * splitAmt - perp * perpAmt * wn;

    /* Sample each channel separately */
    float r = texture2D(uTexture, uvR).r;
    float g = texture2D(uTexture, uvG).g;
    float b = texture2D(uTexture, uvB).b;

    /* Yellow channel = blend of R+G shifted slightly */
    float yr = texture2D(uTexture, jitUV + perp * splitAmt * 0.5).r;
    float yg = texture2D(uTexture, jitUV - perp * splitAmt * 0.5).g;

    /* Mix base with RYB split */
    vec4 base = texture2D(uTexture, jitUV);

    /* RYB composite: Red channel boosted, Yellow mid, Blue shifted */
    float rFinal = mix(base.r, r * 1.15, effect);
    float gFinal = mix(base.g, mix(g, yg * 1.1, 0.5), effect);
    float bFinal = mix(base.b, b * 0.85, effect);

    vec3 ryb = vec3(rFinal, gFinal, bFinal);

    /* Retro color grading: warm shadows, cool highlights */
    float lum = dot(ryb, vec3(0.299, 0.587, 0.114));
    vec3 warm = mix(vec3(0.18, 0.08, 0.02), vec3(1.0, 0.95, 0.80), lum);
    vec3 cool = mix(vec3(0.02, 0.05, 0.18), vec3(0.85, 0.90, 1.0),  lum);
    vec3 grade = mix(ryb, mix(warm, cool, smoothstep(0.0, 1.0, lum)), 0.25 * effect);

    /* Film grain */
    float grain = (hash(uv * 600.0 + uTime * 17.3) - 0.5) * 0.045 * (0.3 + effect * 0.7);
    grade += grain;

    /* Vignette around mouse area for retro spotlight */
    float vig = 1.0 - smoothstep(0.0, radius * 1.2, dist) * 0.35 * str;
    grade *= vig;

    gl_FragColor = vec4(grade, 1.0);
  }
`

export default function HeroGL() {
  const mountRef  = useRef(null)
  const eyeRef    = useRef(null)
  const line1Ref  = useRef(null)
  const line2Ref  = useRef(null)
  const line3Ref  = useRef(null)
  const bottomRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.to(eyeRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(line1Ref.current,  { y: 0, duration: 1,   ease: 'power4.out' }, '-=0.4')
      .to(line2Ref.current,  { y: 0, duration: 1,   ease: 'power4.out' }, '-=0.75')
      .to(line3Ref.current,  { y: 0, duration: 1,   ease: 'power4.out' }, '-=0.75')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')

    const mount = mountRef.current

    /* Use window dimensions as fallback — section is 100vh */
    const W = mount.offsetWidth  || window.innerWidth
    const H = mount.offsetHeight || window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    /* Use position:fixed so Lenis scroll transform doesn't cause zoom artifact */
    Object.assign(renderer.domElement.style, {
      position: 'fixed',
      top: '0', left: '0',
      width: '100vw', height: '100vh',
      zIndex: '0',
      display: 'block',
      pointerEvents: 'none',
    })
    /* Append to body so it's outside Lenis scroll wrapper */
    document.body.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    /* ── Video element ── */
    const video = document.createElement('video')
    video.src         = videoSrc
    video.muted       = true
    video.loop        = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    /* Keep video off-screen but visible enough for autoplay policies */
    video.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;'
    document.body.appendChild(video)

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format    = THREE.RGBAFormat

    const uniforms = {
      uTexture:    { value: texture },
      uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(W, H) },
      uTime:       { value: 0 },
      uStrength:   { value: 0 },
    }

    const geo  = new THREE.PlaneGeometry(2, 2)
    const mat  = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    scene.add(new THREE.Mesh(geo, mat))

    /* Start video — retry on user gesture if autoplay blocked */
    const startVideo = () => {
      video.play().catch(() => {
        document.addEventListener('click', () => video.play(), { once: true })
        document.addEventListener('touchstart', () => video.play(), { once: true })
      })
    }
    startVideo()

    /* Resume video if browser paused it (tab switch, scroll, etc.) */
    const onVisibility = () => {
      if (!document.hidden && video.paused) video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)

    /* Immediately resume if browser auto-pauses the video */
    const onVideoPause = () => {
      if (!document.hidden) video.play().catch(() => {})
    }
    video.addEventListener('pause', onVideoPause)

    /* Keep video alive on scroll — some browsers pause off-screen videos */
    const keepAlive = setInterval(() => {
      if (video.paused && !document.hidden) video.play().catch(() => {})
    }, 2000)

    const target  = { x: 0.5, y: 0.5 }
    const current = { x: 0.5, y: 0.5 }
    let strength  = 0
    let fadeTimer = null
    let fadeInterval = null

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      target.y = 1.0 - (e.clientY - rect.top) / rect.height
      strength = Math.min(strength + 0.1, 1.0)
      clearTimeout(fadeTimer)
      clearInterval(fadeInterval)
      fadeTimer = setTimeout(() => {
        fadeInterval = setInterval(() => {
          strength -= 0.025
          if (strength <= 0) { strength = 0; clearInterval(fadeInterval) }
        }, 16)
      }, 150)
    }

    mount.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      const w = mount.offsetWidth || window.innerWidth
      const h = mount.offsetHeight || window.innerHeight
      renderer.setSize(w, h)
      uniforms.uResolution.value.set(w, h)
    }
    window.addEventListener('resize', onResize)

    /* Hide canvas when hero is scrolled out of view */
    const onScroll = () => {
      const rect = mount.getBoundingClientRect()
      const visible = rect.bottom > 0
      renderer.domElement.style.opacity = visible ? '1' : '0'
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let rafId
    const clock = new THREE.Clock()
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      uniforms.uMouse.value.set(current.x, current.y)
      uniforms.uTime.value     = clock.getElapsedTime()
      uniforms.uStrength.value = strength
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(fadeTimer)
      clearInterval(fadeInterval)
      clearInterval(keepAlive)
      document.removeEventListener('visibilitychange', onVisibility)
      mount.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      renderer.dispose()
      mat.dispose()
      geo.dispose()
      texture.dispose()
      video.pause()
      if (video.parentNode) video.parentNode.removeChild(video)
      if (renderer.domElement.parentNode)
        renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={mountRef}>
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__eyebrow" ref={eyeRef}
          style={{ opacity: 0, transform: 'translateY(20px)' }}>
          Est. 2010 &mdash; Handcrafted Fine Jewellery
        </div>
        <h1 className="hero__title">
          <span className="line">
            <span ref={line1Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              Wear the art
            </span>
          </span>
          <span className="line">
            <span ref={line2Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              of <em>timeless</em>
            </span>
          </span>
          <span className="line">
            <span ref={line3Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              <span className="dim">elegance</span>
            </span>
          </span>
        </h1>
        <div className="hero__bottom" ref={bottomRef}
          style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <p className="hero__desc">
            Each piece is a story — sculpted in gold, set with rare gemstones,
            and crafted by master artisans for those who appreciate the extraordinary.
          </p>
          <div className="hero__actions">
            <a href="#work" className="btn-primary">
              Explore Collections
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#about" className="btn-ghost">
              Our Story
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="hero__scroll-hint" ref={scrollRef} style={{ opacity: 0 }}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
