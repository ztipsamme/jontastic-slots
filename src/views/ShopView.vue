<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import overlayPopUp from "../components/overlayPopUp.vue"

  // Importera tokenStore
  export default {
    setup() {
      const tokenStore = useTokenStore()
      window.content = tokenStore
      return { tokenStore }
    },
    components: {
      overlayPopUp,
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
        } else {
          this.errorMessage = true
        }
      },
    },
  }
</script>

<template>
  <header>
    <h1>Butik</h1>
    <h2 class="tokens">Antal tokens: {{ tokens }}</h2>
  </header>

  <main class="shop">
    <h2 class="first-heading">Bonus</h2>
    <div class="bonus">
      <button class="bonus-btn" @click="buyBonus('Extra Spin')">
        Extra Spin
      </button>
      <button class="bonus-btn" @click="buyBonus('Extra Row')">
        Extra Row
      </button>
      <button class="bonus-btn">Någon Bonus</button>
    </div>
    <h2 class="first-heading">Tema</h2>
    <div class="bonus">
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
  </main>
  <h1 class="error" v-if="errorMessage">
    Du har inte tillräckligt med tokens. Spela igen för att få fler!
  </h1>
  <div class="item-bag">
    <h1>Din väska</h1>
    <h2>Bonusar:</h2>
    <ul>
      <li :key="bonus" v-for="bonus in bonusTypes">
        {{ bonus.amount }}: {{ bonus.name }}
      </li>
    </ul>
    <h2>Teman:</h2>
    <ul>
      <li :key="theme" v-for="theme in themeTypes">{{ theme.name }}</li>
    </ul>
  </div>

  <overlayPopUp />
</template>

<style>
  header {
    padding: 15px;
    text-align: center;
    margin-bottom: 30px;
  }
  .shop {
    display: flex;
    flex-direction: column;
    /*  gap: 20px; */
  }

  .bonus {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 15px;
    align-items: center;
  }

  .first-heading,
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

<!--

  TO DO:

Knapp för varje köp, länk till komponent som man lägger in i varukorg

Är du säker att du vill köpa? varning

Du saknar tokens varning

Tillbaka-knapp

Komponent för bonus och teman




 -->
