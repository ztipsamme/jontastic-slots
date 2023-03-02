<script>
  export default {
    props: {
      name: {
        type: String,
        default: "diamant",
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
    data() {
      return {
        val: 0,
      }
    },
    computed: {
      imgStyle() {
        let num = Number(this.size.replace(/[^\d.]/g, ""))
        let w = num / 1.6 + this.size.replace(num.toString(), "")
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
      (name.startsWith('Extra')
        ? 'bonus'
        : name.toLowerCase().replace(/theme/g, '').trim().replace(/\s/g, '-'))
    "
  >
    <img class="icon" :style="imgStyle" :src="src" :alt="name" />
  </button>
</template>
<style lang="scss" scoped>
  .shop-item {
    border: none;
  }

  .diamant {
    $primary: #46a2b6;
    $secondary: #c5f4ff;
    background-color: $secondary;
  }
  .katt {
    $primary: #de369d;
    $secondary: #ffdde2;
    background-color: $secondary;
  }
  .midnatt {
    $primary: #bca8f2;
    $secondary: #231251;
    background-color: $secondary;
  }
  .skog {
    $primary: #7dbe91;
    $secondary: #283a24;
    background-color: $secondary;
  }
  .bonus {
    $primary: #b18617;
    $secondary: #ffde68;
    background-color: $secondary;
  }
  .eld {
    $primary: #b32e10;
    $secondary: #820303;
    background-color: $secondary;
  }
</style>

<style scoped>
  button {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  }
</style>
