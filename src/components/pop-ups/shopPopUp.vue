<template>
  <h1 v-if="title">Hej</h1>
</template>

<script>
  export default {
    props: {
      title: { type: String, default: "Title" },
      info: { type: String, default: "Info" },
    },
  }
</script>
