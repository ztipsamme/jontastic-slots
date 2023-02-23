<script>
  export default {
    props: {
      test: {
        type: String,
        default: () => "You're a Winner!",
      },
      hue: {
        type: Number,
        default: () => 150,
      },
    },
  }
</script>

<template>
  <svg viewBox="0 0 100 100">
    <g class="scale">
      <text
        text-anchor="middle"
        x="50"
        dominant-baseline="hanging"
        class="text back"
      >
        {{ text }}
      </text>
      <text
        text-anchor="middle"
        x="50"
        dominant-baseline="hanging"
        class="text neon flicker"
        style="'text-shadow:
    0px 0px 0.01em hlsa($h,$s,$l),
    0px 0px 0.1em hlsa($h,$s,$l),
    1px 0px 0.3em hlsa($h,$s,$l),
    2px 0px 3em hlsa($h+3,$s,$l+45),
    1em 0 3em hlsa($h+4,$s,$l+5);'"
      >
        {{ text }}
      </text>
    </g>
  </svg>

  <p style="text-shadow: 2px 2px 2px green">Hejsan</p>
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
    width: 100vw;
    height: 10vh;
    border: 1px solid red;
  }
  .text {
    font-family: "tilt warp";
    font-size: 100px;
    font-weight: 400;
  }

  $h: 50;
  $s: 100;
  $l: 50;

  @function hlsa($h, $s, $l) {
    $str: hsl($h, $s, $l);
    @return $str;
  }
  .back {
    fill: hlsa($h, $s, $l);
  }

  .neon {
    fill: hlsa($h, $s, 95);
    text-shadow: 0px 0px 0.01em hlsa($h, $s, $l), 0px 0px 0.1em hlsa($h, $s, $l),
      1px 0px 0.3em hlsa($h, $s, $l), 2px 0px 3em hlsa($h + 3, $s, $l + 45),
      1em 0 3em hlsa($h + 4, $s, $l + 5);
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
