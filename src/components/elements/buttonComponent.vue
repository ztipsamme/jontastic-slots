<script>
  import { useThemeStore } from "../../stores/themes"
  import { useAudioStore } from "../../stores/audio"
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
      borderRadius: {
        type: String,
        default: null,
      },
      selected: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      bgPath: {
        type: String,
        default: null,
      },
      audio: {
        type: String,
        default: "btn",
      },
      position: {
        type: Array,
        default: () => ["center", "center"],
      },
    },
    setup() {
      const theme = useThemeStore()
      const audioStore = useAudioStore()
      return { theme, audioStore }
    },

    created() {},
    beforeMounted() {},
    mounted() {},
    data() {
      return {
        newStyle: this.styles,
        val: 0,
      }
    },

    computed: {
      btnClick() {
        return this.audioStore[this.audio.replace(".mp3", "")]
      },

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
        let fs = "clamp(14px,5vh,20px)"

        switch (this.size) {
          case "x-small":
            fs = "8px"
            break
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
      onClick() {
        this.btnClick.load()
        this.btnClick.play()
      },
    },
  }
</script>
<template>
  <div
    :style="style"
    :class="
      'btn-container ' +
      (circle ? ' circle ' : '') +
      (selected ? ' selected ' : '') +
      (disabled ? ' disabled' : color)
    "
    @pointerdown="onClick"
  >
    <div class="under" :style="{ borderRadius: borderRadius }" />
    <div
      :class="'btn-comp '"
      :style="{
        fontStyle,
        borderRadius: borderRadius,
        alignItems: position[0],
        justifyContent: position[1],
        backgroundImage: bgPath ? 'url(' + bgPath + ')' : '',
      }"
    >
      <slot>Text</slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @use "sass:color";

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
      font-family: "inter";
      font-weight: 500;
      padding: 5px 15px;
      transition: 0.05s;
    }
    &.disabled {
      .under {
        background-color: var(--btn-disableds3);
      }
      & > .btn-comp {
        background-image: linear-gradient(
          10deg,
          var(--btn-disabled2),
          var(--btn-disabled) 60%
        );
        &:hover,
        &.selected {
          background-image: linear-gradient(
            10deg,
            var(--btn-disabled5),
            var(--btn-disabled4) 60%
          );
          box-shadow: inset 0 0 10px 0px var(--btn-disabled5);
        }
      }
    }
    &.purple {
      .under {
        background-color: var(--btn-purple3);
      }
      & > .btn-comp {
        background-image: linear-gradient(
          10deg,
          var(--btn-purple2),
          var(--btn-purple) 60%
        );
        &:hover,
        &.selected {
          background-image: linear-gradient(
            10deg,
            var(--btn-purple5),
            var(--btn-purple4) 60%
          );
          box-shadow: inset 0 0 10px 0px var(--btn-purple5);
        }
      }
    }

    &.blue {
      .under {
        background-color: var(--btn-blue3);
      }
      & > .btn-comp {
        background-image: linear-gradient(
          10deg,
          var(--btn-blue2),
          var(--btn-blue) 60%
        );
        &:hover,
        &.selected {
          background-image: linear-gradient(
            10deg,
            var(--btn-blue5),
            var(--btn-blue4) 60%
          );
          box-shadow: inset 0 0 10px 0px var(--btn-blue5);
        }
      }
    }

    &.green {
      .under {
        background-color: var(--btn-green3);
      }
      & > .btn-comp {
        background-image: linear-gradient(
          10deg,
          var(--btn-green2),
          var(--btn-green) 60%
        );
        &:hover,
        &.selected {
          background-image: linear-gradient(
            10deg,
            var(--btn-green5),
            var(--btn-green4) 60%
          );
          box-shadow: inset 0 0 10px 0px var(--btn-green5);
        }
      }
    }

    &.red {
      .under {
        background-color: var(--btn-red3);
      }
      & > .btn-comp {
        background-image: linear-gradient(
          10deg,
          var(--btn-red2),
          var(--btn-red) 60%
        );
        &:hover,
        &.selected {
          background-image: linear-gradient(
            10deg,
            var(--btn-red5),
            var(--btn-red4) 60%
          );
          box-shadow: inset 0 0 10px 0px var(--btn-red5);
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

  .btn-container:not(.disabled) .btn-comp:hover:active,
  .btn-container.selected .btn-comp {
    top: 5px;
    left: -2px;
  }
  .btn-comp:hover:active:before {
    left: 0px;
    top: 0px;
  }
</style>
