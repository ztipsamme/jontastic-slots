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
    },
    emits: { stop: null },
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    data() {
      return {
        width: 150,
        height: 225,
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
      ang() {
        let c = this.count
        return (x) => (360 / c) * x + "deg"
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
        this.spin(num).then((data) => {
          if (num.every((e) => e == num[0])) {
            console.log(data)
            this.win = true
          }
          this.$emit("done", this.win)
        })
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
        v-for="(van, ind) in new Array(count).fill(null)"
        :key="ind"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}) translateZ(${rad}px ) `,
        }"
      >
        {{ ind }}
      </div>
    </div>
  </div>

  <div class="scene-1">
    <div class="carousel" :ref="'c1'" data-rot="0">
      <div
        class="carousel__cell"
        v-for="(van, ind) in new Array(count).fill(null)"
        :key="ind"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}) translateZ(${rad}px ) `,
        }"
      >
        {{ ind }}
      </div>
    </div>
  </div>

  <div class="scene-2">
    <div class="carousel" :ref="'c2'" data-rot="0">
      <div
        class="carousel__cell"
        v-for="(van, ind) in new Array(count).fill(null)"
        :key="ind"
        :style="{
          width: width + 'px',
          height: height + 'px',
          transform: `rotateX(${ang(Number(ind))}) translateZ(${rad}px ) `,
        }"
      >
        {{ ind }}
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
