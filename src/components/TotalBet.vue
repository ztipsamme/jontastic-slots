<template>
  <div class="total-bet-container">
    <btn
      :styles="{ height: '100%' }"
      size="large"
      @click="decrementBetAmount()"
    >
      -
    </btn>
    <p class="bet-amount">{{ betAmount }}</p>
    <btn size="large" @click="incrementBetAmount()"> + </btn>
  </div>
</template>

<script>
  import { defineComponent, ref } from "vue"
  import btn from "./elements/buttonComponent.vue"
  import { useTokenStore } from "../stores/tokenStore.js"

  export default defineComponent({
    name: "TotalBet",
    components: {
      btn,
    },
    setup() {
      const tokenStore = useTokenStore()
      const betAmount = ref(10)

      function decrementBetAmount() {
        if (betAmount.value > 5) {
          betAmount.value -= 5
          tokenStore.dispatch("addToken", 5)
        }
      }

      function incrementBetAmount() {
        const tokens = tokenStore.state.tokens.sum
        if (betAmount.value < tokens && betAmount.value < 50) {
          betAmount.value += 5
          tokenStore.dispatch("removeToken", 5)
        }
      }

      return {
        betAmount,
        decrementBetAmount,
        incrementBetAmount,
      }
    },
  })
</script>

<style scoped>
  .total-bet-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
  }

  .minus-button,
  .plus-button {
    font-size: 24px;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
  }

  .bet-amount {
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 20vw;
    height: 50px;
    z-index: -5;
    top: 5px;
    box-shadow: inset 1px 1px 3px 0px black;
    font-size: 30px;
    font-weight: bold;
    margin: 0 -25px;
  }
</style>
