import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Enquiry from './pages/Enquiry'
import ThankYou from './pages/ThankYou'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div style={{ background: 'var(--iv)', minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
