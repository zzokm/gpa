import type { Edge, Node } from '@xyflow/react'
import type { CourseMapEdge, CourseMapNode } from '../types'
import type { SemesterRowWithY } from './layoutGraph'

export type CourseFlowNode = Node<{
  courseCode: string
  name: string
  creditHours: number
  type: 'Mandatory' | 'Elective'
  status: CourseMapNode['status']
  hidden?: boolean
  creditHourGates?: Array<{ minimumPassedCredits: number; satisfied: boolean }>
}>

export type SemesterLabelNode = Node<{
  labelKey: string
  labelReplacements?: Record<string, string>
}>

export type CourseFlowEdge = Edge<{
  satisfied: boolean
  kind: CourseMapEdge['kind']
}>

export type FlowNode = CourseFlowNode | SemesterLabelNode

export function toReactFlowNodes(
  nodes: (CourseMapNode & { position?: { x: number; y: number } })[],
  semesterRows: SemesterRowWithY[],
  hiddenCompleted: boolean
): FlowNode[] {
  const courseNodes: CourseFlowNode[] = nodes.map((node) => ({
    id: node.id,
    type: 'course',
    position: node.position ?? { x: 0, y: 0 },
    data: {
      courseCode: node.courseCode,
      name: node.name,
      creditHours: node.creditHours,
      type: node.type,
      status: node.status,
      hidden: hiddenCompleted && node.status === 'completed',
      creditHourGates: node.creditHourGates,
    },
  }))

  const labelNodes: SemesterLabelNode[] = semesterRows.map((row) => ({
    id: `label-${row.id}`,
    type: 'semesterLabel',
    position: { x: 8, y: row.y },
    data: {
      labelKey: row.labelKey,
      labelReplacements: row.labelReplacements,
    },
    selectable: false,
    draggable: false,
    focusable: false,
  }))

  return [...labelNodes, ...courseNodes]
}

export function toReactFlowEdges(edges: CourseMapEdge[]): CourseFlowEdge[] {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'prereq',
    data: {
      satisfied: edge.satisfied,
      kind: edge.kind,
    },
  }))
}
