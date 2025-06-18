import { useState, useEffect } from "react"
import { Modal, Box, Typography, TextField, Button, Snackbar, Alert} from "@mui/material"
import { useAuthStore } from "../store/useAuthStore";

const SignupForm = () => {
  const [open, setOpen] = useState(false)
  const createUser = useAuthStore((state) => state.createUser)
  const accessToken = useAuthStore((state) => state.accessToken)
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const [snackbarOpen, setSnackbarOpen] = useState(false)


  const handleClick = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleLogout = () => {
    logoutUser()
    setSnackbarOpen(true)
  }
  
  return (
    <>
      {!accessToken ? (
      <Button onClick={handleClick} aria-haspopup="dialog"
      sx={{
        mt: 2,
        py: 1.2,
        fontSize: "1rem",
        fontWeight: "600",
        borderRadius: "20px",
        backgroundColor: "#fff",
        color: "#111",
        "&:hover": {
          backgroundColor: "#f95f86"
        },
        fontFamily: "'Quicksand', sans-serif",
        textTransform: "none"
      }}>
        Register To Share Yours Too! 
      </Button>
      ) : (
      <Box>
        {/* <Typography variant="body1">🎉 You're logged in!</Typography> */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            sx={{
              fontSize: "0.9rem",
              fontWeight: "600",
              borderRadius: "20px", 
              borderColor: "#111",
              textTransform: "none",
              fontFamily: "'Quicksand', sans-serif",
              color: "#111",
              px: 3
            }}>
            Log out
          </Button>
      </Box>
      )}
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
            👋 You have been logged out successfully.
          </Alert>
        </Snackbar>
      <SignupModal open={open} onClose={() => setOpen(false)} 
      createUser={createUser} 
      />
    </>
  )
}




export default SignupForm

// FORM MODAL
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

 export const SignupModal = ({ open, onClose, createUser }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Invalid email address")
      return
    }
    
    try {
      await createUser({ username, email, password })
      setErrorMessage("")
      setSuccessMessage("🎉 Signup successful! You can now post a thought.")
    
      setTimeout(() => {
        setSuccessMessage("")
        setUsername("")
        setEmail("")
        setPassword("")
        onClose()
      }, 2000)
  
    } catch (err) {
      setSuccessMessage("")
      setErrorMessage(err.message || "Signup failed")
    }
  }

  return (
    <>
   
    <Modal open={open} onClose={onClose} >
    <Box sx={modalStyle}>
      <Typography variant="h6" mb={2}>Register</Typography>
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
        label="Email"
        variant="outlined"
        margin="dense"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
          "&:hover": {
            backgroundColor: "#f95f86"
          },
          fontFamily: "'Quicksand', sans-serif",
          textTransform: "none"
        }}
      >
        Register me!
      </Button>
      {successMessage && (
        <Typography variant="body2" color="primary" mt={1}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body2" color="error" mt={1}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  </Modal>
  </>
  )
}