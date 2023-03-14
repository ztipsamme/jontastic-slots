let audio = {
  src: {
    theme: "./src/components/themes/NightTheme/audio/theme.mp3",
    btn: "./src/components/themes/Default/audio/btn.mp3",
    cashIn: "./src/components/themes/Default/audio/cash-in.mp3",
    gameOver: "./src/components/themes/Default/audio/game-over.mp3",
    invalid: "./src/components/themes/Default/audio/invalid.mp3",
    noWin: "./src/components/themes/Default/audio/no-win.mp3",
    purchase: "./src/components/themes/Default/audio/purchase.mp3",
    reels: "./src/components/themes/Default/audio/reels.mp3",
    win: "./src/components/themes/Default/audio/win.mp3",
    bonus: "./src/components/themes/Default/audio/bonus.mp3",
  },
  aud: {},
}

for (let a in audio.src) {
  audio.aud[a] = new Audio(audio.src[a])
  audio.aud[a].volume = 0.5
  Object.defineProperty(audio, a, {
    get() {
      let aud = new Audio(audio.src[a])
      if (a == "btn") {
        aud.volume = 0.5
      }
      return aud
    },
  })
}
export default audio
