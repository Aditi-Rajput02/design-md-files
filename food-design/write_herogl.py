content = """import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import videoSrc from '../assets/Recording 2026-05-04 190826.mp4'

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
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  float jaggedMask(vec2 uv, vec2 center, float radius, float time) {
    vec2  d     = uv - center;
    float dist  = length(d);
    float angle = atan(d.y, d.x);
    float n1    = fbm(vec2(angle * 3.0 + time * 0.4, time * 0.3));
    float n2    = fbm(vec2(angle * 6.0 - time * 0.25, dist * 4.0 + time * 0.2));
    float n3    = noise(vec2(angle * 12.0 + time * 0.6, time * 0.5));
    float jagged = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    float r     = radius * (0.7 + jagged * 0.6);
    float edge  = 0.04 * radius;
    return 1.0 - smoothstep(r - edge, r + edge * 2.0, dist);
  }

  void main() {
    vec2 uv     = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 mouse  = uMouse;
    float radius = 0.18;

    float mask = jaggedMask(uv * aspect, mouse * aspect, radius, uTime);
    mask *= uStrength;

    float warpN  = fbm(uv * 5.0 + uTime * 0.3);
    float warpN2 = fbm(uv * 8.0 - uTime * 0.2 + 3.7);
    vec2 warp = vec2(warpN - 0.5, warpN2 - 0.5) * 0.06 * mask;

    vec2  px         = 1.0 / uResolution;
    float blurRadius = 8.0 * mask;
    vec4  col        = vec4(0.0);
    float total      = 0.0;
    for (int x = -2; x <= 2; x++) {
      for (int y = -2; y <= 2; y++) {
        float w = exp(-float(x*x + y*y) * 0.5);
        col   += texture2D(uTexture, uv + warp + vec2(float(x), float(y)) * px * blurRadius) * w;
        total += w;
      }
    }
    col /= total;

    float aberration = 0.006 * mask;
    vec2  dir = normalize(uv - mouse + 0.0001);
    float rr  = texture2D(uTexture, uv + warp + dir * aberration).r;
    float gg  = col.g;
    float bb  = texture2D(uTexture, uv + warp - dir * aberration).b;
    vec4  aberCol = vec4(rr, gg, bb, 1.0);

    vec2  d2      = (uv - mouse) * aspect;
    float dist2   = length(d2);
    float glowRing = smoothstep(radius + 0.02, radius, dist2) *
                     smoothstep(radius - 0.06, radius, dist2);
    glowRing *= uStrength * 0.5;
    vec3 glowColor = vec3(0.067, 0.729, 1.0) * glowRing * 1.5;

    float grain = (hash(uv * 800.0 + uTime * 13.7) - 0.5) * 0.04 * mask;

    vec4 base  = texture2D(uTexture, uv);
    vec4 final = mix(base, aberCol, mask);
    final.rgb += glowColor + grain;
    gl_FragColor = final;
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
    const W = mount.clientWidth || window.innerWidth
    const H = mount.clientHeight || window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    Object.assign(renderer.domElement.style, {
      position: 'absolute', inset: '0', width: '100%', height: '100%', zIndex: '0'
    })
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const video = document.createElement('video')
    video.src       = videoSrc
    video.autoplay  = true
    video.muted     = true
    video.loop      = true
    video.playsInline = true
    video.play().catch(() => {})

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

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
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      uniforms.uResolution.value.set(w, h)
    }
    window.addEventListener('resize', onResize)

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
      mount.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      mat.dispose()
      geo.dispose()
      texture.dispose()
      video.pause()
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
          Vicenza, Italy &mdash; Communications &amp; Design Agency
        </div>
        <h1 className="hero__title">
          <span className="line">
            <span ref={line1Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              We are Studio375,
            </span>
          </span>
          <span className="line">
            <span ref={line2Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              <em>communications,</em> graphic
            </span>
          </span>
          <span className="line">
            <span ref={line3Ref} style={{ transform: 'translateY(110%)', display: 'block' }}>
              design &amp; <span className="dim">web agency</span>
            </span>
          </span>
        </h1>
        <div className="hero__bottom" ref={bottomRef}
          style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <p className="hero__desc">
            Based in Vicenza, we craft meaningful brand identities, digital products,
            and creative communications that connect people with ideas.
          </p>
          <div className="hero__actions">
            <a href="#work" className="btn-primary">
              View our work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#about" className="btn-ghost">
              About us
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
"""

with open(r'c:\Users\Admin\Downloads\rag-complete-system\TestingDesignmdfile\food-design\src\components\HeroGL.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done, lines:', content.count('\n'))
