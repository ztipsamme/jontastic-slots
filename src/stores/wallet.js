import { defineStore } from 'pinia'
export const useWalletStore = defineStore('wallet', {
  strict: true,
  state: () => ({
    balance: 100, // börja med 100
    bestWin: 0, // börja med noll vinster

  getters: {
    getTokensPlusOne: (state) => state.tokens + 1,
  },
  actions: {
    add(amount) {
      this.balance -= amount
    },
    remove(amount){
      this.balance -= amount
    }
  },
})

// lägga till action för purchase enhancement
// lägga till för att uppdatera best win och på något sätt ladda sparad data

/*
// För att använda i ViewComponent:

import {useTokenStore} from .......PiniaTemplate.js

export default {
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
