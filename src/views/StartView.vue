<template>
  <h1>Start View</h1>
  <slotgroup />
</template>

<script>
  import slotgroup from "../components/slotGroupComp.vue"
  import { useTokenStore } from "../stores/tokenStore"

  export default {
    components: {
      slotgroup,
    },
    setup() {
      const tokenStore = useTokenStore()
      return { tokenStore }
    },
  }
</script>
