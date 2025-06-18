import { useState } from "react"
import { useThoughtStore } from "../store/useThoughtStore"
import { useAuthStore } from "../store/useAuthStore"
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material"

const DeleteThought = ({ id }) => {
  const deleteThought = useThoughtStore((state) => state.deleteThought)
  const accessToken = useAuthStore((state) => state.accessToken)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteThought(id)
      setOpenConfirm(false)
      setSnackbarOpen(true)
    } catch (error) {
      console.error("Failed to delete thought:", error)
    }
  }

  if (!accessToken) return null

  return (
    <>
      <Tooltip title="Delete">
        <IconButton onClick={() => setOpenConfirm(true)} aria-label="Delete your thought">
          🗑️
        </IconButton>
      </Tooltip>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this thought? This action can't be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

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
          💭 Thought deleted successfully.
        </Alert>
      </Snackbar>
    </>
  )
}

export default DeleteThought
