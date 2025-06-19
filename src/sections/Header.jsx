import styled, { keyframes } from "styled-components"
import { IconButton, Tooltip } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

const scrollingTitle = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`
const TitleContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  width: clamp(300px, 80%, 600px);
  overflow: hidden;
  white-space: nowrap;
  padding: 0 1rem;
`
const Title = styled.h1`
  text-align: center;
  padding: 2rem 1rem;
  animation: ${scrollingTitle} 10s linear infinite;
`
const ToggleContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`

const Header = ({ toggleTheme, mode }) => {
  return (
    <TitleContainer>
      <ToggleContainer>
        <Tooltip title="Toggle Light/Dark Theme">
          {/* <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */} 
          {/* hidden until refactor style-code */}
        </Tooltip>
      </ToggleContainer>
      <Title> 💬 Happy Thoughts 💬 </Title>
    </TitleContainer>
  )
}

export default Header