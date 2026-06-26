'use client'

import { memo } from 'react'
import { getSmoothStepPath, Position, type EdgeProps } from '@xyflow/react'
import type { CourseFlowEdge } from '../../course-map/graph/toReactFlow'

function arrowDegrees(position: Position): number {
  switch (position) {
    case Position.Left:
      return 0
    case Position.Right:
      return 180
    case Position.Top:
      return 90
    case Position.Bottom:
      return -90
    default:
      return 90
  }
}

function CourseEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const satisfied = (data as CourseFlowEdge['data'])?.satisfied ?? false
  const color = satisfied ? '#ff7955' : '#94a3b8'

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  })

  const rotation = arrowDegrees(targetPosition)

  return (
    <g className="course-map-edge">
      <path
        id={id}
        className="react-flow__edge-path course-map-edge-path"
        d={edgePath}
        fill="none"
        stroke={color}
        strokeWidth={satisfied ? 2.5 : 2}
        strokeDasharray={satisfied ? undefined : '7 5'}
        strokeLinecap="round"
        style={{ opacity: satisfied ? 0.95 : 0.8 }}
      />
      <polygon
        className="course-map-edge-arrow"
        points="0,-5 10,0 0,5"
        fill={color}
        transform={`translate(${targetX}, ${targetY}) rotate(${rotation})`}
        style={{ opacity: satisfied ? 0.95 : 0.8 }}
      />
    </g>
  )
}

export default memo(CourseEdgeComponent)
