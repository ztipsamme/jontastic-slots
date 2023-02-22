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
    methods: {},
  }
</script>

<template>
  <div>Icon component</div>
</template>
