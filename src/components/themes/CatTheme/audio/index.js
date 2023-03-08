import defaultAudio from "../../Default/audio"

let audio = {
  src: {
    theme: "./src/components/themes/CatTheme/audio/theme.mp3",
    btn: "./src/components/themes/CatTheme/audio/btn.mp3",
    cashIn: "./src/components/themes/CatTheme/audio/cash-in.mp3",
    gameOver: "./src/components/themes/CatTheme/audio/game-over.mp3",
    invalid: "./src/components/themes/CatTheme/audio/invalid.mp3",
    noWin: "./src/components/themes/CatTheme/audio/no-win.mp3",
    purchase: "./src/components/themes/CatTheme/audio/purchase.mp3",
    reels: "./src/components/themes/CatTheme/audio/reels.mp3",
    win: "./src/components/themes/CatTheme/audio/win.mp3",
  },
  aud: {
    theme: new Audio("./src/components/themes/CatTheme/audio/theme.mp3"),
    btn: new Audio("./src/components/themes/CatTheme/audio/btn.mp3"),
    cashIn: new Audio("./src/components/themes/CatTheme/audio/cash-in.mp3"),
    gameOver: new Audio("./src/components/themes/CatTheme/audio/game-over.mp3"),
    invalid: new Audio("./src/components/themes/CatTheme/audio/invalid.mp3"),
    noWin: new Audio("./src/components/themes/CatTheme/audio/no-win.mp3"),
    purchase: new Audio("./src/components/themes/CatTheme/audio/purchase.mp3"),
    reels: new Audio("./src/components/themes/CatTheme/audio/reels.mp3"),
    win: new Audio("./src/components/themes/CatTheme/audio/win.mp3"),
  },
}

for (let a in audio.src) {
  Object.defineProperty(audio, a, {
    get() {
      let aud = new Audio(audio.src[a])
      aud.addEventListener("error", (e) => {
        audio.src[a] = audio.src[a].replace("CatTheme", "Default")
        console.log(audio.src[a])
      })
      return aud
    },
  })

  audio.aud[a].load()
  console.log(audio.aud[a].srcObject)
  if (audio.aud[a].error) {
    console.log(a, audio.aud[a].error, audio.src[a])
  }
}
window.catAudio = audio
export default audio
