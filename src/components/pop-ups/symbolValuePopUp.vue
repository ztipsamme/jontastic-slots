<template>
  <h1 class="popup-title">Symbolvärden</h1>
  <div class="symbols">
    <div class="symbol-cont" v-for="(img, ind) in icons" :key="ind">
      <img :src="img" class="symbol" />
      <span class="val">{{ "x" + (7 - ind) }}</span>
    </div>
  </div>
  <span :src="icons" />
</template>

<script>
  import { useThemeStore } from "../../stores/themes.js"

  export default {
    setup() {
      const theme = useThemeStore()
      const icons = theme.icons
      return { theme, icons }
    },
  }
</script>

<style scoped lang="scss">
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
