import React, { useState } from 'react'
import { 
  TextField, 
  Button, 
  Typography,
  Box
} from '@mui/material'

function StudentForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !grade.trim()) return

    onSubmit({
      name: name.trim(),
      grade: grade.trim()
    })

    // Reset form
    setName('')
    setGrade('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="form-container">
      <Typography variant="h6" gutterBottom>
        Add New Student
      </Typography>
      
      <TextField
        label="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      
      <TextField
        label="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        fullWidth
        disabled={!name.trim() || !grade.trim()}
      >
        Add Student
      </Button>
    </Box>
  )
}

export default StudentForm 