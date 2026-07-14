import { useEffect } from 'react'

export interface LightboxItem {
  src: string
  alt: string
  name?: string
  items?: string[]
}

export default function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div onClick={onClose} className="lightbox-overlay" style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(10,3,6,.92)', cursor: 'zoom-out' }}>
      <img src={item.src} alt={item.alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,3,6,.85) 0%, rgba(10,3,6,.1) 45%, rgba(10,3,6,.4) 100%)' }} />
      <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 24, right: 24, width: 44, height: 44, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.35)', color: '#fff', fontSize: '1.3rem', lineHeight: 1, cursor: 'pointer' }}>✕</button>
      {(item.name || item.items) && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 'clamp(24px,5vw,56px)', maxWidth: 560 }}>
          {item.name && <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>{item.name}</div>}
          {item.items && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {item.items.map(i => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1rem', color: 'rgba(255,255,255,.9)' }}>
                  <span style={{ width: 6, height: 6, background: 'var(--cu2)', display: 'inline-block', flexShrink: 0 }} />
                  {i}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <style>{`
        .lightbox-overlay { animation: lightboxFadeIn .25s ease; }
        @keyframes lightboxFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}
