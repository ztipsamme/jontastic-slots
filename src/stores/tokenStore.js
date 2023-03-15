import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { useThemeStore } from "./themes"
export const useTokenStore = defineStore("tokens", {
  strict: true,
  state: () => ({
    tokens: useStorage("tokens", {
      // Varför ligger bet här igentligen ? menar det är ju bara i spelvyn som det används.
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
        src: "./assets/svg/icon-spin.svg",
      },
      {
        name: "Extra Dubbel",
        cost: 500,
        amount: 0,
        count: 1,
        active: false,
        src: "./assets/svg/xmark.svg",
      },
      {
        name: "Extra Row",
        cost: 250,
        amount: 0,
        count: 4,
        active: false,
        src: "./assets/svg/icon-row.svg",
      },
    ]),
    themeTypes: useStorage("themeTypes", [
      {
        name: "Diamant",
        cost: 0,
        owned: true,
        active: true,
        src: "./src/components/themes/default/ico1.svg",
      },
      {
        name: "Katt",
        cost: 250,
        owned: false,
        active: false,
        src: "./src/components/themes/CatTheme/icons/ico1.svg",
      },
      {
        name: "Midnatt",
        cost: 200,
        owned: false,
        active: false,
        src: "./src/components/themes/NightTheme/icons/ico1.svg",
      },
      {
        name: "Skog",
        cost: 150,
        owned: false,
        active: false,
        src: "./src/components/themes/ForestTheme/icons/ico1.svg",
      },
      {
        name: "Eld",
        cost: 200,
        owned: false,
        active: false,
        src: "./src/components/themes/EldTheme/icons/ico1.svg",
      },
      {
        name: "Hav",
        cost: 200,
        owned: false,
        active: false,
        src: "./src/components/themes/HavTheme/icons/ico1.svg",
      },
      {
        name: "Brilliant",
        basic: "Diamant",
        cost: 0,
        owned: false,
        active: false,
        src: "./src/components/themes/default/ico1.svg",
      },
      {
        name: "Rawr",
        basic: "Katt",
        cost: 0,
        owned: false,
        active: false,
        src: "./src/components/themes/CatTheme/icons/ico1.svg",
      },
      {
        name: "Stadsljus",
        basic: "Midnatt",
        cost: 0,
        owned: false,
        active: false,
        src: "./src/components/themes/NightTheme/icons/ico1.svg",
      },
      {
        name: "Vildmark",
        basic: "Skog",
        cost: 0,
        owned: false,
        active: false,
        src: "./src/components/themes/ForestTheme/icons/ico1.svg",
      },
      {
        name: "Inferno",
        basic: "Eld",
        cost: 0,
        owned: false,
        active: false,
        src: "./src/components/themes/EldTheme/icons/ico1.svg",
      },
      {
        name: "Sjuhaven",
        basic: "Hav",
        cost: 0,
        owned: false,
        active: false,
        src: "./src/components/themes/HavTheme/icons/ico1.svg",
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

      /*
      let val = 0
      let timeout
      let loop = () => {
        this.tokens.sum--
        val++
        val = Math.min(val, amount)
        if (val < amount) {
          timeout = setTimeout(loop, 25)
        } else {
          clearTimeout(timeout)
        }
      }
      loop() */
    },
    async winning(amount) {
      this.audio.cashIn.play()
      this.tokens.sum += amount

      /*       let val = amount
      let timeout
      let loop = () => {
        this.tokens.sum++
        val--
        if (val > 0) {
          timeout = setTimeout(loop, 25)
        } else {
          clearTimeout(timeout)
          this.audio.cashIn.pause()
        }
      }
      loop() */
    },
  },
})

// lägga till action för purchase enhancement
// lägga till för att uppdatera best win och på något sätt ladda sparad data

/*
// För att använda i ViewComponent:

import {useTokenStore} from ../stores/tokenStore.js

default export{
  setup(){
    const tokens = useTokenStore()
    return {tokens}
  }



  data(){
    return{

    }
  }


  methods: {
// Hur du använder din store
    getState(){
      //console.log(this.tokens.token) // prints 0

      this.tokens.tokens = 10
      //console.log(this.tokens.token) // prints 10

      this.tokens.addTokens(15)
      //console.log(this.tokens.token) // prints 25
    }
  }
}

*/
