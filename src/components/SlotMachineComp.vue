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
  import MaxWinning from "./testWinningComp.vue"
  /*  import iconComponent from "./elements/iconComponent.vue" */

  export default {
    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      const score = useScoreStore()
      const audio = useAudioStore()
      window.content = score

      return { tokens, theme, score, audio }
    },

    components: {
      TotalBet,
      spinner: spinnerComp,
      "flash-text": FlashText,
      btn: Btn,
      MaxWinning,
      /* icon: iconComponent, */
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

    data() {
      return {
        count: 45,
        num: [],
        numIndex: [],
        winner: false,
        topScore: false,
        isSpinning: false,
        spinnerArr: [],
        reelArr: [],
        reels: 3,
        gameOver: false,
        winSum: 0,
        staticBet: null,
        isWinner: false,
        winnerType: 0,
        oddsModifier: 0,
        numMatrix: [],
        winTypes: [
          [1, 4, 7], // mitten raden
          [0, 3, 6], // översta raden
          [2, 5, 8], // sista raden
          [0, 4, 8], // diagonalt upp-ner
          [2, 4, 6], // diagonalt ner-upp
        ],
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
      getMatrix() {
        let matrix = []
        let mIndex = []

        for (let row of [0, 1, 2]) {
          let r = []
          mIndex.push(r)
          matrix[row] = []
          this.spinnerArr.forEach((e, i) => {
            let top =
              this.numIndex[i] == 0 ? e.length - 1 : this.numIndex[i] - 1
            let bottom =
              this.numIndex[i] == e.length - 1 ? 0 : this.numIndex[i] + 1
            let val = row == 0 ? top : row == 2 ? bottom : this.numIndex[i]
            mIndex[row].push(val)

            matrix[row][i] =
              row == 0 ? e[top] : row == 2 ? e[bottom] : e[this.numIndex[i]]
          })
        }

        return mIndex
      },
    },

    methods: {
      check(array, a, b, c) {
        return array[a] == array[b] && array[b] == array[c]
      },
      winNum() {
        let winVal = 6
        let isHigher

        // Testa om vinsten skall höjas
        for (let i = 6; i > 0; i--) {
          winVal = i
          isHigher = Math.floor(Math.random() * 2)

          // Så länge som 'isHigher' == 0 fortsätter loopen och vinsten blir bättre
          if (isHigher) {
            break
          }
        }
        return winVal
      },
      handleKeyPress(event) {
        // console.log("press")
        if (event.keyCode === 32) {
          this.gameStart()
        }
      },

      generateSpinner() {
        let array = []
        let preval = []
        for (var i = 0; i < this.count; i++) {
          let val = Math.floor(Math.random() * 6) + 1
          while (preval.indexOf(val) != -1) {
            val = Math.floor(Math.random() * 6) + 1
          }
          if (preval.length < 4) {
            preval.push(val)
          } else {
            preval.pop()
            preval.unshift(val)
          }
          array[i] = val
        }
        if ([...new Set(array)].length < 6) {
          console.log(array)
          array = this.generateSpinner()
        }
        return array
      },

      findNumber(winVal, index) {
        let reel = this.spinnerArr[index]
        let arr = []

        // Loopa igenom alla värden för att sortera ut på vilka index vinnande siffra ligger på respektive snurra
        reel.forEach((e, i) => {
          if (e == winVal) {
            arr.push(i)
          }
        })

        //Slumpmässigt välja ut ett av de ovan hittade indexen
        let nIndex = arr[Math.floor(Math.random() * arr.length)]

        //Spara valt index för respektive snurra

        // spara vilket nummer det är som är vinst nummer
        let num = reel[nIndex]

        // Felhantering om det skulle bli fel nummmer som sparas!
        if (num != winVal) {
          throw new Error("FELAKTIGT VIST NUMMER")
        }
        return { num: num, index: nIndex }
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

        // skall detta spel ge en vinst?

        // Om det blir vinst
        let random = Math.floor(Math.random() * 5 + this.oddsModifier)
        console.log("random", random)
        this.winnerType = random >= 5 ? 0 : 99

        if (this.winnerType == 0) {
          this.oddsModifier >= 1 ? 0 : this.oddsModifier - 0.04
        } else {
          this.oddsModifier <= -1 ? 0 : this.oddsModifier + 0.05
          let speciall = Math.floor(
            Math.random() * (15 - 4 * Math.abs(this.oddsModifier)),
          )
          this.winnerType = 1 + speciall
        }
        console.log("winnerType", this.winnerType)
        console.log("oddas", this.oddsModifier)
        let winRow
        let winVal
        let changedNumbers = []
        if (this.winnerType < this.winTypes.length - 1) {
          this.isWinner = true
          winRow = this.winTypes[this.winnerType]
          winVal = this.winNum()
          changedNumbers = [...winRow]
        }
        let x = new Array(this.reels * 3).fill(0).map((e, i) => {
          if (winRow && winRow.indexOf(i) != -1) {
            return winVal
          } else {
            let val = Math.floor(Math.random() * 6) + 1
            return val
          }
        })

        let wrong = true
        let arr = []
        while (wrong) {
          for (let type of this.winTypes) {
            if (winRow && type.every((e) => winRow.indexOf(e) != -1)) {
              continue
            } else {
              if (this.check(x, ...type)) {
                let fakeVal = x[type[0]]
                let n = type.filter((ei) => changedNumbers.indexOf(ei) == -1)
                n = n[Math.floor(Math.random() * n.length)]
                changedNumbers.push(n)
                let newVal
                do {
                  newVal = Math.floor(Math.random() * 6) + 1
                } while (newVal == fakeVal)
                x[n] = newVal
                break
              }
            }
            wrong = false
          }
        }

        console.log(x)
        for (let i = 0; i < x.length; i++) {
          if (i % 3 == 0) {
            arr[Math.floor(i / 3)] = []
          }
          arr[Math.floor(i / 3)][i % 3] = x[i]
        }

        let mIndex = []
        console.log("Arr:", arr)
        this.reelArr = this.spinnerArr.map((e, i) => {
          let val = arr[i][1]
          mIndex[i] = []
          this.num[i] = val
          let info = this.findNumber(val, i)
          let start = info.index == 0 ? e.length - 1 : info.index - 1
          mIndex[i] = info.index
          e.splice(start, 3, ...arr[i])
          return e
        })
        console.log("MATRIX", this.num, mIndex)
        this.mIndex = mIndex

        return this.mIndex

        /*


          check(array,a,b,c){
            return array[a] == array[b] && array[b] == array[c]
          }





          */

        switch (this.winnerType) {
          // diagonalTopLeft-BotRight
          case 1: {
            this.isWinner = true
            indexKorr = -1
            y = 1
            break
          }
          // diagonalTopRight-BotLeft
          case 2: {
            this.isWinner = true
            indexKorr = 1
            y = -1
            break
          }
          // top-row
          case 3: {
            this.isWinner = true
            indexKorr = 1
            y = 0
            break
          }
          // bottom-row
          case 4: {
            this.isWinner = true
            indexKorr = -1
            y = 0
            break
          }
          default: {
            this.isWinner = false
            break
          }
        }

        if (this.isWinner) {
          let x = indexKorr
          let next = y

          let winVal = this.winNum()
          this.spinnerArr.forEach((e, i) => {
            let info = this.findNumber(winVal, i)
            let index =
              info.index + x >= e.length
                ? 0
                : info.index + x < 0
                ? e.length - 1
                : info.index + x
            console.log("index,", index)
            this.numIndex[i] = index
            this.num[i] = winVal
            x += next
          })
        } else {
          this.isWinner = false
          this.spinnerArr.forEach((e, i) => {
            //spara index för slumpmässigt index
            this.numIndex[i] = Math.floor(Math.random() * e.length)
            //spara nummret för det indexet
            this.num[i] = e[this.numIndex[i]]
          })

          // kolla om det ändå skulle bli 3 lika irad
          if (this.num.every((e) => e == this.num[0])) {
            //Sparar det lika nummret
            let same = this.num[0]

            let reel = Math.floor(Math.random() * this.num.length)

            // Kör sålänge nummret blir samma
            while (this.num[reel] == same) {
              this.numIndex[reel] = Math.floor(
                Math.random() * this.spinnerArr[reel].length,
              )
              this.num[reel] = this.spinnerArr[reel][this.numIndex[reel]]
            }
          }
        }

        /** TODO
         * Gör egentligen samma sak som för att hitta vinst nummer, men snurra till index+1 mot siffran som det ska vara
         */

        // Loppa igenom varje spinner

        return { num: this.num, numIndex: this.numIndex }
      },

      getWinnings() {
        let extra = false
        let winSum = 0
        let bonus
        let theme
        if (this.num[0 < 4] && this.staticBet > 25) {
          extra = true
        }
        console.log("getWinnings")
        switch (this.winnerType) {
          case 1: {
            // falls through
          }
          case 2: {
            bonus =
              this.tokens.bonusTypes[
                Math.floor(Math.random() * this.tokens.bonusTypes.length)
              ]
            if (!extra) {
              winSum =
                this.staticBet +
                Math.ceil((this.staticBet * (7 - this.num[0])) / 3)
              while (bonus.name == "Extra Dubbel") {
                bonus =
                  this.tokens.bonusTypes[
                    Math.floor(Math.random() * this.tokens.bonusTypes.length)
                  ]
              }
            }
            winSum = this.staticBet + 10
            break
          }
          case 3: {
            //falls through
          }
          case 4: {
            theme =
              this.tokens.themeTypes[
                Math.floor(Math.random() * this.tokens.themeTypes.length)
              ]

            if (theme.owneds) {
              winSum = theme.cost
            }

            break
          }
        }
        let name = ""
        let sum = ""
        if (bonus) {
          bonus.amount++
          name = bonus.name
        }
        if (theme) {
          theme.owned = true
          name = theme.name
        }
        if (winSum) {
          this.tokens.winning(winSum)
          sum = winSum + "t"
        }

        this.winSum = `${name} ${sum ? "+" + sum : ""}`
      },
      done() {
        let bonus = this.tokens.bonusTypes
        let theme = this.tokens.themeTypes

        //Berätta att hjulen slutat snurra
        this.isSpinning = false

        // kolla om det finns en extra rad, men att den ska bort
        if (!this.extraRowCount && this.reels == 4) {
          let extraRow = bonus.find((i) => i.name === "Extra Row")
          extraRow.active = false
          this.reels = 3
          this.spinnerArr = new Array(this.reels)
            .fill(null)
            .map(() => this.generateSpinner())
        }

        //Återställ freeSpiinn
        bonus.find((i) => i.name === "Extra Spin").active = false

        //Kolla om alla nummer är samma
        /**TODO
           * Kanske bör denna variabel sättas redan i altGetNumbers när det
             bestömms huruvida det är vinst eller inte ?
          */

        if (this.isWinner) {
          let currentTheme =
            this.theme.currentTheme.charAt(0).toUpperCase() +
            this.theme.currentTheme.slice(1)

          let deluxeTheme = theme.find((i) => i.basic === currentTheme)
          this.audio.win.play()
          let winSum = 0

          if (bonus.find((i) => i.name === "Extra Dubbel").active) {
            winSum = (this.staticBet + this.staticBet * (7 - this.num[0])) * 2
          } else {
            winSum = this.staticBet + this.staticBet * (7 - this.num[0])
          }

          if (this.winnerType != 0) {
            this.getWinnings()
          } else {
            console.log("NORMAL VINST")
            switch (this.num[0]) {
              case 2:
                if (currentTheme === deluxeTheme.basic && !deluxeTheme.owned) {
                  deluxeTheme.owned = true
                  this.winSum = deluxeTheme.name
                } else {
                  this.winSum = winSum
                  this.tokens.winning(winSum)
                }
                break
              case 3:
                if (winSum < bonus.find((i) => i.name === "Extra Spin").cost) {
                  bonus.find((i) => i.name === "Extra Spin").amount++
                  this.winSum =
                    "1 " + bonus.find((i) => i.name === "Extra Spin").name
                } else {
                  let x =
                    winSum / bonus.find((i) => i.name === "Extra Spin").cost

                  for (let i = 0; i < x; i++) {
                    bonus.find((i) => i.name === "Extra Spin").amount++
                  }
                  this.winSum =
                    x + "st " + bonus.find((i) => i.name === "Extra Spin").name
                }
                break
              default:
                winSum = this.staticBet + this.staticBet * (7 - this.num[0])
                this.winSum = winSum + "t"
                this.tokens.winning(winSum)
                break
            }
          }

          console.log("Winner", winSum)

          // this.winner är gör att vinst texten visas.
          this.winner = this.isWinner
        } else if (this.tokens.tokens.sum < 5) {
          //Återställ variabler
          this.winner = false
          this.isWinner = false
          //Berätta att det är Game Over
          this.gameOver = true

          //new Audio("../assets/audio/game-over.mp3").play()

          this.audio.gameOver.play()
        } else {
          this.winner = false
          this.audio.noWin.play()
        }
        if (
          this.staticBet > this.tokens.tokens.sum &&
          this.staticBet < this.winSum
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

        // Ny lokal variabel för bet - detta för att du inte skall kunna satsa, börja spela och om du höjer medan hjulet snurrar skall vinsten inte baseras på tokens.bet utan på det lokala värdet istället
        this.staticBet = 0

        // Berätta att hjulen snurrar
        this.isSpinning = true
        this.winnerType = null
        this.winSum = null
        if (this.tokens.tokens.sum - this.staticBet < 0) {
          return
        }
        // console.log("startgame", this.isSpinning)

        if (this.extraRowCount) {
          this.extraRowCount--
        }

        this.winner = false
        this.isWinner = false
        // console.log(freeSpin)
        this.staticBet = this.tokens.tokens.bet
        if (!freeSpin) {
          // console.log("WFT")
          this.tokens.takeoutBet(this.staticBet)
        }

        this.altGetNumbers()

        if (this.isWinner) {
        }
        console.log(this.mIndex)
        this.$refs.child.start(this.mIndex, this.isWinner, this.winnerType)
      },

      newGame() {
        this.gameOver = false
        this.tokens.tokens.sum = this.tokens.tokens.startValue
        let startbet = this.tokens.tokens.startBet
          ? this.tokens.tokens.startBet
          : 100
        this.staticBet = startbet
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
    :text="'Vinst: ' + winSum + 't'"
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
        v-for="item in tokens.bonusTypes.filter((e) => e.amount > 0)"
        :key="item.name"
      >
        <div
          class="item"
          @click="activateBonus(item.name.replace(/[^A-z]/g, '').toLowerCase())"
        >
          <icon
            :name="item.name"
            :aria-label="item.name"
            :size="'68px'"
            :src="item.src"
            :item="item"
          />
          <div>
            {{
              item.name.substring(item.name.indexOf("Extra") + "extra".length)
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="reels-col col">
      <div class="col-1" />
      <div class="reel-cont">
        <spinner
          :win="isWinner"
          :ref="'child'"
          :spinners="spinnerArr"
          :nums="numIndex"
          :count="count"
          :matrix="numMatrix"
          @done="done"
          :key="spinnerArr"
        />
      </div>
    </div>
    <div class="row-2">
      <TotalBet :ref="'betComp'" />
      <MaxWinning />
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
    display: grid;
    grid-template-columns: 30% 40% 30%;
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
    text-align: center;
    cursor: pointer;
  }
</style>
