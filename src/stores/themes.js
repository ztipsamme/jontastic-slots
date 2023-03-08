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
    audio: (state) => state.current.audio,
    bg: () => window.document.body,
  },
  actions: {
    setTheme(name) {
      this.currentTheme = name
      this.bg.classList.remove(...this.bg.classList)
      this.bg.classList.add(name)
    },
  },
})
