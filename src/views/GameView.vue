<template><h1>Hem</h1></template>
<template>
  <h1>Kontakt</h1>
</template>

<script>
  import { useTokenStore } from '../stores/tokenStore'
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
