<template>
  <div class="betting-container">
    <div class="total-bet-container">
      <p>total bet:</p>
      <span>{{ "\n" + tokenStore.tokens.bet }}</span>
    </div>

    <div class="bet-container-wrapper">
      <div class="bet-container bet-5">
        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :height="betBtnHight"
          :size="'large'"
          @click="decreaseBet(5)"
          :audio="'btn.mp3'"
        >
          -
        </btn>

        <div class="bet-amount">5</div>
        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :height="betBtnHight"
          :size="'large'"
          @click="increaseBet(5)"
        >
          +
        </btn>
      </div>

      <div class="bet-container bet-10">
        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :size="'large'"
          :height="betBtnHight"
          @click="decreaseBet(10)"
        >
          -
        </btn>
        <div class="bet-amount">10</div>

        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :size="'large'"
          :height="betBtnHight"
          @click="increaseBet(10)"
        >
          +
        </btn>
      </div>

      <div class="bet-container bet-30">
        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :size="'large'"
          :height="betBtnHight"
          @click="decreaseBet(30)"
        >
          -
        </btn>
        <div class="bet-amount">30</div>

        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :size="'large'"
          :height="betBtnHight"
          @click="increaseBet(30)"
        >
          +
        </btn>
      </div>

      <div class="bet-container bet-100">
        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :size="'large'"
          :height="betBtnHight"
          @click="decreaseBet(100)"
        >
          -
        </btn>

        <div class="bet-amount">100</div>
        <btn
          class="btn"
          :styles="{ zIndex: 2 }"
          :circle="false"
          :width="betBtnWidth"
          :size="'large'"
          :height="betBtnHight"
          @click="increaseBet(100)"
        >
          +
        </btn>
      </div>
    </div>
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
    mounted() {
      this.setBet(this.tokenStore.tokens.bet)
      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          this.bet -= this.minBet

          if (this.bet < this.minBet) {
            this.bet = this.minBet
          }
        }

        if (event.key === "ArrowRight") {
          this.bet += this.minBet

          if (this.bet > this.maxBet) {
            this.bet = this.maxBet
          }
        }
      })
    },
    components: {
      btn,
    },
    data() {
      return {
        betBtnHight: "25px",
        betBtnWidth: "75px",
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
        val = val < 5 ? 5 : val
        val =
          val > this.tokenStore.tokens.sum ? this.tokenStore.tokens.sum : val

        this.tokenStore.tokens.bet = val
      },

      increaseBet(val) {
        if (this.tokenStore.tokens.bet + val < this.tokenStore.tokens.sum) {
          this.tokenStore.tokens.bet += val
        } else {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.sum
        }
      },
      decreaseBet(val) {
        if (this.tokenStore.tokens.bet - val > 4) {
          this.tokenStore.tokens.bet -= val
        } else {
          let lowest = this.tokenStore.tokens.sum > 4 ? 5 : 0
          this.tokenStore.tokens.bet = lowest
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .btn {
    flex-shrink: 0;
  }
  .betting-container {
    display: flex;
    flex-flow: column;
    width: 100%;
  }

  .bet-container-wrapper {
    display: flex;
    flex-flow: row wrap;
  }
  .hundred-bet-container {
    display: flex;
    align-items: center;
    justify-content: right;
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
    font-size: 4px;
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
  }

  .bet-container {
    display: flex;
    flex-flow: row;
    min-width: 200px;
    max-width: 200px;
    width: 200px;
    flex-shrink: 0;
    flex-grow: 0;
    align-items: center;
    justify-content: center;
  }
  .bet-amount {
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    box-shadow: inset 1px 1px 3px 0px black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    padding: 0 24px;
  }

  .total-bet-container {
    display: flex;
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    flex-flow: column;
    align-items: center;
    position: relative;
    max-width: 35vw;
    width: 100%;
    max-height: 65px;
    box-shadow: inset 1px 1px 3px 0px black;
    font-size: clamp(10px, 7vh, 30px);
    & p {
      position: relative;
      top: 5px;
      margin: 0;
      padding: 0;
      line-height: 1em;
      font-size: 20px;
    }
  }
  .bet-container-num {
    background-image: linear-gradient(
      5deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 11vw;
    max-height: 35px;
    top: 70px;
    box-shadow: inset 1px 1px 3px 0px black;
    font-size: clamp(10px, 7vh, 30px);
    font-weight: normal;
    margin: 0 -55px;
    & p {
      position: relative;
      margin: 0;
      padding: 0;
      line-height: 20em;
      font-size: 30px;
      width: 1em;
    }
  }
</style>
