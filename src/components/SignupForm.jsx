import { useState } from "react"
import { Modal, Box, Typography, TextField, Button, Snackbar, Alert} from "@mui/material"
import { useAuthStore } from "../store/useAuthStore"
import WelcomeUser from "./WelcomeUser"

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
        "&:focus-visible": {
          outline: "2px solid #f95f86",
          outlineOffset: "2px",
        },
        fontFamily: "'Quicksand', sans-serif",
        textTransform: "none"
      }}>
        Register To Share Yours Too! 
      </Button>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={2} mb={2}>
        <WelcomeUser />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
            fontSize: "0.85rem",
            height: "32px",
            borderRadius: "16px",
            color: "#111",
            px: 2,
            textTransform: "none",
            borderColor: "#111",
            "&:hover": {
              backgroundColor: "#eee",
            },
            "&:focus-visible": {
              outline: "2px solid #f95f86",
              outlineOffset: "2px",
            },
          }}
        >
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
  const [password, setPassword] = useState("")
  
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = async () => {
    setFieldErrors({ username: "", email: "", password: "" })
    const errors = {}

    if (!username.trim()) {
      errors.username = "Username is required"
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Use valid email example@me.com"
    }
  
    if (password.length < 4) {
      errors.password = "Password must be at least 4 characters"
    }
  
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
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
      const msg = err.message || "Signup failed"

      // Smart detection
      if (msg.includes("username")) {
        setFieldErrors((prev) => ({ ...prev, username: msg }))
      } else if (msg.includes("email")) {
        setFieldErrors((prev) => ({ ...prev, email: msg }))
      } else if (msg.toLowerCase().includes("password")) {
        setFieldErrors((prev) => ({ ...prev, password: msg }))
      } else {
        setFieldErrors((prev) => ({ ...prev, username: msg }))
      }
    }
  }

  return (
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
          onChange={(e) => {
            setUsername(e.target.value)
            setFieldErrors((prev) => ({ ...prev, username: "" }))
          }}
          error={!!fieldErrors.username}
          helperText={fieldErrors.username}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setFieldErrors((prev) => ({ ...prev, email: "" }))
          }}          
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setFieldErrors((prev) => ({ ...prev, password: "" }))
          }}
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
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
  )
}