import { defineStore } from 'pinia'
export const useTokenStore = defineStore('tokens', {
  strict: true,
  state: () => ({
    tokens: 0,
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
