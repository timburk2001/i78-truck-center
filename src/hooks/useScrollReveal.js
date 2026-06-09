import { useEffect } from 'react'

// `key` (e.g. the current route path) re-attaches the observer after client-side
// navigation. With an empty dep array the effect ran only once on Layout mount, so a
// newly navigated page's .reveal elements were never observed — they stayed at
// opacity:0 (blank) until a hard refresh remounted everything.
export default function useScrollReveal(key) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const obs = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [key])
}
