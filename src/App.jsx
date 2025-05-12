import React, { useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import NetworkGraph from './components/NetworkGraph'
import StudentForm from './components/StudentForm'
import ConnectionForm from './components/ConnectionForm'
import PathFinder from './components/PathFinder'
import StudentList from './components/StudentList'
import ConnectionList from './components/ConnectionList'
import useNetworkGraph from './hooks/useNetworkGraph'

function App() {
  const {
    students,
    connections,
    addStudent,
    addConnection,
    findPath,
    removeStudent,
    removeConnection
  } = useNetworkGraph()

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        NodeSim - Network Simulation
      </Typography>
      
      <Grid container spacing={3}>
        {/* Left Panel - Forms and Lists */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <StudentForm onSubmit={addStudent} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <ConnectionForm 
                  onSubmit={addConnection}
                  students={students}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <StudentList 
                  students={students}
                  onRemove={removeStudent}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <ConnectionList 
                  connections={connections}
                  students={students}
                  onRemove={removeConnection}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Panel - Graph and Path Finder */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: '60vh' }}>
                <NetworkGraph 
                  students={students}
                  connections={connections}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <PathFinder 
                  students={students}
                  connections={connections}
                  onFindPath={findPath}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App 