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
      increase(amount) {
        this.tokens.tokens += amount
      },
      decrease() {},
    },
  }
</script>

<template>
  <div>Bet input component</div>
</template>
