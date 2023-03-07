<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable vue/attribute-hyphenation -->
<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import { gsap } from "gsap"
  /* import {

      hsla,
      rgba,
      adjustHsl,
      changeHsl,
      rgbToHsl,
      hslToRgb,
    } from "../utilHsl.js"*/

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
      this.size.height = Math.ceil(height * 0.2)
      this.setClipPath()
    },
    updated() {
      this.setClipPath()
    },
    emits: { done: null },
    data() {
      return {
        width: 250,
        size: { height: 150 },
        win: false,
        current: new Array(4).fill(0),
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
        return Math.floor(this.size.height / 2 / Math.tan(Math.PI / this.count))
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
        let audio = new Audio("../assets/audio/reels.mp3")
        audio.play()
        this.win = false
        this.spin(num).then(() => {
          audio.pause()
          this.$emit("done")
          let winNum = this.spinners[0][num[0]]
          let test = num.every((e, i) => {
            return this.spinners[i][e] == winNum
          })
          if (test) {
            this.win = true
          }
        })
      },
      spin(arr) {
        this.startTime = Date.now()
        let refs = this.spinners.map((e, i) => {
          return this.$refs["c" + i][0]
        })
        let tween = []
        refs.forEach((e, i) => {
          let startAngle = this.current[i] * (360 / this.count) * -1
          let newNumber = arr[i]
          let deg = 1080 + newNumber * (360 / this.count)
          let from = startAngle
          let to = -deg
          this.current[i] = arr[i]
          let refTween = gsap.fromTo(
            e,
            {
              translateZ: -this.rad,
              rotateX: from,
            },
            {
              translateZ: () => -this.rad,
              rotateX: to,
              duration: 5,
              ease: "power1.inOut",
            },
          )
          tween.push(refTween.play())
        })
        return Promise.all(tween)
      },
      onResize({ height }) {
        this.size.height = Math.ceil(height * 0.2)
        this.setClipPath()
      },
      setClipPath() {
        let refs = this.spinners.map((e, i) => {
          return this.$refs["c" + i][0]
        })

        refs.forEach((e, i) => {
          try {
            e.querySelectorAll(".carousel__cell").forEach((el, i) => {
              el.style.transform = `rotateX(${this.ang(
                Number(i),
              )}deg) translateZ(${this.rad}px)`
            })
          } catch {
            return
          }

          let reelCount = refs.length - 1
          let n = i - reelCount / 2
          let s = n / (reelCount / 2) //2  -1
          let dir = Math.abs(s) / s

          let xKorr = `translate3d(${(4 * s).toFixed(2)}%, 0px, -${
            this.rad + 25
          }px) rotateX(${this.current[i] * (360 / this.count) * -1}deg)`

          let perspectiveX = 50 + Math.abs(n) * 2 * 50 * -dir

          e.parentNode.style.perspectiveOrigin = perspectiveX + "% 50%"
          e.parentNode.style.zIndex = Math.abs(s)
          e.style.transform = xKorr
          const height = document.documentElement.clientHeight
          this.size.height = Math.ceil(height * 0.2)

          let sceneHeight, sceneWidth
          try {
            sceneWidth = e.parentNode.offsetWidth
            sceneHeight = e.parentNode.offsetHeight
          } catch {
            return
          }

          let start = sceneWidth * 0.225
          let max = sceneWidth * 0.2
          let clipWidth = sceneWidth * 0.78
          let min = max * 0.375
          let m, a1, a2, l1

          switch (i) {
            case 0: {
              m = `M ${start} 0`
              a1 = `a ${max} ${sceneHeight / 2} 180 0 0 0 ${sceneHeight}`
              l1 = `l ${clipWidth} 0`
              a2 = `a ${min} ${sceneHeight / 2} 180 1 1  0 ${-sceneHeight}`
              break
            }
            case 1: {
              m = `M ${sceneWidth * 0.1} 0`
              a1 = `a ${min} ${sceneHeight / 2} 180 0 0 0 ${sceneHeight}`
              l1 = `l ${
                reelCount == 3 ? clipWidth + min * 0.8 : clipWidth * 1.03
              } 0`
              a2 =
                reelCount == 3
                  ? `l 0 -${sceneHeight} z`
                  : `a ${reelCount == 3 ? 0 : min} ${
                      sceneHeight / 2
                    } 180 0 0 0 ${-sceneHeight}`
              break
            }
            case 2: {
              if (reelCount == 3) {
                m = `M ${sceneWidth * 0.1 - min * 0.8} 0`
                a1 = `l 0 ${sceneHeight}`
                l1 = `l ${clipWidth + min * 0.8} 0`
                a2 = `a ${min} ${sceneHeight / 2} 180 0 0 0 ${-sceneHeight}`
                break
              }
            }
            // eslint-disable-next-line no-fallthrough
            case 3: {
              m = `M ${sceneWidth - (start + clipWidth)} 0`
              a1 = `a ${min} ${sceneHeight / 2} 180 0 1 0 ${sceneHeight}`
              l1 = `l ${clipWidth} 0`
              a2 = `a ${max} ${sceneHeight / 2} 180 1 0 0 ${-sceneHeight}`
              break
            }
          }
          e.parentNode.style.clipPath = `path('${m} ${a1} ${l1} ${a2}')`
        })
      },
    },
  }
