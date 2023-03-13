<script>
  export default {
    props: {
      text: {
        type: String,
        default: () => "Vinst!",
      },
      h: {
        type: Number,
        default: () => 150,
      },
      style: {
        type: Object,
        default: () => ({}),
      },
      rows: {
        type: Array,
        default: (props) => [props.text],
      },
    },

    methods: {
      clr(h = 180, s = 95, l = 50) {
        return `hsl(${h}deg ${s}% ${l}%)`
      },
    },
  }
</script>

<template>
  <svg viewBox="0 0 1000 400" :style="style">
    <g
      :style="{
        transform: `translateY(-${(120 * (rows.length - 1)) / 2.1}px)`,
      }"
    >
      <g
        class="scale"
        v-for="(str, i) in rows"
        :key="i"
        :style="{ transform: `translateY(${120 * i}px)` }"
      >
        <text
          text-anchor="middle"
          x="500"
          y="150"
          dominant-baseline="middle"
          class="text back"
          :style="{
            fontSize: (i == 0 ? 125 : 95) + 'px',
            fill: clr(h - (i == 0 ? 10 : 0), 100, 50),
            transform: `translateY(${120 * i}px)`,
          }"
        >
          {{ str }}
        </text>
        <text
          text-anchor="middle"
          x="500"
          y="150"
          dominant-baseline="middle"
          class="text neon flicker"
          :style="{
            fontSize: (i == 0 ? 125 : 95) + 'px',
            fill: clr(h - (i == 0 ? 10 : 0), 100, 95),
            textShadow: `
        hsl(${h - (i == 0 ? 10 : 0)}deg 95% 50%) 0px 0px 0.05em,
        hsl(${h - (i == 0 ? 10 : 0)}deg 95% 50% / 50%) 0px 0px 0.8em,
        hsl(${h - (i == 0 ? 10 : 0)}deg 95% 50%) 1px 0px 0.09em,
        hsl(${h - (i == 0 ? 10 : 0)}deg 95% 85%) 2px 0px 0.2em,
        hsl(${h - (i == 0 ? 10 : 0)}deg 95% 50% / 50%)0em 0px 0.1em,
        hsl(${h - (i == 0 ? 10 : 0)}deg 96% 90% / 50%) 0em 0px 0.5em`,
            transform: `translateY(${120 * i}px)`,
          }"
        >
          {{ str }}
        </text>
      </g>
    </g>
  </svg>
</template>

<style scoped lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&family=Tilt+Warp&display=swap");
  *,
  * * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    background-color: black;
  }

  svg {
    width: 100%;
    height: 100%;
    min-height: 300px;
    max-width: 100vw;
    max-height: 100vh;
    position: absolute;
    g {
      transform-origin: center;
    }
  }
  .text {
    font-family: "tilt warp";
    font-size: 110px;
    font-weight: 400;
  }

  $h: 50;
  $s: 100;
  $l: 50;

  @function hlsa($h, $s, $l) {
    $str: hsl($h, $s, $l);
    @return $str;
  }

  .flicker {
    animation: flicker 0.2s ease-out alternate infinite;
  }
  .scale {
    animation: scale 0.2s ease-out alternate infinite;
  }

  @keyframes flicker {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
