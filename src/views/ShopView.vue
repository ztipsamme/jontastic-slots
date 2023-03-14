<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import iconComponent from "../components/elements/iconComponent.vue"
  import buttonComponent from "../components/elements/buttonComponent.vue"
  import {} from "@ant-design/icons-vue"

  export default {
    components: {
      icon: iconComponent,
      btn: buttonComponent,
    },

    mounted() {
      window.addEventListener("keydown", this.handleKeyDown)
    },
    beforeUnmount() {
      window.removeEventListener("keydown", this.handleKeyDown)
    },
    methods: {
      handleKeyDown(event) {
        if (event.key === " " || event.keyCode === 32) {
          event.preventDefault()
        }
      },
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
        popUp: false,
        selectedItem: "",
        theme1Bought: true,
        theme2Bought: true,
        theme3Bought: true,
        theme4Bought: true,
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
          this.popUpAction(item)
        } else if (item.owned) {
          this.tokenStore.themeTypes.forEach((element) => {
            element.active = false
          })
          item.active = true
          this.theme.setTheme(item.name.replace(/\s/g, "").toLowerCase())
        }
      },

      popUpAction(item) {
        let theme = this.themeTypes.find((type) => type.name === item.name)
        let bonus = this.tokenStore.bonusTypes.find(
          (type) => type.name === item.name,
        )
        this.selectedItem = item

        if (
          (theme && !theme.owned && theme.cost < this.tokenStore.tokens.sum) ||
          (bonus && bonus.cost < this.tokenStore.tokens.sum)
        ) {
          this.popUp = true
        } else {
          this.errorMessage = true
        }
      },

      buyBonus() {
        let bonus = this.tokenStore.bonusTypes.find(
          (type) => type.name === this.selectedItem.name,
        )
        let theme = this.themeTypes.find(
          (type) => type.name === this.selectedItem.name,
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
        }
        this.popUp = false
      },
    },
  }
</script>

<template>
  <main class="shop container">
    <section class="category-container">
      <div class="category-header" id="bonus">
        <h2 class="second-heading">Bonusar</h2>
        <p class="desc">Levla upp spänningen med någonting extra.</p>
      </div>
      <div class="item-container" id="bonus-items">
        <div
          class="item"
          :key="item"
          v-for="item in bonusTypes"
          @click="onClick(item)"
        >
          <icon
            :name="item.name"
            :aria-label="item.name"
            :size="'68px'"
            :src="item.src"
            :item="item"
          />
          <span>
            {{
              item.name.substring(item.name.indexOf("Extra") + "extra".length)
            }}
          </span>
          <span> {{ item.cost }}t </span>
        </div>
      </div>
      <div class="category-header" id="theme">
        <h2 class="second-heading">Teman</h2>
        <p class="desc">Anpassa ditt spel med ett tema.</p>
      </div>
      <div class="item-container" id="theme-items">
        <div
          class="item"
          v-for="item in themeTypes"
          :key="item.name"
          @click="onClick(item)"
        >
          <template v-if="'theme' + item + 'Bought'">
            <template v-if="theme3Bought">
              <icon
                :name="item.name"
                :aria-label="item.name"
                :size="'68px'"
                :src="item.src"
                :item="item"
              />
              <span> {{ item.name }} </span>

              <template v-if="!item.owned && item.cost > 0">
                {{ item.cost }}t</template
              >
            </template></template
          >
        </div>
      </div>
    </section>
  </main>

  <div v-if="popUp" @close="popUp = false" class="popup-overlay">
    <div class="popup-container">
      <p class="buy">Vill du köpa temat {{ selectedItem.name }}?</p>
      <div id="btn-row" class="row gap-1 mx-3">
        <btn
          :color="'red'"
          :styles="{ height: '50px', marginLeft: '1%' }"
          :width="'80px'"
          :type="'small'"
          @click="popUp = false"
          class="buy-btn"
        >
          Avbryt
        </btn>
        <btn
          :color="'green'"
          :styles="{ height: '50px', marginLeft: '1%' }"
          :width="'80px'"
          :type="'small'"
          @click="buyBonus()"
          :audio="'purchase.mp3'"
          class="buy-btn"
          >Köp</btn
        >
      </div>
    </div>
  </div>
  <div v-if="errorMessage" @close="popUp = false" class="popup-overlay">
    <div class="popup-container">
      <p class="buy">Du har ej råd att köpa {{ selectedItem.name }}!</p>
      <div id="btn-row" class="row gap-1 mx-3">
        <btn
          :color="'red'"
          :styles="{ height: '50px', marginLeft: '1%' }"
          :width="'80px'"
          :type="'small'"
          @click="errorMessage = false"
          class="buy-btn"
        >
          Avbryt
        </btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  //Theme standard
  //One line font -> https://hadrysmateusz.com/blog/font-shorthand
  p {
    text-align: start;
  }
  .desc {
    font-size: 14px;
    font-weight: normal;
  }

  .second-heading {
    font-size: 20px;
    font-weight: normal;
  }

  .first-heading,
  .second-heading,
  .desc {
    color: white;
  }

  .category-container {
    display: grid;
    gap: 0 15px;
    grid-template-columns: 1fr 1fr;
    #bonus {
      grid-column: 1/2;
    }
    #bonus-items {
      grid-column: 1/2;
    }
    #theme {
      grid-column: 2 /3;
      grid-row: 1/2;
    }
    #theme-items {
      grid-column: 2/3;
    }
    .item-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .item {
      display: flex;
      flex-direction: column;
      width: min-content;
      font-weight: normal;
      text-align: center;
    }
  }

  .popup-container {
    position: fixed;
    margin: auto;
    height: 200px;
    z-index: 100;
    inset: 0;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px; /*
   position: relative; */
    overflow-y: scroll;
    div {
      button {
        font-size: 16px;
      }
    }
  }

  #btn-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .item {
    margin-right: 15px;
  }
</style>
