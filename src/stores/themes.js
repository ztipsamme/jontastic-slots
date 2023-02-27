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
  },
})
