<script>
  import { useTokenStore } from "../stores/tokenStore.js"

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
        popUp: false,
        selectedItem: "",
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
      owned() {
        return this.tokenStore.themeTypes.owned
      },
    },

    methods: {
      popUpAction(item) {
        let theme = this.themeTypes.find((type) => type.name === item)
        let bonus = this.tokenStore.bonusTypes.find(
          (type) => type.name === item,
        )
        this.selectedItem = item

        if ((theme && !theme.owned) || bonus) {
          this.popUp = true
        } else {
          this.popUp = false
        }
      },

      buyBonus() {
        let bonus = this.tokenStore.bonusTypes.find(
          (type) => type.name === this.selectedItem,
        )
        let theme = this.themeTypes.find(
          (type) => type.name === this.selectedItem,
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
          bonus.owned = true
          this.tokenStore.tokens.sum -= bonus.cost
        } else {
          this.errorMessage = true
        }
        this.popUp = false
      },
    },
  }
</script>

<template>
  <header>
    <h1 class="first-heading">Butik</h1>
  </header>
  <main class="shop container">
    <section class="row">
      <div class="col">
        <h2 class="second-heading">Bonusar:</h2>
        <div>
          <button class="shop-item bonus" @click="popUpAction('Extra Spin')">
            Extra Spin
          </button>
          <button class="shop-item bonus" @click="popUpAction('Extra Row')">
            Extra Row
          </button>
          <button class="shop-item bonus">Någon Bonus</button>
        </div>
      </div>
      <div class="col">
        <h2 class="second-heading">Teman:</h2>
        <div>
          <button
            :key="item.name"
            v-for="item in themeTypes"
            :aria-label="item.name"
            :class="
              'shop-item ' +
              item.name
                .toLowerCase()
                .replace(/theme/g, '')
                .trim()
                .replace(/\s/g, '-')
            "
            @click="popUpAction(item.name)"
            :disabled="item.owned"
          >
            <img class="icon" :src="item.src" :alt="item.name" />
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
          <button class="shop-item bonus" :key="theme" v-for="theme in owned">
            {{ theme.name }} {{ theme.amount }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="popUp" @close="popUp = false" class="popup-overlay">
      <div class="popup-container">
        <p>Vill du köpa {{ selectedItem }}?</p>
        <div class="row gap-1 mx-3">
          <button class="col slot-btn red" @click="popUp = false">
            Avbryt
          </button>
          <button class="col slot-btn green" @click="buyBonus()">Köp</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  //Theme standard
  $icon-size: 68px;
  //One line font -> https://hadrysmateusz.com/blog/font-shorthand
  $icon-font: bold 16px Arial, Helvetica, sans-serif;
  $border-radius: 10px;
  $primary: black;
  $secondary: lightgray;

  .shop-item {
    position: relative;
    height: $icon-size;
    width: $icon-size;
    border-radius: $border-radius;
    font: $icon-font;
    border: transparent;
    background-color: $secondary;
    color: $primary;
    overflow: hidden;
    align-items: center;
    margin-left: 10px;
    img {
      width: 30px;
    }
    &:disabled::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: gray;
      opacity: 0.5;
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

  .popup-container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 300px;
    position: relative;
    overflow-y: scroll;
  }
</style>

<style scoped lang="scss">
  .popup-container {
    div {
      button {
        font-size: 16px;
      }
    }
  }
</style>
