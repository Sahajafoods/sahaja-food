import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )
    const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r')
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
