<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable vue/attribute-hyphenation -->
<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"

  let resize = function (el, binding) {
    const onResizeCallback = binding.value
    window.addEventListener("resize", () => {
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
      onResizeCallback({ width, height })
    })
  }

  export default {
    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      return { tokens, theme }
    },
    beforeCreate() {},
    directives: {
      resize,
    },
    props: {
      numbers: {
        type: Array,
        default: () => [1, 2, 3],
      },
      count: {
        type: Number,
        default: () => 5,
      },
      play: {
        type: Boolean,
        default: () => false,
      },
      spinners: {
        type: Array,
        default: () => null,
      },
    },
    mounted() {
      const height = document.documentElement.clientHeight
      this.s.height = height * 0.2
      console.log(this.theme)
      console.log(this.$components)
    },
    emits: { done: null },
    data() {
      return {
        width: 250,
        s: { height: 150 },
        win: false,
        current: new Array(this.spinners.length).fill(0),
        currentTheme: "default",
      }
    },
    watch: {
      play(oldVal, newVal) {
        if (newVal) {
          this.start()
        }
      },
    },
    computed: {
      curve() {
        return {
          linear: (x) => x,
          ease: (x, pow = 1) =>
            Number(
              (
                0.5 * Math.cos(Math.PI * Math.pow(x, pow) - Math.PI) +
                0.5
              ).toFixed(4),
            ),
          easeIn: (x, pow = 1) =>
            Number(Math.pow(-1 * Math.pow(x - 1, 2) + 1, pow).toFixed(4)),
          easeOut: (x, pow = 1) =>
            Number(Math.pow(Math.pow(x, 2), pow).toFixed(4)),
          easeInOut: (x) => Number((Math.tanh(6 * x - 3) / 2 + 0.5).toFixed(3)),
        }
      },
      ang() {
        let c = this.count
        return (x) => (360 / c) * x
      },
      rad() {
        return Math.round(this.s.height / 2 / Math.tan(Math.PI / this.count))
      },
      opt() {
        return (i) => ({
          duration: 5000,
          fill: "forwards",
          easing: "cubic-bezier(0.42, 0, 0.58, 1)",
          delay: 100 * i,
        })
      },
      rotation() {
        return (from, to) => {
          return [
            { transform: "rotateX(" + from + "deg)" },
            { transform: "rotateX(" + to + "deg)" },
          ]
        }
      },
      icoRotation() {
        return (ind) => {
          let str = `rotateX(${this.ang(Number(ind))}) translateZ(${this.rad}px`
          return str
        }
      },
      winner() {
        return this.win
      },
    },
    methods: {
      start(num = this.numbers) {
        this.win = false
        this.test(num).then(() => {
          this.blinking()

          this.$emit("done")

          if (num.every((e) => e == num[0])) {
            this.win = true
          }
        })
      },
      blinking() {
        let refs = this.spinners.map((e, i) => {
          return this.$refs["c" + i][0]
        })
        refs.forEach((e, i) => {
          //          let card = document.querySelector("[data-id=" + this.numbers[i] + "]")
          //        card.classList.add("animation-blinking")
        })
      },
      test(arr) {
        this.startTime = Date.now()
        let loop = (element, from, to, resolve) => {
          this.time = Date.now()
          this.elapsed = this.time - this.startTime
          let x = Math.min(1, this.elapsed / 5000)
          let len = (to - from) * this.curve.ease(x)
          let ang = from + len

          element.style.transform = ` translateZ(${
            -this.rad + 25
          }px) rotateX(${ang}deg)`
          element.querySelectorAll(".carousel__cell").forEach((e, i) => {
            e.style.transform = `rotateX(${this.ang(
              Number(i),
            )}deg) translateZ(${this.rad}px) rotacteX(${
              ((-1 * ang) % 360) - this.ang(i)
            }deg) `
          })
          if (x < 1) {
            requestAnimationFrame(loop.bind(this, element, from, to, resolve))
          } else {
            resolve("done")
          }
        }
        let p = []
        let refs = this.spinners.map((e, i) => {
          return this.$refs["c" + i][0]
        })

        refs.forEach((e, i) => {
          let startAngle = this.current[i] * (360 / this.count) * -1

          let newNumber = arr[i]
          let deg = 1080 + newNumber * (360 / this.count)
          let from = startAngle
          let to = -deg
          this.current[i] = arr[i]
          p.push(
            new Promise((resolve) => {
              requestAnimationFrame(loop.bind(this, e, from, to, resolve))
            }),
          )
        })
        return Promise.all(p)
      },
      onResize({ width, height }) {
        this.s.height = height * 0.2
      },
    },
  }
