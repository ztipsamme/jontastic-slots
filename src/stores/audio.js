import { defineStore } from "pinia"
import { useThemeStore } from "./themes.js"
import { useStorage } from "@vueuse/core"
import { Sounds } from "../components/themes/index.js"
export const useAudioStore = defineStore("audio", {
  strict: true,
  state: () => ({
    theme: {},
    btn: {},
    cashIn: {},
    gameOver: {},
    invalid: {},
    noWin: {},
    purchase: {},
    reels: {},
    win: {},
    bonus: {},
    volume: useStorage("volume", {
      music: 0.05,
      btn: 0.05,
      fx: 0.15,
      info: 0.05,
    }),
    promises: {},
  }),
  getters: {
    themeStore: () => useThemeStore(),
    newAudio: (state) => (audio) =>
      new Audio(Sounds[state.themeStore.currentTheme].audio.src[audio]),
  },
  actions: {
    stopAll() {
      for (let a in this.$state) {
        console.log(a)
        if (a == "volume" || a == "promises") {
          continue
        }
        try {
          this.$state[a].load()
        } catch {
          if (this.$state.promises[a]) {
            this.$state.promises[a]
              .then(() => {
                this.$state[a].load()
                delete this.$state.promises[a]
              })
              .catch(() => {
                this.$state[a].load()
                delete this.$state.promises[a]
              })
          }
        }
      }
    },
    setTheme(name) {
      for (let a in this.$state) {
        console.log(a)
        if (a == "volume" || a == "promises") {
          continue
        }
        try {
          this.$state[a].load()
        } catch (e) {
          this[a] = new Audio(Sounds[name].audio.src[a])
          this.$state[a].load()
        }
      }
      this.theme = new Audio(Sounds[name].audio.src["theme"])
      this.btn = new Audio(Sounds[name].audio.src["btn"])
      this.cashIn = new Audio(Sounds[name].audio.src["cashIn"])
      this.gameOver = new Audio(Sounds[name].audio.src["gameOver"])
      this.invalid = new Audio(Sounds[name].audio.src["invalid"])
      this.noWin = new Audio(Sounds[name].audio.src["noWin"])
      this.purchase = new Audio(Sounds[name].audio.src["purchase"])
      this.reels = new Audio(Sounds[name].audio.src["reels"])
      this.win = new Audio(Sounds[name].audio.src["win"])
      this.bonus = new Audio(Sounds[name].audio.src["bonus"])

      this.setMusicVolume(this.volume.music)
      this.setFxVolume(this.volume.fx)
    },
    setMusicVolume(val) {
      this.volume.music = Number(val)
      this.theme.volume = Number(val)
    },
    setFxVolume(val) {
      this.volume.info = Number(val)
      this.cashIn.volume = Number(val)
      this.invalid.volume = Number(val)
      this.purchase.volume = Number(val)
      this.bonus.volume = Number(val)
      this.gameOver.volume = Number(val)
      this.noWin.volume = Number(val)
      this.reels.volume = Number(val)
      this.win.volume = Number(val)
      this.btn.volume = Number(val)
    },
  },
})
