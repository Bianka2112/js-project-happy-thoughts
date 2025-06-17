import { useState } from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"

const modalStyle = {
  position: "absolute",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 6,
}

const LoginModal = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    onLogin({ username, password })
    onClose()
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
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Let me edit
      </Button>
    </Box>
  </Modal>
  </>
  )
}

export default LoginModal