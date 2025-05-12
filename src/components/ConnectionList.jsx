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

function ConnectionList({ connections, students, onRemove }) {
  const getStudentName = (id) => {
    const student = students.find(s => s.id === id)
    return student ? `${student.name} (Grade ${student.grade})` : 'Unknown'
  }

  if (connections.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Connections
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography color="text.secondary" align="center">
            No connections added yet
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Connections ({connections.length})
      </Typography>
      <Paper className="list-container">
        <List>
          {connections.map(connection => (
            <ListItem key={connection.id}>
              <ListItemText
                primary={`${getStudentName(connection.from)} → ${getStudentName(connection.to)}`}
                secondary="Connection"
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemove(connection.id)}
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

export default ConnectionList 