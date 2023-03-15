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
          (theme &&
            !theme.owned &&
            theme.cost < this.tokenStore.tokens.sum &&
            theme.cost > 0) ||
          (bonus && bonus.cost < this.tokenStore.tokens.sum)
        ) {
          this.popUp = true
        } else {
          if (theme && theme.cost === 0) {
            this.errorMessage = "locked"
          } else {
            this.errorMessage = "sum < cost"
          }
        }
      },
      handleKeyDown(event) {
        if (event.key === " " || event.keyCode === 32) {
          event.preventDefault()
        }
      },
      buyBonus(item) {
        if (item.name.startsWith("Extra")) {
          item.amount++
        } else {
          item.owned = true
        }
        this.tokenStore.tokens.sum -= item.cost
        this.popUp = false
      },
    },
  }
</script>

<template>
  <section class="category-container">
    <div class="category-header" id="bonus">
      <h2>Bonusar</h2>
    </div>

    <div class="item-container" id="bonus-items">
      <div
        class="item"
        :key="item"
        v-for="item in bonusTypes"
        @click="onClick(item)"
      >
        <icon
          class="icon"
          :name="item.name"
          :aria-label="item.name"
          :size="'clamp(50px,7vw,100px)'"
          :src="item.src"
          :item="item"
        />
        <span>
          {{ item.name.substring(item.name.indexOf("Extra") + "extra".length) }}
        </span>
        <span> {{ item.cost }}t </span>
      </div>
    </div>

    <div class="category-header" id="basic">
      <h2>Basic Teman</h2>
    </div>

    <div class="item-container" id="basic-items">
      <div
        class="item"
        v-for="(item, index) in themeTypes"
        :key="item.name"
        @click="onClick(item)"
      >
        <template v-if="index < 6">
          <icon
            class="icon"
            :name="item.name"
            :aria-label="item.name"
            :size="'clamp(50px,7vw,100px)'"
            :src="item.src"
            :item="item"
          />
          <span> {{ item.name }} </span>

          <template v-if="!item.owned && item.cost > 0">
            {{ item.cost }}t
          </template>
        </template>
      </div>
    </div>

    <div class="category-header" id="deluxe">
      <h2>Deluxe Teman</h2>
    </div>

    <div class="item-container" id="deluxe-items">
      <div
        class="item"
        v-for="(item, index) in themeTypes"
        :key="item.name"
        @click="onClick(item)"
      >
        <template v-if="index > 6">
          <icon
            class="icon"
            :name="item.name"
            :aria-label="item.name"
            :size="'clamp(50px,7vw,100px)'"
            :src="item.src"
            :item="item"
          />
          <span> {{ item.name }} </span>
        </template>
      </div>
    </div>
  </section>

  <div v-if="popUp" class="popup-overlay" @click="popUp = false">
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
          @click="buyBonus(selectedItem)"
          :audio="'purchase.mp3'"
          class="buy-btn"
          >Köp</btn
        >
      </div>
    </div>
  </div>
  <div
    v-if="errorMessage === 'sum < cost'"
    @close="popUp = false"
    class="popup-overlay"
  >
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
          Tillbaka
        </btn>
      </div>
    </div>
  </div>
  <div
    v-if="errorMessage === 'locked'"
    @close="popUp = false"
    class="popup-overlay"
  >
    <div class="popup-container">
      <p class="buy">
        Temat {{ selectedItem.name }} är låst. Spela med
        {{ selectedItem.basic }} temat för att vinna detta tema.
      </p>
      <div id="btn-row" class="row gap-1 mx-3">
        <btn
          :color="'red'"
          :styles="{ height: '50px', marginLeft: '1%' }"
          :width="'80px'"
          :type="'small'"
          @click="errorMessage = false"
          class="buy-btn"
        >
          Tillbaka
        </btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .category-container {
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 20px;
    grid-row: min-content;
    .category-header {
      height: min-content;
      align-items: baseline;
      gap: 10px;
      flex-basis: 100%;

      > * {
        margin: 0;
      }
      color: white;
      h2 {
        font-size: 20px;
      }
      .desc {
        font-size: 14px;
      }
    }
    #bonus {
      grid-column: 1/2;
      grid-row: 1/2;
    }
    #basic {
      grid-column: 1/2;
      grid-row: 2/3;
    }
    #basic-items {
      grid-column: 2/3;
      grid-row: 2/3;
    }
    #deluxe {
      grid-column: 1/2;
      grid-row: 3/4;
    }
    #deluxe-items {
      grid-column: 2/3;
      grid-row: 3/4;
    }
    .item-container {
      width: 100%;
      display: flex;
      align-items: baseline;
      justify-content: baseline;
      flex-flow: row wrap;
      overflow-y: scroll;
      .item {
        text-align: center;
        display: flex;
        flex-direction: column;
        margin: 15px 0 0 0;
        .icon {
          margin: 0 15px;
        }
      }
    }
  }
  #bonus-items {
    gap: 30px;
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
    #btn-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }
</style>
