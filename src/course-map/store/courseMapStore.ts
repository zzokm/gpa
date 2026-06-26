import { create } from 'zustand'
import { getNormalizedCatalog } from '../catalog/normalizeCatalog'
import { buildCourseMapGraph } from '../graph/buildGraph'
import { layoutCourseMapGraph } from '../graph/layoutGraph'
import { toReactFlowEdges, toReactFlowNodes } from '../graph/toReactFlow'
import {
  loadSelectedMajorFromStorage,
  loadShowCompletedFromStorage,
  loadTranscriptFromStorage,
  migrateTranscriptIfNeeded,
  saveSelectedMajorToStorage,
  saveShowCompletedToStorage,
} from '../transcript/transcriptStorage'
import type {
  CourseMapNode,
  MajorKey,
  NormalizedCatalog,
  OriginalImportedTranscript,
} from '../types'
import type { CourseFlowEdge, FlowNode } from '../graph/toReactFlow'

interface CourseMapStoreState {
  selectedMajor: MajorKey | null
  showCompletedCourses: boolean
  selectedNodeId: string | null
  highlightedPrereqId: string | null
  catalog: NormalizedCatalog | null
  transcript: OriginalImportedTranscript | null
  graphNodes: CourseMapNode[]
  flowNodes: FlowNode[]
  flowEdges: CourseFlowEdge[]
  hydrated: boolean

  hydrate: (sessionCourses?: import('../../types/Course').Course[]) => void
  setSelectedMajor: (major: MajorKey) => void
  setShowCompletedCourses: (show: boolean) => void
  selectNode: (nodeId: string | null) => void
  setHighlightedPrereq: (nodeId: string | null) => void
  refreshTranscript: () => void
  recomputeGraph: () => void
}

function computeGraph(state: Pick<
  CourseMapStoreState,
  'selectedMajor' | 'catalog' | 'transcript' | 'showCompletedCourses'
>) {
  if (!state.selectedMajor || !state.catalog) {
    return { graphNodes: [], flowNodes: [], flowEdges: [] }
  }

  const built = buildCourseMapGraph({
    selectedMajor: state.selectedMajor,
    catalog: state.catalog,
    transcript: state.transcript,
    showCompletedCourses: state.showCompletedCourses,
  })

  const laidOut = layoutCourseMapGraph(
    built.nodes,
    built.edges,
    state.transcript
  )
  const flowNodes = toReactFlowNodes(
    laidOut.nodes,
    laidOut.semesterRows,
    !state.showCompletedCourses
  )
  const flowEdges = toReactFlowEdges(laidOut.edges)

  return {
    graphNodes: laidOut.nodes,
    flowNodes,
    flowEdges,
  }
}

export const useCourseMapStore = create<CourseMapStoreState>((set, get) => ({
  selectedMajor: null,
  showCompletedCourses: true,
  selectedNodeId: null,
  highlightedPrereqId: null,
  catalog: null,
  transcript: null,
  graphNodes: [],
  flowNodes: [],
  flowEdges: [],
  hydrated: false,

  hydrate: (sessionCourses) => {
    const catalog = getNormalizedCatalog()
    let transcript = loadTranscriptFromStorage()
    if (!transcript && sessionCourses?.length) {
      transcript = migrateTranscriptIfNeeded(sessionCourses)
    }

    const storedMajor = loadSelectedMajorFromStorage() as MajorKey | null
    const selectedMajor =
      storedMajor && catalog.majorKeys.includes(storedMajor)
        ? storedMajor
        : catalog.majorKeys[0] ?? null

    const showCompletedCourses = loadShowCompletedFromStorage()

    const base = {
      catalog,
      transcript,
      selectedMajor,
      showCompletedCourses,
      hydrated: true,
    }

    const graph = computeGraph(base)
    set({ ...base, ...graph })
  },

  setSelectedMajor: (major) => {
    saveSelectedMajorToStorage(major)
    const state = get()
    const graph = computeGraph({
      selectedMajor: major,
      catalog: state.catalog,
      transcript: state.transcript,
      showCompletedCourses: state.showCompletedCourses,
    })
    set({ selectedMajor: major, selectedNodeId: null, ...graph })
  },

  setShowCompletedCourses: (show) => {
    saveShowCompletedToStorage(show)
    const state = get()
    const graph = computeGraph({
      selectedMajor: state.selectedMajor,
      catalog: state.catalog,
      transcript: state.transcript,
      showCompletedCourses: show,
    })
    set({ showCompletedCourses: show, ...graph })
  },

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  setHighlightedPrereq: (nodeId) => set({ highlightedPrereqId: nodeId }),

  refreshTranscript: () => {
    const transcript = loadTranscriptFromStorage()
    const state = get()
    const graph = computeGraph({
      selectedMajor: state.selectedMajor,
      catalog: state.catalog,
      transcript,
      showCompletedCourses: state.showCompletedCourses,
    })
    set({ transcript, ...graph })
  },

  recomputeGraph: () => {
    const state = get()
    const graph = computeGraph({
      selectedMajor: state.selectedMajor,
      catalog: state.catalog,
      transcript: state.transcript,
      showCompletedCourses: state.showCompletedCourses,
    })
    set(graph)
  },
}))

export function selectSelectedNode(state: CourseMapStoreState): CourseMapNode | null {
  if (!state.selectedNodeId) return null
  return state.graphNodes.find((n) => n.id === state.selectedNodeId) ?? null
}
