<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import spinnerComp from "./spinnerComp.vue"
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
      return {}
    },
    computed: {},
    methods: {
      setTo(payload) {
        this.Array.push(payload)
      },
    },
  }
</script>

<template>
  <spinner :s-id="1" @stoped="setTo" />
  <spinner :s-id="2" @stoped="setTo" />
  <spinner :s-id="3" @stoped="setTo" />
  <spinner :s-id="4" @stoped="setTo" />
  <spinner :s-id="5" @stoped="setTo" />
</template>

<style></style>
