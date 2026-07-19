import { useEffect } from 'react'

// Reveals .reveal / .reveal-l / .reveal-r elements once they enter the
// viewport. Uses rect checks on scroll rather than IntersectionObserver so
// content still appears in environments where IO callbacks are throttled or
// inert. Pass deps for pages that mount new reveal elements after the initial
// render (e.g. tab switches) so they get picked up too.
export function useReveal(deps: readonly unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal, .reveal-l, .reveal-r'))
    const pending = new Set(els.filter(el => !el.classList.contains('in')))
    if (!pending.size) return

    const detach = () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
    const check = () => {
      const limit = window.innerHeight - 48
      pending.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < limit && r.bottom > 0) {
          el.classList.add('in')
          pending.delete(el)
        }
      })
      if (!pending.size) detach()
    }

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()
    return detach
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
