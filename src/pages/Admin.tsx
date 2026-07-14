import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Enquiry } from '../lib/supabase'

const ALLOWED_EMAILS = ['nandinips90@gmail.com', 'nageshug@gmail.com']

export default function Admin() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
      if (data.session) loadEnquiries()
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) loadEnquiries()
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    if (!ALLOWED_EMAILS.includes(email.toLowerCase().trim())) {
      setAuthError('This email is not authorised to access the admin panel.')
      return
    }
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } })
    if (error) setAuthError(error.message)
    else setOtpSent(true)
    setAuthLoading(false)
  }

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    if (error) setAuthError('Invalid or expired code. Please try again.')
    setAuthLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setEnquiries([])
    setOtpSent(false)
    setEmail('')
    setOtp('')
  }

  const loadEnquiries = async () => {
    setDataLoading(true)
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    setEnquiries(data || [])
    setDataLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('enquiries').update({ status }).eq('id', id)
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: status as Enquiry['status'] } : e))
  }

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter)

  const statusColor: Record<string, string> = {
    new: '#E8A63C', contacted: '#3498db', confirmed: '#27AE60', closed: '#8A7D70'
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    border: '1.5px solid #E5DDD5', borderRadius: 10,
    fontFamily: 'inherit', fontSize: '0.95rem',
    background: 'var(--ivory)', outline: 'none',
    marginBottom: 16
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--warm)' }}>Loading...</p>
    </div>
  )

  // ── NOT LOGGED IN ────────────────────────────────────────────────
  if (!session) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ivory)', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 20, padding: 48, maxWidth: 400, width: '100%', boxShadow: '0 8px 48px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <div style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--forest)', marginBottom: 4 }}>Sahaja Admin</div>
        <p style={{ fontSize: '0.875rem', color: 'var(--warm)', marginBottom: 32 }}>
          {otpSent ? `We've sent a 6-digit code to ${email}` : 'Sign in with your authorised Google email'}
        </p>

        {!otpSent ? (
          <form onSubmit={sendOtp}>
            <input type="email" placeholder="nandinips90@gmail.com" value={email}
              onChange={e => setEmail(e.target.value)} required style={inputStyle}/>
            {authError && <p style={{ color: '#c0392b', fontSize: '0.82rem', marginBottom: 12, textAlign: 'left' }}>{authError}</p>}
            <button type="submit" disabled={authLoading} style={{
              width: '100%', background: 'var(--forest)', color: 'white',
              padding: 14, borderRadius: '100px', fontWeight: 600, border: 'none',
              cursor: authLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '0.95rem'
            }}>
              {authLoading ? 'Sending...' : 'Send Login Code →'}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <input type="text" placeholder="Enter 6-digit code" value={otp}
              onChange={e => setOtp(e.target.value)} required maxLength={6}
              style={{ ...inputStyle, letterSpacing: '0.2em', fontSize: '1.2rem', textAlign: 'center' }}/>
            {authError && <p style={{ color: '#c0392b', fontSize: '0.82rem', marginBottom: 12, textAlign: 'left' }}>{authError}</p>}
            <button type="submit" disabled={authLoading} style={{
              width: '100%', background: 'var(--forest)', color: 'white',
              padding: 14, borderRadius: '100px', fontWeight: 600, border: 'none',
              cursor: authLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '0.95rem', marginBottom: 12
            }}>
              {authLoading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            <button type="button" onClick={() => { setOtpSent(false); setOtp(''); setAuthError('') }}
              style={{ background: 'none', border: 'none', color: 'var(--warm)', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              ← Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  )

  // ── LOGGED IN ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: 88 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: '2rem', fontWeight: 700, color: '#2C2C2C' }}>Enquiries</h1>
            <p style={{ color: 'var(--warm)', fontSize: '0.9rem' }}>
              {enquiries.length} total · signed in as {session.user.email}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {['all', 'new', 'contacted', 'confirmed', 'closed'].map(s => (
              <button key={s} onClick={() => setFilter(s)} style={{
                padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 500,
                background: filter === s ? 'var(--forest)' : 'white',
                color: filter === s ? 'white' : 'var(--warm)',
                textTransform: 'capitalize'
              }}>{s}</button>
            ))}
            <button onClick={signOut} style={{
              padding: '8px 16px', borderRadius: '100px', border: '1.5px solid #E5DDD5',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.82rem',
              background: 'white', color: 'var(--warm)'
            }}>Sign out</button>
          </div>
        </div>

        {dataLoading ? (
          <p style={{ textAlign: 'center', color: 'var(--warm)', padding: 48 }}>Loading enquiries...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(e => (
              <div key={e.id} style={{ background: 'white', borderRadius: 16, padding: '24px 28px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.15rem', fontWeight: 600 }}>{e.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--warm)', marginTop: 4 }}>{e.email} · {e.phone}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600, background: `${statusColor[e.status || 'new']}20`, color: statusColor[e.status || 'new'] }}>
                      {e.status || 'new'}
                    </span>
                    <select value={e.status || 'new'} onChange={ev => updateStatus(e.id!, ev.target.value)}
                      style={{ padding: '6px 12px', borderRadius: 8, border: '1.5px solid #E5DDD5', fontFamily: 'inherit', fontSize: '0.82rem', background: 'var(--ivory)', cursor: 'pointer' }}>
                      {['new', 'contacted', 'confirmed', 'closed'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '8px 24px' }}>
                  {[['Event', e.event_type], ['Date', e.event_date], ['Time', e.event_time], ['Guests', String(e.guest_count)], ['Menu', e.menu_preference], ['Location', e.location || '—']].map(([label, val]) => (
                    <div key={label}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--warm)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                      <div style={{ fontSize: '0.9rem', color: '#2C2C2C', marginTop: 2 }}>{val}</div>
                    </div>
                  ))}
                </div>
                {e.message && (
                  <div style={{ marginTop: 12, padding: '12px 16px', background: 'var(--ivory)', borderRadius: 8, fontSize: '0.875rem', color: 'var(--warm)', lineHeight: 1.6 }}>
                    <strong style={{ color: '#2C2C2C' }}>Note:</strong> {e.message}
                  </div>
                )}
                <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'rgba(0,0,0,0.3)' }}>
                  Received: {e.created_at ? new Date(e.created_at).toLocaleString('en-IN') : '—'}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 64, color: 'var(--warm)' }}>No enquiries found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
