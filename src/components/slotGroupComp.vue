<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import spinnerComp from "./spinnerComp.vue"
  export default {
    components: {
      spinner: spinnerComp,
    },
    emits: { stop: null },
    created() {
      this.num = this.getNumbers()
    },
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    data() {
      return {
        count: 9,
        num: [],
        winner: false,
        startGame: false,
      }
    },
    computed: {},
    methods: {
      getNumbers() {
        let num = []
        console.log(num)
        num[0] = Math.floor(Math.random() * this.count)

        num[1] = Math.floor(Math.random() * 2) + num[0] - 1

        num[2] =
          num[0] == num[1] ? num[0] : Math.floor(Math.random() * this.count)

        if (!num.every((e) => e == num[0])) {
          for (let i = 0; i < 3; i++) {
            num[i] = Math.floor(Math.random() * this.count)
          }
        }
        return num
      },
      checkNumbers() {
        this.num = this.getNumbers()
        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
        } else {
          this.winnner = false
        }
        return this.num
      },
      gameStart() {
        this.checkNumbers()
        this.$refs.child.start(this.num)
      },
    },
  }
</script>

<template>
  <div class="cont">
    <spinner :ref="'child'" :numbers="num" :count="count" />
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
