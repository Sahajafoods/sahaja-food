import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { TabKey, TAB_LABELS, TAB_COLORS, COMBOS, STARTER_CATEGORIES, Combo } from '../data/menuCombos'

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

function ComboCard({ combo, delay }: { combo: Combo; delay: number }) {
  return (
    <div className={`combo-card reveal d${delay}`} style={{ background: '#fff', border: '1px solid var(--iv3)' }}>
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img src={combo.img} alt={combo.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" onError={onImgError} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(20,6,12,.88) 0%,rgba(20,6,12,.3) 55%,rgba(20,6,12,.5) 100%)' }} />
        {combo.badge && (
          <div style={{ position: 'absolute', top: 18, right: 18, background: 'var(--cu)', color: '#fff', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', padding: '6px 13px' }}>{combo.badge}</div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 26px' }}>
          <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.5rem,2.6vw,1.9rem)', fontWeight: 700, color: '#fff' }}>{combo.name}</div>
        </div>
      </div>
      <div style={{ padding: 'clamp(22px,3vw,30px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {combo.sections.map(sec => (
            <div key={sec.label} style={{ display: 'flex', gap: 16 }}>
              <div style={{ minWidth: 92, flexShrink: 0, paddingTop: 2, fontFamily: 'Jost,sans-serif', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--cu)' }}>{sec.label}</div>
              <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.05rem', color: 'var(--tx)', lineHeight: 1.5 }}>{sec.value}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: 'var(--cu)', opacity: .25, margin: '24px 0 16px' }} />
        <Link to="/enquiry" style={{ fontFamily: 'Jost,sans-serif', fontSize: '.8rem', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--cu)', textDecoration: 'none' }}>Enquire About This Menu →</Link>
      </div>
    </div>
  )
}

function StarterCard({ cat, delay }: { cat: { title: string; items: string[] }; delay: number }) {
  return (
    <div className={`reveal d${delay}`} style={{ background: 'var(--iv2)', border: '1px solid var(--iv3)', padding: 'clamp(22px,3vw,28px)' }}>
      <div style={{ fontFamily: 'Jost,sans-serif', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--cu)', marginBottom: 18 }}>{cat.title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {cat.items.map(item => (
          <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: '"Cormorant Garamond",serif', fontSize: '1.05rem', color: 'var(--tx)' }}>
            <span style={{ width: 5, height: 5, background: 'var(--cu2)', display: 'inline-block', flexShrink: 0 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Menu() {
  useReveal()
  const [tab, setTab] = useState<TabKey>('nonveg')

  return (
    <div style={{ background: 'var(--iv)', paddingTop: 80 }}>
      <div style={{ background: 'var(--m)', padding: '80px clamp(20px, 5vw, 48px) 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cu2)', marginBottom: 16 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--cu)' }} />Foods We Serve
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.15 }}>Wholesome Food. Thoughtful Portions.<br />Made for Every Occasion.</h1>
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(255,255,255,.6)' }}>Minimum 30 guests · Veg &amp; Non-Veg available · Custom menus on request</p>
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.45)', marginTop: 10 }}>All menus are fully customisable. Minimum 30 guests. Pricing shared on enquiry.</p>
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
          {tab === 'starters' ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="starters-grid">
                {STARTER_CATEGORIES.map((cat, i) => (
                  <StarterCard key={cat.title} cat={cat} delay={(i % 3) + 1} />
                ))}
              </div>
              <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '.95rem', color: 'var(--tx2)', textAlign: 'center', marginTop: 36 }}>
                Available as add-ons to any combo. Quantities and pricing on enquiry.
              </p>
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="combo-grid">
              {COMBOS[tab].map((c, i) => (
                <ComboCard key={c.name} combo={c} delay={(i % 3) + 1} />
              ))}
            </div>
          )}
        </div>

        <div style={{ margin: '96px auto 0', maxWidth: 1280, padding: '0 clamp(20px, 5vw, 48px)' }}>
          <div style={{ height: 1, width: '100%', background: 'var(--cu)', opacity: .25 }} />
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
          .combo-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:700px){
          .starters-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:480px){
          .menu-tabs button{padding:11px 16px!important;font-size:.7rem!important}
        }
      `}</style>
    </div>
  )
}
