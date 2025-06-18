import { useState } from "react"
import { useThoughtStore } from "../store/useThoughtStore"
import { useAuthStore } from "../store/useAuthStore"
import { API_URL } from "../utils/constants"

import * as Styled from "../components/Styled-Comps"
// import LoginButton from "../components/LoginButton"
import SignupForm from "../components/SignupForm"
import LoginForm from "../components/LoginForm"

const Form = () => {

  const addThought = useThoughtStore(state => state.addThought)
  const accessToken = useAuthStore((state) => state.accessToken)
   const [messageText, setMessageText] = useState("")
   const [error, setError] = useState("")
   const msgLength = messageText.length

   const handleSubmit = async (event) => {
      event.preventDefault()    
      setError("")

      if (msgLength < 5 || msgLength > 140)  {
        setError("Message must be between 5 and 140 characters.")
        return
      }
      
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify({ message: messageText }),
          headers: { 
            "Content-Type": "application/json",  
            Authorization: accessToken 
          },
        })

        const newThought = await response.json()

        if (!response.ok) {
          throw new Error(newThought.message || "Failed to post message")
        }

          addThought(newThought.response)
          setMessageText("")
          setError("")

      } catch (error) {
        setError(error.message)
      }
    }

  return (
      <Styled.FormContainer onSubmit={handleSubmit}>
        <label aria-labelledby="message">
          <Styled.FormTitle>What's making you happy right now?</Styled.FormTitle>
          <Styled.MessageInput
            id="message"
            type="text"
            onChange={event => {
              setMessageText(event.target.value)
              setError("")  
            }}
            value={messageText}
            placeholder="Hakuna Matata"
            />
          <Styled.CharCount $invalid={msgLength < 5 || msgLength > 140}>
            Characters: {msgLength} / 140
          </Styled.CharCount>
        </label>
        <Styled.FormButton
          type="submit"
          disabled={msgLength < 5 || msgLength > 140}
          >
          ♥️ Share a happy thought! ♥️
          </Styled.FormButton>
          {msgLength > 0 && error && (
            <p style={{ color: 'red'}}>
             {error}
            </p>
          )}
          <SignupForm />
          <LoginForm />
      </Styled.FormContainer>
  ) 
}

export default Form