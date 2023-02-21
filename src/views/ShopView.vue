<script>
  import { useTokenStore } from "../stores/tokenStore.js"

  // Importera tokenStore
  export default {
    setup() {
      const tokenStore = useTokenStore()
      window.content = tokenStore
      return { tokenStore }
    },

    data() {
      return {
        errorMessage: false,
        verification: false,
      }
    },

    computed: {
      tokens() {
        return this.tokenStore.tokens // Hämta tokens
      },
      bonusTypes() {
        return this.tokenStore.bonusTypes
      },
      themeTypes() {
        return this.tokenStore
      },
    },

    methods: {
      buyBonus(name) {
        // Sök genom tokenStore och hitta matchande namn som klickats på
        let bonus = this.tokenStore.bonusTypes.find(
          (type) => type.name === name,
        )
        let theme = this.tokenStore.themeTypes.find(
          (type) => type.name === name,
        )

        // Kolla om du har nog med tokens som räcker för cost och att du inte redan äger temat

        if (
          theme &&
          this.tokenStore.tokens >= theme.cost &&
          theme.owned != true
        ) {
          theme.owned = true
          this.tokenStore.tokens -= theme.cost
        }

        if (bonus && this.tokenStore.tokens >= bonus.cost) {
          bonus.amount += 1
          this.tokenStore.tokens -= bonus.cost
        } /* else {
          this.errorMessage = true
        } */
      },
    },
    goBack() {
      // Kod för tillbaka-knapp
    },
  }
</script>

<template>
  <header>
    <h1>Shop</h1>
    <button @click="goBack()">Tillbaka</button>
    <h2 class="tokens">Antal tokens: {{ tokens }}</h2>
  </header>

  <main class="shop">
    <div class="bonus">
      <h2 class="first-heading">Bonus</h2>
      <button class="bonus-btn" @click="buyBonus('Extra Spin')">
        Extra Spin
      </button>
      <button class="bonus-btn" @click="buyBonus('Extra Row')">
        Extra Row
      </button>
    </div>
    <div class="bonus">
      <h2 class="first-heading">Teman</h2>
      <button class="night-theme" @click="buyBonus('Night Theme')">
        Night Theme
      </button>
      <button class="forest-theme" @click="buyBonus('Forest Theme')">
        Forest Theme
      </button>
      <button class="cat-theme" @click="buyBonus('Cat Theme')">
        Cat Theme
      </button>
    </div>
    <h1 v-if="errorMessage">Du saknar tokens</h1>
  </main>
</template>

<style>
  header {
    padding: 15px;
    text-align: center;
  }
  .shop {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .bonus {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
  }

  .night-theme,
  .forest-theme,
  .cat-theme,
  .bonus-btn {
    height: 150px;
    width: 150px;
    border-radius: 40px;
  }
</style>

<!--

  TO DO:

Knapp för varje köp, länk till komponent som man lägger in i varukorg

Är du säker att du vill köpa? varning

Du saknar tokens varning

Tillbaka-knapp

Komponent för bonus och teman




 -->
