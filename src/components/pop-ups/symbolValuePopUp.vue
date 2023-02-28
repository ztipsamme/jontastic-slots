<template>
  <h2 class="popup-title">Symbol Values</h2>
  <div class="symbols">
    <img v-for="image in icons" :src="image" :key="image" class="symbol" />
  </div>
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
  }

  .symbols {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .symbol {
    margin-left: 20px;
    width: 40px;
  }
</style>
