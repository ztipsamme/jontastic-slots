<template>
  <div class="total-bet-container">
    <button class="minus-button" @click="decrementBetAmount()">-</button>
    <span class="bet-amount">{{ betAmount }}</span>
    <button class="plus-button" @click="incrementBetAmount()">+</button>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from "vuex"
  export default {
    name: "TotalBet",
    data() {
      return {
        betAmount: 5,
        minBetAmount: 5,
        maxBetAmount: 50,
        stepBetAmount: 5,
      }
    },
    computed: {
      ...mapGetters("tokenStore", ["bet"]),
    },
    methods: {
      ...mapMutations("tokenStore", ["setBet"]),
      incrementBetAmount() {
        if (this.betAmount + this.stepBetAmount <= this.maxBetAmount) {
          this.betAmount += this.stepBetAmount
          this.setBet(this.bet + this.stepBetAmount)
        }
      },
      decrementBetAmount() {
        if (this.betAmount - this.stepBetAmount >= this.minBetAmount) {
          this.betAmount -= this.stepBetAmount
          this.setBet(this.bet - this.stepBetAmount)
        }
      },
    },
  }
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
    font-size: 24px;
    font-weight: bold;
    margin: 0 10px;
  }
</style>
