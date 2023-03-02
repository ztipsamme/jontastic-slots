<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import iconComponent from "../components/elements/iconComponent.vue"
  import buttonComponent from "../components/elements/buttonComponent.vue"
  import {
    ShoppingCartOutlined,
    CheckCircleTwoTone,
  } from "@ant-design/icons-vue"

  export default {
    components: {
      ShoppingCartOutlined,
      CheckCircleTwoTone,
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
        this.theme1Bought = false
        console.log("hej " + this.theme1Bought)

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
        <p class="desc">Levla upp spänningen med någonting extra.</p>
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
        <p class="desc">Anpassa ditt spel med ett tema.</p>
        <div class="d-inline-flex flex-wrap gap-2">
          <div class="item" v-for="item in themeTypes" :key="item.name">
            <template v-if="'theme' + item + 'Bought'">
              <template v-if="theme3Bought">
                <span> {{ item.name }} </span>

                <icon
                  :name="item.name"
                  :aria-label="item.name"
                  @click="onClick(item)"
                  :size="'68px'"
                  :src="item.src"
                  :style="{
                    border: item.active ? 'solid 5px #ffde68' : '',
                  }"
                />

                <span v-if="!item.owned">
                  {{ ShoppingCartOutlined }}
                  <ShoppingCartOutlined
                    :style="{ fontSize: '23px', color: '#08c' }"
                    @click="onClick(item)"
                  />
                </span>
                <span v-else>
                  <CheckCircleTwoTone
                    :style="{ fontSize: '26px', color: '#08c' }"
                /></span>
                <template v-if="!item.owned"> {{ item.cost }}t</template>
              </template></template
            >
          </div>
        </div>
      </div>
    </section>
  </main>
  <div v-if="popUp" @close="popUp = false" class="popup-overlay">
    <div class="popup-container">
      <p class="buy">Vill du köpa temat {{ selectedItem }}?</p>
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
          class="buy-btn"
          >Köp</btn
        >
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

  .category {
    .item {
      display: flex;
      flex-direction: column;
      width: min-content;
      font-weight: normal;
      text-align: center;
    }
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

  .container {
    margin-top: 20px;
  }
  .popup-container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    display: flex;
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
</style>
