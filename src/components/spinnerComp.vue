<script>
  import { useTokenStore } from '../stores/tokenStore.js'
  export default {
    emits: { stop: null },
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      end(val) {
        this.$emit('stop', val)

        let size = {
          w: 200,
          h: 130,
        }

        let count

        function getAng(count, i) {
          let ang = 360 / count
          return ang * i
        }
        let card = document.querySelectorAll('.carousel__cell')
        let cellHeight = document.querySelector('.cells-height')
        let cellWidth = document.querySelector('.cells-width')
        let cellRange = document.querySelector('.cells-range')
        let carousel = document.querySelector('.carousel')

        size = {
          w: cellWidth.value,
          h: cellHeight.value,
        }

        cellRange.addEventListener('input', (e) => {
          count = e.target.value
          setCards()
        })

        cellWidth.addEventListener('input', (e) => {
          size.w = e.target.value
          card.forEach((e) => {
            e.style.width = size.w + 'px'
          })
          setCards()
        })

        cellHeight.addEventListener('input', (e) => {
          size.h = e.target.value
          card.forEach((e) => {
            e.style.height = size.h + 'px'
          })
          setCards()
        })
        stop = false
        count = cellRange.value
        function rotate() {
          r = Math.round((size.w / 2 + 10) / Math.tan(Math.PI / count))
          let rot = 0
          let loop = () => {
            rot = (rot + 45) % 360
            carousel.style.transform =
              'translateZ(' + -1 * (r / 2) + 'px) rotateY(' + rot + 'deg)'
            if (stop) {
              return
            }
            setTimeout(loop, 50)
          }
          loop()
        }

        function setCards() {
          let r
          card.forEach((e, i) => {
            if (i > count) {
              e.style.display = 'none'
            } else {
              e.style.display = ''
            }
            let a = getAng(count, i)
            r = Math.round(size.w / 2 / Math.tan(Math.PI / count))

            e.style.transform = ` rotateY(${a}deg) translateZ(${r}px)`
          })
          carousel.style.transform = 'translateZ(' + -1 * (r / 2) + 'px)'
        }
        setCards()
        let selected = 1
        rotate()

        document
          .querySelector('.previous-button')
          .addEventListener('click', () => {
            stop = true
          })

        document.querySelector('.next-button').addEventListener('click', () => {
          rot =
            (360 / count) * Math.floor(Math.random() * count) +
            360 * Math.floor(Math.random() * 10) +
            10

          carousel.style.transform =
            'translateZ(' + -1 * (r / 2) + 'px) rotateY(' + rot + 'deg)'
        })
      },
    },
  }
</script>

<template>
  <div class="scene">
    <div class="carousel">
      <div class="carousel__cell">1</div>
      <div class="carousel__cell">2</div>
      <div class="carousel__cell">3</div>
      <div class="carousel__cell">4</div>
      <div class="carousel__cell">5</div>
      <div class="carousel__cell">6</div>
      <div class="carousel__cell">7</div>
      <div class="carousel__cell">8</div>
      <div class="carousel__cell">9</div>
      <div class="carousel__cell">10</div>
      <div class="carousel__cell">11</div>
      <div class="carousel__cell">12</div>
      <div class="carousel__cell">13</div>
      <div class="carousel__cell">14</div>
      <div class="carousel__cell">15</div>
    </div>
  </div>

  <div class="carousel-options">
    <p>
      <label>
        Width
        <input
          class="cells-width"
          type="range"
          min="50"
          max="250"
          value="125"
        />
      </label>
    </p>
    <p>
      <label>
        Height
        <input
          class="cells-height"
          type="range"
          min="50"
          max="150"
          value="100"
        />
      </label>
    </p>
    <p>
      <label>
        Cells
        <input class="cells-range" type="range" min="3" max="15" value="9" />
      </label>
    </p>
    <p>
      <button class="previous-button">Previous</button>
      <button class="next-button">Next</button>
    </p>
    <p>
      Orientation:
      <label>
        <input type="radio" name="orientation" value="horizontal" checked />
        horizontal
      </label>
      <label>
        <input type="radio" name="orientation" value="vertical" />
        vertical
      </label>
    </p>
  </div>
</template>

<style>
  body {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
  .scene {
    position: relative;
    width: 500px;
    height: 130px;
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
    transition: 2s ease-in-out;
  }
  .carousel__cell {
    position: absolute;
    width: 95%;
    height: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 100px;
  }

  .carousel__cell:nth-child(1) {
    transform: rotateY(20deg) translateZ(500px);
  }
</style>
