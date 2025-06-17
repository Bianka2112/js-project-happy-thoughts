import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuthStore } from "../store/useAuthStore";

const LoginButton = () => {
  const [open, setOpen] = useState(false)
  const createUser = useAuthStore((state) => state.createUser)

  const handleClick = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <button onClick={handleClick}>Register to Edit Your Thoughts</button>
      <LoginModal open={open} onClose={() => setOpen(false)} 
      onLogin={createUser} 
      />
    </>
  )
}

export default LoginButton