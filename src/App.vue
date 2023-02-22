<script>
  import { useTokenStore } from "./stores/tokenStore.js"
  import PopUp from "./components/pop-ups/infoPopUp.vue"
  export default {
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    components: {
      PopUp,
    },
  }
</script>
<template>
  <nav class="nav">
    <ul class="nav">
      <li>
        <RouterLink class="nav-link" to="/">Start</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/shop">Shop</RouterLink>
      </li>
    </ul>
    <div id="tokens">Tokens: {{ tokens.tokens.sum }}</div>
  </nav>
  <main>
    <RouterView />
  </main>
  <PopUp />
</template>

<style lang="scss">
  .nav {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > * {
      color: #000;
      > li > * {
        color: inherit;
      }
    }
  }

  #tokens {
    font-weight: bold;
  }
</style>
