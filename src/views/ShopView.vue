<script>
import { useTokenStore } from "../stores/tokenStore.js";

// Importera tokenStore
export default {
  setup() {
    const tokenStore = useTokenStore();
    return { tokenStore };
  },
  computed: {
    tokens() {
      return this.tokenStore.tokens; // Hämta tokens
    },
    bonusTypes() {
      return this.tokenStore.bonusTypes; // Hämta typ av köpfunktioner
    },
  },

  methods: {
    buyBonus(name) {
      // Sök genom tokenStore och hitta matchande namn som klickats på
      const bonus = this.tokenStore.bonusTypes.find((type) => type.name === name);
      // Kolla om du har nog med tokens som räcker för cost
      if (bonus && this.tokenStore.tokens >= bonus.cost) {
        // Lägg in i din lista med bonusar och dra av kostnad
        this.tokenStore.bonusList.push(bonus);
        this.tokenStore.tokens -= bonus.cost;
        console.log("Köpte: " + bonus.name);
      } else {
        console.log("Du saknar tokens");
      }
    },
  },
};
</script>

<template>
  <header>
    <h1>Shop</h1>
    <button @click="($event) => goBack()">Tillbaka</button>
    <h2 class="tokens">Antal tokens: {{ tokens }}</h2>
  </header>

  <main class="shop">
    <h2 class="first-heading">Bonus</h2>
    <div class="bonus">
      <button class="bonus" @click="buyBonus('Extra Spin')">Extra Spin</button>
      <button class="bonus" @click="buyBonus('Extra Row')">Extra Row</button>
    </div>
    <h2 class="first-heading">Teman</h2>
    <button class="night-theme" @click="buyBonus('Night Theme')">Night Theme</button>
    <button class="forest-theme" @click="buyBonus('Forest Theme')">Forest Theme</button>
    <button class="cat-theme" @click="($event) => buyBonus('Cat Theme')">
      Cat Theme
    </button>
  </main>
</template>

<!--

Knapp för varje köp, länk till komponent som man lägger in i varukorg

Koppla shopview till tokenstore


 -->
