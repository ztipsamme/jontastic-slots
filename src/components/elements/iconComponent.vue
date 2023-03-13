<script>
  import miniIcon from "../elements/miniIconComp.vue"

  export default {
    components: {
      miniIcon,
    },
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
      item: {
        type: Object,
        default: () => ({
          owned: "",
          amount: "",
          cost: "",
          name: "",
        }),
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
  <div class="wrapper">
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
    <div class="mini">
      <miniIcon :item="item" />
    </div>
  </div>
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

  .eld {
    $primary: #b32e10;
    $secondary: #820303;
    background-color: $secondary;
  }
  .hav {
    $primary: #136f75;
    $secondary: #3741a0;
    background-color: $secondary;
  }
  .brilliant {
    $primary: #c5f4ff;
    $secondary: #c5f4ff;
    background-color: $secondary;
  }
  .rawr {
    $primary: #ffdde2;
    $secondary: #de369d;
    background-color: $secondary;
  }
  .stadsljus {
    $primary: #231251;
    $secondary: #bca8f2;
    background-color: $secondary;
  }
  .vildmark {
    $primary: #283a24;
    $secondary: #7dbe91;
    background-color: $secondary;
  }
  .inferno {
    $primary: #820303;
    $secondary: #b32e10;
    background-color: $secondary;
  }
  .sjuhaven {
    $primary: #3741a0;
    $secondary: #136f75;
    background-color: $secondary;
  }
  .bonus {
    $primary: #b18617;
    $secondary: #ffde68;
    background-color: $secondary;
    img {
      filter: invert(44%) sepia(98%) saturate(371%) hue-rotate(5deg)
        brightness(99%) contrast(95%);
    }
  }
  .wrapper {
    position: relative;
  }
  .mini {
    position: absolute;
    inset: -10px 55px;
  }
</style>

<style scoped>
  button {
    position: relative;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  }
</style>
