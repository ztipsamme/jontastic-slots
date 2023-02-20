<script>
  export default {
    props: {
      customStyle: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      return {}
    },
    computed: {},
    methods: {
      increase(amount) {
        this.tokens.tokens += amount
      },
      decrease() {},
    },
  }
</script>

<template>
  <div class="slot-btn blue" :style="customStyle">
    <slot>Click Me!</slot>
  </div>
</template>
