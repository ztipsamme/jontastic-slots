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
          this.theme.setTheme(item.name.replace(/\s/g, "").toLowerCase())
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
  <main class="shop container">
    <section class="row">
      <div class="col category">
        <h2 class="second-heading">Bonusar</h2>
        <p>Levla upp spänningen med någonting extra.</p>
        <div class="d-inline-flex flex-wrap gap-2">
          <div class="item" :key="item" v-for="item in bonusTypes">
            <icon
              :name="item.name"
              :aria-label="item.name"
              @click="onClick(item)"
              :size="'68px'"
              :src="item.src"
            />
            <span>
              {{
                item.name.substring(item.name.indexOf("Extra") + "extra".length)
              }}
            </span>
            <span> {{ item.cost }}t </span>
          </div>
        </div>
      </div>
      <div class="col category">
        <h2 class="second-heading">Teman</h2>
        <p>Anpassa ditt spel med ett tema.</p>
        <div class="d-inline-flex flex-wrap gap-2">
          <div class="item" v-for="item in themeTypes" :key="item.name">
            <icon
              :name="item.name"
              :aria-label="item.name"
              @click="onClick(item)"
              :size="'68px'"
              :src="item.src"
              :style="{
                border: item.active ? 'solid 5px blue' : '',
              }"
            />
            <span> {{ item.name }} </span>
            <span v-if="!item.owned"> {{ item.cost }}t </span>
          </div>
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
  //One line font -> https://hadrysmateusz.com/blog/font-shorthand

  p {
    text-align: start;
  }

  .category {
    .item {
      display: flex;
      flex-direction: column;
      width: min-content;
      font-weight: bold;
      text-align: center;
    }
  }

  .first-heading,
  .second-heading,
  p {
    color: white;
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
