<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import { useScoreStore } from "../stores/scoreStore.js"
  import { useAudioStore } from "../stores/audio"
  import iconComponent from "../components/elements/iconComponent.vue"
  import spinnerComp from "./ReelsComp.vue"
  import TotalBet from "./TotalBet.vue"
  import FlashText from "./animations/FlashingText.vue"
  import Btn from "./elements/buttonComponent.vue"
  /*  import iconComponent from "./elements/iconComponent.vue" */

  export default {
    components: {
      TotalBet,
      spinner: spinnerComp,
      "flash-text": FlashText,
      btn: Btn,
      icon: iconComponent,
    },

    emits: { stop: null },

    created() {
      // console.log("FUNKA DÅ SKIT!")
      if (this.tokens.bonusTypes.find((i) => i.name === "Extra Row").active) {
        this.reels = 4
        this.extraRowCount = this.tokens.bonusTypes.find(
          (i) => i.name === "Extra Row",
        ).count
      }
      this.spinnerArr = new Array(this.reels)
        .fill(null)
        .map(() => this.generateSpinner())
    },
    mounted() {
      document.removeEventListener("keydown", this.handleKeyPress)
      document.addEventListener("keydown", this.handleKeyPress)
    },

    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      const score = useScoreStore()
      const audio = useAudioStore()
      window.content = score

      return { tokens, theme, score, audio }
    },

    data() {
      return {
        count: 21,
        num: [],
        numIndex: [],
        winner: false,
        topScore: false,
        isSpinning: false,
        spinnerArr: [],
        reels: 3,
        gameOver: false,
        winSum: 0,
      }
    },

    watch: {
      reels() {
        this.spinnerArr = new Array(this.reels)
          .fill(null)
          .map(() => this.generateSpinner())
      },
    },

    computed: {
      mytokens() {
        return this.tokens.tokens.sum
      },

      hasExtraRow() {
        return this.tokens.bonusTypes.some(
          (i) => i.name === "Extra Row" && i.amount > 0,
        )
      },
    },

    methods: {
      handleKeyPress(event) {
        // console.log("press")
        if (event.keyCode === 32) {
          this.gameStart()
        }
      },
      generateSpinner() {
        let array = []
        for (var i = 1; i <= 6; i++) {
          array = new Array(i).fill(i).concat(array)
        }

        function shuffleArray(arr) {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
          }
          return array
        }
        array = shuffleArray(array)
        return array
      },

      activateBonus(name) {
        //let audio = new Audio("../../assets/audio/bonus.mp3")
        //audio.play()
        this.audio.bonus.load()
        this.audio.bonus.play()

        switch (name) {
          case "extrarow": {
            if (this.extraRowCount) {
              return
            }

            let extraRow = this.tokens.bonusTypes.find(
              (i) => i.name === "Extra Row",
            )
            extraRow.amount--
            extraRow.active = true
            this.extraRowCount = extraRow.count
            this.reels = 4
            this.spinnerArr = new Array(this.reels)
              .fill(null)
              .map(() => this.generateSpinner())
            break
          }
          case "extraspin": {
            if (this.isSpinning) {
              return
            }
            let extraSpin = this.tokens.bonusTypes.find(
              (i) => i.name === "Extra Spin",
            )
            extraSpin.amount--
            extraSpin.active = true
            this.audio.bonus.addEventListener("ended", () => {
              this.gameStart(true)
            })
            break
          }
          case "extradubbel": {
            let dubbel = this.tokens.bonusTypes.find(
              (i) => i.name === "Extra Dubbel",
            )
            dubbel.amount--
            dubbel.active = true
            break
          }
        }
      },

      altGetNumbers() {
        this.numIndex = []
        this.num = []
        let isWinner = Math.floor(Math.random() * 3) == 2

        if (isWinner) {
          let winVal = 6
          let isHigher

          for (let i = 6; i > 0; i--) {
            winVal = i
            isHigher = Math.floor(Math.random() * 2)
            // console.log("isHigher", isHigher, winVal)
            if (isHigher) {
              break
            }
          }

          //Här är winVal vinst siffran
          /*
            6: 1/3 * 1/2 = 1/6
            5: 1/3 * 1/2 = 1/6
            4: 1/3 * 1/2 * 1/2 = 1/12
            3: 1/24
            2: 1/48
            1: 1/96


           1 5 3 5 5 8 6 4 8 9 3
           1 4 4 4 8 9 3
           1 6 7 3 1 8 2 5 5 8 6 4 8 9 3


            */

          this.spinnerArr.forEach((reel, index) => {
            let arr = []
            reel.forEach((e, i) => {
              if (e == winVal) {
                arr.push(i)
              }
            })
            let nIndex = arr[Math.floor(Math.random() * arr.length)]

            this.numIndex[index] = nIndex
            this.num[index] = reel[this.numIndex[index]]
          })
        } else {
          /** TODO */
          /** Gör egentligen samma sak som för att hitta vinst nummer, men snurra till index+1 mot siffran som det ska vara */

          this.spinnerArr.forEach((e, i) => {
            this.numIndex[i] = Math.floor(Math.random() * e.length)
            this.num[i] = e[this.numIndex[i]]
          })

          if (this.num.every((e) => e == this.num[0])) {
            let same = this.num[0]
            let reel = Math.floor(Math.random() * this.num.length)
            while (this.num[reel] == same) {
              this.numIndex[reel] = Math.floor(
                Math.random() * this.spinnerArr[reel].length,
              )
              this.num[reel] = this.spinnerArr[reel][this.numIndex[reel]]
            }
          }
        }

        return { num: this.num, numIndex: this.numIndex }
      },

      checkNumbers() {
        let val = this.altGetNumbers()
        this.num = val.num
        this.numIndex = val.numIndex

        return this.numIndex
      },
      done() {
        let bonus = this.tokens.bonusTypes
        let theme = this.tokens.themeTypes
        let currentTheme =
          this.theme.currentTheme.charAt(0).toUpperCase() +
          this.theme.currentTheme.slice(1)
        let deluxeTheme = theme.find((i) => i.basic === currentTheme)

        this.isSpinning = false
        if (!this.extraRowCount && this.reels == 4) {
          let extraRow = bonus.find((i) => i.name === "Extra Row")
          extraRow.active = false
          this.reels = 3
          this.spinnerArr = new Array(this.reels)
            .fill(null)
            .map(() => this.generateSpinner())

          // console.log(this.spinnerArr)
        }
        bonus.find((i) => i.name === "Extra Spin").active = false

        if (this.num.every((e) => e == this.num[0])) {
          this.winner = true
          /*  let audioWin = new Audio("../../assets/audio/win.mp3")
          audioWin.play() */

          this.audio.win.play()

          let winSum = 0

          if (bonus.find((i) => i.name === "Extra Dubbel").active) {
            winSum =
              (this.tokens.tokens.bet +
                this.tokens.tokens.bet * (7 - this.num[0])) *
              2
          } else {
            winSum =
              this.tokens.tokens.bet +
              this.tokens.tokens.bet * (7 - this.num[0])
          }

          //Types of win
          switch (this.num[0]) {
            case 2:
              if (currentTheme === deluxeTheme.basic && !deluxeTheme.owned) {
                deluxeTheme.owned = true
                this.winSum = deluxeTheme.name
              } else {
                this.winSum = winSum + "t"
                this.tokens.winning(winSum)
              }
              break
            case 3:
              if (winSum < bonus.find((i) => i.name === "Extra Spin").cost) {
                bonus.find((i) => i.name === "Extra Spin").amount++
                this.winSum =
                  "1 " + bonus.find((i) => i.name === "Extra Spin").name
              } else {
                let x = winSum / bonus.find((i) => i.name === "Extra Spin").cost

                for (let i = 0; i < x; i++) {
                  bonus.find((i) => i.name === "Extra Spin").amount++
                }
                this.winSum =
                  x + "st " + bonus.find((i) => i.name === "Extra Spin").name
              }
              break
            default:
              this.winSum = winSum + "t"
              this.tokens.winning(winSum)
              break
          } //console.log("Yay, you won " + winSum + " toekns! =D")
        } else if (this.tokens.tokens.sum < 5) {
          this.winner = false
          this.gameOver = true
          new Audio("../assets/audio/game-over.mp3").play()
          this.audio.gameOver.play()
        } else {
          this.winner = false
          this.audio.noWin.play()
        }
        if (
          this.tokens.tokens.bet > this.tokens.tokens.sum &&
          this.tokens.tokens.bet < this.winSum
        ) {
          // console.log("setBet")
          this.$refs.betComp.setBet(this.tokens.tokens.sum)
        }

        bonus.find((i) => i.name === "Extra Dubbel").active = false

        // Spara och hantera top scores
        const scoreList = this.score.scores.highScore
        // console.log("Före: " + scoreList)
        // console.log(Array.isArray(this.score.scores.highScore))

        if (!scoreList.includes(this.winSum)) {
          scoreList.push(this.winSum)
        }

        scoreList.sort((a, b) => b - a)
        this.score.scores.highScore = scoreList.slice(0, 6)
        // console.log(
        //   "Uppdaterat: " + JSON.stringify(this.score.scores.highScore),
        // )
      },

      gameStart(freeSpin = false) {
        if (this.isSpinning) {
          return
        }
        this.isSpinning = true
        this.winSum = null
        if (this.tokens.tokens.sum - this.tokens.tokens.bet < 0) {
          return
        }
        // console.log("startgame", this.isSpinning)

        if (this.extraRowCount) {
          this.extraRowCount--
        }

        this.winner = false
        // console.log(freeSpin)
        if (!freeSpin) {
          // console.log("WFT")
          this.tokens.takeoutBet(this.tokens.tokens.bet)
        }

        this.checkNumbers()

        this.$refs.child.start(this.numIndex)
      },

      newGame() {
        this.gameOver = false
        this.tokens.tokens.sum = this.tokens.tokens.startValue
        let startbet = this.tokens.tokens.startBet
          ? this.tokens.tokens.startBet
          : 100
        this.tokens.tokens.bet = startbet
      },
    },
  }
