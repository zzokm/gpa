import type { Level, Term } from '../../types/Course'
import type { CourseMapEdge, CourseMapNode, OriginalImportedTranscript } from '../types'

const NODE_WIDTH = 220
const NODE_HEIGHT = 88
const COL_GAP = 48
const ROW_GAP = 72
const LABEL_COL_WIDTH = 168
const ROW_TOP_PAD = 24

const LEVEL_ORDER: Record<Level, number> = {
  'First Level': 1,
  'Second Level': 2,
  'Third Level': 3,
  'Fourth Level': 4,
}

const TERM_ORDER: Record<string, number> = {
  'First Term': 0,
  'Second Term': 1,
  'Summer Term': 0.5,
}

export interface SemesterRowMeta {
  id: string
  labelKey: string
  labelReplacements?: Record<string, string>
  sortKey: number
}

function semesterSortKey(term?: Term, level?: Level): number {
  const l = level ? LEVEL_ORDER[level] ?? 99 : 50
  const t = term ? TERM_ORDER[term] ?? 0 : 0
  return l * 10 + t
}

function isGraduationCourse(code: string, name: string): boolean {
  const upper = code.toUpperCase()
  const n = name.toLowerCase()
  return (
    upper.includes('498') ||
    n.includes('graduation project') ||
    n.includes('field training')
  )
}

function courseOnlyPrereqs(
  edges: CourseMapEdge[],
  nodeIds: Set<string>
): Map<string, string[]> {
  const prereqs = new Map<string, string[]>()
  for (const id of nodeIds) prereqs.set(id, [])
  for (const edge of edges) {
    if (
      edge.kind === 'prerequisite' &&
      nodeIds.has(edge.source) &&
      nodeIds.has(edge.target)
    ) {
      prereqs.get(edge.target)?.push(edge.source)
    }
  }
  return prereqs
}

export function layoutBySemesterRows(
  nodes: CourseMapNode[],
  edges: CourseMapEdge[],
  _transcript: OriginalImportedTranscript | null
): {
  nodes: (CourseMapNode & { position: { x: number; y: number } })[]
  semesterRows: Array<SemesterRowMeta & { y: number }>
} {
  const courseNodes = nodes.filter(
    (n) => !n.id.startsWith('gate:') && !n.id.startsWith('or:') && !n.id.startsWith('unknown:')
  )
  const nodeIds = new Set(courseNodes.map((n) => n.id))
  const prereqMap = courseOnlyPrereqs(edges, nodeIds)

  const rowByNode = new Map<string, number>()
  const rowMetaByIndex = new Map<number, SemesterRowMeta>()

  for (const node of courseNodes) {
    const entry = node.transcriptEntry
    if (entry?.level) {
      const sortKey = semesterSortKey(entry.term, entry.level)
      const rowId = `sem-${sortKey}`
      rowMetaByIndex.set(sortKey, {
        id: rowId,
        labelKey: 'courseMap.semesterRow',
        labelReplacements: {
          level: entry.level,
          term: entry.term ?? 'First Term',
        },
        sortKey,
      })
      rowByNode.set(node.id, sortKey)
    }
  }

  const unset = courseNodes.filter((n) => !rowByNode.has(n.id))
  let changed = true
  while (changed && unset.length > 0) {
    changed = false
    for (const node of [...unset]) {
      const prereqs = (prereqMap.get(node.id) ?? []).filter((p) => rowByNode.has(p))
      if (prereqs.length === 0 && (prereqMap.get(node.id) ?? []).length === 0) {
        const sortKey = 0
        rowByNode.set(node.id, sortKey)
        rowMetaByIndex.set(sortKey, {
          id: 'sem-foundation',
          labelKey: 'courseMap.foundationRow',
          sortKey,
        })
        unset.splice(unset.indexOf(node), 1)
        changed = true
        continue
      }
      if (prereqs.length === (prereqMap.get(node.id) ?? []).length) {
        const maxPrereq = Math.max(...prereqs.map((p) => rowByNode.get(p)!))
        const sortKey = maxPrereq + 10
        rowByNode.set(node.id, sortKey)
        rowMetaByIndex.set(sortKey, {
          id: `sem-planned-${sortKey}`,
          labelKey: 'courseMap.plannedRow',
          labelReplacements: { n: String(Math.floor(sortKey / 10)) },
          sortKey,
        })
        unset.splice(unset.indexOf(node), 1)
        changed = true
      }
    }
  }

  for (const node of unset) {
    const sortKey = 90
    rowByNode.set(node.id, sortKey)
    rowMetaByIndex.set(sortKey, {
      id: 'sem-planned-fallback',
      labelKey: 'courseMap.plannedRow',
      labelReplacements: { n: '?' },
      sortKey,
    })
  }

  const maxSortKey = Math.max(...rowByNode.values(), 0)
  for (const node of courseNodes) {
    if (isGraduationCourse(node.courseCode, node.name)) {
      rowByNode.set(node.id, maxSortKey + 5)
      rowMetaByIndex.set(maxSortKey + 5, {
        id: 'sem-final',
        labelKey: 'courseMap.finalRow',
        sortKey: maxSortKey + 5,
      })
    }
  }

  const sortedRowKeys = [...new Set(rowByNode.values())].sort((a, b) => a - b)
  const rowIndexMap = new Map(sortedRowKeys.map((k, i) => [k, i]))

  const nodesByRow = new Map<number, CourseMapNode[]>()
  for (const node of courseNodes) {
    const sortKey = rowByNode.get(node.id)!
    const rowIndex = rowIndexMap.get(sortKey)!
    if (!nodesByRow.has(rowIndex)) nodesByRow.set(rowIndex, [])
    nodesByRow.get(rowIndex)!.push(node)
  }

  for (const [, rowNodes] of nodesByRow) {
    rowNodes.sort((a, b) => {
      const aPrereqs = prereqMap.get(a.id)?.length ?? 0
      const bPrereqs = prereqMap.get(b.id)?.length ?? 0
      if (aPrereqs !== bPrereqs) return aPrereqs - bPrereqs
      return a.courseCode.localeCompare(b.courseCode)
    })
  }

  const positioned: (CourseMapNode & { position: { x: number; y: number } })[] = []

  for (const [rowIndex, rowNodes] of nodesByRow) {
    const sortKey = sortedRowKeys[rowIndex]
    const y = ROW_TOP_PAD + rowIndex * (NODE_HEIGHT + ROW_GAP)

    rowNodes.forEach((node, colIndex) => {
      positioned.push({
        ...node,
        semesterRowId: rowMetaByIndex.get(sortKey)?.id,
        position: {
          x: LABEL_COL_WIDTH + colIndex * (NODE_WIDTH + COL_GAP),
          y,
        },
      })
    })
  }

  const semesterRows = sortedRowKeys.map((sortKey, rowIndex) => {
    const meta = rowMetaByIndex.get(sortKey)!
    return {
      ...meta,
      y: ROW_TOP_PAD + rowIndex * (NODE_HEIGHT + ROW_GAP) + 28,
    }
  })

  return { nodes: positioned, semesterRows }
}

export const LAYOUT_CONSTANTS = {
  NODE_WIDTH,
  NODE_HEIGHT,
  LABEL_COL_WIDTH,
}
