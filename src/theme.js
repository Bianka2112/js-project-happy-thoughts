
export const baseTheme = {
  font: "'Quicksand', sans-serif",
  borderRadius: "12px",
  transition: "all 0.25s ease-in-out",
}

export const lightTheme = {
  ...baseTheme,
  mode: "light",
  colors: {
    background: "#fff9f7",
    text: "#111",
    primary: "#f95f86",
    secondary: "#fabda5b3",
    border: "#ddd",
  },
}

export const darkTheme = {
  ...baseTheme,
  mode: "dark",
  colors: {
    background: "#121212",
    text: "#fafafa",
    primary: "#f95f86",
    secondary: "#915f75",
    border: "#444",
  },
}
