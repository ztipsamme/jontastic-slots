<script>
  import { useTokenStore } from "./stores/tokenStore.js"
  import { useThemeStore } from "./stores/themes"
  import { useAudioStore } from "./stores/audio"
  import { gsap } from "gsap"
  //import iconComponent from "./components/elements/iconComponent.vue"
  import PopUp from "./components/elements/popUpComp.vue"
  import buttonComponent from "./components/elements/buttonComponent.vue"
  import soundControl from "./components/soundComp.vue"
  export default {
    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      const audio = useAudioStore()
      theme.setTheme(theme.currentTheme)
      return { tokens, theme, audio }
    },
    data() {
      return {
        tokTween: this.tokens.tokens.sum,
        themeSong: null,
        showSoundControls: false,
        fullLogo: false,
      }
    },
    watch: {
      volume(newVal) {
        this.audio.theme.volume = newVal
      },
      "tokens.tokens.sum"(n) {
        gsap.to(this, { duration: 1.5, tokTween: Number(n) || 0 })
      },

      "theme.currentTheme": function () {
        //this.theme.audio.noWin.load()
        this.audio.theme.load()
        this.audio.theme.volume = this.audio.volume.music
        this.audio.theme.load()
        this.audio.theme.addEventListener(
          "canplay",
          () => {
            document.addEventListener(
              "mousemove",
              () => {
                this.audio.theme.load()
                this.audio.theme.loop = true
                this.audio.theme.play()
              },
              { once: true },
            )
          },
          { once: true },
        )

        //this.theme.audio.noWin.addEventListener("canplay", () => {})
      },
    },
    created() {
      /*this.audio = new Audio("../../assets/audio/diamant.mp3")
      this.audio.loop = true
      this.audio.volume = this.volume*/

      this.audio.theme.volume = this.audio.volume.music
      this.audio.theme.load()
      this.audio.theme.addEventListener(
        "canplay",
        () => {
          document.addEventListener(
            "click",
            () => {
              this.audio.theme.load()
              this.audio.theme.loop = true
              this.audio.theme.play()
            },
            { once: true },
          )
        },
        { once: true },
      )
    },
    components: {
      PopUp,
      btn: buttonComponent,
      soundControl,
    },
    computed: {
      logoSize() {
        return this.fullLogo ? "75vw" : "100px"
      },
    },
    methods: {
      newSong() {},

      toggleSoundControls(close = false) {
        if (close) {
          this.showSoundControls = false
          return
        }

        this.showSoundControls = !this.showSoundControls
      },
    },
  }
