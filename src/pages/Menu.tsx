import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const ALL_DISHES = {
  veg: [
    { name:'Dal Makhani', desc:'Slow-cooked black lentils in a rich tomato and butter base.', price:'₹80', img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop' },
    { name:'Vegetable Biryani', desc:'Aromatic basmati with seasonal vegetables and saffron. With house raita.', price:'₹120', img:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80&auto=format&fit=crop' },
    { name:'Paneer Butter Masala', desc:'Soft cottage cheese in a velvety tomato-cashew gravy.', price:'₹110', img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80&auto=format&fit=crop' },
    { name:'Chana Masala', desc:'Hearty chickpeas in a robust spiced gravy with tangy amchur.', price:'₹75', img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80&auto=format&fit=crop' },
    { name:'Palak Paneer', desc:'Velvety spinach puree with soft paneer, tempered with cumin and garlic.', price:'₹100', img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80&auto=format&fit=crop' },
    { name:'Jeera Rice', desc:'Fragrant basmati tempered with cumin seeds, ghee, and whole spices.', price:'₹60', img:'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80&auto=format&fit=crop' },
  ],
  nonveg: [
    { name:'Chicken Biryani', desc:'Dum-cooked basmati with tender chicken and our house spice blend.', price:'₹150', img:'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600&q=80&auto=format&fit=crop' },
    { name:'Mutton Curry', desc:'Bone-in mutton slow-cooked in a bold Karnataka-style gravy.', price:'₹180', img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop' },
    { name:'Chicken Chettinad', desc:'Freshly ground Chettinad masala. Fiery, fragrant, unforgettable.', price:'₹160', img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80&auto=format&fit=crop' },
    { name:'Fish Curry', desc:'Tangy coconut-based curry with fresh local fish. A coastal classic.', price:'₹170', img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80&auto=format&fit=crop' },
    { name:'Chicken Tikka Masala', desc:'Grilled chicken in a rich, smoky tomato-based sauce.', price:'₹155', img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80&auto=format&fit=crop' },
    { name:'Egg Curry', desc:'Hard-boiled eggs in a spiced onion-tomato gravy. Simple and deeply comforting.', price:'₹90', img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop' },
  ]
}

export default function Menu() {
  useReveal()
  const [tab, setTab] = useState<'veg'|'nonveg'>('veg')
  const dishes = ALL_DISHES[tab]
  const isVeg = tab === 'veg'

  return (
    <div style={{ background: 'var(--iv)', paddingTop: 80 }}>
      <div style={{ background: 'var(--m)', padding: '80px 48px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:12, fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'1rem', color:'var(--cu2)', marginBottom:16 }}>
            <span style={{ display:'block', width:28, height:1, background:'var(--cu)' }}/>Foods We Serve
          </div>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:700, color:'#fff', marginBottom:12 }}>Our Menu</h1>
          <p style={{ fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'1.1rem', color:'rgba(255,255,255,.6)' }}>Every dish made fresh. Minimum 50 plates per item.</p>
          <div style={{ display:'flex', gap:0, border:'1px solid rgba(255,255,255,.15)', overflow:'hidden', marginTop:32, width:'fit-content' }}>
            {['veg','nonveg'].map(t => (
              <button key={t} onClick={()=>setTab(t as 'veg'|'nonveg')} style={{ padding:'13px 32px', fontFamily:'Jost,sans-serif', fontSize:'.78rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', cursor:'pointer', background: tab===t ? 'rgba(255,255,255,.15)' : 'transparent', color:'#fff', border:'none', borderRight: t==='veg' ? '1px solid rgba(255,255,255,.15)' : 'none', transition:'all .25s' }}>
                {t==='veg' ? '🌿 Vegetarian' : '🍗 Non-Vegetarian'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section style={{ background:'#fff', padding:'72px 48px 112px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:2, marginBottom:72 }}>
            {dishes.map((d,i) => (
              <div key={d.name} style={{ position:'relative', overflow:'hidden', aspectRatio:'3/4', background:'var(--iv2)' }} className={`reveal d${(i%3)+1}`}
                onMouseEnter={e=>{const img=(e.currentTarget as HTMLElement).querySelector('img') as HTMLElement;if(img)img.style.transform='scale(1.07)'}}
                onMouseLeave={e=>{const img=(e.currentTarget as HTMLElement).querySelector('img') as HTMLElement;if(img)img.style.transform='scale(1)'}}>
                <img src={d.img} alt={d.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform .5s ease' }} loading="lazy" onError={e=>{(e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&auto=format&fit=crop'}}/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(20,6,12,.9) 0%,rgba(20,6,12,.2) 60%,transparent 100%)' }}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'28px 28px 32px' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:'.68rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', padding:'4px 12px', marginBottom:12, color: isVeg ? 'var(--vg)' : '#e88a6a', background: isVeg ? 'rgba(42,96,64,.15)' : 'rgba(139,48,21,.2)', border:`1px solid ${isVeg ? 'rgba(42,96,64,.3)' : 'rgba(139,48,21,.3)'}` }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background: isVeg ? 'var(--vg)' : '#e88a6a', display:'inline-block' }}/>
                    {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'1.4rem', fontWeight:700, color:'#fff', marginBottom:6 }}>{d.name}</div>
                  <div style={{ fontSize:'.82rem', color:'rgba(255,255,255,.6)', lineHeight:1.5, marginBottom:14 }}>{d.desc}</div>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'1.15rem', fontWeight:600, color:'var(--cu2)' }}>{d.price} <span style={{fontSize:'.8rem',opacity:.6}}>/ plate</span></div>
                  <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.35)', marginTop:2 }}>Minimum 50 plates</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center' }} className="reveal">
            <p style={{ fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'1.1rem', color:'var(--tx2)', marginBottom:28 }}>Want a custom combination? We'll work with your preferences.</p>
            <Link to="/enquiry" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'var(--m)', color:'#fff', padding:'18px 38px', fontFamily:'Jost,sans-serif', fontWeight:600, fontSize:'.85rem', letterSpacing:'.1em', textTransform:'uppercase', textDecoration:'none' }}>Enquire About Your Menu →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
