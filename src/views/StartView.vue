<template>
  <slotgroup />
  <betting />
</template>

<script>
  import slotgroup from "../components/SlotMachineComp.vue"
  import betting from "../components/bettingComp.vue"
  import { useTokenStore } from "../stores/tokenStore"

  export default {
    components: {
      slotgroup,
      betting,
    },
    setup() {
      const tokenStore = useTokenStore()
      return { tokenStore }
    },
  }
</script>
