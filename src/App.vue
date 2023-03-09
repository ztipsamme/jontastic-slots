<script>
  import { useTokenStore } from "./stores/tokenStore.js"
  import { useThemeStore } from "./stores/themes"
  import { useAudioStore } from "./stores/audio"
  //import iconComponent from "./components/elements/iconComponent.vue"
  import PopUp from "./components/pop-ups/infoPopUp.vue"
  import buttonComponent from "./components/elements/buttonComponent.vue"
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
      }
    },
    watch: {
      volume(newVal) {
        this.audio.theme.volume = newVal
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
    },
    components: {
      PopUp,
      btn: buttonComponent,
    },
    computed: {},
    methods: {
      newSong() {},
      setBtnVolume(e) {
        this.audio.setBtnVolume(Number(e.target.value))
      },
      setMusicVolume(e) {
        this.audio.setMusicVolume(Number(e.target.value))
      },
      setInfoVolume(e) {
        this.audio.setInfoVolume(Number(e.target.value))
      },
      setFxVolume(e) {
        this.audio.setFxVolume(Number(e.target.value))
      },
      toggleSoundControls() {
        this.showSoundControls = !this.showSoundControls
      },
    },
  }
</script>
<template>
  <header>
    <div class="info">
      <PopUp />
    </div>
    <div class="sound-control" v-if="showSoundControls">
      <label>
        <span class="sound-text">MUSIC:</span>
        <input
          style="display: inline"
          type="range"
          min="0"
          max="1"
          :value="audio.volume.music"
          step="0.01"
          @input="setMusicVolume"
        />
      </label>

      <label>
        <span class="sound-text">Btn:</span>
        <input
          style="display: inline"
          type="range"
          min="0"
          max="1"
          :value="audio.volume.btn"
          step="0.01"
          @input="setBtnVolume"
        />
      </label>
      <label>
        <span class="sound-text">Fx:</span>
        <input
          style="display: inline"
          type="range"
          min="0"
          max="1"
          :value="audio.volume.fx"
          step="0.01"
          @input="setFxVolume"
        />
      </label>
      <label>
        <span class="sound-text">info:</span>
        <input
          style="display: inline"
          type="range"
          min="0"
          max="1"
          step="0.01"
          @input="setInfoVolume"
          :value="audio.volume.info"
        />
      </label>
    </div>
    <btn
      :color="'blue'"
      :size="'medium'"
      :circle="true"
      :width="'50px'"
      @click="toggleSoundControls"
    >
      S
    </btn>

    <nav class="nav">
      <RouterLink class="nav-link" to="/">
        <btn
          :circle="false"
          :selected="$route.path == '/'"
          :width="'10vw'"
          :height="'50px'"
          :size="'large'"
        >
          <i class="bi bi-house-fill" />
        </btn>
      </RouterLink>
      <RouterLink class="nav-link" to="/shop">
        <btn
          :color="'purple'"
          :circle="false"
          :width="'10vw'"
          :height="'50px'"
          :size="'large'"
          :selected="$route.path == '/shop'"
        >
          <i class="bi bi-cart-fill" /> </btn
      ></RouterLink>
      <RouterLink class="nav-link" to="/score">
        <btn
          :color="'green'"
          :circle="false"
          :width="'10vw'"
          :height="'50px'"
          :size="'large'"
          :selected="$route.path == '/score'"
        >
          Score
        </btn></RouterLink
      >
    </nav>
    <div class="token-display">
      <div class="token-icon">t</div>
      <div class="token-text">
        {{ tokens.tokens.sum }}
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

  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
  .sound-control {
    position: absolute;
    display: flex;

    /* height: 31vh; */
    top: 25px;
    left: 15%;
    width: 30vw;
    z-index: 99;
    border-radius: 15px;
    border: 5px solid var(--bg-color2);
    box-shadow: 4px 4px 6px 0px var(--btn-disabled4), 1px 1px 2px black inset;
    background-image: var(--bg-image);
    flex-flow: column;
    padding: 15px;
    & label {
      display: grid;
      grid-template-columns: 25% auto;
    }
  }

  #app {
    display: grid;
    grid-template-rows: 75px auto;
    height: 100vh;
    width: 90vw;
  }
  header {
    display: grid;
    grid-template-columns: 8% 22% 50% 20%;
    height: 100%;
    padding: 10px 0px;
    align-items: center;
    margin-bottom: 3vh;
    width: 100%;
    .info {
      justify-self: end;
      width: 100%;
    }
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
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
  .token-display {
    border: 3px solid hsla(50deg, 100%, 50%);
    border-radius: 1000px;
    width: 100%;
    padding: 15px 0px;
    padding-right: 30px;
    display: flex;
    height: 50px;
    align-items: center;
    justify-self: end;
    background-image: linear-gradient(
      45deg,
      hsla(50deg, 0%, 90%) -20%,
      hsla(55deg, 0%, 95%) 80%
    );
    box-shadow: inset -2px 2px 5px 0px hsla(50deg, 0%, 0%, 0.5);
  }
  .token-icon {
    flex-shrink: 0;
    justify-self: start;
    display: flex;
    width: 44px;
    height: 44px;
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
