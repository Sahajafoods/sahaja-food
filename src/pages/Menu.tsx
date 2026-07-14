import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import Lightbox, { LightboxItem } from '../components/Lightbox'
import { TabKey, TAB_LABELS, TAB_COLORS, COMBOS } from '../data/menuCombos'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=80&auto=format&fit=crop'
const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = FALLBACK_IMG }

const SPECIALS = [
  { name: 'Tropical Coconut Bowl', img: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&q=80&auto=format&fit=crop' },
  { name: 'Watermelon Mint Hydrator', img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80&auto=format&fit=crop' },
  { name: 'Chia Energy Cup', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80&auto=format&fit=crop' },
  { name: 'Protein Hydration Cup', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80&auto=format&fit=crop' },
]

const PROTEIN_BOX = {
  img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700&q=80&auto=format&fit=crop',
  protein: 'Grilled Chicken / Boiled Egg / Fish',
  note: '(price varies by protein)',
  includes: ['Fruit Portion', 'Salad'],
}

function ExpandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
    </svg>
  )
}

function ComboCard({ combo, delay, onOpen }: { combo: { name: string; items: string[]; img: string }; delay: number; onOpen: () => void }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', background: 'var(--iv2)', cursor: 'pointer' }} className={`combo-card reveal d${delay}`}
      onClick={onOpen}
      onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector('img') as HTMLElement; if (img) img.style.transform = 'scale(1.07)' }}
      onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector('img') as HTMLElement; if (img) img.style.transform = 'scale(1)' }}
    >
      <img src={combo.img} alt={combo.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }} loading="lazy" onError={onImgError} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(20,6,12,.92) 0%,rgba(20,6,12,.4) 55%,transparent 100%)' }} />
      <div className="combo-card-hint" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, opacity: 0, transition: 'opacity .3s', pointerEvents: 'none' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <ExpandIcon />
        </div>
        <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff' }}>Click to view</span>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 28px 32px' }}>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>{combo.name}</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
          {combo.items.map(item => (
            <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.85rem', color: 'rgba(255,255,255,.88)' }}>
              <span style={{ width: 5, height: 5, background: 'var(--cu2)', display: 'inline-block', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SpreadBanner({ img, title, subtitle }: { img: string; title: string; subtitle: string }) {
  return (
    <div style={{ position: 'relative', height: 320, overflow: 'hidden' }} className="reveal">
      <img src={img} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} loading="lazy" onError={onImgError} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,6,12,.92) 0%, rgba(20,6,12,.75) 35%, rgba(20,6,12,.3) 65%, rgba(20,6,12,.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 480, padding: '0 24px' }} className="spread-banner-text">
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '.8rem', color: 'rgba(255,255,255,.88)', marginBottom: 12 }}>{subtitle}</div>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', fontWeight: 700, color: '#fff' }}>{title}</div>
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  useReveal()
  const [tab, setTab] = useState<TabKey>('nonveg')
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null)
  const combos = COMBOS[tab]

  return (
    <div style={{ background: 'var(--iv)', paddingTop: 80 }}>
      <div style={{ background: 'var(--m)', padding: '80px clamp(20px, 5vw, 48px) 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cu2)', marginBottom: 16 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--cu)' }} />Foods We Serve
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.15 }}>Wholesome Food. Thoughtful Portions.<br />Made for Every Occasion.</h1>
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(255,255,255,.6)' }}>Minimum 30 guests · Veg &amp; Non-Veg available · Custom menus on request</p>
          <div style={{ display: 'flex', gap: 0, border: '1px solid rgba(255,255,255,.15)', overflow: 'hidden', marginTop: 32, width: 'fit-content', flexWrap: 'wrap' }} className="menu-tabs">
            {(Object.keys(TAB_LABELS) as TabKey[]).map((t, i) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '13px 28px', fontFamily: 'Jost,sans-serif', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer',
                background: tab === t ? TAB_COLORS[t] : 'transparent', color: '#fff', border: 'none',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,.15)' : 'none', transition: 'all .25s',
              }}>{TAB_LABELS[t]}</button>
            ))}
          </div>
        </div>
      </div>

      <section style={{ background: '#fff', paddingTop: 72 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: 20 }}>
            {combos.map((c, i) => (
              <ComboCard key={c.name} combo={c} delay={(i % 3) + 1} onOpen={() => setLightboxItem({ src: c.img, alt: c.name, name: c.name, items: c.items })} />
            ))}
          </div>
        </div>

        {/* ── FULL-BLEED SPREAD BANNERS ── */}
        <div style={{ marginTop: 96 }}>
          <SpreadBanner img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&q=90&auto=format&fit=crop" title="Pure Vegetarian" subtitle="Freshly prepared with the finest ingredients, every single day" />
          <div style={{ height: 1, width: '100%', background: 'rgba(184,120,74,.2)' }} />
          <SpreadBanner img="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=90&auto=format&fit=crop" title="Non Vegetarian" subtitle="Bold flavours, tender meats, made the day of your event" />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px clamp(20px, 5vw, 48px) 0' }}>
          {/* ── OUR SPECIALS ── */}
          <div style={{ marginBottom: 96 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cu)', marginBottom: 16 }} className="reveal">
              <span style={{ display: 'block', width: 24, height: 1, background: 'var(--cu)' }} />Signature Extras
            </div>
            <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--tx)', marginBottom: 40 }} className="reveal">Our Specials</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="specials-grid">
              {SPECIALS.map((s, i) => (
                <div key={s.name} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1', background: 'var(--iv2)' }} className={`reveal d${i + 1}`}>
                  <img src={s.img} alt={s.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" onError={onImgError} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(20,6,12,.85) 0%,rgba(20,6,12,.15) 60%,transparent 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px' }}>
                    <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.05rem', fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>{s.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PROTEIN BOX ── */}
          <div style={{ marginBottom: 96 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cu)', marginBottom: 16 }} className="reveal">
              <span style={{ display: 'block', width: 24, height: 1, background: 'var(--cu)' }} />For the Fitness Focused
            </div>
            <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: 'var(--tx)', marginBottom: 40 }} className="reveal">Protein Box</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', background: 'var(--iv2)', padding: 'clamp(20px,3vw,32px)' }} className="protein-grid">
              <div className="reveal-l" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={PROTEIN_BOX.img} alt="Protein Box" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" onError={onImgError} />
              </div>
              <div className="reveal-r">
                <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: 'var(--m)', marginBottom: 16 }}>Protein Box</div>
                <p style={{ fontSize: '1rem', color: 'var(--tx)', lineHeight: 1.7, marginBottom: 20 }}>
                  {PROTEIN_BOX.protein} <span style={{ color: 'var(--tx2)', fontStyle: 'italic' }}>{PROTEIN_BOX.note}</span>
                </p>
                <div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--tx2)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Includes</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PROTEIN_BOX.includes.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.95rem', color: 'var(--tx)' }}>
                      <span style={{ width: 6, height: 6, background: 'var(--cu)', display: 'inline-block', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '0 clamp(20px, 5vw, 48px) 112px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }} className="reveal">
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--tx2)', marginBottom: 28 }}>
            Menu starts from ₹X per plate. Custom menus available. Contact us to discuss.
          </p>
          <Link to="/enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--m)', color: '#fff', padding: '18px 38px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Enquire About Your Menu →</Link>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .specials-grid{grid-template-columns:1fr 1fr!important}
          .protein-grid{grid-template-columns:1fr!important;gap:24px!important}
        }
        @media(max-width:480px){
          .menu-tabs button{padding:11px 16px!important;font-size:.7rem!important}
        }
        .combo-card:hover .combo-card-hint{opacity:1!important}
        .spread-banner-text{padding-left:72px!important}
        @media(max-width:768px){
          .spread-banner-text{padding-left:28px!important}
        }
      `}</style>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  )
}
