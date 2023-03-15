<template>
  <slotgroup />
</template>

<script>
  import slotgroup from "../components/SlotMachineComp.vue"
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
