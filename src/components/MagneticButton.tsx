import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function MagneticButton({ children, className = '', onPointerMove, onPointerLeave, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (button && event.pointerType !== 'touch') {
      const bounds = button.getBoundingClientRect()
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12
      button.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    onPointerMove?.(event)
  }

  const handleLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (buttonRef.current) buttonRef.current.style.transform = ''
    onPointerLeave?.(event)
  }

  return (
    <button ref={buttonRef} className={`magnetic-button ${className}`} onPointerMove={handleMove} onPointerLeave={handleLeave} {...props}>
      {children}
    </button>
  )
}
