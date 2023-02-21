<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import spinnerComp from "./spinnerComp.vue"
  export default {
    components: {
      spinner: spinnerComp,
    },
    emits: { stop: null },
    created() {
      this.spinnerArr = new Array(this.reels)
        .fill(null)
        .map(() => this.generateSpinner())
      /*       this.spinnerArr = [
        this.generateSpinner(),
        this.generateSpinner(),
        this.generateSpinner(),
      ] */
    },
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },

    data() {
      return {
        count: 21,
        num: [],
        n: [],
        winner: false,
        startGame: false,
        spinnerArr: [],
        reels: 4,
      }
    },
    watch: {
      reels() {
        this.spinnerArr = new Array(this.reels)
          .fill(null)
          .map((e) => this.generateSpinner())
      },
    },
    computed: {
      mytokens() {
        return this.tokens.tokens
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

      getNumbers() {
        // this.spinnerArr = new Array(3).fill(this.generateSpinner())
        let num = []
        let n = []

        this.spinnerArr.forEach((e, i) => {
          n[i] = Math.floor(Math.random() * this.count)
          num[i] = e[n[i]]
        })
        if (this.reels == 3) {
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
          if (same) {
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

        // Sortera så att stösrt sannorlikhet kommerförsts

        /*   n[2] = Math.floor(Math.random() * this.count)
          num[2] = this.spinnerArr[2][n[2]] */

        /*      num[2] =
            num[0] == num[1] ? num[0] : Math.floor(Math.random() * this.count)

          if (!num.every((e) => e == num[0])) {
            for (let i = 0; i < 3; i++) {
              num[i] = Math.floor(Math.random() * this.count)
            }
          } */

        console.log("ountN", { num, n })

        return { num: num, n: n }
      },
      checkNumbers() {
        let val = this.getNumbers()
        this.num = val.num
        this.n = val.n

        return this.n
      },
      done() {
        console.log("DONE", this.num)

        this.startGame = false

        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
        } else {
          this.winner = false
        }
        this.winnerOrLooser()
        //  this.reward()
      },
      gameStart() {
        if (this.startGame) {
          return
        }
        this.startGame = true

        this.num = [1, 2, 3, 4, 5, 3, 6, 9]
        if (this.tokens.tokens - 5 < 0) {
          alert("GameOver")
          this.tokens.tokens = 100
          return
        }
        this.winner = false
        this.tokens.tokens -= 5
        this.checkNumbers()

        this.$refs.child.start(this.n)
      },

      reward() {
        this.tokens.tokens = this.tokens.tokens + 25
        console.log("tokens", this.tokens.tokens)
      },

      winnerOrLooser() {
        if (this.winner === true) {
          this.tokens.tokens = this.tokens.tokens + 100
          console.log("Yay, you won 100 toekns! =D")
        } else if (this.winner === false && this.tokens.tokens > 0) {
          console.log("Haha, loser. :P")
        } else if (this.winner === false && this.tokens.tokens <= 0) {
          console.log("GAME OVER")
        }
      },
    },
  }
</script>

<template>
  <h1 v-if="winner">WOOOHKOOOO</h1>
  <h2>{{ mytokens }}</h2>

  <p>You have {{ tokens.tokens }} tokens left</p>
  <h1 v-if="winner">Congratulations, you won 100 tokens!</h1>
  <h1 v-if="tokens.tokens === 0">GAME OVER</h1>

  <div class="cont">
    <spinner
      :ref="'child'"
      :spinners="spinnerArr"
      :numbers="n"
      :count="count"
      @done="done"
    />
  </div>

  <!--If player doesn't have tokens, button is disabeld-->
  <button
    class="slot-btn red"
    style="min-height: 200px; min-width: 200px"
    @click="gameStart"
    :disabled="this.tokens.tokens === 0 ? true : false"
  >
    SPELA
  </button>
</template>

<style>
  .cont {
    width: 80vw;
    display: flex;
  }
</style>
