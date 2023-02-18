<template>
  <h1>Game View</h1>
</template>

<script>
  import { useTokenStore } from "../stores/tokenStore"
  export default {
    setup() {
      const tokenStore = useTokenStore()
      return { tokenStore }
    },
    data() {
      return {}
    },
    computed: {
      t() {
        return this.tokenStore
      },
    },
    methods: {},
  }
</script>

<style></style>
