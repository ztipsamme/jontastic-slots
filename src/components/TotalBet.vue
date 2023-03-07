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
      <input
        id="inpBet"
        @blur="onBlur"
        v-if="isActive"
        type="text"
        v-model="currentBet"
      />
      <span @click="onClick" v-if="!isActive">{{
        "\n" + tokenStore.tokens.bet
      }}</span>
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
    data() {
      return {
        currentBet: 0,
        isActive: false,
      }
    },
    watch: {
      currentBet() {
        this.setBet(this.currentBet)
      },
    },
    computed: {},
    methods: {
      setBet(val) {
        val =
          val > this.tokenStore.tokens.sum ? this.tokenStore.tokens.sum : val
        val = val < 5 ? 5 : val
        console.log("val", val)

        this.tokenStore.tokens.bet = val
      },
      decrementBetAmount() {
        if (this.tokenStore.tokens.bet > 5) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet - 5
        }
      },
      incrementBetAmount() {
        if (this.tokenStore.tokens.bet + 5 <= this.tokenStore.tokens.sum) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet + 5
        }
      },
      onClick() {
        this.isActive = true
        this.currentBet = this.tokenStore.tokens.bet
      },
      onBlur() {
        this.isActive = false
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
  #inpBet {
    border: 0;
    outline: 0;
    padding: 0;
    text-align: center;
    background: none;
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
