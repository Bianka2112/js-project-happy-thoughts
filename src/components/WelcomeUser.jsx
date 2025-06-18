import { Chip, Box } from "@mui/material"
import { useAuthStore } from "../store/useAuthStore"

const WelcomeUser = () => {
  const username = useAuthStore((state) => state.username)

  if (!username) return null

  return (
    <Box  justifyContent="center">
      <Chip
        label={`👋 Welcome, ${username}`}
        variant="outlined"
        sx={{
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: "600",
          fontSize: "0.95rem",
          height: "32px",
          borderRadius: "16px",
          borderColor: "#111",
          background: "white",
          px: 2
        }}
      />
    </Box>
  )
}

export default WelcomeUser
