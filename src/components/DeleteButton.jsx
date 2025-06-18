import { useState } from "react"
import { Modal, Box, Typography, Button, IconButton, Tooltip } from "@mui/material"
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
  p: 6,
}

const DeleteThought = ({ id }) => {
  const deleteThought = useThoughtStore((state) => state.deleteThought)
  const accessToken = useAuthStore((state) => state.accessToken)

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = async () => {
    try {
      await deleteThought(id)
      handleClose()
    } catch (err) {
      console.error("Failed to delete:", err)
    }
  }

  if (!accessToken) return null // hide delete button if not logged in

  return (
    <>
      <Tooltip title="Delete">
        <IconButton onClick={handleDelete} aria-label="Delete your message">
          🗑️
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose} aria-labelledby="delete-modal-title">
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Delete This Thought?</Typography>
          <Typography variant="body2" mb={2}>
            This action can't be undone.
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{
                backgroundColor: "#f95f86",
                color: "#fff",
                fontWeight: "600",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e94b72",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default DeleteThought
