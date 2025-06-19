import { useEffect } from "react"
import Form from "../src/sections/Form"
import Header from "../src/sections/Header"
import { Loader } from "./components/Loader"
import { GlobalStyle } from "./GlobalStyles"
import { MsgBoard } from "./sections/MsgBoard"
import { useThoughtStore } from "./store/useThoughtStore"

const App = ({ toggleTheme, mode }) => {

  const fetchThoughts = useThoughtStore((state) => state.fetchThoughts)
  const loading = useThoughtStore((state) => state.loading)

  useEffect(() => {
    fetchThoughts()
  }, [fetchThoughts])

  return (
    <>
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} mode={mode}/>
      <Form />
      {loading ? <Loader /> : <MsgBoard />}
    </>
  )
}

export default App
