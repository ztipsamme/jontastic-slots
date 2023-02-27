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
          (i) => i.name === "Extra Row" && i.owned,
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
        let n = [],
          num = []

        let isWinner = Math.floor(Math.random() * 3) == 2
        console.log("isWinner", isWinner)
        if (isWinner) {
          let v = 6
          let isHigher
          for (let i = 2; i <= 7; i++) {
            console.log("odds för " + i + ": " + i * i)
          }

          for (let i = 7; i >= 2; i--) {
            isHigher = Math.floor(Math.random() * i + i)
            console.log("v", v)
            console.log("isHigher", isHigher)
            if (isHigher) {
              break
            }
            v = i - 1
          }

          console.log("WinNumber:", v)
          this.spinnerArr.forEach((reel, index) => {
            console.log("\n------------REEL: " + index + "-----------\n")
            let arr = []
            reel.forEach((e, i) => {
              if (e == v) {
                arr.push(i)
              }
            })
            console.log(arr)

            n[index] = arr[Math.floor(Math.random() * arr.length)]
            num[index] = reel[index][n[index]]
          })
        } else {
          this.spinnerArr.forEach((e, i) => {
            n[i] = Math.floor(Math.random() * e.length)
            num[i] = e[n[i]]
          })

          if (num.every((e) => e == num[0])) {
            let same = num[0]
            let reel = Math.floor(Math.random() * num.length)
            while (num[reel] == same) {
              n[reel] = Math.floor(Math.random() * this.spinnerArr[reel].length)
              num[reel] = this.spinnerArr[reel][n[reel]]
            }
          }
        }
        console.log({ num: num, n: n })
        return { num: num, n: n }
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

        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
          this.tokens.tokens.sum = this.tokens.tokens.sum + 100
          console.log("Yay, you won 100 toekns! =D")
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

        this.num = [1, 2, 3, 4, 5, 3, 6, 9]
        if (this.tokens.tokens.sum - 5 < 0) {
          alert("GameOver")
          this.tokens.tokens.sum = this.tokens.tokens.startValue
          return
        }
        this.winner = false
        this.tokens.tokens.sum -= 5
        this.checkNumbers()

        this.$refs.child.start(this.n)
      },
    },
  }
</script>

<template>
  <div class="main-mashine cont">
    <div class="row">
      <div class="col">
        <btn v-if="hasExtraRow" @click="activateRow()">Extra Row</btn>
      </div>
    </div>
    <div class="row winner-row">
      <flash-text :h="50" v-if="winner" />
      <h1 v-if="winner" />
      <h1 v-if="tokens.tokens.sum === 0">GAME OVER</h1>
    </div>
    <div class="row">
      <div class="reels-col col">
        <div class="col-1">
          <!-- <template v-for="(t, i) in tokens.themeTypes" :key="i">
            <icon
              :name="t.name"
              :src="t.src"
              v-if="t.owned"
              @click="
                theme.currentTheme = t.name.replace(/\s/g, '').toLowerCase()
              "
            />
          </template> -->

          <!-- <icon
            :size="'small'"
            :styles="{ width: '80px', height: '80px' }"
            :class="{ selected: theme.currentTheme == 'catTheme' }"
            :color="theme.currentTheme == 'catTheme' ? 'green' : 'blue'"
            v-if="tokens.isThemeOwned('cattheme')"
            @click="theme.currentTheme = 'catTheme'"
          >
            Cat Theme
          </icon> -->
          <!-- <btn
            :class="{ selected: theme.currentTheme == 'default' }"
            :color="theme.currentTheme == 'default' ? 'green' : 'blue'"
            @click="theme.currentTheme = 'default'"
            >Default</btn
          > -->
        </div>
        <div class="reel-cont">
          <spinner
            :ref="'child'"
            :spinners="spinnerArr"
            :numbers="n"
            :count="count"
            @done="done"
          />
        </div>

        <btn
          :color="'purple'"
          :styles="{ height: '10vw', width: '12vw' }"
          @click="gameStart"
          :disabled="tokens.tokens.sum === 0 ? true : false"
        >
          SPELA
        </btn>
      </div>
    </div>

    <!--If player doesn't have tokens, button is disabeld-->

    <TotalBet />
  </div>
</template>

<style lang="scss">
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
  }
  .cont {
    width: 80vw;
    display: flex;
    flex-direction: column;
  }
  .reels-col {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    width: 100%;
  }
</style>
