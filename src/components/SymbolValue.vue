<template>
  <h2 class="popup-title">Symbol Values</h2>
  <div class="symbol-values">
    <div
      v-for="symbolValue in symbolValues"
      :key="symbolValue.symbol"
      class="symbol-value"
    >
      <img :src="symbolValue.imageUrl" class="symbol-image" />
      <span class="symbol-name">{{ symbolValue.symbol }}</span>
      <span class="symbol-points">{{ symbolValue.value }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      symbolValues: {
        type: Array,
        required: true,
      },
    },
  }
</script>
