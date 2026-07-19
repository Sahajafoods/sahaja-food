import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const STRIP_ITEMS = [
  ['🍌','Banana Leaf Meals'],['🍗','Chettinad Non-Veg'],['🌿','Authentic South Indian Veg'],
  ['✓','FSSAI Certified Kitchen'],['📱','WhatsApp Confirmed'],
  ['🎊','Weddings & Receptions'],['🏠','Housewarming Ceremonies'],
  ['💼','Corporate Events'],['🍛','Karnataka Cuisine'],['🥥','Kerala Sadhya'],
]

const WHY_CARDS = [
  ['🌿', 'Fresh Every Day', 'Ingredients sourced every morning. No pre-cooked shortcuts.'],
  ['🍽️', 'Made for Your Event', 'Every menu customised. 30 to 500 guests. Veg and Non-Veg.'],
  ['❤️', 'Trusted in Bangalore', '50+ celebrations. Weddings, housewarmings, corporate events and more.'],
]

export default function Home() {
  useReveal()
  const [counted, setCounted] = useState(false)
  const [count, setCount] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Counter
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !counted) {
        setCounted(true)
        let n = 0
        const t = setInterval(() => { n = Math.min(n + 1, 50); setCount(n); if (n >= 50) clearInterval(t) }, 30)
      }
    }, { threshold: 0.5 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [counted])

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div ref={bgRef} style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,3,6,.65) 0%, transparent 200px), linear-gradient(to top, rgba(10,3,6,.97) 0%, rgba(10,3,6,.7) 40%, rgba(10,3,6,.3) 70%, transparent 100%), linear-gradient(to right, rgba(20,6,12,.5) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '120px clamp(20px, 5vw, 48px) 96px' }}>
          <div style={{ width: 60, height: 1, background: 'var(--cu)', marginBottom: 20, animation: 'fadeUp .8s .1s both', opacity: 0 }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--cu2)', marginBottom: 24, animation: 'fadeUp .8s .3s both', opacity: 0 }}>
            <span style={{ display: 'block', width: 40, height: 1, background: 'var(--cu)' }} />
            Authentic South Indian Catering · Bangalore
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(3.2rem,7vw,6.5rem)', fontWeight: 700, lineHeight: 1.0, color: '#fff', marginBottom: 10, maxWidth: 820, animation: 'fadeUp .9s .5s both', opacity: 0 }}>
            Food that feels like home.<br/>Made for every<br/><em style={{ fontStyle: 'italic', color: 'var(--cu2)' }}>celebration.</em>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0', animation: 'fadeUp .8s .6s both', opacity: 0 }}>
            <span style={{ width: 32, height: 1, background: 'var(--cu)', display: 'block' }} />
            <span style={{ color: 'var(--cu2)', fontSize: '1.2rem' }}>✦</span>
            <span style={{ width: 32, height: 1, background: 'var(--cu)', display: 'block' }} />
          </div>
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.3rem', color: 'rgba(255,255,255,.7)', marginBottom: 52, animation: 'fadeUp .8s .7s both', opacity: 0 }}>
            Freshly prepared Veg &amp; Non-Veg South Indian meals<br/>for weddings, celebrations and corporate events.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeUp .8s .9s both', opacity: 0 }}>
            <Link to="/enquiry" style={btnPrimary}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Plan Your Event
            </Link>
            <Link to="/menu" style={btnGhost}>
              Explore Menu
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div ref={statsRef} style={{ marginTop: 60, display: 'flex', alignItems: 'center', animation: 'fadeUp .8s 1.1s both', opacity: 0 }} className="hero-stats-wrap">
            <div style={hstatStyle}><span style={hstatN}>{count}+</span><span style={hstatL}>Events Celebrated</span></div>
            <span style={{ width: 1, height: 40, background: 'var(--cu)', opacity: .4, margin: '0 32px', flexShrink: 0 }} className="hero-stat-divider" />
            <div style={hstatStyle}><span style={hstatN}>100%</span><span style={hstatL}>Fresh Daily</span></div>
            <span style={{ width: 1, height: 40, background: 'var(--cu)', opacity: .4, margin: '0 32px', flexShrink: 0 }} className="hero-stat-divider" />
            <div style={hstatStyle}><span style={hstatN}>50–500</span><span style={hstatL}>Guests Served</span></div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0, animation: 'fadeIn 1s 1.8s forwards' }}>
          <span style={{ fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom,rgba(255,255,255,.5),transparent)', animation: 'scrollAnim 1.8s 2s infinite' }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: 'var(--m)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 36s linear infinite' }}>
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map(([icon, text], i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '20px 40px', fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'rgba(255,255,255,.65)', borderRight: '1px solid rgba(255,255,255,.08)', flexShrink: 0 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--cu)', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ marginRight: 8 }}>{icon}</span>{text}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT BAND ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '92vh' }} className="about-band" id="about">
        <div style={{ position: 'relative', overflow: 'hidden' }} className="reveal-l about-img-panel">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=85&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .6s ease' }} className="about-img-inner" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(61,21,32,.18),transparent)' }} />
          <div style={{ position: 'absolute', bottom: 48, right: -28, background: 'var(--m)', color: '#fff', padding: '24px 28px', boxShadow: '0 16px 48px rgba(61,21,32,.4)', zIndex: 2 }} className="reveal">
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '2.8rem', fontWeight: 700, color: 'var(--cu2)', lineHeight: 1 }}>50+</div>
            <div style={{ fontSize: '.72rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginTop: 6 }}>Events Celebrated</div>
          </div>
        </div>
        <div style={{ background: 'var(--iv)', display: 'flex', alignItems: 'center', padding: 'clamp(56px, 8vw, 80px) clamp(20px, 6vw, 80px) clamp(56px, 8vw, 80px) clamp(20px, 5vw, 60px)' }}>
          <div style={{ maxWidth: 520 }}>
            <div style={eyebrow} className="reveal">Our Story</div>
            <h2 style={h2} className="reveal d1">Cooked with the love<br/>of a <em style={{ fontStyle: 'italic', color: 'var(--m)' }}>home kitchen</em></h2>
            <p style={bodyLg} className="reveal d2">Sahaja means effortless — the way great food should feel. What started as cooking for family gatherings became a catering service trusted across Bangalore for weddings, housewarmings, and corporate events.</p>
            <p style={{ ...bodyLg, marginTop: 14 }} className="reveal d3">No frozen shortcuts. Just honest South Indian food, made with ingredients sourced every morning.</p>
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[['🌿','Sourced fresh every day','We buy from local vendors each morning. If it\'s not fresh, it doesn\'t reach the pot.'],
                ['🍳','Home quality at any scale','The same recipes, the same hands — for 50 guests or 500.'],
                ['📲','Simple booking, clear pricing','WhatsApp confirmation, per-plate pricing, no hidden charges.'],
              ].map(([icon, title, desc], i) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }} className={`reveal d${i+1}`}>
                  <div style={{ width: 48, height: 48, flexShrink: 0, background: 'rgba(61,21,32,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--tx)', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: '.875rem', color: 'var(--tx2)', lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/enquiry" style={{ ...btnMaroon, marginTop: 44, display: 'inline-flex' }} className="reveal d4">
              Book Your Event
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── WHY SAHAJA FOOD ── */}
      <section style={{ background: 'var(--iv)', padding: '80px clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40 }} className="why-grid">
            {WHY_CARDS.map(([icon, title, desc], i) => (
              <div key={title} className={`reveal d${i + 1}`}>
                <div style={{ width: 56, height: 56, background: 'rgba(184,120,74,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 20 }}>{icon}</div>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--tx)', marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: '.9rem', color: 'var(--tx2)', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: 'var(--m3)', padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)', position: 'relative', overflow: 'hidden' }} id="testimonials">
        <div style={{ position: 'absolute', top: -200, right: -40, fontFamily: '"Cormorant Garamond",serif', fontSize: '48rem', fontWeight: 700, color: 'rgba(255,255,255,.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ ...eyebrow, color: 'var(--cu2)' }} className="reveal">What Guests Say</div>
          <h2 style={{ ...h2, color: '#fff' }} className="reveal d1">Memories made <em style={{ fontStyle: 'italic', color: 'var(--cu2)' }}>at the table</em></h2>
          <div style={{ maxWidth: 640, margin: '64px auto 0', background: 'rgba(255,255,255,.04)', border: '2px solid var(--m)', padding: 'clamp(40px,6vw,64px)', textAlign: 'center' }} className="reveal d1">
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--cu2)', lineHeight: 1.5, marginBottom: 32 }}>Be the first to share your experience</div>
            <Link to="/enquiry" style={btnPrimary}>Book Your Event →</Link>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY CTA ── */}
      <section style={{ background: 'var(--m)', padding: 'clamp(64px, 10vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }} className="reveal">
          <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 32, lineHeight: 1.2 }}>
            Ready to celebrate? <em style={{ fontStyle: 'italic', color: 'var(--cu2)' }}>Let's plan your event.</em>
          </h2>
          <Link to="/enquiry" style={btnPrimary}>Book Your Event →</Link>
        </div>
      </section>

      {/* Mobile sticky book */}
      <a href="/enquiry" style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90, background: 'var(--m)', color: '#fff', padding: 18, textAlign: 'center', fontFamily: 'Jost,sans-serif', fontSize: '.85rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', boxShadow: '0 -4px 24px rgba(61,21,32,.3)', textDecoration: 'none' }} className="mob-sticky-book">
        Book Your Event →
      </a>

      <style>{`
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { to { opacity:1; } }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scrollAnim { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
        .about-img-inner:hover { transform: scale(1.04); }
        .about-band { grid-template-columns: 1fr 1fr; }
        .about-img-panel { min-height: 600px; }
        @media(max-width:1100px){
          .about-band { grid-template-columns: 1fr !important; }
          .about-img-panel { min-height: 420px; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:768px){
          .hero-stats-wrap { flex-direction: column !important; align-items: flex-start !important; width: 100% !important; gap: 16px; }
          .hero-stat-divider { display: none !important; }
          .mob-sticky-book { display: block !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// Style constants
const eyebrow: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cu)', marginBottom: 16, textDecoration: 'none' }
const h2: React.CSSProperties = { fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.4rem,4vw,3.6rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--tx)', marginBottom: 18 }
const bodyLg: React.CSSProperties = { fontSize: '1.05rem', color: 'var(--tx2)', lineHeight: 1.85 }
const btnPrimary: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--m)', color: '#fff', padding: '18px 38px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 6px 28px rgba(61,21,32,.5)', transition: 'background .3s' }
const btnGhost: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,.3)', color: 'rgba(255,255,255,.88)', padding: '17px 32px', fontFamily: 'Jost,sans-serif', fontWeight: 500, fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }
const btnMaroon: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--m)', color: '#fff', padding: '16px 36px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.82rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background .3s' }
const hstatStyle: React.CSSProperties = { padding: '4px 0' }
const hstatN: React.CSSProperties = { fontFamily: '"Cormorant Garamond",serif', fontSize: '2.4rem', fontWeight: 700, color: 'var(--cu2)', lineHeight: 1, display: 'block' }
const hstatL: React.CSSProperties = { fontSize: '.72rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)', marginTop: 5, display: 'block' }
