<template>
  <h1 class="popup-title">Butik</h1>
  <p>
    Använd dina tokens i butiken för att förhöja speluplevelsen med bonusar och
    teman. Butiken finner du genom att klicka på knappen med kundvagnen i övre
    delen av sidan.
  </p>

  <h2>Teman</h2>
  <p>Anpassa ditt spel med ett tema.</p>
  <div class="grid">
    <div
      v-for="item in tokens.themeTypes.filter(
        (item) => item.basic === undefined,
      )"
      :key="item.name"
    >
      <icon
        :name="item.name"
        :aria-label="item.name"
        :size="'100%'"
        :src="item.src"
        :item="icon.bought"
      />
    </div>
  </div>
  <p>
    Basic teman går att köpa i shopen. Ännu ej köpta teman markeras med en
    inköpsvagn, låsta teman med ett hänglås, köpta teman bär ingen icon, men det
    temat som är aktivt markeras med en stjärna.
  </p>
  <div class="mini-wrapper flex">
    <miniIcon :item="icon.cart" />
    <miniIcon :item="icon.locked" />
    <miniIcon :item="icon.active" />
  </div>

  <h3>Låst tema</h3>
  <div class="grid">
    <div
      v-for="item in tokens.themeTypes.filter(
        (item) => item.basic !== undefined,
      )"
      :key="item.name"
    >
      <icon
        :name="item.name"
        :aria-label="item.name"
        :size="'100%'"
        :src="item.src"
        :item="icon.bought"
      />
    </div>
  </div>
  <p>
    Låsta teman får du tillgång till genom att spela. Vart och ett av de låsta
    alternativen går att låsa upp genom vinst med motsvaradne Basic tema
    aktiverat. För att veta vilken rad det gäller, se fliken Symbolder.
  </p>

  <h2>Bonusar</h2>
  <p>
    Om du vill öka dina vinstchanser finns bonusar till hands. Köpta bonusar
    samlas på spelsidan i en kolumn till vänster av snurrorna. Förbruka en av
    dina köpta bonusar genom att klicka på bonusen och spela sedan visare som
    vanligt.
  </p>
  <div class="mini-wrapper flex">
    <miniIcon :item="icon.amount" />
  </div>
  <p>Antalet bonusar i din ägo anges med siffran i den lilla iconen.</p>

  <p>"Row" ger dig ytterligare en rad i maskinen.</p>
  <p>"Spin" tillåter dig att få en extra chans att snurra på hjulet.</p>
  <p>"Dubbel" ger dig chansen att dubbla din vinst.</p>
</template>

<script>
  import icon from "../elements/iconComponent.vue"
  import { useTokenStore } from "../../stores/tokenStore.js"
  import miniIcon from "../elements/miniIconComp.vue"
  export default {
    components: {
      icon,
      miniIcon,
    },
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    data() {
      return {
        icon: {
          active: {
            name: "",
            owned: false,
            amount: undefined,
            active: true,
          },
          cart: {
            name: "",
            owned: false,
            amount: undefined,
            cost: 1,
          },
          locked: {
            name: "",
            owned: false,
            amount: undefined,
            cost: 0,
          },
          bought: {
            name: "",
            owned: true,
            amount: undefined,
            cost: 1,
          },
          amount: {
            name: "",
            owned: true,
            amount: 1,
            cost: 1,
          },
        },
      }
    },
  }
</script>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }
  .flex {
    display: flex;
    padding: 0;
    margin: 0;
  }
</style>
