import { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

export const EditModal = ({ open, handleClose, message, handleEdit }) => {
  const [newMessage, setNewMessage] = useState(message)

 
  useEffect(() => {
    setNewMessage(message)
  }, [message, open])

  const handleSave = () => {
    if (newMessage.trim()) {
      handleEdit(newMessage) // passed from parent
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-modal-title"
    >
      <Box sx={style}>
        <Typography id="edit-modal-title" variant="h6" mb={2}>
          Edit Your Thought
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Your updated message"
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
