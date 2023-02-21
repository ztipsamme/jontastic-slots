<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <SymbolsValue />
      <button class="close-button" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>
  import SymbolsValue from "./SymbolValue.vue"
  export default {
    components: {
      SymbolsValue,
    },
    emits: {
      close,
    },
  }
</script>

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-container {
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    position: relative;
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
