import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"

export const useScoreStore = defineStore("scores", {
  strict: true,
  state: () => ({
    scores: useStorage("scores", {
      highScore: [],
    }),
  }),
  actions: {
    updateScore(winSum) {
      const newValue = Number(winSum)
      if (typeof newValue === "number" && newValue > 0) {
        const scoreList = this.scores.highScore
        if (!scoreList.includes(newValue)) {
          scoreList.push(newValue)
        }
        scoreList.sort((a, b) => b - a)
        this.scores.highScore = scoreList.slice(0, 10)
      }
    },
  },
})
