import React, { useState } from 'react'
import { 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Paper
} from '@mui/material'

function PathFinder({ students, connections, onFindPath }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [path, setPath] = useState(null)

  const handleFindPath = () => {
    if (!from || !to || from === to) return
    
    const result = onFindPath(from, to)
    setPath(result)
  }

  const getStudentName = (id) => {
    const student = students.find(s => s.id === id)
    return student ? `${student.name} (Grade ${student.grade})` : 'Unknown'
  }

  return (
    <Box className="form-container">
      <Typography variant="h6" gutterBottom>
        Find Path Between Students
      </Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>From Student</InputLabel>
        <Select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          label="From Student"
          required
        >
          {students.map(student => (
            <MenuItem 
              key={student.id} 
              value={student.id}
              disabled={student.id === to}
            >
              {student.name} (Grade {student.grade})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>To Student</InputLabel>
        <Select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          label="To Student"
          required
        >
          {students.map(student => (
            <MenuItem 
              key={student.id} 
              value={student.id}
              disabled={student.id === from}
            >
              {student.name} (Grade {student.grade})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Button 
        variant="contained" 
        color="primary"
        fullWidth
        onClick={handleFindPath}
        disabled={!from || !to || from === to}
      >
        Find Path
      </Button>

      {path && (
        <Paper className="path-result" elevation={0}>
          <Typography variant="subtitle1" gutterBottom>
            Path Found:
          </Typography>
          <Typography>
            {path.map((id, index) => (
              <React.Fragment key={id}>
                {getStudentName(id)}
                {index < path.length - 1 && ' → '}
              </React.Fragment>
            ))}
          </Typography>
        </Paper>
      )}

      {path === null && from && to && (
        <Paper className="path-result" elevation={0}>
          <Typography color="error">
            No path found between these students
          </Typography>
        </Paper>
      )}
    </Box>
  )
}

export default PathFinder 