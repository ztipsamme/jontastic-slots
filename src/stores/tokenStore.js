import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"

export const useTokenStore = defineStore("tokens", {
  strict: true,
  state: () => ({
    tokens: useStorage("tokens", { sum: 5, startValue: 5, bet: 5 }),
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
        src: "./assets/svg/icon-gem.svg",
      },
      {
        name: "Katt",
        cost: 250,
        owned: false,
        active: false,
        src: "./assets/svg/icon-cat.svg",
      },
      {
        name: "Midnatt",
        cost: 200,
        owned: false,
        active: false,
        src: "./assets/svg/icon-moon.svg",
      },
      {
        name: "Skog",
        cost: 150,
        owned: false,
        active: false,
        src: "./assets/svg/icon-pine-tree.svg",
      },
      {
        name: "Eld",
        cost: 200,
        owned: false,
        active: false,
        src: "./assets/svg/icon-fire.svg",
      },
    ]),
  }),
  getters: {
    getTokensPlusOne: (state) => state.tokens + 1,
    isThemeOwned: (state) => (name) =>
      state.themeTypes.find(
        (e) =>
          e.name.toLowerCase().replace(/\s/, "") ==
          name.toLowerCase().replace(/\s/, ""),
      ).owned,
  },

  actions: {
    addTokens(amount) {
      this.token += amount
    },
    async takeoutBet(amount) {
      //console.log("ASDFASDF", amount)
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
      loop()
    },
    async winning(amount) {
      let val = amount
      let timeout
      let loop = () => {
        this.tokens.sum++
        val--
        if (val > 0) {
          timeout = setTimeout(loop, 25)
        } else {
          clearTimeout(timeout)
        }
      }
      loop()
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
