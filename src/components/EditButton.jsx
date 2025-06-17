import { useThoughtStore } from "../store/useThoughtStore"
import { useState } from "react"
import { Modal } from "@mui/material"
import { EditModal } from "./EditModal"

const EditButton = ({ id, currentMessage }) => {
  const editThought = useThoughtStore(state => state.editThought)
  // const [newMessage, setNewMessage] = useState(currentMessage)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  const handleEdit = async (event) => {
    event.preventDefault() 
    // const newMessage = prompt("Edit your message:", currentMessage)
    if (newMessage !== null && newMessage.trim().length > 0) {
      // setNewMessage(userInput)
      await editThought(id, newMessage)
      handleClose()
    }
  }

  return (
    <>
    <button onClick={handleOpen}>✏️</button>
    <EditModal
      open={open}
      handleClose={handleClose}
      message={currentMessage}
      handleEdit={handleEdit}
    />
  </>
  )
}

export default EditButton