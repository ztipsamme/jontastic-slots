<script>
  import { useTokenStore } from '../stores/tokenStore.js'
  export default {
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
      end(val) {
        this.$emit('stop', val)
      },
    },
  }
</script>

<template>
  <div>hejsan</div>
</template>

<style></style>
