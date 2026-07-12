import { Link } from 'react-router-dom'
export default function ThankYou() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--iv)', padding:40, textAlign:'center', paddingTop: 120 }}>
      <div style={{ maxWidth:520 }}>
        <div style={{ fontSize:'3.5rem', marginBottom:20 }}>🎉</div>
        <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'2.4rem', fontWeight:700, color:'var(--m)', marginBottom:12 }}>Enquiry Received!</h1>
        <p style={{ fontSize:'1rem', color:'var(--tx2)', lineHeight:1.75, marginBottom:36 }}>Thank you for choosing Sahaja Food. We'll confirm your booking via WhatsApp and email shortly. Looking forward to making your celebration delicious.</p>
        <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--m)', color:'#fff', padding:'16px 36px', fontFamily:'Jost,sans-serif', fontWeight:600, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', textDecoration:'none' }}>← Back to Home</Link>
      </div>
    </div>
  )
}
