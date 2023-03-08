<template>


  <div class="div-wrapper-container">
    <div class="bet-amount">
      <p>total bet:</p>
      <span>{{
        "\n" + tokenStore.tokens.bet
      }}</span>
    </div>


 <div class="bet-amount-num">
    <btn
      :styles="{ zIndex: 2, maxWidth: '85px' }"
      :circle="true"
      :width="'22vh'"
      :size="'large'"
      @click="decrementBetAmount()"
    >
      -
    </btn>

<p>
      <input
        id="inpBet"
        @blur="onBlur"
        v-if="isActive"
        type="text"
        v-model="currentBet"
      />
      <span @click="onClick" v-if="!isActive">{{
        "\n" + 5
      }}</span>

</p>
  <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'22vh'"
      :size="'large'"
      @click="incrementBetAmount()"
    >
      +
    </btn>
 </div>


 <div class="ten-bet">
  <div class="bet-amount-num10">


 <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'19vh'"
      :size="'large'"
      @click="decrementBetAmount10()"
    >
      -
    </btn>
      <input
        id="inpBet"
        @blur="onBlur"
        v-if="isActive"
        type="text"
        v-model="currentBet"
      />
      <span @click="onClick" v-if="!isActive">{{
        "\n" + 10
      }}</span>


  <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'19vh'"
      :size="'large'"
      @click="incrementBetAmount10()"
    >
      +
    </btn>
 </div>
 </div>
 <div class="thirty-bet-container">
  <div class="bet-amount-num30">


 <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'19vh'"
      :size="'large'"
      @click="decrementBetAmount30()"
    >
      -
    </btn>


      <input
        id="inpBet"
        @blur="onBlur"
        v-if="isActive"
        type="text"
        v-model="currentBet"
      />
      <span @click="onClick" v-if="!isActive">{{
        "\n" + 30
      }}</span>


  <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'19vh'"
      :size="'large'"
      @click="incrementBetAmount30()"
    >
      +
    </btn></div>

    <div class="hundred-bet-container">
    <div class="bet-amount-num100">
    <btn
      :styles="{ zIndex: 2, maxWidth: '85px' }"
      :circle="true"
      :width="'22vh'"
      :size="'large'"
      @click="decrementBetAmount100()"
    >
      -
    </btn>

<p>
      <input
        id="inpBet"
        @blur="onBlur"
        v-if="isActive"
        type="text"
        v-model="currentBet"
      />
      <span @click="onClick" v-if="!isActive">{{
        "\n" + 100
      }}</span>

</p>
  <btn
      :styles="{ zIndex: 2, maxWidth: '75px' }"
      :circle="true"
      :width="'22vh'"
      :size="'large'"
      @click="incrementBetAmount100()"
    >
      +
    </btn>
 </div>
 </div></div>
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
        val = val < 5 ? 5 : val
        val =
          val > this.tokenStore.tokens.sum ? this.tokenStore.tokens.sum : val
        this.tokenStore.tokens.bet = val
      },
      decrementBetAmount() {
        if (this.tokenStore.tokens.bet > 5) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet - 5
        }
      },
      decrementBetAmount10() {
        if (this.tokenStore.tokens.bet > 10) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet - 10
        }
      },
      decrementBetAmount30() {
        if (this.tokenStore.tokens.bet > 30) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet - 30
        }
      },
      decrementBetAmount100() {
        if (this.tokenStore.tokens.bet > 100) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet - 100
        }
      },
      incrementBetAmount() {
        if (this.tokenStore.tokens.bet + 5 <= this.tokenStore.tokens.sum) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet + 5
        }
      },
      incrementBetAmount10() {
        if (this.tokenStore.tokens.bet + 10 <= this.tokenStore.tokens.sum) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet + 10
        }
      },
      incrementBetAmount30() {
        if (this.tokenStore.tokens.bet + 30 <= this.tokenStore.tokens.sum) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet + 30
        }
      },
      incrementBetAmount100() {
        if (this.tokenStore.tokens.bet + 100 <= this.tokenStore.tokens.sum) {
          this.tokenStore.tokens.bet = this.tokenStore.tokens.bet + 100
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
    display: grid;
    align-items: center;
    justify-content: center;

  }
.bet-columns-container{
    display: flexbox;
  }

  .ten-bet {
    display:flex;
    align-items: center;
    width: 15em;
    justify-content: center;
  }


  .thirty-bet-container {
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .hundred-bet-container {
    display: flex;
    align-items: center;
    justify-content: right;
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


  .bet-amount {
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    display: flex;
    flex-flow: column;
    align-items: center;
    position: relative;
    width: 35vw;
    max-height: 65px;
    top: 29px;
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
  .bet-amount-num {
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
  .bet-amount-num10 {
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 13vw;
    max-height: 35px;
    top: 35px;
    box-shadow: inset 1px 1px 3px 0px black;
    font-size: clamp(10px, 7vh, 30px);
    font-weight: normal;
    margin: 0 -35px;

  }


  .bet-amount-num30{
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    display: flex;
    width: 14vw;
    max-height: 35px;
    box-shadow: inset 1px 1px 3px 0px black;
    font-size: clamp(10px, 7vh, 30px);
    margin: 0 -30px;
  }

  .bet-amount-num100{
    background-image: linear-gradient(
      45deg,
      hsl(200, 100%, 85%),
      hsl(200, 100%, 75%)
    );
    display: flex;
    width: 14vw;
    max-height: 35px;
    box-shadow: inset 1px 1px 3px 0px black;
    font-size: clamp(10px, 7vh, 30px);
    margin: 0 -180px;
  }

 </style>
