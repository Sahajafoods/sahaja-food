import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--m)', color: '#fff', padding: '80px clamp(20px, 5vw, 48px) 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: 56, marginBottom: 56 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
              <img src="/Sahaja_Logo.png" alt="Sahaja Food" style={{ width: 56, height: 56, objectFit: 'contain', opacity: .85 }} />
              <div>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>Sahaja Food</div>
              </div>
            </div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '.85rem', color: 'var(--cu2)', marginBottom: 16 }}>Nourishment for Every Gathering</div>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.8, maxWidth: 300, marginBottom: 28 }}>
              Authentic South Indian catering — freshly prepared Veg &amp; Non-Veg meals for every celebration across Bangalore.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://wa.me/919731910575" target="_blank" rel="noopener" style={socStyle} title="WhatsApp">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="#" style={socStyle} title="Instagram">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          {[
            { title: 'Menu', links: [['Menu', '/menu'], ['Non-Veg', '/menu'], ['Enquiry', '/enquiry']] },
            { title: 'Company', links: [['About', '/about'], ['Reviews', '/#testimonials'], ['Contact', '/enquiry']] },
            { title: 'Contact', links: [['97319 10575', 'tel:+919731910575'], ['hello@sahaja.food', 'mailto:hello@sahaja.food']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {col.links.map(([label, href]) => (
                  href.startsWith('/') || href.startsWith('#')
                    ? <Link key={label} to={href} style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>{label}</Link>
                    : <a key={label} href={href} style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.22)' }}>© 2025 Sahaja Food. All rights reserved. Made with <span style={{ color: 'var(--cu2)' }}>♥</span> in Bangalore.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms'].map(t => <a key={t} href="#" style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.22)', textDecoration: 'none' }}>{t}</a>)}
          </div>
        </div>
      </div>
      <style>{`
        .footer-grid { grid-template-columns: 2.2fr 1fr 1fr 1fr; }
        @media(max-width:1024px){ .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } }
        @media(max-width:640px){ .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  )
}

const socStyle: React.CSSProperties = {
  width: 40, height: 40, border: '1px solid rgba(255,255,255,.12)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'rgba(255,255,255,.5)', textDecoration: 'none',
}
