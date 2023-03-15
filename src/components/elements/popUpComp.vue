<template>
  <btn
    aria-label="information"
    :color="'red'"
    :size="'medium'"
    :circle="true"
    :width="'10vh'"
    :styles="{ maxWidth: '50px', minWidth: '40px' }"
    @click="Popup()"
  >
    i
  </btn>
  <div v-if="popUpState" class="popup-overlay">
    <div class="popup">
      <ul class="tabs">
        <li
          :key="theTab"
          v-for="(theTab, index) in tabs"
          @click="tab(index)"
          :style="{
            backgroundColor: activeTab === index ? '#CCBEE5' : '#eee',
          }"
        >
          {{ theTab.name }}
        </li>
        <li class="close-btn">
          <button @click="close()">
            <img src="../../../assets/svg/xmark.svg" alt="" />
          </button>
        </li>
      </ul>
      <div class="content">
        <SymbolsValue v-if="activeTab === 'symbols'" />
        <gameInstructions v-if="activeTab === 'gameInstructions'" />
        <ShopPopUp v-if="activeTab === 'shopInfo'" />
        <securityInfo v-if="activeTab === 'security'" />
      </div>
    </div>
  </div>
</template>

<script>
  import SymbolsValue from "../pop-ups/symbolValuePopUp.vue"
  import gameInstructions from "../pop-ups/gameInstructions.vue"
  import ShopPopUp from "../pop-ups/shopPopUp.vue"
  import securityInfo from "../pop-ups/securityInfo.vue"
  import buttonComponent from "./buttonComponent.vue"
  export default {
    components: {
      btn: buttonComponent,
      SymbolsValue,
      gameInstructions,
      ShopPopUp,
      securityInfo,
    },
    data() {
      return {
        popUpState: false,
        activeTab: "",
        tabs: {
          symbols: {
            name: "Symboler",
          },
          gameInstructions: {
            name: "Instruktioner",
          },
          shopInfo: {
            name: "Butik",
          },
          security: {
            name: "Säkerhet",
          },
        },
      }
    },
    mounted() {
      this.activeTab = Object.keys(this.tabs)[0]

      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          const tabKeys = Object.keys(this.tabs)
          const activeTabIndex = tabKeys.indexOf(this.activeTab)
          const nextTabIndex =
            activeTabIndex - 1 >= 0 ? activeTabIndex - 1 : tabKeys.length - 1
          this.activeTab = tabKeys[nextTabIndex]
        }

        if (event.key === "ArrowRight") {
          const tabKeys = Object.keys(this.tabs)
          const activeTabIndex = tabKeys.indexOf(this.activeTab)
          const nextTabIndex =
            activeTabIndex + 1 < tabKeys.length ? activeTabIndex + 1 : 0
          this.activeTab = tabKeys[nextTabIndex]
        }
      })
    },

    methods: {
      Popup() {
        this.popUpState = true
        if (this.$route.path === "/") {
          this.tab("symbols")
        } else if (this.$route.path === "/shop") {
          this.tab("shopInfo")
        }
      },
      close() {
        this.popUpState = false
      },
      tab(tab) {
        this.activeTab = tab
      },
    },
  }
</script>

<style lang="scss">
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .popup {
    top: 0;
    position: relative;
    width: 80vw;
    margin: 0;
    padding: 0;
    .tabs {
      padding: 0;
      display: flex;
      gap: 1px;
      align-items: center;
      margin: auto;
      width: 95%;
      list-style: none;
      li,
      li .close-btn {
        padding: 5px;
        border-radius: 10px 10px 0 0;
        width: 100%;
      }
      .close-btn {
        position: relative;
        padding: 0 5px;
        padding-top: calc(34px - 29px);

        width: min-content;

        button {
          background-color: transparent;
          border: none;
          img {
            width: 20px;
            filter: invert(100%) sepia(91%) saturate(38%) hue-rotate(321deg)
              brightness(110%) contrast(110%);
          }
        }
      }
    }
  }

  .popup-container {
    overflow: hidden;
  }

  .content {
    left: 0;
    position: relative;
    background-color: #fff;
    border: solid 2px #ad98d0;
    border-radius: 10px;
    padding: 2rem 4rem;
    margin: 0;
    width: 100%;
    min-height: 80vh;
    max-height: 80vh;
    overflow-y: scroll;
    h1 {
      text-align: center;
    }
    p {
      font-size: 1.2rem;
    }
  }
</style>
