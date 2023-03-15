<script>
  import { useAudioStore } from "../stores/audio"
  import Btn from "./elements/buttonComponent.vue"
  export default {
    setup() {
      const audio = useAudioStore()
      return { audio }
    },
    components: {
      Btn,
    },
    data() {
      return {}
    },
    computed: {
      vol() {
        return {
          music: this.audio.volume.music,
          fx: this.audio.volume.fx,
        }
      },
    },
    emits: {
      close: null,
    },
    methods: {
      setMusicVolume(e) {
        let val = Number(e.target.value)

        this.audio.setMusicVolume(val)
      },
      setFxVolume(e) {
        let val = Number(e.target.value)

        this.audio.setFxVolume(val)
      },
      getState() {},
      close() {
        this.$emit("close")
      },
    },
  }
</script>
<template>
  <div class="sound-control">
    <Btn
      :style="{
        position: 'absolute',
        top: '-15px',
        left: 'calc(100% - 15px)',
      }"
      :color="'red'"
      :circle="true"
      :size="'small'"
      :width="'30px'"
      @click="close"
    >
      x
    </Btn>
    <label>
      <span class="sound-text">MUSIC:</span>
      <input
        class="vranger"
        style="display: inline"
        type="range"
        min="0"
        max="1"
        v-model="audio.volume.music"
        step="0.01"
        @input="setMusicVolume"
      />
    </label>
    <label>
      <span class="sound-text">Fx:</span>
      <input
        class="vranger"
        style="display: inline"
        type="range"
        min="0"
        max="1"
        v-model="audio.volume.fx"
        step="0.01"
        @input="setFxVolume"
      />
    </label>
  </div>
</template>
<style lang="scss">
  .sound-control {
    position: absolute;
    display: flex;

    /* height: 31vh; */
    top: 25px;
    left: 15%;

    z-index: 99;
    border-radius: 15px;
    border: 5px solid var(--bg-color2);
    box-shadow: 4px 4px 6px 0px var(--btn-disabled4), 1px 1px 2px black inset;
    background-image: var(--bg-image);
    flex-flow: row;
    padding: 15px;
    & label {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      width: 50px;
    }
  }
  .vranger {
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 100%;
  }
</style>
