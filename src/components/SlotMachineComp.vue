<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import spinnerComp from "./ReelsComp.vue"
  import TotalBet from "./TotalBet.vue"
  import FlashText from "./animations/FlashingText.vue"
  import Btn from "./elements/buttonComponent.vue"
  import iconComponent from "./elements/iconComponent.vue"
  import { breakpointsTailwind } from "@vueuse/core"
  export default {
    components: {
      TotalBet,
      spinner: spinnerComp,
      "flash-text": FlashText,
      btn: Btn,
      icon: iconComponent,
    },

    emits: { stop: null },

    created() {
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
          (i) => i.name === "Extra Row" && i.amount >= 1,
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
      activateRow() {
        let extraRow = this.tokens.bonusTypes.find(
          (i) => i.name === "Extra Row",
        )
        extraRow.owned = false
        this.reels = 4
      },
      altGetNumbers() {
        console.log("this.num", this.num)

        let isWinner = Math.floor(Math.random() * 3) == 2
        if (isWinner) {
          let v = 6
          let isHigher

          for (let i = 7; i >= 2; i--) {
            isHigher = Math.floor(Math.random() * i + i)
            if (isHigher) {
              break
            }
            v = i - 1
          }

          this.spinnerArr.forEach((reel, index) => {
            let arr = []
            reel.forEach((e, i) => {
              if (e == v) {
                arr.push(i)
              }
            })
            let nIndex = arr[Math.floor(Math.random() * arr.length)]
            console.log("index", index)
            console.log(this.n, nIndex)

            this.n[index] = nIndex
            this.num[index] = reel[this.n[index]]
            console.log(this.num)
          })
        } else {
          this.spinnerArr.forEach((e, i) => {
            this.n[i] = Math.floor(Math.random() * e.length)
            this.num[i] = e[this.n[i]]
          })

          if (this.num.every((e) => e == this.num[0])) {
            console.log("!!!!!!!!BAJS")
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
        console.log("this.num", this.num)
        console.log("this.n", this.n)
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
        console.log(this.num)
        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
          let winSum =
            this.tokens.tokens.bet + this.tokens.tokens.bet * (7 - this.num[0])
          console.log("winSum", winSum)
          this.tokens.winning(winSum)
          console.log("Yay, you won " + winSum + " toekns! =D")
        } else {
          this.winner = false
          console.log("Haha, loser. :P")
        }
      },
      gameStart() {
        console.log("startgame", this.startGame)
        if (this.startGame) {
          return
        }
        this.startGame = true
        if (this.tokens.tokens.sum - 5 < 0) {
          alert("GameOver")
          this.startGame = false
          this.tokens.tokens.sum = this.tokens.tokens.startValue
          return
        }
        this.winner = false
        this.tokens.takeoutBet(this.tokens.tokens.bet)
        this.checkNumbers()

        this.$refs.child.start(this.n)
      },
    },
  }
</script>

<template>
  <flash-text
    :h="50"
    v-if="winner"
    :style="{ position: 'absolute', margin: 'auto', top: '25vh', zIndex: '99' }"
    @click="winner = !winner"
  />
  <div class="main-machine cont">
    <div class="row row-1">
      En rad för saker
      <div class="col">
        <btn v-if="hasExtraRow" @click="activateRow()">Extra Row</btn>
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
    <div class="row-3">
      <TotalBet />
      <btn
        :color="'purple'"
        :height="'50px'"
        :width="'30vw'"
        @click="gameStart"
        :disabled="tokens.tokens.sum === 0 ? true : false"
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
    grid-template-rows: 60px 60vh 150px;
    grid-template-columns: 15vw auto 15vw;
    width: 100%;
  }
  .row-1 {
    grid-column: span 3;
  }
  .winner-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .reel-cont {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .row-3 {
    grid-row: 3;
    grid-column: 2;
    display: flex;
    justify-content: space-between;
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
