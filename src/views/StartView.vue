<template>
  <h1>Start View</h1>
  <slotgroup />
  <PopUp />
</template>

<script>
  import slotgroup from "../components/slotGroupComp.vue"
  import PopUp from "../components/PopUp.vue"
  import { useTokenStore } from "../stores/tokenStore"

  export default {
    components: {
      slotgroup,
      PopUp,
    },
    setup() {
      const tokenStore = useTokenStore()
      return { tokenStore }
    },
  }
</script>
