import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Enquiry } from '../lib/supabase'
import GoogleIcon from '../components/GoogleIcon'

const STATUS_COLORS: Record<string, string> = {
  new: '#B8784A',
  contacted: '#3B6EA5',
  confirmed: '#2A6040',
  closed: '#8C8377',
}

const formatDate = (date?: string, time?: string) => {
  if (!date) return '—'
  const d = new Date(`${date}T${time || '00:00'}`)
  const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = time ? d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''
  return timeStr ? `${dateStr} · ${timeStr}` : dateStr
}

export default function MyBookings() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [bookings, setBookings] = useState<Enquiry[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    const handleSession = (s: Session | null) => {
      setSession(s)
      if (s) loadBookings(s.user.id)
    }
    supabase.auth.getSession().then(({ data }) => { handleSession(data.session); setLoading(false) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => handleSession(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  const loadBookings = async (userId: string) => {
    setDataLoading(true)
    const { data } = await supabase.from('enquiries').select('*').eq('user_id', userId).order('event_date', { ascending: false })
    setBookings(data || [])
    setDataLoading(false)
  }

  const signInWithGoogle = async () => {
    setAuthLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/my-bookings`, queryParams: { prompt: 'select_account' } }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setBookings([])
  }

  const bookAgain = (b: Enquiry) => {
    navigate('/enquiry', {
      state: {
        prefill: {
          name: b.name, phone: b.phone, email: b.email,
          event_type: b.event_type, event_date: b.event_date, event_time: b.event_time,
          menu_preference: b.menu_preference, guest_count: b.guest_count,
          location: b.location, message: b.message,
        }
      }
    })
  }

  const badgeStyle = (status?: string): React.CSSProperties => {
    const c = STATUS_COLORS[status || 'new']
    return { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: c, background: `${c}1F`, border: `1px solid ${c}55` }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--iv)' }}>
      <p style={{ fontFamily: 'Jost,sans-serif', color: 'var(--tx2)' }}>Loading...</p>
    </div>
  )

  // ── NOT LOGGED IN ────────────────────────────────────────────────
  if (!session) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--iv)', padding: 24, paddingTop: 88 }}>
      <div style={{ background: '#fff', border: '1px solid var(--iv3)', padding: 'clamp(36px,6vw,56px) clamp(28px,6vw,48px)', maxWidth: 420, width: '100%', boxShadow: '0 12px 60px rgba(61,21,32,.08)', textAlign: 'center' }}>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '2rem', fontWeight: 700, color: 'var(--m)', marginBottom: 8 }}>My Bookings</div>
        <p style={{ fontSize: '.9rem', color: 'var(--tx2)', lineHeight: 1.6, marginBottom: 36 }}>
          Sign in with Google to view your past enquiries and book again in one click.
        </p>
        <button onClick={signInWithGoogle} disabled={authLoading} style={{
          width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          background: '#fff', color: 'var(--tx)', border: '1px solid var(--iv3)', padding: '15px 24px',
          fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.9rem', cursor: authLoading ? 'not-allowed' : 'pointer'
        }}>
          <GoogleIcon />
          {authLoading ? 'Redirecting…' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )

  // ── LOGGED IN ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--iv)', paddingTop: 88 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px,5vw,48px) clamp(20px,5vw,32px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
          <div>
            <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 700, color: 'var(--m)' }}>My Bookings</h1>
            <p style={{ fontSize: '.85rem', color: 'var(--tx2)', marginTop: 4 }}>
              {bookings.length} enquir{bookings.length === 1 ? 'y' : 'ies'} · signed in as {session.user.email}
            </p>
          </div>
          <button onClick={signOut} style={{ padding: '11px 24px', border: '1px solid var(--m)', background: 'transparent', color: 'var(--m)', fontFamily: 'Jost,sans-serif', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>

        {dataLoading ? (
          <p style={{ textAlign: 'center', color: 'var(--tx2)', padding: 64, fontFamily: 'Jost,sans-serif' }}>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', background: '#fff', border: '1px solid var(--iv3)' }}>
            <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.4rem', color: 'var(--tx)', marginBottom: 12 }}>No enquiries yet</p>
            <p style={{ fontSize: '.9rem', color: 'var(--tx2)', marginBottom: 24 }}>Once you submit an enquiry while signed in, it'll show up here.</p>
            <a href="/enquiry" style={{ display: 'inline-block', background: 'var(--m)', color: '#fff', padding: '14px 32px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.82rem', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Book Your Event</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
            {bookings.map(b => (
              <div key={b.id} style={{ background: '#fff', border: '1px solid var(--iv3)', padding: 'clamp(22px,4vw,28px)', boxShadow: '0 4px 24px rgba(61,21,32,.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                  <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--tx)' }}>{b.event_type}</div>
                  <span style={badgeStyle(b.status)}>{b.status || 'new'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--iv3)', flex: 1 }}>
                  {[
                    ['Date', formatDate(b.event_date, b.event_time)],
                    ['Menu', b.menu_preference],
                    ['Guests', b.guest_count],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--tx2)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
                      <span style={{ fontSize: '.88rem', color: 'var(--tx)', textAlign: 'right' }}>{val}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => bookAgain(b)} style={{ width: '100%', background: 'var(--m)', color: '#fff', border: 'none', padding: '13px 20px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.8rem', letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background .3s' }}>
                  Book Again
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
