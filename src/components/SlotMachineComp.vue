<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import { useScoreStore } from "../stores/scoreStore.js"
  import spinnerComp from "./ReelsComp.vue"
  import TotalBet from "./TotalBet.vue"
  import FlashText from "./animations/FlashingText.vue"
  import Btn from "./elements/buttonComponent.vue"
  /*  import iconComponent from "./elements/iconComponent.vue" */

  export default {
    components: {
      TotalBet,
      spinner: spinnerComp,
      "flash-text": FlashText,
      btn: Btn,
      /* icon: iconComponent, */
    },

    emits: { stop: null },

    created() {
      if (this.tokens.bonusTypes.find((i) => i.name === "Extra Row").active) {
        this.reels = 4
        this.extraRowCount = this.tokens.bonusTypes.find(
          (i) => i.name === "Extra Row",
        ).count
      }
      this.spinnerArr = new Array(this.reels)
        .fill(null)
        .map(() => this.generateSpinner())
    },

    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      const score = useScoreStore()
      window.content = score
      return { tokens, theme, score }
    },

    data() {
      return {
        count: 21,
        num: [],
        numIndex: [],
        winner: false,
        isSpinning: false,
        spinnerArr: [],
        reels: 3,
        gameOver: false,
        winSum: 0,
      }
    },

    watch: {
      reels() {
        this.spinnerArr = new Array(this.reels)
          .fill(null)
          .map(() => this.generateSpinner())
      },
    },

    computed: {
      mytokens() {
        return this.tokens.tokens.sum
      },

      hasExtraRow() {
        return this.tokens.bonusTypes.some(
          (i) => i.name === "Extra Row" && i.amount > 0,
        )
      },
    },

    methods: {
      generateSpinner() {
        let array = []
        for (var i = 1; i <= 6; i++) {
          array = new Array(i).fill(i).concat(array)
        }

        function shuffleArray(arr) {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
          }
          return array
        }
        array = shuffleArray(array)
        return array
      },

      activateBonus(name) {
        switch (name) {
          case "extrarow": {
            if (this.extraRowCount) {
              return
            }

            let extraRow = this.tokens.bonusTypes.find(
              (i) => i.name === "Extra Row",
            )
            extraRow.amount--
            extraRow.active = true
            this.extraRowCount = extraRow.count
            this.reels = 4
            this.spinnerArr = new Array(this.reels)
              .fill(null)
              .map(() => this.generateSpinner())
            break
          }
          case "extraspin": {
            if (this.isSpinning) {
              return
            }
            let extraSpin = this.tokens.bonusTypes.find(
              (i) => i.name === "Extra Spin",
            )
            extraSpin.amount--
            extraSpin.active = true
            this.gameStart(true)
          }
        }
      },

      altGetNumbers() {
        this.numIndex = []
        this.num = []
        let isWinner = Math.floor(Math.random() * 3) == 2
        if (isWinner) {
          let winVal = 6
          let isHigher

          for (let i = 6; i > 0; i--) {
            winVal = i
            isHigher = Math.floor(Math.random() * 2)
            console.log("isHigher", isHigher, winVal)
            if (isHigher) {
              break
            }
          }

          this.spinnerArr.forEach((reel, index) => {
            let arr = []
            reel.forEach((e, i) => {
              if (e == winVal) {
                arr.push(i)
              }
            })
            let nIndex = arr[Math.floor(Math.random() * arr.length)]

            this.numIndex[index] = nIndex
            this.num[index] = reel[this.numIndex[index]]
          })
        } else {
          this.spinnerArr.forEach((e, i) => {
            this.numIndex[i] = Math.floor(Math.random() * e.length)
            this.num[i] = e[this.numIndex[i]]
          })

          if (this.num.every((e) => e == this.num[0])) {
            let same = this.num[0]
            let reel = Math.floor(Math.random() * this.num.length)
            while (this.num[reel] == same) {
              this.numIndex[reel] = Math.floor(
                Math.random() * this.spinnerArr[reel].length,
              )
              this.num[reel] = this.spinnerArr[reel][this.numIndex[reel]]
            }
          }
        }

        return { num: this.num, numIndex: this.numIndex }
      },

      checkNumbers() {
        let val = this.altGetNumbers()
        this.num = val.num
        this.numIndex = val.numIndex

        return this.numIndex
      },
      done() {
        this.isSpinning = false
        if (!this.extraRowCount && this.reels == 4) {
          let extraRow = this.tokens.bonusTypes.find(
            (i) => i.name === "Extra Row",
          )
          extraRow.active = false
          this.reels = 3
          this.spinnerArr = new Array(this.reels)
            .fill(null)
            .map(() => this.generateSpinner())

          console.log(this.spinnerArr)
        }
        this.tokens.bonusTypes.find(
          (i) => i.name === "Extra Spin",
        ).active = false
        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
          let winSum =
            this.tokens.tokens.bet + this.tokens.tokens.bet * (7 - this.num[0])
          this.winSum = winSum
          this.tokens.winning(winSum)
        } else if (this.tokens.tokens.sum < 5) {
          this.winner = false
          this.gameOver = true
        } else {
          this.winner = false
        }
        if (this.tokens.tokens.bet > this.tokens.tokens.sum) {
          this.$refs.betComp.setBet(this.tokens.tokens.sum)
        }

        const scoreList = this.score.scores.highScore
        console.log("Före: " + scoreList)
        console.log(Array.isArray(this.score.scores.highScore))

        if (!scoreList.includes(this.winSum)) {
          scoreList.push(this.winSum)
        }
        scoreList.sort((a, b) => b - a)
        this.score.scores.highScore = scoreList.slice(0, 6)
        console.log(
          "Uppdaterat: " + JSON.stringify(this.score.scores.highScore),
        )
      },

      gameStart(freeSpin = false) {
        if (this.isSpinning) {
          return
        }
        this.isSpinning = true
        this.winSum = null
        if (this.tokens.tokens.sum - this.tokens.tokens.bet < 0) {
          return
        }
        this.tokens.tokens.sum = this.tokens.tokens.sum - this.tokens.tokens.bet
        console.log("startgame", this.isSpinning)

        if (this.extraRowCount) {
          this.extraRowCount--
        }

        this.winner = false
        if (!freeSpin) {
          this.tokens.takeoutBet(this.tokens.tokens.bet)
        }

        this.checkNumbers()

        this.$refs.child.start(this.numIndex)
      },

      newGame() {
        this.gameOver = false
        this.tokens.tokens.sum = this.tokens.tokens.startValue
        let startbet = this.tokens.tokens.startBet
          ? this.tokens.tokens.startBet
          : 100
        this.tokens.tokens.bet = startbet
      },
    },
  }
