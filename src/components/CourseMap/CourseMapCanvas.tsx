'use client'

import './CourseMapCanvas.css'
import { useCallback, useEffect, useMemo, type MutableRefObject } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CourseNode from './CourseNode'
import CourseEdge from './CourseEdge'
import SemesterRowLabel from './SemesterRowLabel'
import type { CourseFlowEdge, FlowNode } from '../../course-map/graph/toReactFlow'

const nodeTypes = { course: CourseNode, semesterLabel: SemesterRowLabel }
const edgeTypes = { prereq: CourseEdge }

interface CourseMapCanvasInnerProps {
  initialNodes: FlowNode[]
  initialEdges: CourseFlowEdge[]
  panelOpen: boolean
  onNodeSelect: (nodeId: string | null) => void
  onZoomChange: (zoom: number) => void
  panToNodeId: string | null
  onPanComplete: () => void
  highlightedPrereqId: string | null
}

function CourseMapCanvasInner({
  initialNodes,
  initialEdges,
  panelOpen,
  onNodeSelect,
  onZoomChange,
  panToNodeId,
  onPanComplete,
  highlightedPrereqId,
}: CourseMapCanvasInnerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { fitView, setCenter, getZoom } = useReactFlow()

  useEffect(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
    requestAnimationFrame(() => {
      fitView({ padding: 0.12, duration: 400 })
    })
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView])

  useEffect(() => {
    onZoomChange(getZoom())
  }, [nodes, onZoomChange, getZoom])

  useEffect(() => {
    if (!panToNodeId) return
    const node = nodes.find((n) => n.id === panToNodeId)
    if (!node) {
      onPanComplete()
      return
    }
    setCenter(node.position.x + 110, node.position.y + 44, { zoom: 1.2, duration: 500 })
    onPanComplete()
  }, [panToNodeId, nodes, setCenter, onPanComplete])

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: n.id === highlightedPrereqId,
      }))
    )
  }, [highlightedPrereqId, setNodes])

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      if (node.type === 'semesterLabel') return
      onNodeSelect(node.id)
    },
    [onNodeSelect]
  )

  const onPaneClick = useCallback(() => {
    onNodeSelect(null)
  }, [onNodeSelect])

  return (
    <div className={`course-map-canvas-wrap${panelOpen ? ' course-map-canvas-wrap--panel-open' : ''}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onMoveEnd={() => onZoomChange(getZoom())}
        minZoom={0.2}
        maxZoom={2}
        panOnScroll
        zoomOnPinch
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} color="rgba(0,0,0,0.04)" />
      </ReactFlow>
    </div>
  )
}

interface CourseMapCanvasProps {
  initialNodes: FlowNode[]
  initialEdges: CourseFlowEdge[]
  panelOpen: boolean
  onNodeSelect: (nodeId: string | null) => void
  onZoomChange: (zoom: number) => void
  panToNodeId: string | null
  onPanComplete: () => void
  highlightedPrereqId: string | null
  zoomControlsRef?: MutableRefObject<{
    zoomIn: () => void
    zoomOut: () => void
    fitView: () => void
  } | null>
}

function ZoomBridge({
  zoomControlsRef,
}: {
  zoomControlsRef?: CourseMapCanvasProps['zoomControlsRef']
}) {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  useEffect(() => {
    if (!zoomControlsRef) return
    zoomControlsRef.current = {
      zoomIn: () => zoomIn({ duration: 200 }),
      zoomOut: () => zoomOut({ duration: 200 }),
      fitView: () => fitView({ padding: 0.12, duration: 400 }),
    }
    return () => {
      zoomControlsRef.current = null
    }
  }, [zoomControlsRef, zoomIn, zoomOut, fitView])
  return null
}

export default function CourseMapCanvas(props: CourseMapCanvasProps) {
  const { zoomControlsRef, ...rest } = props
  const key = useMemo(
    () =>
      `${rest.initialNodes.map((n) => n.id).join(',')}|${rest.initialEdges.map((e) => e.id).join(',')}`,
    [rest.initialNodes, rest.initialEdges]
  )

  return (
    <ReactFlowProvider>
      <CourseMapCanvasInner key={key} {...rest} />
      {zoomControlsRef && <ZoomBridge zoomControlsRef={zoomControlsRef} />}
    </ReactFlowProvider>
  )
}
