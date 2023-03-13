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
      const newValue = Number(winSum.replace(/\D/g, ""))
      if (typeof newValue === "number") {
        const scoreList = this.scores.highScore
        if (!scoreList.includes(newValue)) {
          scoreList.push(newValue)
        }
        scoreList.sort((a, b) => b - a)
        this.scores.highScore = scoreList.slice(0, 6)
      }
    },
    /*   updateScore(newScore) {
      const scoreList = this.scores.highScore
      if (!scoreList.includes(newScore) && typeof newScore === "number") {
        scoreList.push(newScore)
      }

      scoreList.sort((a, b) => b - a)
      this.scores.highScore = scoreList.slice(0, 6)
    }, */
  },
})
