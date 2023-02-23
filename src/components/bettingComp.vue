<!--
  Hej Hannah!
  För att få åtkonst till spelvalutan använder du constanten tokens i setup(). Constanten tokens värde komme rifrån ../stores/tokenStore.js, som du kan se.

  För att använda summan som spelaren tjänat in nyttjar du this.tokens.tokens.sum.

  I filen ../stores/tokenStore.js kan du lägga till fler värden som vid senare tillfälle kan komma till användning i andra komponenter.

  Denna komponent är redan tillagd i bottnen av templated inuti ../views/StarView.js
-->

<script>
  import { useTokenStore } from "../stores/tokenStore.js"

  export default {
    setup() {
      const tokens = useTokenStore()
      return { tokens }
    },
    created() {
      console.log("Exempel:", this.tokens.tokens.sum + 10)
    },
  }
</script>

<template>
  <div>Här kan du bygga en betting knapp och göra vad du vill med den.</div>
</template>
