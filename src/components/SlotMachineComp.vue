<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import spinnerComp from "./ReelsComp.vue"
  import TotalBet from "./TotalBet.vue"
  import FlashText from "./animations/FlashingText.vue"
  export default {
    components: {
      TotalBet,
      spinner: spinnerComp,
      "flash-text": FlashText,
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
        let val = this.getNumbers()
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
        <button v-if="hasExtraRow" @click="activateRow()">Extra Row</button>
        <button
          v-if="tokens.isThemeOwned('cattheme')"
          @click="theme.currentTheme = 'catTheme'"
        >
          Cat Theme
        </button>
        <button @click="theme.currentTheme = 'default'">Default</button>
      </div>
    </div>
    <div class="row winner-row">
      <flash-text :h="50" v-if="winner" />
      <h1 v-if="winner" />
      <h1 v-if="tokens.tokens.sum === 0">GAME OVER</h1>
    </div>
    <div class="row">
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

    <!--If player doesn't have tokens, button is disabeld-->
    <button
      class="slot-btn green"
      @click="gameStart"
      :disabled="tokens.tokens.sum === 0 ? true : false"
    >
      SPELA
    </button>
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
  }
  .cont {
    width: 80vw;
    display: flex;
    flex-direction: column;
  }
</style>
