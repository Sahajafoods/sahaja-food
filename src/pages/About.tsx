import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const FOUNDER_PHOTO = 'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Founder%20Pictures/Nandini%20P.png'

const FULL_BIO = [
  `Nandini P grew up understanding something most people only discover much later — that the best food is never just about ingredients. It is about intention.`,
  `A Bengaluru-based food entrepreneur with a rare combination of culinary instinct and a vision for what food can do for people, Nandini founded Sahaja Food with a deceptively simple idea: catering should feel effortless. Not just for the host, but for every guest who sits down at the table.`,
  `Over the years, Nandini has built a reputation across Bangalore for delivering events that guests remember — not just for the food, but for the feeling. The warmth of a home kitchen at the scale of a celebration. Fresh ingredients sourced every morning. Dishes made the day of, never before. A standard she holds without compromise, regardless of whether she is serving 50 guests or 500.`,
  `Beyond Sahaja Food, Nandini is also the founder of Poushtic — a millet-based food venture built on a conviction that has quietly shaped her entire culinary philosophy: that the food India ate for centuries before the modern diet arrived was not just culturally rich, it was medicine. Through Poushtic, she is on a mission to make millet mainstream — not by making it feel like a sacrifice, but by making it taste like the best meal you have ever had.`,
  `Two ventures. One woman. One unwavering belief that food, made right, can change how people feel — every single day.`,
]

const STATS: [string, string][] = [['50+', 'Events'], ['2', 'Ventures'], ['1', 'City'], ['Countless', 'Memories']]

const PHILOSOPHY: [string, string, string][] = [
  ['🌿', 'Fresh, Every Morning', 'Ingredients sourced daily. If it is not fresh, it does not reach the pot.'],
  ['🍳', 'Made the Day Of', 'No pre-cooked shortcuts. Every dish prepared fresh on the day of your event.'],
  ['❤️', 'Quality Without Compromise', '50 guests or 500 — the same hands, the same recipes, the same standard.'],
]

export default function About() {
  useReveal()
  return (
    <div style={{ background: 'var(--iv)', paddingTop: 80 }}>

      {/* ── HERO ── */}
      <section style={{ background: 'var(--m)', padding: '90px clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }} className="about-hero-grid">
            <div className="reveal-l">
              <span style={{ display: 'block', width: 56, height: 2, background: 'var(--cu)', marginBottom: 28 }} />
              <blockquote style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 500, color: '#fff', lineHeight: 1.4, margin: 0 }}>
                "Food is not just sustenance — it is memory, love, and belonging on a plate."
              </blockquote>
            </div>
            <div className="reveal-r about-hero-photo" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ border: '8px solid rgba(255,255,255,.92)', boxShadow: '0 24px 64px rgba(0,0,0,.35)', maxWidth: 360, width: '100%' }}>
                <img src={FOUNDER_PHOTO} alt="Nandini P, Founder of Sahaja Food" style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIO ── */}
      <section style={{ background: 'var(--iv)', padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'start' }} className="about-bio-grid">
            <div className="reveal-l">
              {FULL_BIO.map((p, i) => (
                <p key={i} style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--tx)', marginBottom: i === FULL_BIO.length - 1 ? 0 : 26 }}>{p}</p>
              ))}
            </div>
            <div style={{ position: 'sticky', top: 100 }}>
              <div className="reveal-r">
                <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.1rem,4vw,2.8rem)', fontWeight: 700, color: 'var(--m)', marginBottom: 6 }}>Nandini P</h2>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--cu)', marginBottom: 28 }}>Founder, Sahaja Food</div>
                <span style={{ display: 'block', width: 56, height: 2, background: 'var(--cu)', marginBottom: 32 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 20px', marginBottom: 36 }}>
                  {STATS.map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '2.2rem', fontWeight: 700, color: 'var(--m)', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: '.72rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--tx2)', marginTop: 6 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--iv2)', borderLeft: '3px solid var(--cu)', padding: '20px 24px', marginBottom: 28 }}>
                  <p style={{ fontSize: '.9rem', color: 'var(--tx2)', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>Also the founder of Poushtic — bringing millet food to the mainstream, one delicious meal at a time.</p>
                </div>
                <a href="https://instagram.com/nandinipannirselvam" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--cu)', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  @nandinipannirselvam
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ background: 'var(--iv2)', padding: 'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 56 }} className="about-phil-grid">
            {PHILOSOPHY.map(([icon, title, desc], i) => (
              <div key={title} style={{ textAlign: 'center' }} className={`reveal d${i + 1}`}>
                <div style={{ width: 64, height: 64, margin: '0 auto 24px', background: 'rgba(61,21,32,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>{icon}</div>
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.35rem', fontWeight: 700, color: 'var(--tx)', marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: '.9rem', color: 'var(--tx2)', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--m)', padding: 'clamp(64px, 10vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }} className="reveal">
          <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', marginBottom: 32, lineHeight: 1.2 }}>
            Ready to make your next gathering <em style={{ fontStyle: 'italic', color: 'var(--cu2)' }}>unforgettable</em>?
          </h2>
          <Link to="/enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: 'var(--m)', padding: '18px 40px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Book Your Event →
          </Link>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .about-hero-grid{grid-template-columns:1fr!important;gap:40px!important}
          .about-hero-photo{order:-1}
          .about-bio-grid{grid-template-columns:1fr!important;gap:48px!important}
          .about-phil-grid{grid-template-columns:1fr!important;gap:40px!important}
        }
      `}</style>
    </div>
  )
}
