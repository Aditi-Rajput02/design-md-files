path = r'c:\Users\Admin\Downloads\rag-complete-system\TestingDesignmdfile\food-design\src\App.css'

part2 = """
/* ABOUT */
.about { padding: 140px 56px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; background: var(--bg); }
.about__label { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
.about__title { font-family: var(--font-h); font-size: clamp(36px, 4vw, 60px); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; color: var(--text); margin-bottom: 28px; }
.about__title em { font-style: italic; color: var(--accent); }
.about__body { font-size: 15px; font-weight: 300; line-height: 1.8; color: var(--text-sec); margin-bottom: 40px; }
.about__stats { display: flex; gap: 48px; }
.about__stat-num { font-family: var(--font-h); font-size: 48px; font-weight: 400; color: var(--text); line-height: 1; }
.about__stat-lbl { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-top: 6px; }
.about__visual { position: relative; height: 500px; border-radius: 4px; overflow: hidden; background: var(--bg2); }
.about__visual-inner { width: 100%; height: 100%; background: linear-gradient(135deg, rgba(17,186,255,0.15) 0%, rgba(204,5,151,0.1) 100%); display: flex; align-items: center; justify-content: center; }
.about__visual-ring { width: 200px; height: 200px; border: 1px solid rgba(17,186,255,0.3); border-radius: 50%; animation: rotateSlow 12s linear infinite; display: flex; align-items: center; justify-content: center; }
.about__visual-ring2 { width: 120px; height: 120px; border: 1px solid rgba(204,5,151,0.4); border-radius: 50%; animation: rotateSlow 8s linear infinite reverse; }
@media (max-width: 900px) { .about { grid-template-columns: 1fr; padding: 80px 24px; } .about__visual { height: 300px; } }

/* WORK */
.work { padding: 120px 56px; background: var(--bg2); }
.work__header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 64px; }
.work__label { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
.work__title { font-family: var(--font-h); font-size: clamp(36px, 4vw, 56px); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; color: var(--text); }
.work__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
.work__item { position: relative; overflow: hidden; aspect-ratio: 4/3; background: var(--bg); cursor: none; }
.work__item:first-child { grid-column: span 2; aspect-ratio: 16/9; }
.work__item-bg { width: 100%; height: 100%; transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
.work__item:hover .work__item-bg { transform: scale(1.06); }
.work__item-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%); opacity: 0; transition: opacity 0.4s; display: flex; align-items: flex-end; padding: 28px; }
.work__item:hover .work__item-overlay { opacity: 1; }
.work__item-info { transform: translateY(12px); transition: transform 0.4s; }
.work__item:hover .work__item-info { transform: translateY(0); }
.work__item-cat { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
.work__item-name { font-family: var(--font-h); font-size: 22px; font-weight: 400; color: var(--text); }
@media (max-width: 900px) { .work { padding: 80px 24px; } .work__grid { grid-template-columns: 1fr; } .work__item:first-child { grid-column: span 1; aspect-ratio: 4/3; } .work__header { flex-direction: column; align-items: flex-start; gap: 20px; } }

/* SERVICES */
.services { padding: 120px 56px; background: var(--bg); }
.services__header { margin-bottom: 72px; }
.services__label { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
.services__title { font-family: var(--font-h); font-size: clamp(36px, 4vw, 56px); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; color: var(--text); max-width: 600px; }
.services__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
.service-card { background: var(--bg); padding: 48px 40px; position: relative; overflow: hidden; transition: background 0.3s; cursor: none; }
.service-card::before { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(17,186,255,0.06) 0%, transparent 60%); opacity: 0; transition: opacity 0.4s; }
.service-card:hover { background: var(--bg2); }
.service-card:hover::before { opacity: 1; }
.service-card__num { font-family: var(--font-h); font-size: 13px; color: var(--accent); margin-bottom: 32px; opacity: 0.7; }
.service-card__title { font-family: var(--font-h); font-size: 24px; font-weight: 400; color: var(--text); margin-bottom: 16px; line-height: 1.2; }
.service-card__desc { font-size: 14px; font-weight: 300; line-height: 1.7; color: var(--text-sec); }
.service-card__arrow { position: absolute; bottom: 40px; right: 40px; width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-sec); transition: border-color 0.3s, color 0.3s, transform 0.3s; }
.service-card:hover .service-card__arrow { border-color: var(--accent); color: var(--accent); transform: translate(3px,-3px); }
@media (max-width: 900px) { .services { padding: 80px 24px; } .services__grid { grid-template-columns: 1fr; } }

/* FOOTER */
.footer { padding: 80px 56px 40px; background: var(--bg2); border-top: 1px solid var(--border); }
.footer__top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 64px; gap: 40px; flex-wrap: wrap; }
.footer__brand { max-width: 320px; }
.footer__logo { font-family: var(--font-h); font-size: 28px; font-weight: 400; color: var(--text); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.footer__logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; }
.footer__tagline { font-size: 14px; font-weight: 300; line-height: 1.7; color: var(--text-sec); }
.footer__links { display: flex; gap: 64px; flex-wrap: wrap; }
.footer__col h4 { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px; }
.footer__col ul { display: flex; flex-direction: column; gap: 12px; }
.footer__col a { font-size: 14px; font-weight: 300; color: var(--text-sec); transition: color 0.25s; }
.footer__col a:hover { color: var(--text); }
.footer__bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 32px; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 16px; }
.footer__copy { font-size: 12px; color: var(--text-muted); }
.footer__socials { display: flex; gap: 20px; }
.footer__socials a { font-size: 12px; color: var(--text-muted); transition: color 0.25s; letter-spacing: 0.05em; }
.footer__socials a:hover { color: var(--accent); }
@media (max-width: 768px) { .footer { padding: 60px 24px 32px; } .footer__top { flex-direction: column; } .footer__links { gap: 32px; } }

/* ANIMATIONS */
@keyframes blink { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes lineSlide { 0% { left: -100%; } 50% { left: 0%; } 100% { left: 100%; } }
@keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* GSAP REVEAL CLASSES */
.reveal { opacity: 0; transform: translateY(40px); }
.reveal-left { opacity: 0; transform: translateX(-40px); }
.reveal-right { opacity: 0; transform: translateX(40px); }
.reveal-scale { opacity: 0; transform: scale(0.92); }
"""

with open(path, 'a', encoding='utf-8') as f:
    f.write(part2)

print('CSS part 2 written successfully')
