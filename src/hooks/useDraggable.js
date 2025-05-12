import { useCallback, useRef } from 'react'

export default function useDraggable(onDrag) {
  const dragRef = useRef(null)
  const isDragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback((event) => {
    isDragging.current = true
    startPos.current = {
      x: event.clientX,
      y: event.clientY
    }
    dragRef.current = event.target
    event.target.style.cursor = 'grabbing'
  }, [])

  const handleMouseMove = useCallback((event) => {
    if (!isDragging.current || !dragRef.current) return

    const dx = event.clientX - startPos.current.x
    const dy = event.clientY - startPos.current.y

    onDrag(dragRef.current, dx, dy)

    startPos.current = {
      x: event.clientX,
      y: event.clientY
    }
  }, [onDrag])

  const handleMouseUp = useCallback(() => {
    if (dragRef.current) {
      dragRef.current.style.cursor = 'grab'
    }
    isDragging.current = false
    dragRef.current = null
  }, [])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
} 