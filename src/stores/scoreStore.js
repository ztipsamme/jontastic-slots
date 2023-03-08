import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"

export const useScoreStore = defineStore("scores", {
  strict: true,
  state: () => ({
    scores: useStorage("scores", {
      highScore: [],
    }),
  }),
})