</script>

<template>
  <flash-text
    :h="50"
    v-if="winner"
    :style="{
      position: 'absolute',
      margin: '0',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '99',
    }"
    :text="'Vinst: ' + winSum + 't'"
    @click="winner = !winner"
  />
  <flash-text
    :h="0"
    :text="'Game Over'"
    v-if="gameOver"
    :style="{
      position: 'absolute',
      margin: '0',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '99',
    }"
    @click="newGame()"
  />
  <div class="main-machine cont">
    <div class="bonus-container">
      <div
        class="bonus-wrapper"
        v-for="b in tokens.bonusTypes.filter((e) => e.amount > 0)"
        :key="b.name"
      >
        <btn
          :circle="true"
          :size="'small'"
          :width="'50%'"
          :styles="{ minWidth: '50px', maxWidth: '150px' }"
          :border-radius="'5px'"
          :selected="b.active"
          @click="activateBonus(b.name.replace(/[^A-z]/g, '').toLowerCase())"
          ><p>{{ b.amount }}</p>
          <img class="icon" :src="b.src" :alt="b.name" />
        </btn>
        {{ b.name }}
      </div>
    </div>
    <div class="reels-col col">
      <div class="col-1" />
      <div class="reel-cont">
        <spinner
          :ref="'child'"
          :spinners="spinnerArr"
          :numbers="numIndex"
          :count="count"
          @done="done"
        />
      </div>
    </div>
    <div class="row-2">
      <TotalBet :ref="'betComp'" />
      <btn
        :color="'purple'"
        :height="'13vh'"
        :width="'30vw'"
        @click="gameStart"
        :disabled="tokens.tokens.bet > tokens.tokens.sum"
        :styles="{ maxHeight: '65px' }"
      >
        SPELA
      </btn>
    </div>
    <!--If player doesn't have tokens, button is disabeld-->
  </div>
</template>

<style lang="scss">
  .main-machine.cont {
    display: grid;
    height: calc(100vh - 75px);
    grid-template-rows: 60vh auto;
    grid-template-columns: 15vw auto 15vw;
    width: 100%;
  }
  .winner-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bonus-container {
    grid-column: 1;
    grid-row: span 1;
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
    & .bonus-wrapper {
      flex-shrink: 1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin: 0;
        padding: 0;
        border: 1px solid black;
        width: 2em;
        height: 2em;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: calc(100% - 1em - 2px);
        top: calc(-1em + 2px);
        border-radius: 200px;
        background-color: var(--btn-purple);
      }
    }
  }
  .reel-cont {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .row-2 {
    grid-row: 2;
    grid-column: span 3;
    display: flex;
    justify-content: center;
    gap: 2vw;
    align-items: center;
  }
  .cont {
    width: 80vw;
    display: flex;
    flex-direction: column;
  }
  .reels-col {
    grid-column-start: 2;
    display: grid;
    width: 100%;
  }
</style>
