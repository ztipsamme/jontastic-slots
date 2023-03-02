<template>
  <h2 class="popup-title">Symbolvärden</h2>
  <div class="symbols">
    <img v-for="image in icons" :src="image" :key="image" class="symbol" />
  </div>
  <span :src="icons" />
</template>

<script>
  import { useThemeStore } from "../../stores/themes.js"

  export default {
    setup() {
      const theme = useThemeStore()
      const icons = theme.icons
      console.log(theme.icons)

      return { theme, icons }
    },
  }
</script>

<style lang="scss">
  .popup-title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .symbols {
    display: flex;
    flex-direction: row;
    gap: 40px;
    justify-content: center;
  }

  .symbol {
    width: 40px;
  }
</style>
