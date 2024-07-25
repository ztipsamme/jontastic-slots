import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { useThemeStore } from "./themes"
import { Themes } from "../components/themes/index.js"
import { iconSpin, xMark } from "../svg/index.js"
import iconRow2 from "../svg/icon-row.svg"
console.log(iconSpin, iconRow2)
export const useTokenStore = defineStore("tokens", {
  strict: true,
  state: () => ({
    themeStore: useThemeStore(),
    tokens: useStorage("tokens", {
      sum: 900,
      startValue: 900,
      bet: 5,
      startBet: 5,
    }),
    bonusTypes: useStorage("bonusTypes", [
      {
        name: "Extra Spin",
        cost: 200,
        amount: 0,
        count: 1,
        active: false,
        uses: 1,
        src: iconSpin,
      },
      {
        name: "Extra Dubbel",
        cost: 500,
        amount: 0,
        count: 1,
        active: false,
        uses: 1,
        src: xMark,
      },
      {
        name: "Extra Row",
        cost: 250,
        amount: 0,
        count: 4,
        active: false,
        uses: 4,
        src: iconRow2,
      },
    ]),
    themeTypes: useStorage("themeTypes", [
      {
        name: "Diamant",
        cost: 0,
        owned: true,
        active: true,
        src: Themes.diamant.icons[0],
      },
      {
        name: "Katt",
        cost: 250,
        owned: false,
        active: false,
        src: Themes.katt.icons[0],
      },
      {
        name: "Midnatt",
        cost: 200,
        owned: false,
        active: false,
        src: Themes.midnatt.icons[0],
      },
      {
        name: "Skog",
        cost: 150,
        owned: false,
        active: false,
        src: Themes.skog.icons[0],
      },
      {
        name: "Eld",
        cost: 200,
        owned: false,
        active: false,
        src: Themes.eld.icons[0],
      },
      {
        name: "Hav",
        cost: 200,
        owned: false,
        active: false,
        src: Themes.hav.icons[0],
      },
      {
        name: "Brilliant",
        basic: "Diamant",
        cost: 0,
        owned: false,
        active: false,
        src: Themes.diamant.icons[0],
      },
      {
        name: "Rawr",
        basic: "Katt",
        cost: 0,
        owned: true,
        active: false,
        src: Themes.katt.icons[0],
      },
      {
        name: "Stadsljus",
        basic: "Midnatt",
        cost: 0,
        owned: true,
        active: false,
        src: Themes.midnatt.icons[0],
      },
      {
        name: "Vildmark",
        basic: "Skog",
        cost: 0,
        owned: true,
        active: false,
        src: Themes.skog.icons[0],
      },
      {
        name: "Inferno",
        basic: "Eld",
        cost: 0,
        owned: true,
        active: false,
        src: Themes.eld.icons[0],
      },
      {
        name: "Sjuhaven",
        basic: "Hav",
        cost: 0,
        owned: true,
        active: false,
        src: Themes.hav.icons[0],
      },
    ]),
  }),
  getters: {
    audio: () => {
      let theme = useThemeStore()
      return theme.audio
    },
    getTokensPlusOne: (state) => state.tokens + 1,
    isThemeOwned: (state) => (name) =>
      state.themeTypes.find(
        (e) =>
          e.name.toLowerCase().replace(/\s/g, "") ==
          name.toLowerCase().replace(/\s/g, ""),
      ).owned,
    getBonus: (state) => (name) => (e) => {
      let i = state.bonusTypes.findIndex(
        e.name.toLowerCase().replace(/\s/g, "") ==
          name.toLowerCase().replace(/\s/g, ""),
      )
      return state.bonusTypes[i]
    },
  },

  actions: {
    addTokens(amount) {
      this.token += amount
    },
    async takeoutBet(amount) {
      this.tokens.sum -= amount
    },
    async winning(amount) {
      console.log(this.audio.cashIn)
      this.audio.promises.cashIn = this.audio.cashIn.play()
      this.tokens.sum += amount
    },
  },
})