</script>

<template>
  <flash-text
    :h="50"
    v-if="topScore"
    :style="{
      position: 'absolute',
      margin: '0',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '99',
    }"
    :text="'Rekord! ' + winSum + 't'"
    @click="topScore = !topScore"
  />

  <flash-text
    :h="50"
    v-else-if="winner"
    :style="{
      position: 'absolute',
      margin: '0',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '99',
    }"
    :text="'Vinst: ' + winSum"
    @click="winner = !winner"
  />

  <flash-text
    :h="0"
    :text="'Game Over'"
    v-if="gameOver"
    :style="{
      position: 'absolute',
      margin: '0',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '99',
    }"
    @click="newGame()"
  />
  <div class="main-machine cont">
    <div class="bonus-container">
      <div
        class="bonus-wrapper"
        v-for="b in tokens.bonusTypes.filter((e) => e.amount > 0)"
        :key="b.name"
      >
        <div
          class="item"
          @click="activateBonus(b.name.replace(/[^A-z]/g, '').toLowerCase())"
        >
          <icon
            :name="b.name"
            :aria-label="b.name"
            :size="'68px'"
            :src="b.src"
          />
          <div>
            {{ b.name.substring(b.name.indexOf("Extra") + "extra".length) }}
          </div>
          <div class="mini-icon" v-if="b.amount > 0">
            {{ b.amount }}
          </div>
        </div>
      </div>
    </div>

    <div class="reels-col col">
      <div class="col-1" />
      <div class="reel-cont">
        <spinner
          :ref="'child'"
          :spinners="spinnerArr"
          :numbers="numIndex"
          :count="count"
          @done="done"
        />
      </div>
    </div>
    <div class="row-2">
      <TotalBet :ref="'betComp'" />
      <btn
        :color="'green'"
        :height="'13vh'"
        :width="'30vw'"
        @click="gameStart()"
        :disabled="tokens.tokens.bet > tokens.tokens.sum"
        :styles="{ maxHeight: '65px' }"
        :size="'x-large'"
      >
        SPELA
      </btn>
    </div>
    <!--If player doesn't have tokens, button is disabeld-->
  </div>
