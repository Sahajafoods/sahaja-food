import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Enquiry } from '../lib/supabase'

const ALLOWED_EMAILS = ['nandinips90@gmail.com', 'foodssahaja@gmail.com']
const STATUS_STEPS = ['new', 'contacted', 'confirmed', 'closed'] as const

const STATUS_COLORS: Record<string, string> = {
  new: '#B8784A',
  contacted: '#3B6EA5',
  confirmed: '#2A6040',
  closed: '#8C8377',
}

const formatDateTime = (date?: string, time?: string) => {
  if (!date) return '—'
  const d = new Date(`${date}T${time || '00:00'}`)
  const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = time ? d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''
  return timeStr ? `${dateStr} · ${timeStr}` : dateStr
}

export default function Admin() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [accessDenied, setAccessDenied] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleSession = (s: Session | null) => {
      if (s) {
        const userEmail = s.user.email?.toLowerCase().trim() ?? ''
        if (ALLOWED_EMAILS.includes(userEmail)) {
          setAccessDenied(null)
          setSession(s)
          loadEnquiries()
        } else {
          setAccessDenied(s.user.email || 'This account')
          setSession(null)
          supabase.auth.signOut()
        }
      } else {
        setSession(null)
      }
    }
    supabase.auth.getSession().then(({ data }) => { handleSession(data.session); setLoading(false) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => handleSession(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    setAccessDenied(null)
    setAuthLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin`, queryParams: { prompt: 'select_account' } }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setEnquiries([])
  }

  const loadEnquiries = async () => {
    setDataLoading(true)
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    setEnquiries(data || [])
    setDataLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: status as Enquiry['status'] } : e))
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (error) { console.error('Status update failed:', error); loadEnquiries() }
  }

  const toggleExpand = (id: string) => setExpanded(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter)

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
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '2rem', fontWeight: 700, color: 'var(--m)', marginBottom: 8 }}>Sahaja Admin</div>
        {!accessDenied && (
          <p style={{ fontSize: '.9rem', color: 'var(--tx2)', lineHeight: 1.6, marginBottom: 36 }}>
            Sign in with your authorised Google account to manage enquiries.
          </p>
        )}
        {accessDenied && (
          <div style={{ background: 'rgba(139,48,21,.08)', border: '1px solid rgba(139,48,21,.25)', padding: '16px 18px', marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--nv)', marginBottom: 4 }}>Access denied</div>
            <div style={{ fontSize: '.82rem', color: 'var(--tx2)', lineHeight: 1.55 }}>{accessDenied} isn't authorised for the Sahaja Food admin panel. Please sign in with an approved account.</div>
          </div>
        )}
        <button onClick={signInWithGoogle} disabled={authLoading} style={{
          width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          background: '#fff', color: 'var(--tx)', border: '1px solid var(--iv3)', padding: '15px 24px',
          fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.9rem', cursor: authLoading ? 'not-allowed' : 'pointer', transition: 'border-color .2s'
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
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(28px,5vw,48px) clamp(20px,5vw,32px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 700, color: 'var(--m)' }}>Enquiries</h1>
            <p style={{ fontSize: '.85rem', color: 'var(--tx2)', marginTop: 4 }}>
              {enquiries.length} total enquir{enquiries.length === 1 ? 'y' : 'ies'} · signed in as {session.user.email}
            </p>
          </div>
          <button onClick={signOut} style={{ padding: '11px 24px', border: '1px solid var(--m)', background: 'transparent', color: 'var(--m)', fontFamily: 'Jost,sans-serif', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {['all', ...STATUS_STEPS].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '9px 18px', border: filter === s ? 'none' : '1px solid var(--iv3)', cursor: 'pointer',
              fontFamily: 'Jost,sans-serif', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.03em', textTransform: 'capitalize',
              background: filter === s ? 'var(--m)' : '#fff', color: filter === s ? '#fff' : 'var(--tx2)', transition: 'all .2s'
            }}>{s}</button>
          ))}
        </div>

        {dataLoading ? (
          <p style={{ textAlign: 'center', color: 'var(--tx2)', padding: 64, fontFamily: 'Jost,sans-serif' }}>Loading enquiries...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(e => (
              <div key={e.id} style={{ background: '#fff', border: '1px solid var(--iv3)', padding: 'clamp(22px,4vw,30px)', boxShadow: '0 4px 24px rgba(61,21,32,.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                  <div>
                    <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--tx)' }}>{e.name}</div>
                    <div style={{ fontSize: '.85rem', color: 'var(--tx2)', marginTop: 4 }}>{e.phone}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={badgeStyle(e.status)}>{e.status || 'new'}</span>
                    <select value={e.status || 'new'} onChange={ev => updateStatus(e.id!, ev.target.value)}
                      style={{ padding: '7px 12px', border: '1px solid var(--iv3)', borderRadius: 0, fontFamily: 'Jost,sans-serif', fontSize: '.8rem', background: 'var(--iv)', color: 'var(--tx)', cursor: 'pointer' }}>
                      {STATUS_STEPS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '16px 24px', paddingTop: 18, borderTop: '1px solid var(--iv3)' }}>
                  {[
                    ['Event Type', e.event_type],
                    ['Date & Time', formatDateTime(e.event_date, e.event_time)],
                    ['Menu Selection', e.menu_preference],
                    ['Guest Count', e.guest_count],
                    ['Location', e.location || '—'],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: '.68rem', fontWeight: 600, color: 'var(--tx2)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</div>
                      <div style={{ fontSize: '.9rem', color: 'var(--tx)', marginTop: 3 }}>{val}</div>
                    </div>
                  ))}
                </div>
                {e.message && (
                  <div style={{ marginTop: 18 }}>
                    <button onClick={() => toggleExpand(e.id!)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--cu)', fontFamily: 'Jost,sans-serif', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {expanded.has(e.id!) ? 'Hide special request' : 'View special request'} {expanded.has(e.id!) ? '▲' : '▼'}
                    </button>
                    {expanded.has(e.id!) && (
                      <div style={{ marginTop: 10, padding: '14px 18px', background: 'var(--iv)', border: '1px solid var(--iv3)', fontSize: '.88rem', color: 'var(--tx2)', lineHeight: 1.65 }}>
                        {e.message}
                      </div>
                    )}
                  </div>
                )}
                <div style={{ marginTop: 16, fontSize: '.72rem', color: 'var(--tx2)', opacity: .6 }}>
                  Received {e.created_at ? new Date(e.created_at).toLocaleString('en-IN') : '—'}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 64, color: 'var(--tx2)', fontFamily: 'Jost,sans-serif' }}>No enquiries found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  )
}
