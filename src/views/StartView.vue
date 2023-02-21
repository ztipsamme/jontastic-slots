<template>
  <h1>Start View</h1>
  <slotgroup />
  <overlayPopUp />
</template>

<script>
  import slotgroup from "../components/slotGroupComp.vue"
  import overlayPopUp from "../components/overlayPopUp.vue"
  import { useTokenStore } from "../stores/tokenStore"

  export default {
    components: {
      slotgroup,
      overlayPopUp,
    },
    setup() {
      const tokenStore = useTokenStore()
      return { tokenStore }
    },
  }
</script>
