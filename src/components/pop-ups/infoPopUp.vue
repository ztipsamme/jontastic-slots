<template>
  <i class="info-icon" @click="Popup = true" />
  <div v-if="Popup" @close="Popup = false" class="popup-overlay">
    <div class="popup-container">
      <SymbolsValue v-if="$route.path === '/'" />
      <ShopPopUp v-if="$route.path === '/shop'" />
      <button class="close-button" @click="Popup = false">Close</button>
    </div>
  </div>
</template>

<script>
  import SymbolsValue from "./symbolValuePopUp.vue"
  import ShopPopUp from "./shopPopUp.vue"
  export default {
    components: {
      SymbolsValue,
      ShopPopUp,
    },
    data() {
      return {
        Popup: false,
      }
    },
  }
</script>

<style>
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

  .popup-title {
    margin-top: 0;
  }

  .symbol-values {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .symbol-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  .symbol-image {
    height: 50px;
    width: 50px;
    margin-top: 10px;
  }

  .symbol-name {
    margin-top: 10px;
    font-weight: bold;
  }

  .symbol-points {
    margin-top: 5px;
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
