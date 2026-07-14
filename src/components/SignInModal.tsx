import { useState } from 'react'
import { supabase } from '../lib/supabase'
import GoogleIcon from './GoogleIcon'

export default function SignInModal({ open, onClose, onBeforeSignIn }: { open: boolean; onClose: () => void; onBeforeSignIn?: () => void }) {
  const [loading, setLoading] = useState(false)
  if (!open) return null

  const handleGoogleSignIn = async () => {
    onBeforeSignIn?.()
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${window.location.pathname}`, queryParams: { prompt: 'select_account' } }
    })
  }

  return (
    <div onClick={onClose} className="signin-modal-overlay" style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,6,12,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} className="signin-modal-card" style={{ position: 'relative', background: 'var(--iv)', border: '1px solid var(--iv3)', boxShadow: '0 24px 80px rgba(20,6,12,.35)', maxWidth: 420, width: '100%', padding: '44px 36px', textAlign: 'center' }}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: '1.3rem', color: 'var(--tx2)', cursor: 'pointer', lineHeight: 1, padding: 4 }}>✕</button>
        <img src="/Sahaja_Logo.png" alt="Sahaja Food" width={80} height={80} style={{ objectFit: 'contain', margin: '0 auto 20px' }} />
        <h2 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--m)', marginBottom: 10 }}>Welcome back</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--tx2)', lineHeight: 1.6, marginBottom: 32 }}>Sign in to track and manage your bookings</p>
        <button onClick={handleGoogleSignIn} disabled={loading} style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: '#fff', color: 'var(--tx)', border: '1px solid var(--iv3)', padding: '15px 24px', fontFamily: 'Jost,sans-serif', fontWeight: 600, fontSize: '.9rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
          <GoogleIcon />
          {loading ? 'Redirecting…' : 'Continue with Google'}
        </button>
      </div>
      <style>{`
        @media(max-width:640px){
          .signin-modal-overlay { align-items: flex-end !important; padding: 0 !important; }
          .signin-modal-card { max-width: 100% !important; border-left: none !important; border-right: none !important; border-bottom: none !important; animation: signinSlideUp .3s ease; }
        }
        @keyframes signinSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  )
}
