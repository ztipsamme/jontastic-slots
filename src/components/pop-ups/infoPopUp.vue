<template>
  <i class="info-icon" @click="Popup()" />
  <div v-if="popUpState" class="popup-overlay">
    <div class="popup">
      <ul class="tabs">
        <li
          @click="symbols"
          :style="{
            backgroundColor: activeTab === 'symbols' ? '#fff' : '#eee',
          }"
        >
          Symbols
        </li>
        <li
          @click="gameInstructions"
          :style="{
            backgroundColor: activeTab === 'gameInstructions' ? '#fff' : '#eee',
          }"
        >
          Hjälp
        </li>
        <li
          @click="shopInfo"
          :style="{
            backgroundColor: activeTab === 'shopInfo' ? '#fff' : '#eee',
          }"
        >
          Shop"
        </li>
        <li
          @click="security"
          :style="{
            backgroundColor: activeTab === 'security' ? '#fff' : '#eee',
          }"
        >
          Säkerhet"
        </li>
        <li class="close-btn">
          <button @click="close()">
            <img src="../../../assets/svg/xmark.svg" alt="" />
          </button>
        </li>
      </ul>
      <div class="content">
        <SymbolsValue v-if="startView" />
        <ShopPopUp v-if="shopView" />
      </div>
    </div>
  </div>
</template>

<script>
  import SymbolsValue from "./symbolValuePopUp.vue"
  import ShopPopUp from "./shopPopUp.vue"
  export default {
    components: {
      SymbolsValue,
      ShopPopUp,
    },
    data() {
      return {
        popUpState: false,
        startView: false,
        shopView: false,
        activeTab: "",
      }
    },
    methods: {
      Popup() {
        this.popUpState = true
        if (this.$route.path === "/") {
          this.symbols()
        } else if (this.$route.path === "/shop") {
          this.shopInfo()
        }
      },
      close() {
        this.popUpState = false
        this.startView = false
        this.shopView = false
      },
      symbols() {
        console.log("symbols", "symbols")
        this.startView = true
        this.tab("symbols")
      },
      gameInstructions() {
        console.log("gameInstructions", "gameInstructions")
        this.tab("gameInstructions")
      },
      shopInfo() {
        console.log("shopInfo", "shopInfo")
        this.shopView = true
        this.tab("shopInfo")
      },
      security() {
        console.log("security", "security")
        this.tab("security")
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
    padding: 0;
    margin: 0;
    width: 600px;
    .tabs {
      padding: 0;
      padding-top: calc(48px - 26.59px);
      margin: 0;
      display: flex;
      gap: 1px;
      list-style: none;
      width: 95%;
      margin: auto;
      li,
      .close-btn {
        border: 1px 1px solid green;
        border-radius: 10px 10px 0px 0px;
        background-color: #fff;
        width: 100%;
        text-align: center;
      }
      .close-btn {
        background-color: transparent;
        width: min-content;
        padding: 0 5px;
        button {
          background-color: transparent;
          border: none;
          img {
            width: 16px;
          }
        }
      }
    }
    .content {
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      width: 100%;
      min-height: 100px;
      max-height: 300px;
      position: relative;
      overflow-y: scroll;
    }
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