</script>

<template>
  <template v-for="(spinner, i) in spinners" :key="i">
    <div :class="'scene-' + i" v-resize="onResize" :ref="'scene' + i">
      <div
        class="carousel"
        :ref="'c' + i"
        data-rot="0"
        :style="{ transform: `translateZ(${-(rad + 10)}px)` }"
      >
        <template v-for="(val, ind) in spinner" :key="ind">
          <Transition>
            <div
              :class="{ carousel__cell: true, blink: win && numbers[i] == ind }"
              :data-id="ind"
              :style="{
                width: '100%',
                height: size.height + 'px',
                transform: `rotateX(${ang(
                  Number(ind),
                )}deg) translateZ(${rad}px ) `,
                backgroundColor: `hsla(${0 + 16 * Number(ind)}deg,40%,50%)`,
                backgroundImage: `linear-gradient(
              45deg,
              hsla(${(0 + 16 * Number(ind)) % 100}deg,30%,85%),
              hsla(${(0 + 16 * Number(ind)) % 100}deg,30%,85%),
              hsla(${(0 + 16 * Number(ind + 1)) % 100}deg,30%,95%))`,

                boxShadow: `inset 0 0 18px 11px hsla(${
                  (0 + 16 * Number(ind)) % 100
                }deg,100%,75%,0.5)`,
              }"
            >
              <img
                :src="theme.icons[val - 1]"
                alt=""
                :class="{
                  'slot-ico': true,
                  'win-scale': win && numbers[i] == ind,
                }"
              />
            </div>
          </Transition>
        </template>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
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

  .scene-1 {
    perspective-origin: 50% 50%;
    /*clip-path: path( "M20 0 l 164 0 c10 0 10 430 0 430 l-164 0 c-10 0 -10 -430 0 -430");*/
  }

  .scene-2 {
    /*clip-path: path("M-11 0 l 167 0 c40 0 40 430 0 430 l-167 0 c10 0 10 -430 0 -430");*/
  }

  .scene-0 {
    /*clip-path: path("M48 0 l 167 0 c-10 0 -10 430 0 430 l-164 0 c-40 0 -40 -430 0 -430");*/
  }

  div[class*="scene"]:last-child {
    perspective-origin: -100% 50%;
    /*     overflow-y: hidden;
    overflow-x: visible; */
  }
  div[class*="scene"]:nth-child(1) {
    perspective-origin: 200% 50%;
    /*     overflow-y: hidden;
    overflow-x: visible; */
  }

  div[class*="scene"] {
    position: relative;
    min-width: 10vmin;
    width: 100%;
    height: 60vh;
    perspective: 900px;
    overflow: visible;
    border-radius: 5px;
    //margin-left: 1vw;
    flex-grow: 1;
  }

  div[class*="scene"]::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 5px;
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
    font-weight: normal;
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
  .blink {
    animation-name: blink;
    animation-duration: 0.2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  .win-scale {
    animation-name: scale;
    animation-duration: 0.2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  @keyframes blink {
    0% {
      filter: brightness(0.9);
    }
    100% {
      filter: brightness(1.3);
    }
  }
  @keyframes scale {
    0% {
      width: 90%;
      height: 90%;
    }
    100% {
      width: 120%;
      height: 120%;
    }
  }
</style>
