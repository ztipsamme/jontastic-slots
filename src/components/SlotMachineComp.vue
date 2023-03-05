<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
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
      return { tokens, theme }
    },

    data() {
      return {
        count: 21,
        num: [],
        n: [],
        winner: false,
        startGame: false,
        spinnerArr: [],
        reels: 3,
        gameOver: false,
        winSum: null,
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
        let arr = []
        for (var i = 1; i <= 6; i++) {
          arr = new Array(i).fill(i).concat(arr)
        }

        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
          }
          return array
        }
        arr = shuffleArray(arr)
        window.arr = arr
        return arr
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
            //console.log("extraCount", this.extraRowCount)
            this.reels = 4
            this.spinnerArr = new Array(this.reels)
              .fill(null)
              .map(() => this.generateSpinner())
            break
          }
          case "extraspin": {
            if (this.startGame) {
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
        //console.log("this.num", this.num)
        this.n = []
        this.num = []
        let isWinner = Math.floor(Math.random() * 3) == 2
        if (isWinner) {
          let v = 6
          let isHigher

          for (let i = 6; i > 0; i--) {
            v = i
            isHigher = Math.floor(Math.random() * 2)
            console.log("isHigher", isHigher, v)
            if (isHigher) {
              break
            }
          }

          this.spinnerArr.forEach((reel, index) => {
            let arr = []
            reel.forEach((e, i) => {
              if (e == v) {
                arr.push(i)
              }
            })
            let nIndex = arr[Math.floor(Math.random() * arr.length)]
            //console.log("index", index)
            //console.log(this.n, nIndex)

            this.n[index] = nIndex
            this.num[index] = reel[this.n[index]]
            //console.log(this.num)
          })
        } else {
          this.spinnerArr.forEach((e, i) => {
            this.n[i] = Math.floor(Math.random() * e.length)
            this.num[i] = e[this.n[i]]
          })

          if (this.num.every((e) => e == this.num[0])) {
            //console.log("!!!!!!!!BAJS")
            let same = this.num[0]
            let reel = Math.floor(Math.random() * this.num.length)
            while (this.num[reel] == same) {
              this.n[reel] = Math.floor(
                Math.random() * this.spinnerArr[reel].length,
              )
              this.num[reel] = this.spinnerArr[reel][this.n[reel]]
            }
          }
        }
        //console.log("this.num", this.num)
        //console.log("this.n", this.n)
        if (this.num.length > this.reels) {
          console.log("STOP")
          console.log(this.num)
          console.log(this.n)
        }
        return { num: this.num, n: this.n }
      },
      getNumbers() {
        let num = []
        let n = []

        this.spinnerArr.forEach((e, i) => {
          n[i] = Math.floor(Math.random() * this.count)
          num[i] = e[n[i]]
        })

        if (num[0] == num[1]) {
          for (let i = 2; i < this.spinnerArr.length; i++) {
            n[i] = this.spinnerArr[i].indexOf(num[0])
            num[i] = this.spinnerArr[i][n[i]]
          }
        } else {
          for (let i = 2; i < this.spinnerArr.length; i++) {
            n[i] = Math.floor(Math.random() * this.count)
            num[i] = this.spinnerArr[i][n[i]]
          }
        }
        if (this.reels == 4) {
          let same = false
          for (let n in num) {
            let i = Number(n)
            if (num.filter((e) => e == num[i]).length > 2) {
              same = num[i]
              break
            }
          }
          if (same && !num.every((e) => e == same)) {
            let i = num.findIndex((e) => e != same)
            let arr = []
            this.spinnerArr[i].forEach((e, i) => {
              if (e == same) {
                arr.push(i)
              }
            })
            n[i] = arr[Math.floor(Math.random() * arr.length)]
            num[i] = this.spinnerArr[i][n[i]]
          }
        }

        return { num: num, n: n }
      },
      checkNumbers() {
        let val = this.altGetNumbers()
        this.num = val.num
        this.n = val.n

        return this.n
      },
      done() {
        this.startGame = false

        //console.log(this.num)
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
          //console.log("winSum", winSum)
          this.tokens.winning(winSum)
          //console.log("Yay, you won " + winSum + " toekns! =D")
        } else if (this.tokens.tokens.sum < 5) {
          this.winner = false
          this.gameOver = true
        } else {
          this.winner = false
          //console.log("Haha, loser. :P")
        }
        if (this.tokens.tokens.bet > this.tokens.tokens.sum) {
          this.$refs.betComp.setBet(this.tokens.tokens.sum)
        }
      },
      gameStart(freeSpin = false) {
        if (this.startGame) {
          return
        }
        this.startGame = true
        this.winSum = null
        if (this.tokens.tokens.sum - this.tokens.tokens.bet < 0) {
          return
        }
        this.tokens.tokens.sum = this.tokens.tokens.sum - this.tokens.tokens.bet
        console.log("startgame", this.startGame)

        if (this.extraRowCount) {
          this.extraRowCount--
        }

        this.winner = false
        if (!freeSpin) {
          this.tokens.takeoutBet(this.tokens.tokens.bet)
        }

        this.checkNumbers()

        this.$refs.child.start(this.n)
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
          :numbers="n"
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
