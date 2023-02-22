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
        return this.tokenStore.tokens
      },
      bonusTypes() {
        return this.tokenStore.bonusTypes
      },
      themeTypes() {
        return this.tokenStore.themeTypes
      },
    },
    methods: {
      buyBonus(name) {
        let bonus = this.tokenStore.bonusTypes.find(
          (type) => type.name === name,
        )
        let theme = this.tokenStore.themeTypes.find(
          (type) => type.name === name,
        )

        if (
          theme &&
          this.tokenStore.tokens.sum >= theme.cost &&
          theme.owned != true
        ) {
          theme.owned = true
          this.tokenStore.tokens.sum -= theme.cost
        }
        if (bonus && this.tokenStore.tokens.sum >= bonus.cost) {
          bonus.amount += 1
          this.tokenStore.tokens.sum -= bonus.cost
        } else {
          this.errorMessage = true
        }
      },
    },
  }
</script>
<template>
  <header>
    <h1 class="first-heading">Butik</h1>
    <h2 class="tokens">Antal tokens: {{ tokens.sum }}</h2>
  </header>
  <main class="shop container">
    <section class="row">
      <div class="col">
        <h2 class="second-heading">Bonusar:</h2>
        <div>
          <button class="shop-item bonus" @click="buyBonus('Extra Spin')">
            Extra Spin
          </button>
          <button class="shop-item bonus" @click="buyBonus('Extra Row')">
            Extra Row
          </button>
          <button class="shop-item bonus">Någon Bonus</button>
        </div>
      </div>
      <div class="col">
        <h2 class="second-heading">Teman:</h2>
        <div>
          <button
            aria-label="Night Theme"
            class="shop-item night"
            @click="buyBonus('Night Theme')"
          >
            <img class="icon" src="/assets/svg/icon-moon.svg" alt="Halvmånde" />
          </button>
          <button
            aria-label="Forest Theme"
            class="shop-item forest"
            @click="buyBonus('Forest Theme')"
          >
            <img class="icon" src="/assets/svg/icon-pine-tree.svg" alt="Gran" />
          </button>
          <button
            aria-lable="Cat Theme"
            class="shop-item cat"
            @click="buyBonus('Cat Theme')"
          >
            <img class="icon" src="/assets/svg/icon-cat.svg" alt="Katt" />
          </button>
        </div>
      </div>
    </section>
  </main>

  <section class="container">
    <!--Din väska 1-->
    <div class="row">
      <h1 class="first-heading">Din väska</h1>
      <div class="col">
        <h2 class="second-heading">Bonusar:</h2>
        <div class="shop-display">
          <button
            class="shop-item bonus"
            :key="bonus"
            v-for="bonus in bonusTypes"
          >
            {{ bonus.amount }} {{ bonus.name }}
          </button>
          <button class="shop-item bonus">Någon Bonus</button>
        </div>
      </div>
      <div class="col">
        <h2 class="second-heading">Teman:</h2>
        <div class="shop-display">
          <button
            class="shop-item bonus"
            :key="theme"
            v-for="theme in themeTypes"
          >
            {{ theme.name }} {{ theme.amount }}
          </button>
        </div>
      </div>
    </div>

    <!--Din väska 2-->
    <div class="row">
      <h1 class="first-heading">Din väska</h1>
      <div class="col">
        <h2 class="second-heading">Bonusar:</h2>
        <div class="shop-display">
          <button
            class="shop-item bonus"
            :key="bonus"
            v-for="bonus in bonusTypes"
          >
            {{ bonus.amount }}: {{ bonus.name }}
          </button>
        </div>
      </div>
      <div class="col">
        <h2 class="first-heading">Teman:</h2>
        <div class="shop-display">
          <button
            class="shop-item bonus"
            :key="theme"
            v-for="theme in themeTypes"
          >
            {{ theme.name }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<!--OBS!: Prövar att mobilanpassa och underlätta för olika teman. Tidigare styling finns i den utkommenterade koden nedan.-->
<!-- <style>
  header {
    padding: 15px;
    text-align: center;
    margin-bottom: 30px;
  }
  .shop,
  .item-bag {
    display: flex;
    flex-direction: column;
  }
  .bonus {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
  }

  .first-heading {
    font-size: 30px;
    text-align: center;
  }
  .second-heading,
  .error {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .tokens {
    font-size: 13px;
  }
  .night-theme,
  .forest-theme,
  .cat-theme,
  .bonus-btn {
    height: 150px;
    width: 150px;
    border-radius: 60px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
  }
</style> -->

<style lang="scss">
  //OBS!: Prövar nedan att mobilanpassa och underlätta för olika teman.
  //Theme standard
  $icon-size: 48px;
  //One line font -> https://hadrysmateusz.com/blog/font-shorthand
  $icon-font: bold 16px Arial, Helvetica, sans-serif;
  $border-radius: 10px;
  $primary: black;
  $secondary: lightgray;

  .shop-item {
    height: $icon-size;
    width: $icon-size;
    border-radius: $border-radius;
    font: $icon-font;
    border: transparent;
    background-color: $secondary;
    color: $primary;
    overflow: hidden;
    align-items: center;
    img {
      width: 20px;
    }
  }

  .night {
    $primary: #bca8f2;
    $secondary: #231251;
    background-color: $secondary;
  }
  .forest {
    $primary: #7dbe91;
    $secondary: #283a24;
    background-color: $secondary;
  }
  .cat {
    $primary: #d54fa0;
    $secondary: #ffd3ee;
    background-color: $secondary;
  }
  .bonus {
    $primary: #e9d489;
    $secondary: #bca349;
    background-color: $secondary;
  }
</style>

<!--

  Välkommen till din butik!

  Här kan du använda dina tokens för att köpa bonusar som bättrar dina vinstchanser eller välja ett tema som passar dig.

  Du behöver bara köpa ett tema en gång och kan byta bland dina favoriter när du känner för det.

  ----

  Är du säker på att du vill köpa {{ name }}? Ja / Nej

  ----

  Du har inte tillräckligt många tokens. Spela och vinn fler!

 -->
