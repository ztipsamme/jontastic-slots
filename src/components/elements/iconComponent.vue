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
        let size
        if (this.size.indexOf("clamp") != -1) {
          size = this.size
            .split(",")
            .map((e) => Number(e.replace(/[^\d.]/g, "")))
            .sort()[0]
        } else {
          size = Number(this.size.replace(/[^\d.]/g, ""))
        }

        return {
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
  <div class="wrapper" :style="{ width: size }">
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
    background-image: url("src/components/themes/BrilliantTheme/bg.png");
    background-size: cover;
    background-position: center;
  }
  .rawr {
    background-image: url("src/components/themes/RawrTheme/bg.png");
    background-size: cover;
    background-position: center;
  }
  .stadsljus {
    background-image: url("src/components/themes/StadsljusTheme/bg.png");
    background-size: cover;
  }
  .vildmark {
    background-image: url("src/components/themes/VildmarkTheme/bg.png");
    background-size: cover;
    background-position: center;
  }
  .inferno {
    background-image: url("src/components/themes/InfernoTheme/bg.jpg");
    background-size: cover;
  }
  .sjuhaven {
    background-image: url("src/components/themes/SjuhavenTheme/bg.png");
    background-size: cover;
    background-position: center;
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mini {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 2;
  }

  button {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  }
  .wrapper::after {
    content: "";
    display: block;
    position: relative;
    padding-top: 100%;
    width: 100%;
  }
</style>
