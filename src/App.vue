<script>
  import { useTokenStore } from "./stores/tokenStore.js"
  import iconComponent from "./components/elements/iconComponent.vue"
  import PopUp from "./components/pop-ups/infoPopUp.vue"
  export default {
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    components: {
      PopUp,
      icon: iconComponent,
    },
  }
</script>
<template>
  <nav class="nav">
    <PopUp />
    <ul class="nav">
      <li>
        <RouterLink class="nav-link" to="/">Start</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/shop">Shop</RouterLink>
      </li>
    </ul>
    <div
      v-if="this.$route.path === '/'"
      class="bonuses"
      :key="bonus"
      v-for="bonus in tokens.bonusTypes"
    >
      <icon
        class="icon d-inline-flex align-items-center justify-content-center"
        :name="bonus.name"
        :aria-label="bonus.name"
        :size="'38px'"
        :src="bonus.src"
      />
      <div class="amount d-inline-flex align-items-center justify-content-end">
        {{ bonus.amount }}
      </div>
    </div>
    <div class="amount d-inline-flex align-items-center justify-content-end">
      {{ tokens.tokens.sum }}t
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
  .nav {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > * {
      text-align: center;
      color: #000;
    }
    ul {
      width: max-content;
      padding: 0;
      > li > * {
        color: inherit;
      }
    }
  }

  .bonuses {
    display: inline-flex;
    position: relative;
  }
  .amount {
    text-align: right;
    border-radius: 10px;
    font-weight: bold;
    padding: 0 10px;
    height: 38px;
    box-shadow: inset -2px 2px 3px rgba(0, 0, 0, 0.5);
  }
  .bonuses .amount {
    border-radius: 0 10px 10px 0;
    position: absolute;
    width: 58px;
    left: 18px;
    z-index: -1;
  }
</style>
