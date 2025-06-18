import { create } from "zustand"

export const useAuthStore = create((set) => ({
    username: "",
    email: "",
    accessToken: localStorage.getItem("accessToken") ?? null,

  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),

  createUser: async ({ username, email, password }) => {
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      set({ accessToken: data.accessToken })
      localStorage.setItem("accessToken", data.accessToken)

    } catch (err) {
      console.error("User not registered:", err)
      throw err
    }
  },

  loginUser: async ({ username, password }) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      set({ accessToken: data.accessToken })
      localStorage.setItem("accessToken", data.accessToken)

    } catch (err) {
      console.error("User not logged in:", err)
      throw err
    }
  },

  logoutUser: async () => {
    set({ accessToken: null, username: "", password: "", email: "" })
    localStorage.removeItem("accessToken")
  }
})
)