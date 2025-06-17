import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: {
    username: "",
    email: "",
    password: "",
    accessToken: null,
  },

  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setToken: (accessToken) => set({ accessToken }),

  createUser: async () => {
    const { username, password } = get()

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      set({ accessToken: data.accessToken })
      localStorage.setItem({ accessToken })

    } catch (err) {
      console.error("User not registered:", err)
    }
  },

  loginUser: async () => {
    const { username, password } = get()
    
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      set({ accessToken: data.accessToken })
      localStorage.setItem({ accessToken })

    } catch (err) {
      console.error("User not registered:", err)
    }
  }
})
)