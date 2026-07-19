import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { TabKey, TAB_LABELS, TAB_COLORS, COMBOS, STARTER_CATEGORIES, Combo } from '../data/menuCombos'

const FALLBACK_IMG = 'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/4.jpg'
const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = FALLBACK_IMG }

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
  const [tab, setTab] = useState<TabKey>('nonveg')
  useReveal([tab])

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

        <div style={{ margin: '96px auto 0', maxWidth: 1280, padding: '0 clamp(20px, 5vw, 48px)' }} className="reveal">
          <div style={{ background: 'var(--m)', padding: 'clamp(48px,8vw,72px) clamp(24px,5vw,48px)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: '#fff', marginBottom: 32, lineHeight: 1.25 }}>
              Every menu is customised for your event.<br />Let's plan yours.
            </h2>
            <Link to="/enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: 'var(--m)', padding: '18px 38px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Enquire Now →</Link>
          </div>
        </div>
        <div style={{ height: 96 }} />
      </section>

      <style>{`
        @media(max-width:900px){
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
