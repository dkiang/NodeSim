import React, { useState } from 'react'
import { 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box
} from '@mui/material'

function ConnectionForm({ onSubmit, students }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!from || !to || from === to) return

    onSubmit({
      from,
      to
    })

    // Reset form
    setFrom('')
    setTo('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="form-container">
      <Typography variant="h6" gutterBottom>
        Add New Connection
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
        type="submit" 
        variant="contained" 
        color="primary"
        fullWidth
        disabled={!from || !to || from === to}
      >
        Add Connection
      </Button>
    </Box>
  )
}

export default ConnectionForm 