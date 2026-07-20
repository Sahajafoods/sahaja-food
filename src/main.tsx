import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

// Catches any runtime crash so users see a branded fallback with a reload
// button instead of a blank white screen.
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: unknown) { console.error('App crashed:', error) }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FBF6ED', padding: 24, textAlign: 'center', fontFamily: 'Georgia, serif', color: '#3D1520' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: 12 }}>Sahaja Food</h1>
            <p style={{ marginBottom: 20, color: '#7A5C48' }}>Something went wrong loading the page.</p>
            <button onClick={() => window.location.reload()} style={{ background: '#3D1520', color: '#FBF6ED', border: 'none', padding: '12px 28px', fontSize: '.9rem', letterSpacing: '.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Reload
            </button>
            <p style={{ marginTop: 20, fontSize: '.85rem', color: '#7A5C48' }}>
              Or WhatsApp us at <a href="https://wa.me/919731910575" style={{ color: '#3D1520' }}>+91 97319 10575</a>
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
