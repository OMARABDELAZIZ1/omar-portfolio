import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    const bar = document.getElementById('scroll-bar')

    const move = e => {
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
      setTimeout(() => {
        ring.style.left = e.clientX + 'px'
        ring.style.top = e.clientY + 'px'
      }, 60)
    }

    const scroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      bar.style.width = pct + '%'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <div id="scroll-bar" />
    </>
  )
}
