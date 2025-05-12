import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

function StudentList({ students, onRemove }) {
  if (students.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Students
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography color="text.secondary" align="center">
            No students added yet
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Students ({students.length})
      </Typography>
      <Paper className="list-container">
        <List>
          {students.map(student => (
            <ListItem key={student.id}>
              <ListItemText
                primary={student.name}
                secondary={`Grade ${student.grade}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemove(student.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default StudentList 