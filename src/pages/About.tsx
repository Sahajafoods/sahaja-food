import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  useReveal()
  return (
    <div style={{ background:'var(--iv)', paddingTop:80 }}>
      <div style={{ background:'var(--m)', padding:'80px clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:12, fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'1rem', color:'var(--cu2)', marginBottom:16 }}>
            <span style={{ display:'block', width:28, height:1, background:'var(--cu)' }}/>Our Story
          </div>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:700, color:'#fff' }}>Made with <em style={{ fontStyle:'italic', color:'var(--cu2)' }}>intention</em></h1>
        </div>
      </div>
      <section style={{ padding:'clamp(64px, 10vw, 112px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }} className="about-pg-grid">
            <div style={{ position:'relative' }} className="reveal-l">
              <div style={{ width:'100%', height:560, backgroundImage:"url('https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=85&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center' }}/>
              <div style={{ position:'absolute', bottom:24, left:-24, background:'var(--m)', padding:'20px 24px', boxShadow:'0 8px 28px rgba(61,21,32,.3)' }}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'2.4rem', fontWeight:900, color:'var(--cu2)', lineHeight:1 }}>50+</div>
                <div style={{ fontSize:'.72rem', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginTop:6 }}>Celebrations Made Delicious</div>
              </div>
            </div>
            <div className="reveal-r">
              <div style={{ display:'inline-flex', alignItems:'center', gap:12, fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'1rem', color:'var(--cu)', marginBottom:16 }}>
                <span style={{ display:'block', width:24, height:1, background:'var(--cu)' }}/>Who We Are
              </div>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:700, color:'var(--tx)', marginBottom:20, lineHeight:1.15 }}>Food made with <em style={{ fontStyle:'italic', color:'var(--m)' }}>intention</em></h2>
              <p style={{ fontSize:'1rem', color:'var(--tx2)', lineHeight:1.8, marginBottom:16 }}>Sahaja means effortless — the way great food should feel. What started as cooking for family gatherings grew into a catering service trusted across Bangalore for weddings, corporate lunches, and everything in between.</p>
              <p style={{ fontSize:'1rem', color:'var(--tx2)', lineHeight:1.8, marginBottom:36 }}>We believe the best meals are made simply — fresh ingredients, practiced hands, and genuine care for what ends up on the plate. No frozen shortcuts. Just honest food.</p>
              {[['🌿','Sourced fresh every day','We buy from local vendors each morning. If it\'s not fresh, it doesn\'t reach the pot.'],
                ['🍳','Home-kitchen quality at scale','The same recipes, the same hands — for 50 guests or 500.'],
                ['📲','Easy to book, clear pricing','WhatsApp confirmations, per-plate pricing, no hidden charges.'],
              ].map(([icon,title,desc]) => (
                <div key={title} style={{ display:'flex', alignItems:'flex-start', gap:16, marginBottom:20 }}>
                  <div style={{ width:44, height:44, flexShrink:0, background:'rgba(61,21,32,.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>{icon}</div>
                  <div><div style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, color:'var(--tx)', marginBottom:3, fontSize:'.95rem' }}>{title}</div><div style={{ fontSize:'.875rem', color:'var(--tx2)', lineHeight:1.6 }}>{desc}</div></div>
                </div>
              ))}
              <Link to="/enquiry" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--m)', color:'#fff', padding:'16px 32px', fontFamily:'Jost,sans-serif', fontWeight:600, fontSize:'.82rem', letterSpacing:'.1em', textTransform:'uppercase', textDecoration:'none', marginTop:24 }}>Book Your Event →</Link>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.about-pg-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </div>
  )
}
