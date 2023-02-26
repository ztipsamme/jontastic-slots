<template>
  <div class="total-bet-container">
    <button class="minus-button slot-btn blue" @click="decrementBetAmount()">
      -
    </button>
    <p class="bet-amount">{{ betAmount }}</p>
    <button
      style="z-index: 1"
      class="plus-button slot-btn blue"
      @click="incrementBetAmount()"
    >
      +
    </button>
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
