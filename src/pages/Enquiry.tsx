import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useReveal } from '../hooks/useReveal'

export default function Enquiry() {
  useReveal()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', phone:'', email:'', event_type:'', event_date:'', guest_count:'', menu_preference:'', location:'', message:'' })
  const upd = (k: string, v: string) => setForm(f => ({...f,[k]:v}))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const { error } = await supabase.from('enquiries').insert({...form, guest_count: parseInt(form.guest_count)})
      if (error) throw error
      fetch('/api/send-enquiry-email', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) }).catch(()=>{})
      navigate('/thank-you')
    } catch { alert('Something went wrong. Please WhatsApp us directly at +91 97319 10575.') }
    finally { setLoading(false) }
  }

  const fi: React.CSSProperties = { width:'100%', padding:'14px 18px', border:'1px solid var(--iv3)', fontFamily:'Jost,sans-serif', fontSize:'.95rem', color:'var(--tx)', background:'var(--iv)', outline:'none', WebkitAppearance:'none' as const, transition:'border-color .25s' }

  return (
    <div style={{ background: 'var(--iv)', paddingTop: 80 }}>
      <div style={{ background: 'var(--m)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cu2)', marginBottom: 16 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--cu)' }} />Book Your Event
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Let's make your event <em style={{ fontStyle:'italic', color:'var(--cu2)' }}>delicious</em></h1>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 48px 112px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 96, alignItems: 'start' }} className="enq-grid">
          <div style={{ position: 'sticky', top: 100 }} className="reveal-l">
            <p style={{ fontSize: '.95rem', color: 'var(--tx2)', lineHeight: 1.85, marginBottom: 40 }}>Tell us about your celebration and we'll get back within a few hours with a confirmation and quote. No pressure, no commitment upfront.</p>
            {[['📱','WhatsApp','+91 97319 10575'],['✉️','Email','hello@sahaja.food'],['📍','Serving','Bangalore & surrounding areas']].map(([icon,label,val]) => (
              <div key={label} style={{ display:'flex', alignItems:'flex-start', gap:16, marginBottom:22 }}>
                <div style={{ width:48, height:48, flexShrink:0, background:'rgba(61,21,32,.07)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>{icon}</div>
                <div><div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'1rem', fontWeight:600, color:'var(--tx)' }}>{label}</div><div style={{ fontSize:'.85rem', color:'var(--tx2)', marginTop:2 }}>{val}</div></div>
              </div>
            ))}
          </div>
          <div style={{ background:'#fff', padding:56, boxShadow:'0 12px 72px rgba(61,21,32,.09)', border:'1px solid var(--iv3)' }} className="reveal-r">
            <form onSubmit={handleSubmit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }} className="form-row">
                <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                  <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Full Name <span style={{color:'var(--cu)'}}>*</span></label>
                  <input style={fi} type="text" placeholder="Your name" value={form.name} onChange={e=>upd('name',e.target.value)} required/>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                  <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Phone <span style={{color:'var(--cu)'}}>*</span></label>
                  <input style={fi} type="tel" placeholder="+91 97319 10575" value={form.phone} onChange={e=>upd('phone',e.target.value)} required/>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Email <span style={{color:'var(--cu)'}}>*</span></label>
                <input style={fi} type="email" placeholder="you@example.com" value={form.email} onChange={e=>upd('email',e.target.value)} required/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }} className="form-row">
                <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                  <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Event Type <span style={{color:'var(--cu)'}}>*</span></label>
                  <select style={fi} value={form.event_type} onChange={e=>upd('event_type',e.target.value)} required>
                    <option value="" disabled>Select event</option>
                    {['Wedding / Reception','Birthday Celebration','Corporate Lunch / Dinner','Housewarming','Religious / Pooja','Anniversary','Other'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                  <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Event Date <span style={{color:'var(--cu)'}}>*</span></label>
                  <input style={fi} type="date" value={form.event_date} onChange={e=>upd('event_date',e.target.value)} required/>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }} className="form-row">
                <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                  <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>No. of Guests <span style={{color:'var(--cu)'}}>*</span></label>
                  <input style={fi} type="number" placeholder="e.g. 150" min="10" value={form.guest_count} onChange={e=>upd('guest_count',e.target.value)} required/>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                  <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Menu <span style={{color:'var(--cu)'}}>*</span></label>
                  <select style={fi} value={form.menu_preference} onChange={e=>upd('menu_preference',e.target.value)} required>
                    <option value="" disabled>Select preference</option>
                    {['Pure Vegetarian','Non-Vegetarian','Both Veg & Non-Veg'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
                <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Event Location</label>
                <input style={fi} type="text" placeholder="Venue / area in Bangalore" value={form.location} onChange={e=>upd('location',e.target.value)}/>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:0 }}>
                <label style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--tx)' }}>Special Requests</label>
                <textarea style={{...fi, resize:'vertical', minHeight:108}} placeholder="Dietary needs, specific dishes, allergies..." value={form.message} onChange={e=>upd('message',e.target.value)}/>
              </div>
              <button type="submit" disabled={loading} style={{ width:'100%', background: loading ? '#888' : 'var(--m)', color:'#fff', padding:18, marginTop:24, fontFamily:'Jost,sans-serif', fontSize:'.85rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', cursor: loading ? 'not-allowed' : 'pointer', border:'none', transition:'background .3s' }}>
                {loading ? 'Sending...' : 'Send Enquiry →'}
              </button>
              <p style={{ textAlign:'center', fontSize:'.75rem', color:'var(--tx2)', marginTop:14, letterSpacing:'.02em' }}>📱 WhatsApp &amp; email confirmation within a few hours.</p>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .enq-grid{grid-template-columns:1fr!important;gap:48px!important} }
        @media(max-width:640px){ .form-row{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  )
}
