const audio = {
  src: {
    theme: "./src/components/themes/Default/audio/theme.mp3",
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
  aud: {
    theme: new Audio("./src/components/themes/Default/audio/theme.mp3"),
    btn: new Audio("./src/components/themes/Default/audio/btn.mp3"),
    cashIn: new Audio("./src/components/themes/Default/audio/cash-in.mp3"),
    gameOver: new Audio("./src/components/themes/Default/audio/game-over.mp3"),
    invalid: new Audio("./src/components/themes/Default/audio/invalid.mp3"),
    noWin: new Audio("./src/components/themes/Default/audio/no-win.mp3"),
    purchase: new Audio("./src/components/themes/Default/audio/purchase.mp3"),
    reels: new Audio("./src/components/themes/Default/audio/reels.mp3"),
    win: new Audio("./src/components/themes/Default/audio/win.mp3"),
    bonus: "./src/components/themes/Default/audio/bonus.mp3",
  },
}

for (let a in audio.src) {
  Object.defineProperty(audio, a, {
    get() {
      return new Audio(audio.src[a])
    },
  })
}
window.defaultAudio = audio
export default audio
