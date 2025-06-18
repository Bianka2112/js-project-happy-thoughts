import { create } from "zustand";
import { API_URL } from "../utils/constants"
import { useAuthStore } from "./useAuthStore";

export const useThoughtStore = create((set) => ({
  thoughts: [],
  loading: false,
  error: null,

  fetchThoughts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      set({ thoughts: data.response, loading: false })
    } catch (error) {
      console.error(error)
      set({ loading: false, error: error })
    }
  },

  addThought: (newThought) => set((state) => ({
    thoughts: [newThought, ...state.thoughts]
  })),

  deleteThought: async (id) => {
    const token = useAuthStore.getState().accessToken

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Thought not deleted")
      }
      set((state) => ({
        thoughts: state.thoughts.filter(t => t._id !== id)
      }))
    } catch(error) {
      console.error("Error deleting thought:", error)
      throw error
    }
  },

  editThought: async (id, newMessage) => {
    const token = useAuthStore.getState().accessToken

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ editThought: newMessage })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Thought not edited")
      }
      set((state) => ({
        thoughts: state.thoughts.map(t => t._id === id ? data.response : t )
      }))
    } catch(error) {
      console.error("Error to edit thought:", error)
      throw error
    }
  }
})
)