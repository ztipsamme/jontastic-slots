<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  export default {
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
    emits: { done: null },
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    data() {
      return {
        width: 150,
        height: 150,
        win: false,
        current: [0, 0, 0],
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
        }
      },
      ang() {
        let c = this.count
        return (x) => (360 / c) * x
      },
      rad() {
        return Math.round(this.height / 2 / Math.tan(Math.PI / this.count))
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
      spin(arr) {
        let ani = []
        let refs = [this.$refs.c0, this.$refs.c1, this.$refs.c2]
        refs.forEach((e, i) => {
          let startAngle = this.current[i] * (360 / this.count) * -1

          let newNumber = arr[i]

          let deg = 1080 + newNumber * (360 / this.count)

          console.log(arr[i])
          let x = this.rotation(startAngle, -deg)
          console.log(x)
          let rotani = new KeyframeEffect(e, x, this.opt(i))
          ani[i] = new Animation(rotani, document.timeline)
          this.current[i] = arr[i]
        })
        let p = []
        for (let a of ani) {
          a.play()
          p.push(a.finished)
        }
        return Promise.all(p)
      },
      start(num = this.numbers) {
        this.win = false
        this.test(num).then((data) => {
          console.log(this)
          this.$emit("BAJS")
          console.log("spinner done")
          if (num.every((e) => e == num[0])) {
            console.log(data)
            this.win = true
          }
        })
      },
      test(arr) {
        console.log(arr)
        this.startTime = Date.now()

        let loop = (element, from, to, resolve) => {
          this.time = Date.now()
          this.elapsed = this.time - this.startTime
          let x = Math.min(1, this.elapsed / 2000)
          let len = (to - from) * this.curve.ease(x)
          let ang = from + len
          element.style.transform = "rotateX(" + ang + "deg)"
          element.querySelectorAll(".carousel__cell").forEach((e, i) => {
            e.style.transform = `rotateX(${this.ang(
              Number(i),
            )}deg) translateZ(${this.rad}px) rotateX(${
              ((-1 * ang) % 360) - this.ang(i)
            }deg) `
          })
          if (x < 1) {
            requestAnimationFrame(loop.bind(this, element, from, to, resolve))
          } else {
            console.log("test")
            this.$emit("done")
            resolve("done")
          }
        }
        let p = []
        let refs = [this.$refs.c0, this.$refs.c1, this.$refs.c2]
        refs.forEach((e, i) => {
          let startAngle = this.current[i] * (360 / this.count) * -1
          let newNumber = arr[i]
          let deg = 1080 + newNumber * (360 / this.count)
          let from = startAngle
          let to = -deg
          console.log("hej")
          p.push(
            new Promise((resolve) => {
              requestAnimationFrame(loop.bind(this, e, from, to, resolve))
            }),
          )
        })
        return Promise.all(p)
      },
    },
  }
</script>

<template>
  <h1 v-if="this.winner">WINNER!!</h1>
  <div class="scene-0">
    <div class="carousel" :ref="'c0'" data-rot="0">
      <div
        class="carousel__cell"
        v-for="(val, ind) in spinners[0]"
        :key="ind"
        :data-val="val"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}deg) translateZ(${rad}px ) `,
        }"
      >
        {{ val }}
      </div>
    </div>
  </div>

  <div class="scene-1">
    <div class="carousel" :ref="'c1'" data-rot="0">
      <div
        class="carousel__cell"
        v-for="(val, ind) in spinners[1]"
        :key="ind"
        :data-val="val"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}deg) translateZ(${rad}px ) `,
        }"
      >
        {{ val }}
      </div>
    </div>
  </div>

  <div class="scene-2">
    <div class="carousel" :ref="'c2'" data-rot="0">
      <div
        class="carousel__cell"
        v-for="(val, ind) in spinners[2]"
        :key="ind"
        :data-val="val"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}deg) translateZ(${rad}px ) `,
        }"
      >
        {{ val }}
      </div>
    </div>
  </div>
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
    gap: 10px;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  div[class*="scene"] {
    position: relative;
    width: 150px;
    height: 500px;
    border: 1px solid black;
    perspective: 2000px;
    overflow: hidden;
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
    border: 1px solid black;
  }
</style>
