import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    if (!finePointer.matches) return

    const root = document.documentElement
    const cursorLabel = document.querySelector('.cursor-label')
    const handleMove = (event: PointerEvent) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`)
      root.style.setProperty('--pointer-y', `${event.clientY}px`)
      root.style.setProperty('--cursor-shift-x', `${((event.clientX / window.innerWidth) - 0.5) * 8}px`)
      root.style.setProperty('--cursor-shift-y', `${((event.clientY / window.innerHeight) - 0.5) * 8}px`)
    }
    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      const projectTarget = target.closest('[data-cursor-label]') as HTMLElement | null
      if (projectTarget && cursorLabel) {
        cursorLabel.textContent = projectTarget.dataset.cursorLabel || 'VIEW'
        root.classList.add('cursor-project')
      } else if (target.closest('a, button, input, textarea, label, [data-cursor="interactive"]')) {
        if (cursorLabel) cursorLabel.textContent = 'LINK'
        root.classList.add('cursor-link')
      }
      if (target.closest('a, button, input, textarea, label, [data-cursor="interactive"]')) {
        root.classList.add('cursor-hover')
      }
    }
    const handleOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      const projectTarget = target.closest('[data-cursor-label]')
      if (projectTarget) root.classList.remove('cursor-project')
      if (target.closest('a, button, input, textarea, label, [data-cursor="interactive"]')) {
        root.classList.remove('cursor-hover')
        root.classList.remove('cursor-link')
      }
    }

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerover', handleOver)
    document.addEventListener('pointerout', handleOut)
    document.body.classList.add('custom-cursor-enabled')

    return () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerout', handleOut)
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  return (
    <>
      <span className="cursor-dot" aria-hidden="true" />
      <span className="cursor-ring" aria-hidden="true" />
      <span className="cursor-label" aria-hidden="true" />
    </>
  )
}
