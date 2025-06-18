import { useState } from "react"
import { Modal, Box, Typography, TextField, Button, Snackbar, Alert } from "@mui/material"
import { useAuthStore } from "../store/useAuthStore"

const LoginForm = () => {
  const [open, setOpen] = useState(false)
  const loginUser = useAuthStore((state) => state.loginUser)
  const accessToken = useAuthStore((state) => state.accessToken)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleClick = () => setOpen(true)

  const handleLoginSuccess = () => {
    setSnackbarOpen(true)
    setOpen(false)
  }

  return (
    <>
      {!accessToken && (
        <Button
          onClick={handleClick}
          aria-haspopup="dialog"
          sx={{
            mt: 2,
            py: 1.2,
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: "20px",
            backgroundColor: "#fff",
            color: "#111",
            "&:hover": { backgroundColor: "#f95f86" },
            fontFamily: "'Quicksand', sans-serif",
            textTransform: "none"
          }}
        >
          Log In
        </Button>
      )}
      
      <LoginModal open={open} onClose={() => setOpen(false)} loginUser={loginUser} onLoginSuccess={handleLoginSuccess} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          🎉 You're logged in!
        </Alert>
      </Snackbar>
    </>
  )
}

export default LoginForm

// MODAL COMPONENT
const modalStyle = {
  position: "absolute",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  fontFamily: "'Quicksand', sans-serif",
  color: "#111",
  bgcolor: "#fff9f7",
  borderRadius: 2,
  boxShadow: 24,
  p: 6,
}

const LoginModal = ({ open, onClose, loginUser, onLoginSuccess }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async () => {
    if (!username || !password) {
      setErrorMessage("Please fill in both fields")
      return
    }

    try {
      await loginUser({ username, password })
      setErrorMessage("")
      setUsername("")
      setPassword("")
      onLoginSuccess()
    } catch (err) {
      setErrorMessage(err.message || "Login failed")
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>Log In</Typography>

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="dense"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!username || !password}
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 1.2,
            fontSize: "1rem",
            fontWeight: "700",
            borderRadius: "20px",
            backgroundColor: "#fabda5b3",
            color: "#111",
            "&:hover": { backgroundColor: "#f95f86" },
            fontFamily: "'Quicksand', sans-serif",
            textTransform: "none"
          }}
        >
          Log In
        </Button>

        {errorMessage && (
          <Typography variant="body2" color="error" mt={1}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Modal>
  )
}
