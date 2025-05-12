export function findShortestPath(students, connections, fromId, toId) {
  // Create adjacency list
  const graph = new Map()
  
  // Initialize graph with all students
  students.forEach(student => {
    graph.set(student.id, [])
  })

  // Add connections to graph
  connections.forEach(connection => {
    graph.get(connection.from).push({
      to: connection.to,
      weight: 1 // All connections have equal weight for now
    })
    graph.get(connection.to).push({
      to: connection.from,
      weight: 1
    })
  })

  // Dijkstra's algorithm
  const distances = new Map()
  const previous = new Map()
  const unvisited = new Set()

  // Initialize distances and unvisited set
  students.forEach(student => {
    distances.set(student.id, Infinity)
    previous.set(student.id, null)
    unvisited.add(student.id)
  })
  distances.set(fromId, 0)

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let current = null
    let smallestDistance = Infinity
    
    for (const nodeId of unvisited) {
      const distance = distances.get(nodeId)
      if (distance < smallestDistance) {
        smallestDistance = distance
        current = nodeId
      }
    }

    if (current === null || distances.get(current) === Infinity) {
      break // No path exists
    }

    if (current === toId) {
      break // Found target
    }

    unvisited.delete(current)

    // Update distances to neighbors
    const neighbors = graph.get(current)
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.to)) continue

      const distance = distances.get(current) + neighbor.weight
      if (distance < distances.get(neighbor.to)) {
        distances.set(neighbor.to, distance)
        previous.set(neighbor.to, current)
      }
    }
  }

  // Reconstruct path
  const path = []
  let current = toId

  while (current !== null) {
    path.unshift(current)
    current = previous.get(current)
  }

  // Return null if no path exists
  if (path.length === 1 && path[0] === toId) {
    return null
  }

  return path
} 