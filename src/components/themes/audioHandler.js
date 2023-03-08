import { useThemeStore } from "../../stores/themes"

class AudioHandler {
  constructor() {}
  get theme() {
    return useThemeStore()
  }
  get currentTheme() {
    return this.theme.currentTheme
  }
  get path() {
    let x
    switch (this.currentTheme) {
      case "diamant": {
        x = "Default"
        break
      }
      case "katt": {
        x = "CatTheme"
        break
      }
      case "skog": {
        x = "ForestTheme"
        break
      }
      case "eld": {
        x = "EldTheme"
        break
      }
      case "midnatt": {
        x = "NightTheme"
        break
      }
      default: {
        x = "Default"
      }
    }
    return `./${x}/audio`
  }
  get theme
get btn
get cashIn
get gameOver
get invalid
get noWin
get purchase
get reels
get win

}
