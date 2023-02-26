<script>
  export default {
    props: {
      name: {
        type: String,
        default: "night",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      src: {
        type: String,
        default: "none",
      },
      size: {
        type: String,
        default: "68px",
      },
    },
    setup() {
      return {}
    },
    creaeted() {},
    beforeMounted() {},
    mounted() {},
    data() {
      return {
        val: 0,
      }
    },
    computed: {
      imgStyle() {
        let num = Number(this.size.replace(/[^\d.]/g, ""))
        let w = num / 2.4 + this.size.replace(num.toString(), "")
        return { width: w }
      },
      style() {
        let size = Number(this.size.replace(/[^\d.]/g, ""))

        return {
          width: this.size,
          height: this.size,
          borderRadius: size / 6.8 + "px",
        }
      },
    },
    methods: {
      getState() {},
    },
  }
</script>
<template>
  <button
    :style="style"
    :class="
      'shop-item ' +
      name.toLowerCase().replace(/theme/g, '').trim().replace(/\s/g, '-')
    "
    :disabled="disabled"
  >
    <img class="icon" :style="imgStyle" :src="src" :alt="name" />
  </button>
</template>
<style lang="scss">
  .comp-item {
    position: relative;
    font: bold 16px Arial, Helvetica, sans-serif;
    border: transparent;
    background-color: white;
    color: black;
    overflow: hidden;
    align-items: center;
    margin-left: 10px;
    img {
      width: 30px;
    }
    &:disabled::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: gray;
      opacity: 0.5;
    }
  }

  .night {
    $primary: #bca8f2;
    $secondary: #231251;
    background-color: $secondary;
  }
  .forest {
    $primary: #7dbe91;
    $secondary: #283a24;
    background-color: $secondary;
  }
  .cat {
    $primary: #d54fa0;
    $secondary: #ffd3ee;
    background-color: $secondary;
  }
  .bonus {
    $primary: #e9d489;
    $secondary: #bca349;
    background-color: $secondary;
  }
</style>
