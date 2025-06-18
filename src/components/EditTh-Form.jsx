import { useState, useEffect } from "react"
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from "@mui/material"
import { useThoughtStore } from "../store/useThoughtStore"
import { useAuthStore } from "../store/useAuthStore"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  fontFamily: "'Quicksand', sans-serif",
  color: "#111",
  bgcolor: "#fff9f7",
  borderRadius: 2,
  boxShadow: 24,
  p: 6
}

const EditThoughtForm = ({ id, currentMessage }) => {
  const editThought = useThoughtStore((state) => state.editThought)
  const accessToken = useAuthStore((state) => state.accessToken)

  const [open, setOpen] = useState(false)
  const [newMessage, setNewMessage] = useState(currentMessage)
  const [errorMessage, setErrorMessage] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setNewMessage(currentMessage)
    }
  }, [open, currentMessage])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setErrorMessage("")
  }

  const handleSave = async () => {
    if (!newMessage.trim()) {
      setErrorMessage("Message can't be empty.")
      return
    }

    try {
      await editThought(id, newMessage)
      setSnackbarOpen(true)
      handleClose()
    } catch (err) {
      setErrorMessage("Update failed. Try again.")
    }
  }

  if (!accessToken) return null

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleClickOpen} aria-label="Edit your message">
          ✏️
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose} aria-labelledby="edit-modal-title">
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Edit Your Thought</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Your updated message"
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          {errorMessage && (
            <Typography variant="body2" color="error" mt={1}>
              {errorMessage}
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                backgroundColor: "#fabda5b3",
                color: "#111",
                fontWeight: "600",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f95f86"
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thought updated successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditThoughtForm
