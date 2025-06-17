import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin-top: 40px;
    margin-bottom: 20px;
    background: 
    linear-gradient(
        to bottom, 
        rgba(255, 237, 230, 0.85), 
        rgba(255, 237, 230, 0.3)
      );
    background-size: cover;
    font-family: 'Quicksand', sans-serif;
    background-color: #fdfdfd;
    color: #111;
  }

  button {
    font-family: 'Comfortaa', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`