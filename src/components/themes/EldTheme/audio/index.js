import defaultAudio from "../../Default/audio"

const theme = new Audio("./src/components/themes/EldTheme/audio/theme.mp3")
const btn = new Audio("./src/components/themes/EldTheme/audio/btn.mp3")
const cashIn = new Audio("./src/components/themes/EldTheme/audio/cash-in.mp3")
const gameOver = new Audio(
  "./src/components/themes/EldTheme/audio/game-over.mp3",
)
const invalid = new Audio("./src/components/themes/EldTheme/audio/invalid.mp3")
const noWin = new Audio("./src/components/themes/EldTheme/audio/no-win.mp3")
const purchase = new Audio(
  "./src/components/themes/EldTheme/audio/purchase.mp3",
)
const reels = new Audio("./src/components/themes/EldTheme/audio/reels.mp3")
const win = new Audio("./src/components/themes/EldTheme/audio/win.mp3")
const audio = {
  theme,
  btn,
  cashIn,
  gameOver,
  invalid,
  noWin,
  purchase,
  reels,
  win,
}

for (let a in audio) {
  if (isNaN(audio[a].duration)) {
    audio[a] = defaultAudio[a]
  }
}

console.log("audio", audio)
export default audio
