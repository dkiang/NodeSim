import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import useDraggable from '../hooks/useDraggable'

function NetworkGraph({ students, connections }) {
  const svgRef = useRef(null)
  const simulationRef = useRef(null)

  const handleDrag = (node, dx, dy) => {
    const d3Node = d3.select(node)
    const x = parseFloat(d3Node.attr('x')) + dx
    const y = parseFloat(d3Node.attr('y')) + dy
    
    d3Node.attr('x', x)
    d3Node.attr('y', y)
    
    // Update the node's position in the simulation
    const nodeId = d3Node.attr('data-id')
    const nodeData = students.find(s => s.id === nodeId)
    if (nodeData) {
      nodeData.position = { x, y }
    }
  }

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(handleDrag)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svg.node().getBoundingClientRect().width
    const height = svg.node().getBoundingClientRect().height

    // Clear previous graph
    svg.selectAll('*').remove()

    // Create simulation
    simulationRef.current = d3.forceSimulation(students)
      .force('link', d3.forceLink(connections).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30))

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(connections)
      .join('line')
      .attr('class', 'link')
      .attr('stroke-width', 2)

    // Create nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(students)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.position.x},${d.position.y})`)
      .attr('data-id', d => d.id)
      .call(d3.drag()
        .on('start', handleMouseDown)
        .on('drag', handleMouseMove)
        .on('end', handleMouseUp))

    // Add circles to nodes
    node.append('circle')
      .attr('r', 20)
      .attr('fill', '#fff')
      .attr('stroke', '#1976d2')
      .attr('stroke-width', 2)

    // Add text labels to nodes
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', '#000')
      .style('pointer-events', 'none')

    // Update positions on simulation tick
    simulationRef.current.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node
        .attr('transform', d => `translate(${d.x},${d.y})`)
    })

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop()
      }
    }
  }, [students, connections, handleMouseDown, handleMouseMove, handleMouseUp])

  return (
    <svg
      ref={svgRef}
      className="network-graph"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default NetworkGraph 