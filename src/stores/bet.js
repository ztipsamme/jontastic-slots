import { defineStore } from "pinia"
export const useBetStore = defineStore("bet", {
  strict: true,
  state: () => {
    return {
      current: 0,
      balance: 0,
    }
  },
  getters: {},
  actions: {
    add(amount) {
      this.current += amount
    },
    remove(amount) {
      this.current -= amount
    },
  },
})
