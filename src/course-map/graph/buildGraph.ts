import { collectPrerequisiteCourseCodes } from '../prerequisites/parsePrerequisites'
import {
  evaluatePrerequisites,
  findTranscriptEntryByCourseCode,
  isCourseCompleted,
} from '../prerequisites/evaluatePrerequisites'
import {
  expandWithPrerequisiteAncestors,
  getVisibleCourseCodes,
} from '../rules/generalRule'
import type {
  CourseMapEdge,
  CourseMapNode,
  CourseNodeStatus,
  MajorKey,
  NormalizedCatalog,
  OriginalImportedTranscript,
  PrerequisiteExpression,
} from '../types'

function extractCreditHourGates(
  expr: PrerequisiteExpression,
  transcript: OriginalImportedTranscript | null,
  catalog: NormalizedCatalog
): Array<{ minimumPassedCredits: number; satisfied: boolean }> {
  switch (expr.kind) {
    case 'creditHours': {
      const satisfied = evaluatePrerequisites(expr, transcript, catalog).satisfied
      return [{ minimumPassedCredits: expr.minimumPassedCredits, satisfied }]
    }
    case 'and':
      return expr.all.flatMap((c) => extractCreditHourGates(c, transcript, catalog))
    case 'or':
      return expr.any.flatMap((c) => extractCreditHourGates(c, transcript, catalog))
    default:
      return []
  }
}

function resolveCourseNodeStatus(
  courseCode: string,
  catalog: NormalizedCatalog,
  transcript: OriginalImportedTranscript | null
): { status: CourseNodeStatus; prerequisiteState: ReturnType<typeof evaluatePrerequisites> } {
  const course = catalog.byCode[courseCode]
  const entry = findTranscriptEntryByCourseCode(courseCode, transcript)
  const prereqState = evaluatePrerequisites(
    course?.parsedPrerequisites ?? { kind: 'none' },
    transcript,
    catalog
  )

  if (entry?.status === 'completed') {
    return { status: 'completed', prerequisiteState: prereqState }
  }
  if (entry?.status === 'in_progress') {
    return { status: 'in_progress', prerequisiteState: prereqState }
  }

  if (!prereqState.satisfied) {
    return { status: 'locked', prerequisiteState: prereqState }
  }
  return { status: 'available', prerequisiteState: prereqState }
}

function createEdgesFromExpression(
  targetCode: string,
  expr: PrerequisiteExpression,
  transcript: OriginalImportedTranscript | null
): CourseMapEdge[] {
  switch (expr.kind) {
    case 'none':
    case 'creditHours':
      return []
    case 'course': {
      const satisfied = isCourseCompleted(expr.courseCode, transcript)
      return [
        {
          id: `${expr.courseCode}->${targetCode}`,
          source: expr.courseCode,
          target: targetCode,
          satisfied,
          kind: 'prerequisite',
        },
      ]
    }
    case 'and':
      return expr.all.flatMap((child) =>
        createEdgesFromExpression(targetCode, child, transcript)
      )
    case 'or':
      return expr.any.flatMap((child) => {
        if (child.kind === 'course') {
          const satisfied = isCourseCompleted(child.courseCode, transcript)
          return [
            {
              id: `${child.courseCode}->${targetCode}`,
              source: child.courseCode,
              target: targetCode,
              satisfied,
              kind: 'or_option',
            },
          ]
        }
        return createEdgesFromExpression(targetCode, child, transcript)
      })
    case 'unknown':
      return []
  }
}

export interface GraphBuildInput {
  selectedMajor: MajorKey
  catalog: NormalizedCatalog
  transcript: OriginalImportedTranscript | null
  showCompletedCourses: boolean
}

export interface GraphBuildResult {
  nodes: CourseMapNode[]
  edges: CourseMapEdge[]
}

export function buildCourseMapGraph(input: GraphBuildInput): GraphBuildResult {
  const { selectedMajor, catalog, transcript, showCompletedCourses } = input

  const baseVisible = getVisibleCourseCodes(selectedMajor, catalog, transcript)
  const visibleCodes = expandWithPrerequisiteAncestors(baseVisible, catalog)

  let codesToRender = visibleCodes.filter(
    (code) => !code.startsWith('gate:') && !code.startsWith('or:') && !code.startsWith('unknown:')
  )

  if (!showCompletedCourses) {
    codesToRender = codesToRender.filter(
      (code) => !isCourseCompleted(code, transcript)
    )
  }

  const nodes: CourseMapNode[] = []
  const edges: CourseMapEdge[] = []
  const codeSet = new Set(codesToRender)

  for (const code of codesToRender) {
    const course = catalog.byCode[code]
    if (!course) continue

    const { status, prerequisiteState } = resolveCourseNodeStatus(
      code,
      catalog,
      transcript
    )
    const entry = findTranscriptEntryByCourseCode(code, transcript)
    const membership = catalog.memberships.find((m) => m.courseCode === code)
    const creditHourGates = extractCreditHourGates(
      course.parsedPrerequisites,
      transcript,
      catalog
    )

    nodes.push({
      id: code,
      courseCode: code,
      label: code,
      name: course.name,
      creditHours: course.creditHours,
      type: course.type,
      scope: membership?.scope ?? course.scope,
      status,
      prerequisiteState,
      catalog: course,
      transcriptEntry: entry,
      isGeneral: course.scope === 'general',
      isMajorRequirement: course.scope === 'major' && course.majorKey === selectedMajor,
      creditHourGates: creditHourGates.length > 0 ? creditHourGates : undefined,
    })

    const courseEdges = createEdgesFromExpression(
      code,
      course.parsedPrerequisites,
      transcript
    )
    for (const edge of courseEdges) {
      if (codeSet.has(edge.source) && codeSet.has(edge.target)) {
        edges.push(edge)
      }
    }
  }

  return { nodes, edges }
}

export function getPrerequisiteCoursesForNode(node: CourseMapNode): string[] {
  return collectPrerequisiteCourseCodes(node.catalog.parsedPrerequisites)
}