</template>

<style lang="scss">
  .main-machine.cont {
    display: grid;
    height: calc(100vh - 75px);
    grid-template-rows: 60vh auto;
    grid-template-columns: 15vw auto 15vw;
    width: 100%;
  }
  .winner-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bonus-container {
    grid-column: 1;
    grid-row: span 1;
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
    & .bonus-wrapper {
      flex-shrink: 1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin: 0;
        padding: 0;
        border: 1px solid black;
        width: 2em;
        height: 2em;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: calc(100% - 1em - 2px);
        top: calc(-1em + 2px);
        border-radius: 200px;
        background-color: var(--btn-purple);
      }
    }
  }
  .reel-cont {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .row-2 {
    grid-row: 2;
    grid-column: span 3;
    display: flex;
    justify-content: center;
    gap: 2vw;
    align-items: center;
  }
  .cont {
    width: 80vw;
    display: flex;
    flex-direction: column;
  }
  .reels-col {
    grid-column-start: 2;
    display: grid;
    width: 100%;
  }

  .item {
    position: relative;
    margin-right: 15px;
    text-align: center;
    cursor: pointer;
  }

  .mini-icon {
    color: #ffffffcc;
    box-shadow: 0 2px 3px rgb(0, 0, 0, 0.5);
    position: absolute;
    inset: -10px 55px;
    display: flex;
    border-radius: 100px;
    background-image: linear-gradient(#4a65b0, #42c4ec);
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    img {
      filter: invert(100%) sepia(0%) saturate(7495%) hue-rotate(280deg)
        brightness(105%) contrast(101%);
    }
  }
</style>
