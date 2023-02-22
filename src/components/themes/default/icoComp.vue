<script>
  export default {
    props: {
      id: {
        type: Number,
        default: () => {
          return 0
        },
      },
    },
    data() {
      return {
        style: { width: "100%", height: "100%" },
      }
    },
  }
</script>

<template>
  <slot>{{ id }}</slot>
</template>
<style></style>
