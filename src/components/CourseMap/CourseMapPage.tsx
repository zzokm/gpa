'use client'

import './CourseMapPage.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { STORAGE_KEYS } from '../../utils/storage-keys'
import type { Course } from '../../types/Course'
import { useCourseMapStore, selectSelectedNode } from '../../course-map/store/courseMapStore'
import type { MajorKey } from '../../course-map/types'
import CourseMapCanvas from './CourseMapCanvas'
import CourseMapControls from './CourseMapControls'
import CourseMapLegend from './CourseMapLegend'
import CourseDetailPanel from './CourseDetailPanel'
import { useLocale } from '../../i18n/LocaleContext'

function loadSessionCourses(): Course[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function CourseMapPage() {
  const { t } = useLocale()
  const hydrate = useCourseMapStore((s) => s.hydrate)
  const hydrated = useCourseMapStore((s) => s.hydrated)
  const catalog = useCourseMapStore((s) => s.catalog)
  const transcript = useCourseMapStore((s) => s.transcript)
  const selectedMajor = useCourseMapStore((s) => s.selectedMajor)
  const showCompletedCourses = useCourseMapStore((s) => s.showCompletedCourses)
  const flowNodes = useCourseMapStore((s) => s.flowNodes)
  const flowEdges = useCourseMapStore((s) => s.flowEdges)
  const selectedNodeId = useCourseMapStore((s) => s.selectedNodeId)
  const highlightedPrereqId = useCourseMapStore((s) => s.highlightedPrereqId)
  const setSelectedMajor = useCourseMapStore((s) => s.setSelectedMajor)
  const setShowCompletedCourses = useCourseMapStore((s) => s.setShowCompletedCourses)
  const selectNode = useCourseMapStore((s) => s.selectNode)
  const setHighlightedPrereq = useCourseMapStore((s) => s.setHighlightedPrereq)

  const selectedNode = useCourseMapStore(selectSelectedNode)

  const [zoomLevel, setZoomLevel] = useState(1)
  const [panToNodeId, setPanToNodeId] = useState<string | null>(null)
  const zoomControlsRef = useRef<{
    zoomIn: () => void
    zoomOut: () => void
    fitView: () => void
  } | null>(null)

  useEffect(() => {
    hydrate(loadSessionCourses())
  }, [hydrate])

  const majors =
    catalog?.majorKeys.map((key) => ({
      key,
      title: catalog.majorTitles[key],
    })) ?? []

  const handlePanToPrereq = useCallback(
    (courseCode: string) => {
      selectNode(null)
      setPanToNodeId(courseCode)
      requestAnimationFrame(() => {
        selectNode(courseCode)
      })
    },
    [selectNode]
  )

  const panelOpen = selectedNodeId !== null && selectedNode !== null

  if (!hydrated) {
    return (
      <div className="course-map-loading" role="status" aria-live="polite">
        {t('courseMap.loading')}
      </div>
    )
  }

  return (
    <div className="course-map-page">
      {!transcript && (
        <div className="course-map-banner" role="status">
          {t('courseMap.importBanner')}
        </div>
      )}

      {!selectedMajor && (
        <div className="course-map-empty" role="status">
          <p>{t('courseMap.pickMajor')}</p>
        </div>
      )}

      {selectedMajor && flowNodes.length === 0 && (
        <div className="course-map-empty" role="status">
          <p>{t('courseMap.noCourses')}</p>
        </div>
      )}

      <CourseMapControls
        majors={majors}
        selectedMajor={selectedMajor}
        showCompleted={showCompletedCourses}
        zoomLevel={zoomLevel}
        onMajorChange={(m) => setSelectedMajor(m as MajorKey)}
        onToggleCompleted={setShowCompletedCourses}
        onZoomIn={() => zoomControlsRef.current?.zoomIn()}
        onZoomOut={() => zoomControlsRef.current?.zoomOut()}
        onFitView={() => zoomControlsRef.current?.fitView()}
      />

      <CourseMapLegend />

      {selectedMajor && flowNodes.length > 0 && catalog && (
        <CourseMapCanvas
          initialNodes={flowNodes}
          initialEdges={flowEdges}
          panelOpen={panelOpen}
          onNodeSelect={selectNode}
          onZoomChange={setZoomLevel}
          panToNodeId={panToNodeId}
          onPanComplete={() => setPanToNodeId(null)}
          highlightedPrereqId={highlightedPrereqId}
          zoomControlsRef={zoomControlsRef}
        />
      )}

      {catalog && (
        <CourseDetailPanel
          node={selectedNode}
          catalog={catalog}
          transcript={transcript}
          open={panelOpen}
          onClose={() => selectNode(null)}
          onPanToPrereq={handlePanToPrereq}
          onHighlightPrereq={setHighlightedPrereq}
        />
      )}
    </div>
  )
}
