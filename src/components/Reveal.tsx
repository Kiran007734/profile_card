import { useEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isInInitialViewport = element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0
    if (reducedMotion || isInInitialViewport || !('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return
    }

    element.classList.add('motion-ready')

    let fallbackTimer = window.setTimeout(() => {
      element.classList.add('is-visible')
    }, 1800)

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.clearTimeout(fallbackTimer)
            element.classList.add('is-visible')
            observer.unobserve(element)
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
      )

      observer.observe(element)
      return () => {
        window.clearTimeout(fallbackTimer)
        observer.disconnect()
      }
    } catch {
      window.clearTimeout(fallbackTimer)
      element.classList.remove('motion-ready')
      element.classList.add('is-visible')
    }
  }, [])

  return (
    <div ref={elementRef} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  )
}
