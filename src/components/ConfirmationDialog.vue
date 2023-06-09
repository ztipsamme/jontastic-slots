<template>
  <div class="confirmation-dialog">
    <p>{{ message }}</p>
    <button @click="confirm">Confirm</button>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script>
  import { defineComponent } from "vue"

  export default defineComponent({
    name: "ConfirmationDialog",
    props: {
      message: {
        type: String,
        required: true,
      },
      onConfirm: {
        type: Function,
        required: true,
      },
      onCancel: {
        type: Function,
        required: true,
      },
    },
    methods: {
      confirm() {
        this.onConfirm()
      },
      cancel() {
        this.onCancel()
      },
    },
  })
</script>
