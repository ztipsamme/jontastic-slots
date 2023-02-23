import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"

export const useTokenStore = defineStore("tokens", {
  strict: true,
  state: () => ({
    tokens: useStorage("tokens", { sum: 10000, startValue: 100 }),
    bonusTypes: useStorage("bonusTypes", [
      { name: "Extra Spin", cost: 200, amount: 0, owned: false },
      { name: "Extra Row", cost: 250, amount: 0, owned: false },
    ]),
    themeTypes: useStorage("themeTypes", [
      {
        name: "Cat Theme",
        cost: 150,
        owned: false,
        src: "./assets/svg/icon-cat.svg",
      },
      {
        name: "Night Theme",
        cost: 100,
        owned: false,
        src: "./assets/svg/icon-moon.svg",
      },
      {
        name: "Forest Theme",
        cost: 100,
        owned: false,
        src: "./assets/svg/icon-pine-tree.svg",
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
  },
})

// lägga till action för purchase enhancement
// lägga till för att uppdatera best win och på något sätt ladda sparad data

/*
// För att använda i ViewComponent:

import {useTokenStore} from .......PiniaTemplate.js

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
      console.log(this.tokens.token) // prints 0

      this.tokens.tokens = 10
      console.log(this.tokens.token) // prints 10

      this.tokens.addTokens(15)
      console.log(this.tokens.token) // prints 25
    }
  }
}

*/
