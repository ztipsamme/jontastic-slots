<script>
  export default {
    props: {
      color: {
        type: String,
        default: "blue",
      },
      width: {
        type: String,
        default: "",
      },
      height: {
        type: String,
        default: "",
      },
      size: {
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
        val: 0,
      }
    },
    computed: {
      style() {
        let obj = {}
        if (this.width) {
          obj.width = this.width
        }
        if (this.height) {
          obj.height = this.height
        }
        if (this.size) {
          obj.width = this.size
          obj.height = this.size
        }
        return obj
      },
    },
    methods: {
      getState() {},
    },
  }
</script>
<template>
  <div :style="style" :class="'btn-comp ' + color">
    <slot>Text</slot>
  </div>
</template>
<style lang="scss">
  @use "sass:color";
  $btn-blue: #4a65b0;
  $btn-blue2: #42c4ec;

  $btn-green: #5e9f48;
  $btn-green2: #96be38;

  $btn-red: #8e1c4f;
  $btn-red2: #d84145;
  $btn-purple: #774ab0;
  $btn-purple2: #d89ced;

  .btn-comp {
    border: 0;
    outline: 0;
    color: hsla(0deg, 0, 100%, 0.8);
    top: 0;
    left: 0;
    user-select: none;
    position: relative;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    display: flex;
    min-height: 50px;
    min-width: 50px;
    width: fit-content;
    border-radius: 1000px;
    font-size: 20pt;
    font-family: "inter";
    font-weight: 500;
    padding: 5px 15px;
    transition: 0.1s;

    &.purple {
      $bg1: $btn-purple;
      $bg2: $btn-purple2;
      background-image: linear-gradient(10deg, $bg2, $bg1 60%);
      &::before {
        background-color: color.adjust($bg1, $lightness: -20%);
      }
      &:hover {
        $bg1: color.adjust($btn-purple, $lightness: 5%);
        $bg2: color.adjust($btn-purple2, $lightness: 5%, $saturation: 10%);
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        box-shadow: inset 0 0 10px 2px $bg2;
      }
    }

    &.blue {
      $bg1: $btn-blue;
      $bg2: $btn-blue2;
      background-image: linear-gradient(10deg, $bg2, $bg1 60%);
      &::before {
        background-color: color.adjust($bg1, $lightness: -20%);
      }
      &:hover {
        $bg1: color.adjust($btn-blue, $lightness: 5%);
        $bg2: color.adjust($btn-blue2, $lightness: 5%, $saturation: 10%);
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        box-shadow: inset 0 0 10px 0px $bg2;
      }
    }

    &.green {
      $bg1: $btn-green;
      $bg2: $btn-green2;
      background-image: linear-gradient(10deg, $bg2, $bg1 60%);
      &::before {
        background-color: color.adjust($bg1, $lightness: -20%);
      }
      &:hover {
        $bg1: color.adjust($btn-green, $lightness: 5%);
        $bg2: color.adjust($btn-green2, $lightness: 5%, $saturation: 10%);
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        box-shadow: inset 0 0 10px 0px $bg2;
      }
    }

    &.red {
      $bg1: $btn-red;
      $bg2: $btn-red2;
      background-image: linear-gradient(10deg, $bg2, $bg1 60%);
      &::before {
        background-color: color.adjust($bg1, $lightness: -20%);
      }
      &:hover {
        $bg1: color.adjust($btn-red, $lightness: 5%);
        $bg2: color.adjust($btn-red2, $lightness: 5%, $saturation: 10%);
        background-image: linear-gradient(10deg, $bg2, $bg1 60%);
        box-shadow: inset 0 0 10px 0px $bg2;
      }
    }
  }
  .btn-comp:before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 102%;
    z-index: -1;
    top: 5px;
    left: -2px;

    border-radius: 1000px;
    transition: 0.1s;
  }

  .btn-comp:hover:active {
    top: 5px;
    left: -2px;
  }
  .btn-comp:hover:active:before {
    left: 0px;
    top: 0px;
    z-index: -1;
  }
</style>
