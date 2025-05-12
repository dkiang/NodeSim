import { useState, useCallback } from 'react'
import { findShortestPath } from '../utils/pathFinding'

export default function useNetworkGraph() {
  const [students, setStudents] = useState([])
  const [connections, setConnections] = useState([])

  const addStudent = useCallback((student) => {
    setStudents(prev => [...prev, {
      id: Date.now().toString(),
      ...student,
      position: { x: Math.random() * 500, y: Math.random() * 500 }
    }])
  }, [])

  const addConnection = useCallback((connection) => {
    setConnections(prev => [...prev, {
      id: Date.now().toString(),
      ...connection
    }])
  }, [])

  const removeStudent = useCallback((studentId) => {
    setStudents(prev => prev.filter(s => s.id !== studentId))
    setConnections(prev => 
      prev.filter(c => c.from !== studentId && c.to !== studentId)
    )
  }, [])

  const removeConnection = useCallback((connectionId) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId))
  }, [])

  const findPath = useCallback((from, to) => {
    return findShortestPath(students, connections, from, to)
  }, [students, connections])

  return {
    students,
    connections,
    addStudent,
    addConnection,
    removeStudent,
    removeConnection,
    findPath
  }
} 