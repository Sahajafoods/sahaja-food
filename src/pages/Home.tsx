import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const STRIP_ITEMS = [
  ['🍌','Banana Leaf Meals'],['🍗','Chettinad Non-Veg'],['🌿','Authentic South Indian Veg'],
  ['✓','FSSAI Certified Kitchen'],['📱','WhatsApp Confirmed'],
  ['🎊','Weddings & Receptions'],['🏠','Housewarming Ceremonies'],
  ['💼','Corporate Events'],['🍛','Karnataka Cuisine'],['🥥','Kerala Sadhya'],
]

const VEG_DISHES = [
  { name: 'Dal Makhani', desc: 'Slow-cooked black lentils in a rich tomato and butter base. A celebration staple.', price: '₹80', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=80&auto=format&fit=crop' },
  { name: 'Vegetable Biryani', desc: 'Aromatic basmati with seasonal vegetables and saffron. Served with house raita.', price: '₹120', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700&q=80&auto=format&fit=crop' },
  { name: 'Paneer Butter Masala', desc: 'Soft cottage cheese in a velvety tomato-cashew gravy. A crowd-pleaser every time.', price: '₹110', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&q=80&auto=format&fit=crop' },
]

const NONVEG_DISHES = [
  { name: 'Chicken Biryani', desc: 'Dum-cooked basmati with tender chicken and our house spice blend. Iconic.', price: '₹150', img: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=700&q=80&auto=format&fit=crop' },
  { name: 'Mutton Curry', desc: 'Bone-in mutton slow-cooked in a bold Karnataka-style gravy. Pure comfort.', price: '₹180', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop' },
  { name: 'Chicken Chettinad', desc: 'Freshly ground Chettinad masala. Fiery, fragrant, unforgettable.', price: '₹160', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=700&q=80&auto=format&fit=crop' },
]

const GALLERY_IMAGES = [
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/1.jpeg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/2.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/3.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/4.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/6.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/7.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/9.jpeg',
]

const TESTI = [
  { q: "The biryani was the highlight of our daughter's wedding. Every single guest asked who the caterer was. We've already booked Sahaja for the next event.", name: 'Ramesh K.', ev: 'Wedding · 300 guests', init: 'R' },
  { q: "Food arrived on time, piping hot, genuinely home-cooked quality. Our team has been asking for a repeat ever since. Exceptional service throughout.", name: 'Priya M.', ev: 'Corporate lunch · 80 guests', init: 'P' },
  { q: "One WhatsApp message and everything was confirmed. The sadhya was outstanding — the kind of food that makes people linger long after they're done eating.", name: 'Sunita R.', ev: 'Housewarming · 60 guests', init: 'S' },
]

export default function Home() {
  useReveal()
  const [menuTab, setMenuTab] = useState<'veg'|'nonveg'>('veg')
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

  const dishes = menuTab === 'veg' ? VEG_DISHES : NONVEG_DISHES

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div ref={bgRef} style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/1.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,6,12,.98) 0%, rgba(20,6,12,.78) 38%, rgba(20,6,12,.45) 65%, rgba(20,6,12,.18) 100%), linear-gradient(to right, rgba(20,6,12,.5) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 clamp(20px, 5vw, 48px) 96px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--cu2)', marginBottom: 24, animation: 'fadeUp .8s .3s both', opacity: 0 }}>
            <span style={{ display: 'block', width: 40, height: 1, background: 'var(--cu)' }} />
            Authentic South Indian Catering · Bangalore
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(3.2rem,7vw,6.5rem)', fontWeight: 700, lineHeight: 1.0, color: '#fff', marginBottom: 10, maxWidth: 820, animation: 'fadeUp .9s .5s both', opacity: 0 }}>
            Food that tastes<br/>exactly like<br/><em style={{ fontStyle: 'italic', color: 'var(--cu2)' }}>home.</em>
          </h1>
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
          <div ref={statsRef} style={{ marginTop: 60, display: 'flex', border: '1px solid rgba(255,255,255,.08)', overflow: 'hidden', width: 'fit-content', animation: 'fadeUp .8s 1.1s both', opacity: 0 }} className="hero-stats-wrap">
            <div style={hstatStyle}><span style={hstatN}>{count}+</span><span style={hstatL}>Events Celebrated</span></div>
            <div style={hstatStyle}><span style={hstatN}>100%</span><span style={hstatL}>Fresh Daily</span></div>
            <div style={{ ...hstatStyle, borderRight: 'none' }}><span style={hstatN}>50–500</span><span style={hstatL}>Guests Served</span></div>
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

      {/* ── MENU PREVIEW ── */}
      <section style={{ background: '#fff', padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)' }} id="menu">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }} className="reveal">
            <div>
              <div style={eyebrow}>Our Menu</div>
              <h2 style={h2}>Curated with <em style={{ fontStyle: 'italic', color: 'var(--m)' }}>care</em><br/>and tradition</h2>
              <p style={bodyLg}>Every dish made fresh. Ingredients sourced every morning.<br/>Veg &amp; Non-Veg. Minimum 50 plates per item.</p>
              <div style={{ display: 'flex', gap: 0, border: '1px solid var(--iv3)', overflow: 'hidden', marginTop: 28, width: 'fit-content' }}>
                {['veg','nonveg'].map(tab => (
                  <button key={tab} onClick={() => setMenuTab(tab as 'veg'|'nonveg')} style={{ padding: '13px 32px', fontFamily: 'Jost,sans-serif', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', background: menuTab === tab ? 'var(--m)' : 'transparent', color: menuTab === tab ? '#fff' : 'var(--tx2)', border: 'none', borderRight: tab === 'veg' ? '1px solid var(--iv3)' : 'none', transition: 'all .25s' }}>
                    {tab === 'veg' ? '🌿 Vegetarian' : '🍗 Non-Vegetarian'}
                  </button>
                ))}
              </div>
            </div>
            <Link to="/enquiry" style={btnMaroon}>Request This Menu</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap: 2 }}>
            {dishes.map((d) => (
              <DishCard key={d.name} dish={d} isVeg={menuTab === 'veg'} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 64 }} className="reveal">
            <Link to="/enquiry" style={btnPrimary}>Enquire About Full Menu</Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT BAND ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '92vh' }} className="about-band" id="about">
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 480 }} className="reveal-l">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .6s ease' }} className="about-img-inner" />
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

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--iv2)', padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)' }} id="how">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ maxWidth: 560, marginBottom: 0 }} className="reveal">
            <div style={eyebrow}>The Process</div>
            <h2 style={h2}>Simple from<br/>start <em style={{ fontStyle: 'italic', color: 'var(--m)' }}>to serve</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, marginTop: 72, position: 'relative' }} className="steps-grid">
            <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, background: 'var(--iv3)', zIndex: 0 }} className="steps-line" />
            {[['1','Tell us about your event','Fill in our short form — event type, guest count, date, menu preference. Under 2 minutes.'],
              ['2','We confirm on WhatsApp','Instant WhatsApp and email confirmation. We follow up within hours to finalise details.'],
              ['3','We prep fresh on your day','No pre-cooked shortcuts. Every dish prepared fresh on the day of your event.'],
              ['4','Your guests leave happy','Generous portions, honest flavours, and the warmth of a home kitchen.'],
            ].map(([n, title, desc], i) => (
              <div key={n} style={{ textAlign: 'center', padding: '0 28px', position: 'relative', zIndex: 1 }} className={`reveal d${i+1}`}>
                <div style={{ width: 56, height: 56, background: 'var(--m)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Cormorant Garamond",serif', fontSize: '1.25rem', fontWeight: 700, margin: '0 auto 28px', boxShadow: '0 6px 24px rgba(61,21,32,.28)', position: 'relative' }}>
                  {n}
                  <div style={{ position: 'absolute', inset: -6, border: '1px solid rgba(61,21,32,.12)' }} />
                </div>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.15rem', fontWeight: 600, color: 'var(--tx)', marginBottom: 10, lineHeight: 1.3 }}>{title}</div>
                <div style={{ fontSize: '.875rem', color: 'var(--tx2)', lineHeight: 1.7 }}>{desc}</div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginTop: 64 }} className="testi-grid">
            {TESTI.map((t, i) => (
              <div key={t.name} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', padding: '44px 40px', transition: 'background .3s' }} className={`reveal d${i+1}`}>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '4rem', fontWeight: 700, color: 'var(--cu)', opacity: .5, lineHeight: .8, marginBottom: 8 }}>"</div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: 'var(--cu2)', fontSize: '.9rem' }}>★</span>)}</div>
                <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.12rem', color: 'rgba(255,255,255,.88)', lineHeight: 1.75, marginBottom: 32 }}>{t.q}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(184,120,74,.25)', border: '1.5px solid var(--cu)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Cormorant Garamond",serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--cu2)', flexShrink: 0 }}>{t.init}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.38)', marginTop: 3, letterSpacing: '.04em' }}>{t.ev}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 64 }} className="reveal">
            <Link to="/enquiry" style={btnPrimary}>Book Your Event</Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ background: 'var(--iv)', padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)' }} id="gallery">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ maxWidth: 640, marginBottom: 56 }} className="reveal">
            <div style={eyebrow}>Our Events</div>
            <h2 style={h2}>Food made for real <em style={{ fontStyle: 'italic', color: 'var(--m)' }}>celebrations</em></h2>
          </div>
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={src} className="gallery-item reveal">
                <img src={src} alt={`Sahaja Food event ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
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
        .steps-grid { grid-template-columns: repeat(4,1fr); }
        .testi-grid { grid-template-columns: repeat(3,1fr); }
        .gallery-grid { column-count: 3; column-gap: 20px; }
        .gallery-item { break-inside: avoid; margin-bottom: 20px; overflow: hidden; position: relative; }
        .gallery-item img { width: 100%; height: auto; display: block; transition: transform .6s ease; }
        .gallery-item:hover img { transform: scale(1.06); }
        @media(max-width:1100px){
          .about-band { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; gap: 48px !important; }
          .steps-line { display: none !important; }
          .testi-grid { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid { column-count: 2 !important; }
        }
        @media(max-width:768px){
          .hero-stats-wrap { flex-direction: column !important; width: 100% !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .mob-sticky-book { display: block !important; }
          section[id="how"] > div > div[style*="grid-template-columns"] { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid { column-count: 1 !important; }
        }
        @media(max-width:480px){
          section[id="how"] > div > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function DishCard({ dish, isVeg }: { dish: { name: string; desc: string; price: string; img: string }; isVeg: boolean }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', cursor: 'pointer', background: 'var(--iv2)' }} className="reveal dish-card-wrap"
      onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector('.dish-bg-img') as HTMLElement; if (img) img.style.transform = 'scale(1.07)' }}
      onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector('.dish-bg-img') as HTMLElement; if (img) img.style.transform = 'scale(1)' }}
    >
      <img src={dish.img} alt={dish.name} className="dish-bg-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }} loading="lazy" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(20,6,12,.9) 0%,rgba(20,6,12,.2) 60%,transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 28px 32px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', marginBottom: 12, color: isVeg ? 'var(--vg)' : '#e88a6a', background: isVeg ? 'rgba(42,96,64,.15)' : 'rgba(139,48,21,.2)', border: `1px solid ${isVeg ? 'rgba(42,96,64,.3)' : 'rgba(139,48,21,.3)'}` }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: isVeg ? 'var(--vg)' : '#e88a6a', display: 'inline-block' }} />
          {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
        </span>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 6 }}>{dish.name}</div>
        <div style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.5, marginBottom: 14 }}>{dish.desc}</div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.15rem', fontWeight: 600, color: 'var(--cu2)' }}>{dish.price} <span style={{ fontSize: '.8rem', opacity: .6 }}>/ plate</span></div>
        <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.35)', marginTop: 2, letterSpacing: '.04em' }}>Minimum 50 plates</div>
      </div>
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
const hstatStyle: React.CSSProperties = { padding: '20px 36px', borderRight: '1px solid rgba(255,255,255,.08)' }
const hstatN: React.CSSProperties = { fontFamily: '"Cormorant Garamond",serif', fontSize: '2.4rem', fontWeight: 700, color: 'var(--cu2)', lineHeight: 1, display: 'block' }
const hstatL: React.CSSProperties = { fontSize: '.72rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)', marginTop: 5, display: 'block' }