</script>

<template>
  <h1 v-if="this.winner">WINNER!!</h1>

  <template v-for="(spinner, i) in spinners" :key="i">
    <div :class="'scene-' + i" v-resize="onResize">
      <div
        class="carousel"
        :ref="'c' + i"
        data-rot="0"
        :style="{ transform: `translateZ(${-rad}px)` }"
      >
        <div
          class="carousel__cell"
          v-for="(val, ind) in spinner"
          :key="ind"
          :data-id="ind"
          :style="{
            width: '100%',
            height: s.height + 'px',
            transform: `rotateX(${ang(Number(ind))}deg) translateZ(${rad}px ) `,
            backgroundColor: `hsla(${0 + 16 * Number(ind)}deg,75%,50%)`,
            backgroundImage: `linear-gradient(
              45deg,
              hsla(${0 + 16 * Number(ind)}deg,75%,50%),
              hsla(${0 + 16 * Number(ind)}deg,75%,50%),
              hsla(${0 + 16 * Number(ind + 1)}deg,50%,75%))`,

            boxShadow: `inset 0 0 18px 11px hsla(${
              0 + 16 * (Number(ind) + 1)
            }deg,100%,75%,0.5)`,
          }"
        >
          <img :src="theme.icons[val - 1]" alt="" class="slot-ico" />
        </div>
      </div>
    </div>
  </template>

  <!--

  <div class="scene-0">s
    <div
      class="carousel"
      :ref="'c0'"
      data-rot="0"
      :style="{ transform: `translateZ(${-rad}px)` }"
    >
      <div
        class="carousel__cell"
        v-for="(val, ind) in spinners[0]"
        :key="ind"
        :data-val="val"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}deg) translateZ(${rad}px ) `,
          backgroundColor: `hsla(${0 + 16 * Number(ind)}deg,75%,50%)`,
        }"
      >
        {{ val }}
      </div>
    </div>
  </div>

  <div class="scene-1">
    <div
      class="carousel"
      :ref="'c1'"
      data-rot="0"
      :style="{ transform: `translateZ(${-rad}px)` }"
    >
      <div
        class="carousel__cell"
        v-for="(val, ind) in spinners[1]"
        :key="ind"
        :data-val="val"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}deg) translateZ(${rad}px ) `,
          backgroundColor: `hsla(${16 * Number(ind)}deg,75%,50%)`,
        }"
      >
        {{ val }}
      </div>
    </div>
  </div>

  <div class="scene-2">
    <div
      class="carousel"
      :ref="'c2'"
      data-rot="0"
      :style="{ transform: `translateZ(${-rad}px)` }"
    >
      <div
        class="carousel__cell"
        v-for="(val, ind) in spinners[2]"
        :key="ind"
        :data-val="val"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}deg) translateZ(${rad}px ) `,
          backgroundColor: `hsla(${16 * Number(ind)}deg,75%,50%)`,
        }"
      >
        {{ val }}
      </div>
    </div>
  </div>
  -->
</template>

<style>
  *,
  * * {
    box-sizing: border-box;
  }
  body {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  div[class*="scene"] {
    position: relative;
    width: 250px;
    height: 60vh;
    perspective: 2000px;
    overflow: hidden;
    border-radius: 33px;
  }

  div[class*="scene"]::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    box-shadow: inset 0 0 17px 1px black;
    border-radius: 33px;
  }

  .carousel {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transform: translateZ(0px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel__cell {
    backface-visibility: hidden;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsla(180deg, 50%, 100%, 1);
    font-size: 100px;
    font-weight: bold;
    color: hsla(180deg, 50%, 100%, 0.8);
    padding: 15px;
  }

  .slot-ico {
    width: 100%;
    height: 100%;
    top: 0;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .animation-blinking {
    animation-name: blinking;
    animation-duration: 0.5;
    animation-iteration-count: infinite;
  }
  @keyframes blinking {
    from {
      background-image: none;
      background-color: hsla(180deg, 75%, 50%);
      width: 100%;
    }
    to {
      background-image: none;
      background-color: hsla(180deg, 75%, 100%);
      width: 120%;
    }
  }
</style>
