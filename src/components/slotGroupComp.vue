<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import spinnerComp from "./spinnerComp.vue"
  export default {
    components: {
      spinner: spinnerComp,
    },
    emits: { stop: null },
    created() {
      this.spinnerArr = [
        this.generateSpinner(),
        this.generateSpinner(),
        this.generateSpinner(),
      ]
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
      }
    },
    computed: {},
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
        let num = [],
          n = []

        n[0] = Math.floor(Math.random() * this.count)
        n[1] = Math.floor(Math.random() * this.count)
        n[2] = Math.floor(Math.random() * this.count)

        num[0] = this.spinnerArr[0][n[0]]
        num[1] = this.spinnerArr[1][n[1]]
        num[2] = this.spinnerArr[2][n[2]]
        /*      num[2] =
          num[0] == num[1] ? num[0] : Math.floor(Math.random() * this.count)

        if (!num.every((e) => e == num[0])) {
          for (let i = 0; i < 3; i++) {
            num[i] = Math.floor(Math.random() * this.count)
          }
        } */
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
        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
        } else {
          console.log(this.num)
          this.winnner = false
        }
      },
      gameStart() {
        this.checkNumbers()
        this.$refs.child.start(this.n)
      },
    },
  }
</script>

<template>
  <h1 v-if="winner">WOOOHKOOOO</h1>
  <div class="cont">
    <spinner
      :ref="'child'"
      :spinners="spinnerArr"
      :numbers="n"
      :count="count"
      @done="done"
    />
  </div>

  <button @click="gameStart">SPELA</button>
</template>

<style>
  .cont {
    height: 80vh;
    width: 80vw;
    display: flex;
    gap: 10px;
  }
</style>
