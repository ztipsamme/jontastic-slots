<template>
  <div class="total-bet-container">
    <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'13vh'"
      :size="'large'"
      @click="decrementBetAmount()"
    >
      -
    </btn>

    <div class="bet-amount">
      <p>total bet:</p>
      {{ "\n" + bet }}
    </div>
    <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'13vh'"
      :size="'large'"
      @click="incrementBetAmount()"
    >
      +
    </btn>
  </div>
</template>

<script>
  import btn from "./elements/buttonComponent.vue"
  import { useTokenStore } from "../stores/tokenStore.js"

  export default {
    setup() {
      const tokenStore = useTokenStore()
      return {
        tokenStore,
      }
    },
    components: {
      btn,
    },
    computed: {
      bet: {
        get() {
          return this.tokenStore.tokens.bet
        },
        set(val) {
          this.tokenStore.tokens.bet = val
        },
      },
      tokens() {
        return this.tokenStore.tokens.sum
      },
    },
    methods: {
      decrementBetAmount() {
        if (this.bet > 5) {
          this.bet -= 5
        }
      },
      incrementBetAmount() {
        if (this.bet + 5 < this.tokens && this.bet + 5 <= 50) {
          this.bet += 5
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .total-bet-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bet-wrapper {
    background-color: antiquewhite;
  }
  .bet-label {
    width: 100%;
    display: flex;
    height: 30px;
    color: white;
    align-items: center;
    justify-content: center;
  }
  .minus-button,
  .plus-button {
    font-size: 24px;
    font-weight: normal;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 2;
  }

  .bet-amount {
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 23vw;
    height: 13vh;
    max-height: 65px;
    top: 5px;
    box-shadow: inset 1px 1px 3px 0px black;
    font-size: clamp(10px, 7vh, 30px);
    font-weight: normal;
    margin: 0 -25px;
    & p {
      position: relative;
      top: 5px;
      margin: 0;
      padding: 0;
      line-height: 1em;
      font-size: 20px;
    }
  }
</style>
