<script>
  import { useTokenStore } from "./stores/tokenStore.js"
  import PopUp from "./components/pop-ups/infoPopUp.vue"
  import buttonComponent from "./components/elements/buttonComponent.vue"
  export default {
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    components: {
      PopUp,
      btn: buttonComponent,
    },
  }
</script>
<template>
  <header>
    <div class="info">
      <PopUp />
    </div>

    <nav class="nav">
      <RouterLink class="nav-link" to="/">
        <btn :circle="false" :width="'10vw'" :height="'50px'" :size="'large'">
          <i class="bi bi-house-fill" />
        </btn>
      </RouterLink>
      <RouterLink class="nav-link" to="/shop">
        <btn
          :color="'purple'"
          :circle="false"
          :width="'10vw'"
          :height="'50px'"
          :size="'large'"
        >
          <i class="bi bi-cart-fill" /> </btn
      ></RouterLink>
    </nav>
    <div class="token-display">
      <div class="token-icon">t</div>
      <div class="token-text">
        {{ tokens.tokens.sum }}
      </div>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
  #app {
    display: grid;
    grid-template-rows: 75px auto;
    height: 100vh;
    width: 90vw;
  }
  header {
    border: 1px solid black;
    display: grid;
    grid-template-columns: 25% 50% 25%;
    height: 100%;
    padding: 10px 0px;
    align-items: center;

    margin-bottom: 3vh;

    width: 100%;
    .info {
      justify-self: end;
      width: 100%;
    }
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    > * {
      text-align: center;
      color: #000;
      margin: 0px 15px;
    }
    .nav-link {
      width: max-content;
      padding: 0;
      > li > * {
        color: inherit;
      }
    }
  }
  .token-display {
    border: 3px solid hsla(50deg, 100%, 50%);
    border-radius: 1000px;
    width: 100%;
    padding: 15px 0px;
    padding-right: 30px;
    display: flex;
    height: 50px;
    align-items: center;
    justify-self: end;
    background-image: linear-gradient(
      45deg,
      hsla(50deg, 0%, 90%) -20%,
      hsla(55deg, 0%, 95%) 80%
    );
    box-shadow: inset -2px 2px 5px 0px hsla(50deg, 0%, 0%, 0.5);
  }
  .token-icon {
    flex-shrink: 0;
    justify-self: start;
    display: flex;
    width: 44px;
    height: 44px;
    background-image: linear-gradient(
      45deg,
      hsla(50deg, 100%, 50%),
      hsla(55deg, 100%, 75%)
    );
    border-radius: 100%;
    border: 3px solid hsla(50deg, 100%, 50%);
    justify-content: center;
    font-size: 25px;
    align-items: center;
    font-weight: bold;
    padding-bottom: 5px;
    color: hsla(50deg, 100%, 8%, 0.7);
  }

  .token-text {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    line-height: 24px;
    height: 24px;
    margin-left: 15px;
    width: 100%;
  }
</style>
