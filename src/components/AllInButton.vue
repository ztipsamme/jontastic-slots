<template>
  <button @click="allIn">All In</button>
</template>

<script>
  import { defineComponent } from "vue"
  import { useTokenStore } from "../stores/tokenStore"

  export default defineComponent({
    name: "AllInButton",
    methods: {
      allIn() {
        const tokenStore = useTokenStore()
        tokenStore.tokens.bet = tokenStore.tokens.sum
      },
    },
  })
</script>
