import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { useAudioStore } from "./audio.js"
import { Themes } from "../components/themes/index.js"
import { useTokenStore } from "./tokenStore.js"
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
    tokens: () => useTokenStore(),
    isDelux: (state) => {
      let c = state.tokens.themeTypes.find((e) => {
        e.name.replace(/[^A-z]/g, "").toLowerCase() ==
          state.currentTheme.replace(/[^A-z]/g, "").toLowerCase()
      })
      if (c) {
        return Object.prototype.hasOwnProperty.call(c, "basic")
      }
      return false
    },

    findDelux: (state) => {
      console.log("FD", state.isDelux)
      if (!state.isDelux) {
        return state.tokens.themeTypes.find((e) => {
          console.log("CT", state.currentTheme)
          console.log("BASIC", e.basic)
          if (
            e.basic &&
            e.basic.toLowerCase() == state.currentTheme.toLowerCase()
          ) {
            console.log("HHMM")
            console.log("BASIC", e.basic)
            return true
          }
          return false
        })
      } else {
        return false
      }
    },
  },
  actions: {
    hasDelux(theme) {
      this.tokens.themeTypes.find((e) => {
        e.name.replace(/[^A-z]/g, "").toLowerCase() ==
          theme.replace(/[^A-z]/g, "").toLowerCase()
      })
    },

    setTheme(name) {
      this.audio.setTheme(name)
      this.currentTheme = name
      this.bg.classList.remove(...this.bg.classList)
      this.bg.classList.add(name)
    },
  },
})
