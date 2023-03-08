import defaultAudio from "../../Default/audio"

const theme = new Audio("./src/components/themes/ForestTheme/audio/theme.mp3")
const btn = new Audio("./src/components/themes/ForestTheme/audio/btn.mp3")
const cashIn = new Audio(
  "./src/components/themes/ForestTheme/audio/cash-in.mp3",
)
const gameOver = new Audio(
  "./src/components/themes/ForestTheme/audio/game-over.mp3",
)
const invalid = new Audio(
  "./src/components/themes/ForestTheme/audio/invalid.mp3",
)
const noWin = new Audio("./src/components/themes/ForestTheme/audio/no-win.mp3")
const purchase = new Audio(
  "./src/components/themes/ForestTheme/audio/purchase.mp3",
)
const reels = new Audio("./src/components/themes/ForestTheme/audio/reels.mp3")
const win = new Audio("./src/components/themes/ForestTheme/audio/win.mp3")
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
