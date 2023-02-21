<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  export default {
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      getState() {
        console.log(this.tokens.tokens.sum)

        this.tokens.tokens.sum = 10
        console.log(this.tokens.tokens.sum)

        this.tokens.tokens(15)
        console.log(this.tokens.tokens.sum)
      },
    },
  }
</script>

<template>
  <div>Icon component</div>
</template>
