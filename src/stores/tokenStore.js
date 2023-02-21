import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"

export const useTokenStore = defineStore("tokens", {
  strict: true,
  state: () => ({
    tokens: useStorage("tokens", 100),
    bonusTypes: useStorage("bonusTypes", [
      { name: "Extra Spin", cost: 200, amount: 0 },
      { name: "Extra Row", cost: 250, amount: 0 },
    ]),
    themeTypes: useStorage("themeTypes", [
      { name: "Cat Theme", cost: 150 },
      { name: "Night Theme", cost: 100 },
      { name: "Forest Theme", cost: 100 },
    ]),
  }),
  getters: {
    getTokensPlusOne: (state) => state.tokens + 1,
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
