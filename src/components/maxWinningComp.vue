<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes"

  export default {
    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      return { tokens, theme }
    },

    components: {},
    creaeted() {},
    beforeMounted() {},
    mounted() {},
    data() {
      return {
        imgIndex: 0,
        open: false,
      }
    },

    computed: {
      max: () => this.tokens.tokens.bet * 7,
    },

    methods: {
      getState() {},
    },
  }
</script>
<template>
  <div class="max-winning-cont">
    <div class="text-container">
      <span>MAX VINST!</span>
    </div>
    <div class="winning-cont amount">
      <p>{{ tokens.tokens.bet * 7 }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  p {
    margin: 0;
    padding: 0;
  }
  .open {
    position: absolute;
    top: 50%;
    height: 100px;
    overflow: scroll;
  }
  .winning-img {
    max-width: 75px;
    height: 100%;
  }
  .amount {
    grid-row: 1;
  }
  .text-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-image: linear-gradient(
      130deg,
      hsl(50, 100%, 50%),
      var(--bs-yellow) 80%,
      var(--bs-orange) 120%
    );
    grid-row: 1;
    height: 100%;
    font-size: clamp(16px, 4vh, 24px);
    color: hsl(0, 100%, 100%);
    text-shadow: 1px 1px 1px #00000044;
    box-shadow: 0px 0px 4px 1px var(--btn-blue4);
  }

  .amount {
    display: flex;
    align-items: center !important;
    justify-content: center;
    grid-row: 2;
    width: 100%;

    font-size: clamp(20px, 8vh, 60px);
    display: flex;
    align-items: center !important;
    justify-content: center;
    grid-row: 2;
    width: 100%;
    font-size: clamp(20px, 7vh, 50px);
    text-shadow: 1px 1px 1px #00000044;
    & p {
      color: var(--btn-blue4);
      line-height: 1.2;
    }
  }
  .max-winning-cont {
    overflow: hidden;
    display: grid;
    grid-template-rows: 40% 60%;
    grid-template-columns: 100%;
    /* border: 3px solid hsl(50, 100%, 50%); */
    /* box-shadow: inset 1px 1px 4px 0px hsl(354deg 63% 34%); */
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-self: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-radius: 10px 10px 60px 60px;
    max-width: 380px;
    min-width: 125px;
    max-height: 160px;
    position: relative;
    min-height: 100px;
    height: 9vh;
    width: 60%;
    z-index: 2;
    /* background-image: linear-gradient(-50deg, var(--bs-orange), var(--bs-yellow) 35%, var(--bs-yellow) 70%, var(--bs-orange)); */
    background-image: linear-gradient(
      45deg,
      hsl(50, 0%, 90%) -20%,
      hsl(55, 0%, 95%) 80%
    );
    box-shadow: 0px 0px 11px 2px var(--bg-color2);
    &::after {
      content: "";
      display: block;
      top: 0;
      left: 0;
      /* border: 1px solid black; */
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: inherit;
      box-shadow: inset -2px 2px 5px 0px hsl(0deg 0% 0% / 50%);
    }

    > p {
      height: 20%;
    }
    & * {
      position: relative;
    }
  }
  .winning-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 1 50%;
    height: 100%;
    width: 50%;
    align-self: center;
    justify-self: center;
  }
  .symbols {
    flex-direction: column;
    height: 100%;
    grid-row: 3;
  }
  .symbol-container {
    flex: 0 0 100%;
    height: 100%;
    width: 100%;
  }
</style>
