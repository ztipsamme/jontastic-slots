<template>
  <h1>Start View</h1>
  <slotgroup />
  <i class="info-icon" @click="Popup = true" />
  <overlayPopUp v-if="Popup" :symbols="symbols" @close="Popup = false" />
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
    data() {
      return {
        Popup: false,
      }
    },
    computed: {
      symbols() {
        return this.tokenStore.symbols
      },
    },
  }
</script>

<style scoped>
  .info-icon {
    display: inline-block;
    position: relative;
    width: 32px;
    height: 32px;
    border: 1px solid #f00;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
  }
  .info-icon::before {
    content: "i";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-style: normal;
    font-size: 30px;
    font-weight: bold;
  }
</style>
