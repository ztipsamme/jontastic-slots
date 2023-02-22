<script lang="js">
  import icon1 from "./themeIco1.vue"
  import icon2 from "./themeIco2.vue"
  import icon3 from "./themeIco3.vue"
  import icon4 from "./themeIco4.vue"
  import icon5 from "./themeIco5.vue"
  import icon6 from "./themeIco6.vue"
  export default {
    props: {
      id: {
        type: Number,
        default: () => {
          return 0
        },
      },
    },
    components: {
      icon1,
      icon2,
      icon3,
      icon4,
      icon5,
      icon6,
    },
    data() {
      return {
        style: { width: "100%", height: "100%" },
      }
    },
  }
</script>

<template>
  <component :is="`icon${id}`" />
</template>
<style></style>
