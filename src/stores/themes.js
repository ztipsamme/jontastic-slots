import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { useAudioStore } from "./audio.js"
import { Themes } from "../components/themes/index.js"
export const useThemeStore = defineStore("themes", {
  strict: true,
  state: () => ({
    currentTheme: useStorage("currentTheme", "diamant"),
    Themes,
  }),
  getters: {
    current: (state) => state.Themes[state.currentTheme],
    icons: (state) => state.current.icons,
    audio: () => useAudioStore(),
    bg: () => window.document.body,
  },
  actions: {
    setTheme(name) {
      this.audio.setTheme(name)
      this.currentTheme = name
      this.bg.classList.remove(...this.bg.classList)
      this.bg.classList.add(name)
    },
  },
})
