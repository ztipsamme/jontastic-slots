<template>
  <i class="info-icon" @click="Popup()" />
  <div v-if="popUpState" class="popup-overlay">
    <div class="popup">
      <ul class="tabs">
        <li
          :key="theTab"
          v-for="(theTab, index) in tabs"
          @click="tab(index)"
          :style="{
            backgroundColor: activeTab === index ? '#fff' : '#eee',
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
  import SymbolsValue from "./symbolValuePopUp.vue"
  import gameInstructions from "./gameInstructions.vue"
  import ShopPopUp from "./shopPopUp.vue"
  import securityInfo from "./securityInfo.vue"
  export default {
    components: {
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
            name: "Hjälp",
          },
          shopInfo: {
            name: "Shop",
          },
          security: {
            name: "Säkerhet",
          },
        },
      }
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
  .info-icon {
    display: inline-block;
    position: relative;
    width: 32px;
    height: 32px;
    border: 1px solid #f00;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
  }
  .info-icon::before {
    content: "i";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-style: normal;
    font-size: 30px;
    font-weight: bold;
  }

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
    z-index: 1;
  }

  .popup {
    top: 0;
    position: absolute;
    width: 600px;
    margin: 0;
    padding: 0;
    .tabs {
      padding: 0;
      padding-top: calc(48px - 34px);
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
        background-color: transparent;
        padding: 0 5px;
        width: min-content;
        button {
          background-color: transparent;
          border: none;
          img {
            width: 16px;
          }
        }
      }
    }
  }

  .content {
    left: 0;
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin: 0;
    width: 100%;
    min-height: 100px;
    max-height: 300px;
    overflow-y: scroll;
  }

  // .popup-title {
  //   margin-top: 0;
  // }

  // .symbol-values {
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: space-around;
  // }

  // .symbol-value {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   margin-bottom: 10px;
  // }

  // .symbol-image {
  //   height: 50px;
  //   width: 50px;
  //   margin-top: 10px;
  // }

  // .symbol-name {
  //   margin-top: 10px;
  //   font-weight: bold;
  // }

  // .symbol-points {
  //   margin-top: 5px;
  // }
</style>
