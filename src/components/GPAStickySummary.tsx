'use client'

import './GPAStickySummary.css'
import { motion, useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { track } from '../analytics'
import { Course } from '../types/Course'
import { calculateGPA } from '../utils/gradeUtils'
import { getCreditHoursBreakdown } from '../utils/creditHours'
import { getGPAAssessment } from '../utils/gpaAssessment'
import { useLocale } from '../i18n/LocaleContext'
import { WesternDigits } from './LocaleDisplay'

interface GPAStickySummaryProps {
  courses: Course[]
}

interface DockMetrics {
  gapWidth: number
  gapCenter: number
  height: number
}

interface LayoutSnapshot {
  top: number
  width: number
  height: number
  paddingBlock: number
  paddingInline: number
  borderRadius: number
  backgroundColor: string
  borderColor: string
  backdropFilter: string
}

type PendingAnimation = 'dock' | 'undock' | null

const DOCK_GAP = 8
const DOCK_MAX_CONTAINER_RATIO = 0.9
const DOCK_EASE = [0.22, 1, 0.36, 1] as const
const DOCK_MIN_SAFE_WIDTH = 280

const DOCK_TRANSITION = {
  duration: 0.24,
  ease: DOCK_EASE,
}

const UNDOCK_TRANSITION = {
  duration: 0.18,
  ease: DOCK_EASE,
}

function readCSSValue(property: string, fallback: number): number {
  if (typeof document === 'undefined') return fallback
  const probe = document.createElement('div')
  probe.style.cssText = `position:absolute;visibility:hidden;padding-top:var(${property})`
  document.body.appendChild(probe)
  const value = parseFloat(getComputedStyle(probe).paddingTop) || fallback
  document.body.removeChild(probe)
  return value
}

function readDockTop(): number {
  return readCSSValue('--space-md', 16)
}

function readContainerWidth(root: HTMLElement): number {
  const container = root.closest('.container')
  return container?.getBoundingClientRect().width ?? root.getBoundingClientRect().width
}

function readSlotCenter(slot: HTMLElement): number {
  const rect = slot.getBoundingClientRect()
  return rect.left + rect.width / 2
}

function clampNumber(value: number, min: number, max: number): number {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

function clampAnchorToViewport(center: number, width: number): number {
  if (typeof window === 'undefined') return center
  const margin = readDockTop()
  const halfWidth = width / 2
  return clampNumber(center, margin + halfWidth, window.innerWidth - margin - halfWidth)
}

function computeDockedWidth(metrics: DockMetrics, containerWidth: number): number {
  if (typeof window === 'undefined') {
    return Math.min(metrics.gapWidth || containerWidth * DOCK_MAX_CONTAINER_RATIO, containerWidth * DOCK_MAX_CONTAINER_RATIO)
  }

  const margin = readDockTop()
  const viewportSafeWidth = Math.max(0, window.innerWidth - margin * 2)
  const maxContainerWidth = Math.min(containerWidth * DOCK_MAX_CONTAINER_RATIO, viewportSafeWidth)

  if (metrics.gapWidth > 0) {
    return Math.min(metrics.gapWidth, maxContainerWidth)
  }

  const safeMinimum = Math.min(DOCK_MIN_SAFE_WIDTH, maxContainerWidth)
  return Math.max(safeMinimum, maxContainerWidth)
}

function resolveDockedPlacement(
  metrics: DockMetrics,
  containerWidth: number,
): { width: number; centerX: number } {
  const width = computeDockedWidth(metrics, containerWidth)
  const centerX = clampAnchorToViewport(metrics.gapCenter, width)
  return { width, centerX }
}

function computeDockMetrics(): DockMetrics | null {
  const howTo = document.querySelector('.how-to-btn')
  const lang = document.querySelector('.language-switcher')
  if (!howTo || !lang) return null
  const howRect = howTo.getBoundingClientRect()
  const langRect = lang.getBoundingClientRect()
  const startRect = howRect.left <= langRect.left ? howRect : langRect
  const endRect = howRect.left <= langRect.left ? langRect : howRect
  const gapLeft = startRect.right + DOCK_GAP
  const gapRight = endRect.left - DOCK_GAP
  const gapWidth = Math.max(0, gapRight - gapLeft)
  return {
    gapWidth,
    gapCenter: gapLeft + gapWidth / 2,
    height: Math.max(howRect.height, langRect.height),
  }
}

function glassColor(alpha: number): string {
  return `rgba(255, 255, 255, ${alpha})`
}

function snapshotRest(summary: HTMLElement): LayoutSnapshot {
  const rect = summary.getBoundingClientRect()
  return {
    top: rect.top,
    width: rect.width,
    height: rect.height,
    paddingBlock: readCSSValue('--space-md', 16),
    paddingInline: readCSSValue('--space-lg', 24),
    borderRadius: readCSSValue('--radius-lg', 16),
    backgroundColor: glassColor(0.28),
    borderColor: glassColor(0.5),
    backdropFilter: 'blur(0px)',
  }
}

function snapshotSlot(slot: HTMLElement, height: number): LayoutSnapshot {
  const rect = slot.getBoundingClientRect()
  return {
    top: rect.top,
    width: rect.width,
    height,
    paddingBlock: readCSSValue('--space-md', 16),
    paddingInline: readCSSValue('--space-lg', 24),
    borderRadius: readCSSValue('--radius-lg', 16),
    backgroundColor: glassColor(0.28),
    borderColor: glassColor(0.5),
    backdropFilter: 'blur(0px)',
  }
}

function snapshotDocked(
  metrics: DockMetrics,
  dockTop: number,
  width: number,
): LayoutSnapshot {
  return {
    top: dockTop,
    width,
    height: metrics.height,
    paddingBlock: 0,
    paddingInline: readCSSValue('--space-md', 16),
    borderRadius: readCSSValue('--radius-md', 12),
    backgroundColor: glassColor(0.3),
    borderColor: glassColor(0.4),
    backdropFilter: 'blur(12px)',
  }
}

function snapshotToMotion(snapshot: LayoutSnapshot) {
  return {
    top: snapshot.top,
    width: snapshot.width,
    height: snapshot.height,
    paddingTop: snapshot.paddingBlock,
    paddingBottom: snapshot.paddingBlock,
    paddingLeft: snapshot.paddingInline,
    paddingRight: snapshot.paddingInline,
    borderRadius: snapshot.borderRadius,
    backgroundColor: snapshot.backgroundColor,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: snapshot.borderColor,
    backdropFilter: snapshot.backdropFilter,
    WebkitBackdropFilter: snapshot.backdropFilter,
  }
}

function layoutsEqual(a: LayoutSnapshot, b: LayoutSnapshot): boolean {
  return (
    a.top === b.top
    && a.width === b.width
    && a.height === b.height
    && a.paddingBlock === b.paddingBlock
    && a.paddingInline === b.paddingInline
    && a.borderRadius === b.borderRadius
  )
}

function measureSlotFootprint(slot: HTMLElement): number {
  return slot.getBoundingClientRect().height
}

function shouldUndock(slot: HTMLElement, dockTop: number): boolean {
  const rect = slot.getBoundingClientRect()

  // Home slot still above the viewport — stay docked.
  if (rect.bottom <= 0) return false

  // As soon as the home row is visible and past the dock band, return immediately.
  return rect.top > dockTop
}

export default function GPAStickySummary({ courses }: GPAStickySummaryProps) {
  const { t, locale } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLElement | null>(null)
  const dockedRef = useRef(false)
  const animatingRef = useRef(false)
  const pendingAnimRef = useRef<PendingAnimation>(null)
  const layoutInstantRef = useRef(false)
  const spacerHeightRef = useRef(0)
  const layoutRef = useRef<LayoutSnapshot | null>(null)

  const [isFloating, setIsFloating] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [spacerHeight, setSpacerHeight] = useState(0)
  const [layout, setLayout] = useState<LayoutSnapshot | null>(null)
  const [anchorX, setAnchorX] = useState<number | null>(null)
  const [isUndocking, setIsUndocking] = useState(false)
  const [layoutInstant, setLayoutInstant] = useState(false)

  const gpa = calculateGPA(courses)
  const creditHoursBreakdown = getCreditHoursBreakdown(courses)
  const { passedCredits } = creditHoursBreakdown
  const assessment = getGPAAssessment(gpa)
  const showAssessment = gpa !== 0

  useEffect(() => {
    if (showAssessment) {
      track('gpa_assessment_shown', { assessment_key: assessment.key.replace(/^gpa\./, '') })
    }
  }, [showAssessment, assessment.key])

  const transition = layoutInstant || prefersReducedMotion
    ? { duration: 0 }
    : isUndocking
      ? UNDOCK_TRANSITION
      : DOCK_TRANSITION

  const updateDockedLayout = useCallback((root: HTMLElement) => {
    if (!dockedRef.current || animatingRef.current) return

    const metrics = computeDockMetrics()
    if (!metrics) return

    const dockTop = readDockTop()
    const containerWidth = readContainerWidth(root)
    const { width, centerX: nextAnchor } = resolveDockedPlacement(metrics, containerWidth)
    const next = snapshotDocked(metrics, dockTop, width)
    const prev = layoutRef.current

    if (!prev || layoutsEqual(prev, next)) {
      setAnchorX(nextAnchor)
      return
    }

    layoutInstantRef.current = true
    setLayoutInstant(true)
    layoutRef.current = next
    setAnchorX(nextAnchor)
    setLayout(next)
    requestAnimationFrame(() => {
      layoutInstantRef.current = false
      setLayoutInstant(false)
    })
  }, [])

  const beginDock = useCallback((summary: HTMLElement, root: HTMLElement, slot: HTMLElement) => {
    const metrics = computeDockMetrics()
    if (!metrics) return

    const containerWidth = readContainerWidth(root)
    const dockTop = readDockTop()
    const from = snapshotRest(summary)
    const { width, centerX } = resolveDockedPlacement(metrics, containerWidth)
    const to = snapshotDocked(metrics, dockTop, width)
    const footprint = measureSlotFootprint(slot)

    setSpacerHeight(footprint)
    spacerHeightRef.current = footprint
    animatingRef.current = true
    dockedRef.current = true
    pendingAnimRef.current = 'dock'
    track('gpa_sticky_dock')
    setIsUndocking(false)
    setIsFloating(true)
    setIsCompact(true)
    setAnchorX(centerX)

    layoutInstantRef.current = true
    setLayoutInstant(true)
    layoutRef.current = from
    setLayout(from)

    requestAnimationFrame(() => {
      layoutInstantRef.current = false
      setLayoutInstant(false)
      layoutRef.current = to
      setLayout(to)
      if (prefersReducedMotion) {
        animatingRef.current = false
        pendingAnimRef.current = null
      }
    })
  }, [prefersReducedMotion])

  const beginUndock = useCallback((
    _root: HTMLElement,
    slot: HTMLElement,
    summaryHeight: number,
  ) => {
    const to = snapshotSlot(slot, summaryHeight)
    const centerX = clampAnchorToViewport(readSlotCenter(slot), to.width)

    animatingRef.current = true
    pendingAnimRef.current = 'undock'
    track('gpa_sticky_undock')
    setIsUndocking(true)
    setIsCompact(false)
    setIsFloating(true)
    setAnchorX(centerX)
    layoutRef.current = to
    setLayoutInstant(false)
    setLayout(to)

    if (prefersReducedMotion) {
      dockedRef.current = false
      setIsFloating(false)
      setIsCompact(false)
      setIsUndocking(false)
      setAnchorX(null)
      layoutRef.current = null
      setLayout(null)
      animatingRef.current = false
      pendingAnimRef.current = null
    }
  }, [prefersReducedMotion])

  const handleAnimationComplete = useCallback(() => {
    if (!animatingRef.current || layoutInstantRef.current) return

    if (pendingAnimRef.current === 'dock') {
      animatingRef.current = false
      pendingAnimRef.current = null
      return
    }

    if (pendingAnimRef.current === 'undock') {
      dockedRef.current = false
      setIsFloating(false)
      setIsCompact(false)
      setIsUndocking(false)
      setAnchorX(null)
      layoutRef.current = null
      setLayout(null)
      animatingRef.current = false
      pendingAnimRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    spacerHeightRef.current = spacerHeight
  }, [spacerHeight])

  useLayoutEffect(() => {
    const root = rootRef.current
    const slot = slotRef.current
    const summary = summaryRef.current
    if (!root || !slot || !summary) return

    let raf = 0
    const dockTop = readDockTop()

    const evaluateScroll = () => {
      if (animatingRef.current) return

      const rootRect = root.getBoundingClientRect()
      const shouldDock = rootRect.top <= dockTop + 1

      if (shouldDock && !dockedRef.current) {
        beginDock(summary, root, slot)
        return
      }

      if (dockedRef.current && shouldUndock(slot, dockTop)) {
        beginUndock(root, slot, spacerHeightRef.current || measureSlotFootprint(slot))
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        evaluateScroll()
      })
    }

    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (dockedRef.current) {
          updateDockedLayout(root)
        } else if (!dockedRef.current) {
          evaluateScroll()
        }
      })
    }

    evaluateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [beginDock, beginUndock, locale, updateDockedLayout])

  const summaryClassName = [
    'gpa-sticky-summary',
    isFloating ? 'is-floating' : '',
    isUndocking ? 'is-undocking' : '',
    isCompact ? 'is-compact' : '',
    showAssessment ? 'has-assessment' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const reserveSpace = isFloating && spacerHeight > 0

  const summaryBody = (
    <div className="gpa-sticky-row">
      <div className="gpa-sticky-side gpa-sticky-side-start">
        <span className="gpa-sticky-label">{t('gpa.label')}</span>
        <span className="gpa-sticky-value">
          <WesternDigits>{gpa.toFixed(2)}</WesternDigits>
        </span>
        <span className="gpa-sticky-scale">{t('gpa.outOf')}</span>
      </div>

      {showAssessment ? (
        <div className="gpa-sticky-center" aria-hidden={false}>
          <div className="gpa-sticky-divider" aria-hidden="true" />
          <span
            className="gpa-sticky-assessment"
            style={{ color: assessment.color }}
          >
            {t(assessment.key)}
          </span>
          <div className="gpa-sticky-divider" aria-hidden="true" />
        </div>
      ) : (
        <div className="gpa-sticky-center" aria-hidden="true">
          <div className="gpa-sticky-divider" />
        </div>
      )}

      <div className="gpa-sticky-side gpa-sticky-side-end">
        <span className="gpa-sticky-label">{t('table.totalHoursCompleted')}</span>
        <span className="gpa-sticky-value gpa-sticky-credits-value">
          <WesternDigits>{passedCredits}</WesternDigits>
          <span className="gpa-sticky-unit">{t('table.hrs')}</span>
        </span>
      </div>
    </div>
  )

  return (
    <div ref={rootRef} className="gpa-sticky-root">
      <div ref={slotRef} className="gpa-sticky-slot">
        {reserveSpace ? (
          <div
            className="gpa-sticky-spacer"
            style={{ height: spacerHeight }}
            aria-hidden="true"
          />
        ) : null}
        {isFloating && layout && anchorX !== null ? (
          <motion.section
            ref={summaryRef}
            className={summaryClassName}
            aria-label={t('summary.ariaLabel')}
            aria-live="polite"
            initial={false}
            animate={snapshotToMotion(layout)}
            transition={transition}
            onAnimationComplete={handleAnimationComplete}
            style={{
              position: 'fixed',
              left: anchorX,
              x: '-50%',
              margin: 0,
              zIndex: 245,
              boxSizing: 'border-box',
            }}
          >
            {summaryBody}
          </motion.section>
        ) : (
          <section
            ref={summaryRef}
            className={summaryClassName}
            aria-label={t('summary.ariaLabel')}
            aria-live="polite"
          >
            {summaryBody}
          </section>
        )}
      </div>
    </div>
  )
}
