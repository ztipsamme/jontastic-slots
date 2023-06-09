<template>
  <div>
    <button
      :class="{ 'btn-all-in': true, 'btn-disabled': isDisabled }"
      @click="showConfirmationDialog = true"
    >
      All In
    </button>

    <ConfirmationDialog
      v-if="showConfirmationDialog"
      message="Är du säker på att du vill gå All In?"
      :on-confirm="confirmAllIn"
      :on-cancel="cancelAllIn"
    />
  </div>
</template>

<script>
  import { defineComponent, ref } from "vue"
  import { useTokenStore } from "../stores/tokenStore"
  import ConfirmationDialog from "./ConfirmationDialog.vue"

  export default defineComponent({
    name: "AllInButton",
    components: {
      ConfirmationDialog,
    },
    setup() {
      const showConfirmationDialog = ref(false)

      const confirmAllIn = () => {
        const tokenStore = useTokenStore()
        tokenStore.tokens.bet = tokenStore.tokens.sum
        showConfirmationDialog.value = false
      }

      const cancelAllIn = () => {
        showConfirmationDialog.value = false
      }

      return {
        showConfirmationDialog,
        confirmAllIn,
        cancelAllIn,
      }
    },
    computed: {
      isDisabled() {
        const tokenStore = useTokenStore()
        return tokenStore.tokens.sum <= 0
      },
    },
  })
</script>
