import { Chip, Box } from "@mui/material"
import { useAuthStore } from "../store/useAuthStore"

const WelcomeUser = () => {
  const username = useAuthStore((state) => state.username)

  if (!username) return null

  return (
    <Box display="flex" justifyContent="center" mt={1} mb={2}>
      <Chip
        label={`👋 Welcome, ${username}`}
        variant="outlined"
        sx={{
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: "600",
          fontSize: "0.95rem",
          borderRadius: "16px",
          borderColor: "#111",
          background: "white",
        }}
      />
    </Box>
  )
}

export default WelcomeUser
