'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Fixed CSS gradient mesh behind app content.
 * Glass surfaces use backdrop-filter on this layer — WebGL canvas cannot be sampled by backdrop-filter.
 */
export default function AmbientBackdrop() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(<div className="ambient-backdrop" aria-hidden />, document.body)
}
