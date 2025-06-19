import { ThemeProvider as StyledThemeProvider } from "styled-components"
import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from "@mui/material"
import { useState, useMemo } from "react"

import App from './App.jsx'
import { lightTheme, darkTheme } from "./theme"

const AppWrapper = () => {
  const [mode, setMode] = useState("light")

  const styledTheme = useMemo(() => (
    mode === "dark" ? darkTheme : lightTheme
  ), [mode])

  const muiTheme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: styledTheme.colors.primary },
        background: { default: styledTheme.colors.background },
        text: { primary: styledTheme.colors.text },
      },
      typography: {
        fontFamily: styledTheme.font,
      },
    }), [styledTheme]
  )

  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={styledTheme}>
        <CssBaseline />
        <App toggleTheme={() => setMode(prev => prev === "light" ? "dark" : "light")} />
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default AppWrapper