</script>
<template>
  <div
    v-if="fullLogo"
    :style="{
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      backgroundColor: 'hsla(0deg,0%,100%,0.5)',
      zIndex: '9998',
    }"
  />
  <img
    src="../assets/svg/logov1.svg"
    alt=""
    :style="{
      width: logoSize,
      position: 'absolute',
      zIndex: '9999',
      bottom: fullLogo ? '' : '10px',
      left: '5px',
      top: fullLogo ? '0' : '',
      transition: '0.5s',
    }"
    @click="(e) => (fullLogo = !fullLogo)"
  />
  <header>
    <div class="info">
      <PopUp />
    </div>
    <soundControl
      v-if="showSoundControls"
      @close="toggleSoundControls(false)"
    />
    <btn
      :color="'blue'"
      :size="'large'"
      :circle="true"
      :width="'10vh'"
      :styles="{ maxWidth: '50px', minWidth: '40px' }"
      @click="toggleSoundControls(false)"
    >
      <i class="bi bi-volume-up-fill" />
    </btn>

    <nav class="nav">
      <RouterLink class="nav-link" to="/">
        <btn
          :circle="false"
          :selected="$route.path == '/'"
          :width="'10vh'"
          :height="'8vh'"
          :styles="{
            maxWidth: '66px',
            minWidth: '53px',
            maxHeight: '50px',
            minHeight: '40px',
          }"
          :size="'large'"
        >
          <i class="bi bi-house-fill" />
        </btn>
      </RouterLink>
      <RouterLink class="nav-link" to="/shop">
        <btn
          :color="'purple'"
          :circle="false"
          :width="'10vh'"
          :height="'8vh'"
          :styles="{
            maxWidth: '66px',
            minWidth: '53px',
            maxHeight: '50px',
            minHeight: '40px',
          }"
          :size="'large'"
          :selected="$route.path == '/shop'"
        >
          <i class="bi bi-cart-fill" /> </btn
      ></RouterLink>
      <RouterLink class="nav-link" to="/score">
        <btn
          :color="'green'"
          :circle="false"
          :width="'10vh'"
          :height="'8vh'"
          :styles="{
            maxWidth: '66px',
            minWidth: '53px',
            maxHeight: '50px',
            minHeight: '40px',
          }"
          :size="'large'"
          :selected="$route.path == '/score'"
        >
          <i class="bi bi-trophy-fill" /> </btn
      ></RouterLink>
    </nav>
    <div class="token-display">
      <div class="token-icon">t</div>
      <div class="token-text">
        {{ tokTween.toFixed(0) }}
      </div>
      <!-- <div class="d-inline-flex">
        <div
          v-if="this.$route.path === '/'"
          class="token-display"
          :key="bonus"
          v-for="bonus in tokens.bonusTypes"
        >
          <icon
            class="token-icon"
            :name="bonus.name"
            :aria-label="bonus.name"
            :size="'38px'"
            :src="bonus.src"
          />
          <div>
            {{ bonus.amount }}
          </div>
        </div>
      </div> -->
    </div>
  </header>

  <main @click="toggleSoundControls(true)">
    <RouterView />
  </main>
</template>

<style lang="scss">
  #app {
    padding: 0;
    margin: 0;
    display: grid;
    gap: 2vh;
    grid-template-rows: max-content auto;
    height: 100vh;
    width: 90%;
    padding: 1vw;
  }
  header {
    width: 100%;
    z-index: 1000;
    display: grid;
    grid-template-columns: 8% 12% 56% 24%;
    height: min-content;
    align-items: start;
    // margin-bottom: 2vh;
    margin: 0;
    .info {
      justify-self: end;
      width: 100%;
    }
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    > * {
      text-align: center;
      color: #000;
      margin: 0px 15px;
    }
    .nav-link {
      width: max-content;
      padding: 0;
      > li > * {
        color: inherit;
      }
    }
  }

  main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .token-display {
    border: 3px solid hsla(50deg, 100%, 50%);
    border-radius: 1000px;
    width: 100%;
    padding: 15px 0px;
    padding-right: 30px;
    display: flex;
    height: 10vh;
    max-height: 50px;
    min-height: 35px;

    align-items: center;
    justify-self: end;
    background-image: linear-gradient(
      45deg,
      hsla(50deg, 0%, 90%) -20%,
      hsla(55deg, 0%, 95%) 80%
    );
    box-shadow: inset -2px 2px 5px 0px hsla(50deg, 0%, 0%, 0.5);
    overflow: hidden;
  }
  .token-icon {
    flex-shrink: 0;
    justify-self: start;
    display: flex;
    width: 9vh;
    height: 9vh;
    max-width: 44px;
    min-width: 31px;
    max-height: 44px;
    min-height: 31px;
    background-image: linear-gradient(
      45deg,
      hsla(50deg, 100%, 50%),
      hsla(55deg, 100%, 75%)
    );
    border-radius: 100%;
    border: 3px solid hsla(50deg, 100%, 50%);
    justify-content: center;
    font-size: 25px;
    align-items: center;
    font-weight: normal;
    padding-bottom: 5px;
    color: hsla(50deg, 100%, 8%, 0.7);
  }

  .token-text {
    text-align: center;
    font-weight: normal;
    font-size: 24px;
    line-height: 24px;
    height: 24px;
    margin-left: 15px;
    width: 100%;
  }
</style>
