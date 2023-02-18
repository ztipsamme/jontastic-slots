<script>
  import { useTokenStore } from '../stores/tokenStore.js'
  import spinnerComp from './spinnerComp.vue'
  export default {
    components: {
      spinner: spinnerComp,
    },
    emits: { stop: null },
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    data() {
      return {
        count: 5,
        num: [],
        winner: false,
      }
    },
    computed: {
      getNumbers() {
        let num = []
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
    },
    methods: {
      checkNumbers() {
        this.num = this.getNumbers
        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
        } else {
          this.winnner = false
        }
        return this.num
      },
    },
  }
</script>

<template>
  <spinner
    :numbers="checkNumbers()"
    :play="startGame"
    :count="count"
    @stoped="setTo"
  />
  <button @click="startGame = true">SPELA</button>
</template>

<style></style>
