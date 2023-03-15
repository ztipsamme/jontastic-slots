<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes"

  import btn from "./elements/buttonComponent.vue"

  export default {
    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      return { tokens, theme }
    },
    components: {
      btn,
    },
    created() {},
    beforeMounted() {},

    mounted() {
      document.addEventListener("keydown", this.selectBetVal)
    },
    beforeUnmount() {
      document.removeEventListener("keydown", this.selectBetVal)
    },
    data() {
      return {
        valArray: [5, 10, 30, 50, 100],
        currentVal: 5,
        landscape: true,
      }
    },
    computed: {
      max: () => this.tokens.tokens.bet * 7,
    },
    methods: {
      selectBetVal(event) {
        if (event.key === "ArrowLeft") {
          let i = this.valArray.indexOf(this.currentVal)
          this.currentVal = i == 0 ? this.currentVal : this.valArray[i - 1]
        }

        if (event.key === "ArrowRight") {
          let i = this.valArray.indexOf(this.currentVal)
          this.currentVal =
            i == this.valArray.length - 1
              ? this.currentVal
              : this.valArray[i + 1]
        }

        if (event.key === "ArrowUp") {
          this.increaseBet(this.currentVal)
        }
        if (event.key === "ArrowDown") {
          this.decreaseBet(this.currentVal)
        }
      },
      increaseBet(bet) {
        if (this.tokens.tokens.bet + bet < this.tokens.tokens.sum) {
          this.tokens.tokens.bet += bet
        } else {
          this.tokens.tokens.bet = this.tokens.tokens.sum
        }
      },
      decreaseBet(bet) {
        if (this.tokens.tokens.bet - bet > 4) {
          this.tokens.tokens.bet -= bet
        } else {
          let lowest = this.tokens.tokens.sum > 4 ? 5 : 0
          this.tokens.tokens.bet = lowest
        }
      },
      setBet(val) {
        val = val < 5 ? 5 : val
        val = val > this.tokens.tokens.sum ? this.tokens.tokens.sum : val
        this.tokens.tokens.bet = val
      },
    },
  }
</script>
<template>
  <div
    :class="{ 'test-cont': true, landscape: landscape, standing: !landscape }"
  >
    <btn
      class="bet-btn"
      :styles="{ zIndex: 0, alignSelf: 'end', borderRadius: '10px' }"
      :position="landscape ? ['ens', 'start'] : ['end', 'center']"
      :size="'x-large'"
      :height="'100%'"
      :width="'100%'"
      :border-radius="landscape ? '0px 32px 10px 0px' : '10px 10px 10px 10px'"
      @click="decreaseBet(currentVal)"
    >
      -
    </btn>
    <div class="max-winning-cont">
      <div class="text-container">
        <span>MAX VINST: {{ tokens.tokens.bet * 7 }}</span>
      </div>
      <div class="winning-cont amount">
        <p>{{ tokens.tokens.bet }}</p>
      </div>
    </div>
    <btn
      class="bet-btn"
      :styles="{
        zIndex: 1,
        justifySelf: 'self-end',
      }"
      :position="landscape ? ['end', 'end'] : ['end', 'center']"
      :size="'x-large'"
      :height="'100%'"
      :width="'100%'"
      :border-radius="landscape ? '0px 32px 10px 0px' : '10px 10px 10px 10px'"
      @click="increaseBet(currentVal)"
    >
      +
    </btn>
    <div class="val-cont">
      <btn
        v-for="n in [5, 10, 30, 50, 100]"
        :key="n"
        :color="'purple'"
        :border-radius="'5px'"
        :selected="currentVal == n"
        :width="'100%'"
        @click="
          () => {
            currentVal = n
          }
        "
        >{{ n }}</btn
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  p {
    margin: 0;
    padding: 0;
  }
  .test-cont {
    width: 90%;
    grid-template-columns: 1fr 1fr;
    display: grid;
    justify-self: center;
    position: relative;

    .val-cont {
      display: flex;
      justify-content: space-between;
      z-index: 2;
      padding: 5px 0px;
      gap: 10px;
    }
    .max-winning-cont {
      overflow: hidden;
      position: absolute;
      display: grid;
      grid-template-rows: 40% 60%;
      grid-template-columns: 100%;
      justify-content: center;
      align-items: center;
      justify-self: center;
      border-radius: 10px 10px 60px 60px;
      z-index: 2;
      background-image: linear-gradient(
        45deg,
        hsl(50, 0%, 90%) -20%,
        hsl(55, 0%, 95%) 80%
      );
      &::after {
        content: "";
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: inherit;
        box-shadow: inset -2px 2px 5px 0px hsl(0deg 0% 0% / 50%);
      }

      > p {
        height: 20%;
      }
      & * {
        position: relative;
      }
      .text-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-image: linear-gradient(
          130deg,
          hsl(50, 100%, 50%),
          var(--bs-yellow) 80%,
          var(--bs-orange) 120%
        );
        grid-row: 1;
        height: 100%;
        font-size: clamp(16px, 3vh, 24px);
        color: hsl(0, 100%, 100%);
        text-shadow: 1px 1px 1px #00000044;
        box-shadow: 0px 0px 4px 1px var(--btn-blue4);
        line-height: 1;
        text-align: center;
        padding: 0px 7px 0px 7px;
      }
      .amount {
        display: flex;
        align-items: center !important;
        justify-content: center;
        grid-row: 2;
        width: 100%;

        font-size: clamp(20px, 8vh, 60px);
        display: flex;
        align-items: center !important;
        justify-content: center;
        grid-row: 2;
        width: 100%;
        font-size: clamp(20px, 7vh, 50px);
        text-shadow: 1px 1px 1px #00000044;
        & p {
          color: var(--btn-blue4);
          line-height: 1.2;
        }
      }

      .winning-cont {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 1 50%;
        height: 100%;
        width: 50%;
        align-self: center;
        justify-self: center;
      }
    }

    &.standing {
      grid-template-rows: 5fr 2fr;
      .val-cont {
        grid-row: 3;
        grid-column: span 2;
      }
      .bet-btn {
        grid-row: span 2;
      }
      .max-winning-cont {
        grid-column: span 3;
        grid-row: span 2;
        width: 66%;
        max-width: 380px;
        min-width: 125px;
        height: 71%;
      }
    }
    &.landscape {
      grid-template-rows: 5fr 2fr;
      .val-cont {
        grid-row: 2;
        grid-column: span 3;
      }
      .max-winning-cont {
        grid-column: span 3;
        grid-row: span 2;
        width: 66%;
        max-width: 380px;
        min-width: 125px;
        height: 71%;
      }
    }
  }

  .symbols {
    flex-direction: column;
    height: 100%;
    grid-row: 3;
  }
  .symbol-container {
    flex: 0 0 100%;
    height: 100%;
    width: 100%;
  }
</style>
