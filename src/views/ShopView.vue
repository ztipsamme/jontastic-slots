<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import iconComponent from "../components/elements/iconComponent.vue"
  import buttonComponent from "../components/elements/buttonComponent.vue"

  export default {
    components: {
      icon: iconComponent,
      btn: buttonComponent,
    },
    setup() {
      const tokenStore = useTokenStore()
      const theme = useThemeStore()
      window.content = tokenStore
      return { tokenStore, theme }
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
      onClick(item) {
        if (!item.owned) {
          this.popUpAction(item.name)
        } else if (item.owned) {
          this.tokenStore.themeTypes.forEach((element) => {
            element.active = false
          })
          item.active = true
          this.theme.currentTheme = item.name.replace(/\s/g, "").toLowerCase()
        }
      },
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
          <icon
            :key="item.name"
            :name="item.name"
            v-for="item in themeTypes"
            :aria-label="item.name"
            @click="onClick(item)"
            :size="'68px'"
            :src="item.src"
            :style="{
              border: item.active ? 'solid 5px blue' : '',
            }"
          />
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
          <btn
            :color="'red'"
            :styles="{ width: '48%', marginLeft: '1%' }"
            type="small"
            @click="popUp = false"
          >
            Avbryt
          </btn>
          <btn
            :color="'green'"
            :styles="{ width: '48%', marginLeft: '1%' }"
            type="small"
            @click="buyBonus()"
            >Köp</btn
          >
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

  .default {
    $primary: #46a2b6;
    $secondary: #c5f4ff;
    background-color: $secondary;
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
    div {
      button {
        font-size: 16px;
      }
    }
  }
</style>
