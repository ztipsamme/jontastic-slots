import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import Themes from "../components/themes/index.js"
export const useThemeStore = defineStore("themes", {
  strict: true,
  state: () => ({
    currentTheme: useStorage("currentTheme", "diamant"),
    Themes,
  }),
  getters: {
    current: (state) => state.Themes[state.currentTheme],
    icons: (state) => state.current.icons,
    app: () => window.document.getElementById("app"),
  },
  actions: {
    setTheme(name) {
      this.currentTheme = name
      this.app.classList.remove(...this.app.classList)
      this.app.classList.add(name)
    },
  },
})
