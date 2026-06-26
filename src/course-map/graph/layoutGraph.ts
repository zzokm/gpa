import { layoutBySemesterRows } from './semesterLayout'
import type { CourseMapEdge, CourseMapNode, OriginalImportedTranscript } from '../types'
import type { SemesterRowMeta } from './semesterLayout'

export type SemesterRowWithY = SemesterRowMeta & { y: number }

export interface LayoutResult {
  nodes: (CourseMapNode & { position: { x: number; y: number } })[]
  edges: CourseMapEdge[]
  semesterRows: SemesterRowWithY[]
}

export function layoutCourseMapGraph(
  nodes: CourseMapNode[],
  edges: CourseMapEdge[],
  transcript: OriginalImportedTranscript | null
): LayoutResult {
  const { nodes: positioned, semesterRows } = layoutBySemesterRows(
    nodes,
    edges,
    transcript
  )
  return { nodes: positioned, edges, semesterRows }
}
