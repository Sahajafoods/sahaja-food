import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import SignInModal from './SignInModal'

const S: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    padding: '0 clamp(20px, 5vw, 48px)',
    transition: 'background .45s ease, box-shadow .45s ease',
  },
  navSolid: {
    background: 'rgba(251,246,237,.97)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 1px 0 rgba(61,21,32,.09)',
  },
  inner: {
    maxWidth: 1280, margin: '0 auto',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 80,
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' },
  logoImg: { width: 52, height: 52, objectFit: 'contain' as const, filter: 'drop-shadow(0 2px 8px rgba(61,21,32,.25))', transition: 'transform .3s' },
  logoWords: { display: 'flex', flexDirection: 'column' as const, lineHeight: '1' },
  links: { display: 'flex', alignItems: 'center', gap: 40 },
  bookBtn: {
    background: 'var(--m)', color: '#fff',
    padding: '12px 28px', fontFamily: 'Jost, sans-serif',
    fontWeight: 600, fontSize: '.8rem', letterSpacing: '.1em', textTransform: 'uppercase' as const,
    transition: 'background .3s', textDecoration: 'none', display: 'inline-block',
    boxShadow: '0 4px 20px rgba(61,21,32,.3)',
  },
}

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobOpen(false); setAvatarMenuOpen(false) }, [location])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!avatarMenuOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [avatarMenuOpen])

  const firstName = session
    ? (session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email || 'there').split(' ')[0].split('@')[0]
    : ''

  const signOut = async () => {
    await supabase.auth.signOut()
    setAvatarMenuOpen(false)
    navigate('/')
  }

  const nameColor = (!isHome || solid) ? 'var(--m)' : '#fff'
  const tagColor = (!isHome || solid) ? 'var(--cu)' : 'rgba(255,255,255,.6)'
  const linkColor = (!isHome || solid) ? 'var(--tx)' : 'rgba(255,255,255,.82)'
  const hamColor = (!isHome || solid) ? 'var(--tx)' : 'rgba(255,255,255,.85)'

  return (
    <>
      {/* Mobile overlay */}
      {mobOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200, background: 'var(--m3)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
        }}>
          <button onClick={() => setMobOpen(false)} style={{ position: 'absolute', top: 28, right: 32, background: 'none', border: 'none', color: 'rgba(255,255,255,.5)', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
          <img src="/Sahaja_Logo.png" alt="Sahaja" style={{ width: 72, height: 72, objectFit: 'contain', opacity: .8, marginBottom: 8 }} />
          {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About'], ['/enquiry', 'Book Event']].map(([path, label]) => (
            <Link key={path} to={path} style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.4rem', fontWeight: 600, color: 'rgba(255,255,255,.88)', textDecoration: 'none', letterSpacing: '.06em' }}>{label}</Link>
          ))}
          {session ? (
            <>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--cu2)' }}>Hi, {firstName}</span>
              <Link to="/my-bookings" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.4rem', fontWeight: 600, color: 'rgba(255,255,255,.88)', textDecoration: 'none', letterSpacing: '.06em' }}>My Bookings</Link>
              <button onClick={signOut} style={{ background: 'none', border: 'none', fontFamily: '"Cormorant Garamond", serif', fontSize: '2.4rem', fontWeight: 600, color: 'rgba(255,255,255,.88)', letterSpacing: '.06em', cursor: 'pointer' }}>Sign Out</button>
            </>
          ) : (
            <button onClick={() => { setMobOpen(false); setShowSignIn(true) }} style={{ background: 'none', border: 'none', fontFamily: '"Cormorant Garamond", serif', fontSize: '2.4rem', fontWeight: 600, color: 'rgba(255,255,255,.88)', letterSpacing: '.06em', cursor: 'pointer' }}>Sign In</button>
          )}
        </div>
      )}

      <nav style={{ ...S.nav, ...(solid ? S.navSolid : {}) }}>
        <div style={S.inner}>
          <Link to="/" style={S.logoWrap}>
            <img src="/Sahaja_Logo.png" alt="Sahaja Food" style={{ ...S.logoImg, filter: solid ? 'none' : S.logoImg.filter }} />
            <div style={S.logoWords}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.45rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: nameColor, textShadow: solid ? 'none' : '0 1px 12px rgba(0,0,0,.5)', transition: 'color .3s' }}>
                Sahaja Food
              </span>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '.72rem', fontStyle: 'italic', color: tagColor, marginTop: 3, transition: 'color .3s' }}>
                Nourishment for Every Gathering
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={S.links} className="desktop-nav">
            {['/menu', '/about'].map((path) => (
              <Link key={path} to={path} style={{ fontSize: '.8rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: linkColor, textDecoration: 'none', transition: 'color .3s' }}>
                {path.slice(1)}
              </Link>
            ))}
            {session ? (
              <div ref={avatarRef} style={{ position: 'relative' }}>
                <button onClick={() => setAvatarMenuOpen(o => !o)} aria-label="Account menu" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--cu)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: '"Cormorant Garamond",serif', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {firstName.charAt(0).toUpperCase()}
                </button>
                {avatarMenuOpen && (
                  <div style={{ position: 'absolute', top: 52, right: 0, minWidth: 180, background: 'var(--iv)', border: '1px solid var(--iv3)', boxShadow: '0 12px 40px rgba(61,21,32,.15)', zIndex: 110 }}>
                    <Link to="/my-bookings" onClick={() => setAvatarMenuOpen(false)} style={{ display: 'block', padding: '14px 20px', fontSize: '.85rem', fontWeight: 500, color: 'var(--tx)', textDecoration: 'none', borderBottom: '1px solid var(--iv3)' }}>
                      My Bookings
                    </Link>
                    <button onClick={signOut} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 20px', fontSize: '.85rem', fontWeight: 500, color: 'var(--m)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Jost,sans-serif' }}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowSignIn(true)} style={{ background: 'none', border: 'none', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--cu)', cursor: 'pointer', fontFamily: 'Jost,sans-serif' }}>
                Sign In
              </button>
            )}
            <Link to="/enquiry" style={{ ...S.bookBtn }}>Book Your Event</Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobOpen(true)} className="hamburger-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'none', flexDirection: 'column', gap: 5 }}>
            {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 24, height: 1.5, background: hamColor, borderRadius: 0 }} />)}
          </button>
        </div>
      </nav>

      <style>{`
        @media(max-width:768px){
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        a:hover { opacity: .8; }
      `}</style>

      <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  )
}
