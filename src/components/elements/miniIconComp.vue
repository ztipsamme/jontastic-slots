<template>
  <!-- For sale -->
  <div
    class="mini-icon"
    v-if="!item.owned && item.cost > 0 && item.amount === undefined"
  >
    <i class="bi bi-cart-fill" />
  </div>

  <!-- Active theme -->
  <div
    class="mini-icon active"
    v-if="item.active && !item.name.startsWith('Extra')"
  >
    <i class="bi bi-star-fill" />
  </div>

  <!-- Locked theme -->
  <div class="mini-icon" v-if="!item.owned && item.cost < 1">
    <i class="bi bi-lock-fill" />
  </div>

  <!-- Bonus amount -->
  <div class="mini-icon" v-if="item.amount > 0">
    {{ item.amount }}
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({
          owned: "",
          amount: "",
          cost: "",
          name: "",
        }),
      },
    },
  }
</script>

<style lang="scss">
  .mini-icon {
    color: #ffffffcc;
    box-shadow: 0 2px 3px rgb(0, 0, 0, 0.5);
    display: flex;
    border-radius: 100px;
    background-image: linear-gradient(#4a65b0, #42c4ec);
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
  }

  .active {
    background-image: linear-gradient(
      45deg,
      hsl(50, 100%, 50%),
      hsl(55, 100%, 75%)
    );
    color: #635823;
  }
</style>
