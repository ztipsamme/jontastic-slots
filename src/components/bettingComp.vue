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

<script>
import { useTokenStore } from "../stores/tokenStore.js"


export default {
 setup() {
   const tokens = useTokenStore()
   return {
     tokens,
   }
 },
 canDraw() {
   const gamestates = gamestates
   return (this.gamestate === gamestates.READY || this.gamestate === gamestates.SWAP) && this.bet > 0;
 }
 ,


 created() {
   console.log("Exempel:", this.tokens.tokens.sum + 10)
 }
}




</script>






<template>
 <div class="pushable"><span class="front"><button type="button" @click="placeBet(+1)" :disabled="!canEnableBets"
       :class="{ 'bet__button': !canEnableBets }">-</button></span></div>
 <div class="bet_amount">{{ bet }}</div>
 <div class="pushable">
   <span class="front">
     <div class="controls"><button type="button" @click="placeBet(1)" :disabled="!canEnableBets"
         :class="{ 'bet__button': !canEnableBets }">+</button></div>
   </span>
 </div>
 <div class="controls">
   <bet />
 </div>


 <div class="pushable">
   <div class="bet_amount">{{ bet }}</div>
   <span class="front">
     <div class="controls">
       <bet />
       <button class="deal-button" type="button" @click="$emit('deal')" :disabled="!canDraw"
         :class="{ 'deal-button-can-draw': canDraw }">BET</button>


     </div>
   </span>
 </div>
</template>


<style lang="scss">
.pushable {
 background: hsl(216, 100%, 32%);
 border-radius: 12px;
 padding: 0;
 outline-offset: 4px;
 width: 160px;


}


.front {
 padding: 12px 42px;
 border-radius: 12px;
 font-size: 1.25rem;
 width: 150px;
 background: rgb(34, 63, 207);
 color: white;
 transform: translateY(-6px);
 display: flex;
 transition:
   transform 600ms cubic-bezier(.3, .7, .4, 1);




}


.bet__button {
 font: 40px "Lilita One", sans-serif;
 color: white;
 background: rgb(34, 63, 207);
 width: 80px;
}


.deal-button {
 font: 40px "Lilita One", sans-serif;
 color: white;
 background: rgb(34, 63, 207);


}


.pushable:active .front {
 transform: translateY(-2px);
}


.pushable:hover .front {
 transform: translateY(-6px);
 transition:
   transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}


.pushable:active .front {
 transform: translateY(-2px);
 transition: transform 34ms;
}
</style>
