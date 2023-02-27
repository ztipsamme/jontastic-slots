<script>
  export default {
    props: {
      color: {
        type: String,
        default: "blue",
      },
      styles: {
        type: Object,
        default: () => ({}),
      },
      size: {
        type: String,
        default: "meduim",
      },
      circle: {
        type: Boolean,
        default: false,
      },
      width: {
        type: String,
        default: "50px",
      },
      height: {
        type: String,
        default: "",
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
        newStyle: this.styles,
        val: 0,
      }
    },
    computed: {
      style() {
        let obj = {}
        obj = { ...this.styles, ...this.fontStyle }
        if (this.width) {
          obj.width = this.width
        }
        if (this.height) {
          obj.height = this.height
        }
        if (this.circle) {
          obj.width = this.width
          obj.height = ""
        }

        return obj
      },
      fontStyle() {
        let fs = "20px"

        switch (this.size) {
          case "small":
            fs = "12px"
            break
          case "large":
            fs = "24px"
            break
          case "x-large":
            fs = "30px"
            break
          default:
            break
        }
        return { fontSize: fs }
      },
    },
    methods: {
      getState() {},
    },
  }
</script>
<template>
  <div
    :style="style"
    :class="'btn-container ' + color + (circle ? ' circle' : '')"
  >
    <div class="under" />
    <div :class="'btn-comp '" :style="fontStyle">
      <slot>Text</slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @use "sass:color";
  $btn-blue: #4a65b0;
  $btn-blue2: #42c4ec;

  $btn-green: #5e9f48;
  $btn-green2: #96be38;

  $btn-red: #8e1c4f;
  $btn-red2: #d84145;
  $btn-purple: #774ab0;
  $btn-purple2: #d89ced;
  .btn-container {
    padding: 0px;
    margin: 0px;
    display: flex;
    position: relative;
    .btn-comp {
      border: 0;
      outline: 0;
      color: hsla(0deg, 0, 100%, 0.8);
      top: 0;
      left: 0;
      user-select: none;
      position: absolute;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: 100%;
      border-radius: 1000px;
      font-size: 20px;
      font-family: "inter";
      font-weight: 500;
      padding: 5px 15px;
      transition: 0.05s;
    }
    &.purple {
      .under {
        background-color: color.adjust($btn-purple, $lightness: -20%);
      }
      .btn-comp {
        $bg1: $btn-purple;
        $bg2: $btn-purple2;
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        &:hover,
        &.selected {
          $bg1: color.adjust($btn-purple, $lightness: 5%);
          $bg2: color.adjust($btn-purple2, $lightness: 5%, $saturation: 10%);
          background-image: linear-gradient(10deg, $bg2, $bg1 60%);
          box-shadow: inset 0 0 10px 2px $bg2;
        }
      }
    }

    &.blue {
      .under {
        background-color: color.adjust($btn-blue, $lightness: -20%);
      }
      & > .btn-comp {
        $bg1: $btn-blue;
        $bg2: $btn-blue2;
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        &:hover,
        &.selected {
          $bg1: color.adjust($btn-blue, $lightness: 5%);
          $bg2: color.adjust($btn-blue2, $lightness: 5%, $saturation: 10%);
          background-image: linear-gradient(10deg, $bg2, $bg1 60%);
          box-shadow: inset 0 0 10px 0px $bg2;
        }
      }
    }

    &.green {
      .under {
        background-color: color.adjust($btn-green, $lightness: -20%);
      }
      & > .btn-comp {
        $bg1: $btn-green;
        $bg2: $btn-green2;
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        &:hover,
        &.selected {
          $bg1: color.adjust($btn-green, $lightness: 5%);
          $bg2: color.adjust($btn-green2, $lightness: 5%, $saturation: 10%);
          background-image: linear-gradient(10deg, $bg2, $bg1 60%);
          box-shadow: inset 0 0 10px 0px $bg2;
        }
      }
    }

    &.red {
      .under {
        background-color: color.adjust($btn-red, $lightness: -20%);
      }
      & > .btn-comp {
        $bg1: $btn-red;
        $bg2: $btn-red2;
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        &:hover {
          $bg1: color.adjust($btn-red, $lightness: 5%);
          $bg2: color.adjust($btn-red2, $lightness: 5%, $saturation: 10%);
          background-image: linear-gradient(10deg, $bg2, $bg1 60%);
          box-shadow: inset 0 0 10px 0px $bg2;
        }
      }
    }
    &.circle::after {
      content: "";
      display: block;
      padding-top: 100%;
      width: 100%;
    }
  }

  .under {
    padding: 0px;
    margin: 0px;
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 102%;
    top: 5px;
    left: -2px;
    border-radius: 1000px;
    transition: 0.05s;
  }

  .btn-comp:hover:active,
  .btn-container.selected .btn-comp {
    top: 5px;
    left: -2px;
  }
  .btn-comp:hover:active:before {
    left: 0px;
    top: 0px;
  }
</style>
