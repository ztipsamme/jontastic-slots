<template>
  <h1>Start View</h1>
  <slotgroup />
</template>

<script>
  import slotgroup from "../components/slotGroupComp.vue"
  import { useTokenStore } from "../stores/tokenStore"
  export default {
    setup() {
      const tokenStore = useTokenStore()
      return { tokenStore }
    },
    components: {
      slotgroup: slotgroup,
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
