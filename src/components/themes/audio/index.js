/* eslint-disable no-prototype-builtins */
import BrilliantTheme_theme from "./BrilliantTheme_theme.mp3"
import CatTheme_theme from "./CatTheme_theme.mp3"
import DefaultTheme_bonus from "./DefaultTheme_bonus.mp3"
import DefaultTheme_btn from "./DefaultTheme_btn.mp3"
import DefaultTheme_cashIn from "./DefaultTheme_cash-in.mp3"
import DefaultTheme_gameOver from "./DefaultTheme_game-over.mp3"
import DefaultTheme_invalid from "./DefaultTheme_invalid.mp3"
import DefaultTheme_noWin from "./DefaultTheme_no-win.mp3"
import DefaultTheme_purchase from "./DefaultTheme_purchase.mp3"
import DefaultTheme_reels from "./DefaultTheme_reels.mp3"
import DefaultTheme_theme from "./DefaultTheme_theme.mp3"
import DefaultTheme_win from "./DefaultTheme_win.mp3"
import EldTheme_theme from "./EldTheme_theme.mp3"
import ForestTheme_theme from "./ForestTheme_theme.mp3"
import HavTheme_theme from "./HavTheme_theme.mp3"
import InfernoTheme_theme from "./InfernoTheme_theme.mp3"
import NightTheme_theme from "./NightTheme_theme.mp3"
import RawrTheme_btn from "./RawrTheme_btn.mp3"
import RawrTheme_gameOver from "./RawrTheme_game-over.mp3"
import RawrTheme_noWin from "./RawrTheme_no-win.mp3"
import RawrTheme_theme from "./RawrTheme_theme.mp3"
import RawrTheme_win from "./RawrTheme_win.mp3"
import SjuhavenTheme_theme from "./SjuhavenTheme_theme.mp3"
import StadsljusTheme_theme from "./StadsljusTheme_theme.mp3"
import VildmarkTheme_theme from "./VildmarkTheme_theme.mp3"

/*
let audioImports = {
  BrilliantTheme: {
    theme: new Audio(BrilliantTheme_theme),
  },
  CatTheme: {
    theme: new Audio(CatTheme_theme),
  },
  DefaultTheme: {
    theme: new Audio(DefaultTheme_theme),
    btn: new Audio(DefaultTheme_btn),
    cashIn: new Audio(DefaultTheme_cashIn),
    gameOver: new Audio(DefaultTheme_gameOver),
    invalid: new Audio(DefaultTheme_invalid),
    noWin: new Audio(DefaultTheme_noWin),
    purchase: new Audio(DefaultTheme_purchase),
    reels: new Audio(DefaultTheme_reels),
    win: new Audio(DefaultTheme_win),
    bonus: new Audio(DefaultTheme_bonus),
  },
  EldTheme: {
    theme: new Audio(EldTheme_theme),
  },
  ForestTheme: {
    theme: new Audio(ForestTheme_theme),
  },
  HavTheme: {
    theme: new Audio(HavTheme_theme),
  },
  InfernoTheme: {
    theme: new Audio(InfernoTheme_theme),
  },
  NightTheme: {
    theme: new Audio(NightTheme_theme),
  },
  RawrTheme: {
    theme: new Audio(RawrTheme_theme),
    btn: new Audio(RawrTheme_btn),
    gameOver: new Audio(RawrTheme_gameOver),
    noWin: new Audio(RawrTheme_noWin),
    win: new Audio(RawrTheme_win),
  },
  SjuhavenTheme: {
    theme: new Audio(SjuhavenTheme_theme),
  },
  StadsljusTheme: {
    theme: new Audio(StadsljusTheme_theme),
  },
  VildmarkTheme: {
    theme: new Audio(VildmarkTheme_theme),
  },
}
let audioNames = Object.keys(audioImports.DefaultTheme)

let audioExports = {}
for (let themeName in audioImports) {
  if (!audioExports.hasOwnProperty(themeName)) {
    audioExports[themeName] = { aud: {}, src: {} }
  }
  for (let audioName of audioNames) {
    let audioObject
    if (audioImports[themeName].hasOwnProperty(audioName)) {
      audioObject = audioImports[themeName][audioName]
    } else {
      audioObject = audioImports.DefaultTheme[audioName]
    }
    audioExports[themeName].aud[audioName] = audioObject
    audioExports[themeName].src[audioName] = audioObject.src

    Object.defineProperty(audioExports[themeName], audioName, {
      get() {
        return audioObject
      },
    })
  }
}
const {
  BrilliantTheme,
  CatTheme,
  DefaultTheme,
  EldTheme,
  ForestTheme,
  HavTheme,
  InfernoTheme,
  NightTheme,
  RawrTheme,
  SjuhavenTheme,
  StadsljusTheme,
  VildmarkTheme,
} = audioExports*/

let audioImports2 = {
  BrilliantTheme: {
    theme: BrilliantTheme_theme,
  },
  CatTheme: {
    theme: CatTheme_theme,
  },
  DefaultTheme: {
    theme: DefaultTheme_theme,
    btn: DefaultTheme_btn,
    cashIn: DefaultTheme_cashIn,
    gameOver: DefaultTheme_gameOver,
    invalid: DefaultTheme_invalid,
    noWin: DefaultTheme_noWin,
    purchase: DefaultTheme_purchase,
    reels: DefaultTheme_reels,
    win: DefaultTheme_win,
    bonus: DefaultTheme_bonus,
  },
  EldTheme: {
    theme: EldTheme_theme,
  },
  ForestTheme: {
    theme: ForestTheme_theme,
  },
  HavTheme: {
    theme: HavTheme_theme,
  },
  InfernoTheme: {
    theme: InfernoTheme_theme,
  },
  NightTheme: {
    theme: NightTheme_theme,
  },
  RawrTheme: {
    theme: RawrTheme_theme,
    btn: RawrTheme_btn,
    gameOver: RawrTheme_gameOver,
    noWin: RawrTheme_noWin,
    win: RawrTheme_win,
  },
  SjuhavenTheme: {
    theme: SjuhavenTheme_theme,
  },
  StadsljusTheme: {
    theme: StadsljusTheme_theme,
  },
  VildmarkTheme: {
    theme: VildmarkTheme_theme,
  },
}
let audioNames2 = Object.keys(audioImports2.DefaultTheme)
let audioExports2 = {}
for (let themeName in audioImports2) {
  if (!audioExports2.hasOwnProperty(themeName)) {
    audioExports2[themeName] = { aud: {}, src: {} }
  }
  for (let audioName of audioNames2) {
    let audioObject
    if (audioImports2[themeName].hasOwnProperty(audioName)) {
      audioObject = audioImports2[themeName][audioName]
    } else {
      audioObject = audioImports2.DefaultTheme[audioName]
    }
    audioExports2[themeName].aud[audioName] = {}
    audioExports2[themeName].src[audioName] = audioObject

    Object.defineProperty(audioExports2[themeName], audioName, {
      get() {
        return audioExports2[themeName].aud[audioName]
      },
    })
  }
}

const {
  BrilliantTheme,
  CatTheme,
  DefaultTheme,
  EldTheme,
  ForestTheme,
  HavTheme,
  InfernoTheme,
  NightTheme,
  RawrTheme,
  SjuhavenTheme,
  StadsljusTheme,
  VildmarkTheme,
} = audioExports2

export {
  BrilliantTheme,
  CatTheme,
  DefaultTheme,
  EldTheme,
  ForestTheme,
  HavTheme,
  InfernoTheme,
  NightTheme,
  RawrTheme,
  SjuhavenTheme,
  StadsljusTheme,
  VildmarkTheme,
}
