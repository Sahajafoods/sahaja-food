import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Lightbox, { LightboxItem } from '../components/Lightbox'

const GALLERY_IMAGES = [
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/1.jpeg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/2.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/3.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/4.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/6.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/7.jpg',
  'https://lhlqtrexevjgfhiszsak.supabase.co/storage/v1/object/public/Gallery/9.jpeg',
]

export default function Gallery() {
  useReveal()
  const [active, setActive] = useState<LightboxItem | null>(null)

  return (
    <div style={{ background: 'var(--iv)', paddingTop: 80 }}>
      <div style={{ background: 'var(--m)', padding: '80px clamp(20px, 5vw, 48px) 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cu2)', marginBottom: 16 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--cu)' }} />Our Events
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>Our Events</h1>
          <p style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(255,255,255,.6)' }}>Real food. Real celebrations. Real memories.</p>
        </div>
      </div>

      <section style={{ background: '#fff', padding: '72px clamp(20px, 5vw, 48px) 112px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="gallery-page-grid">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={src} className="gallery-page-item reveal" onClick={() => setActive({ src, alt: `Sahaja Food event ${i + 1}` })}>
                <img src={src} alt={`Sahaja Food event ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .gallery-page-grid { column-count: 3; column-gap: 20px; }
        .gallery-page-item { break-inside: avoid; margin-bottom: 20px; overflow: hidden; position: relative; cursor: pointer; }
        .gallery-page-item img { width: 100%; height: auto; display: block; transition: transform .6s ease; }
        .gallery-page-item:hover img { transform: scale(1.06); }
        @media(max-width:1100px){ .gallery-page-grid { column-count: 2 !important; } }
        @media(max-width:768px){ .gallery-page-grid { column-count: 1 !important; } }
      `}</style>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </div>
  )
}
