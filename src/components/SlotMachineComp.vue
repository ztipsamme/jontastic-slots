<script>
  import { useTokenStore } from "../stores/tokenStore.js"
  import { useThemeStore } from "../stores/themes.js"
  import { useScoreStore } from "../stores/scoreStore.js"
  import { useAudioStore } from "../stores/audio"
  import { useBetStore } from "../stores/bet.js"
  import iconComponent from "../components/elements/iconComponent.vue"
  import spinnerComp from "./ReelsComp.vue"
  import FlashText from "./animations/FlashingText.vue"
  import Btn from "./elements/buttonComponent.vue"
  import MaxWinning from "./testWinningComp.vue"

  export default {
    setup() {
      const tokens = useTokenStore()
      const theme = useThemeStore()
      const score = useScoreStore()
      const audio = useAudioStore()
      const bet = useBetStore()

      return { tokens, theme, score, audio, bet }
    },

    components: {
      spinner: spinnerComp,
      "flash-text": FlashText,
      btn: Btn,
      MaxWinning,
      icon: iconComponent,
    },

    emits: { stop: null },

    created() {
      this.reset(true)

      this.spinnerArr = new Array(this.reels)
        .fill(null)
        .map(() => this.generateSpinner())
    },
    mounted() {
      document.addEventListener("keydown", this.handleKeyPress)
    },
    beforeUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress)
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
        reelArr: [],
        reels: 3,
        gameOver: false,
        winSum: 0,
        staticBet: null,
        isWinner: false,
        spacePressed: false,
        winnerType: 0,
        oddsModifier: 0,
        numMatrix: [],
        prizeType: {
          tokens: false,
          bonus: false,
          theme: false,
        },
        winVal: 99,
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
      disableSpinn() {
        return (
          this.tokens.tokens.bet > this.tokens.tokens.sum ||
          this.tokens.tokens.sum < 1
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
      getWinnerText({ tokens, bonus, themes }) {
        let arr = ["Vinst!"]
        if (tokens) {
          arr.push("tok: " + tokens)
        }
        if (bonus) {
          arr.push("Bonus: " + bonus)
        }
        if (themes) {
          arr.push("Tema: " + themes)
        }
        return arr
      },
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
        if (event.keyCode === 32) {
          this.winner = false
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
          array = this.generateSpinner()
        }
        if (array.length > this.count + 1) {
          array.splice(this.count - 1)
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

        return { num: num, index: nIndex }
      },
      activateBonus(name) {
        if (this.isSpinning) return
        let extraSpin = this.tokens.bonusTypes.find(
          (i) => i.name === "Extra Spin",
        )

        let extraRow = this.tokens.bonusTypes.find(
          (i) => i.name === "Extra Row",
        )
        let dubbel = this.tokens.bonusTypes.find(
          (i) => i.name === "Extra Dubbel",
        )

        this.audio.bonus.load()
        this.audio.bonus.play()

        switch (name) {
          case "extrarow": {
            if (this.extraRowCount || extraRow.active) {
              return
            }
            extraRow.amount--
            extraRow.active = true
            this.extraRowCount = extraRow.count
            this.reels = 4
            this.spinnerArr = new Array(this.reels)
              .fill(null)
              .map(() => this.generateSpinner())
            extraRow.uses = 4
            break
          }
          case "extraspin": {
            if (this.isSpinning || extraSpin.active) {
              return
            }

            extraSpin.amount--
            extraSpin.active = true
            this.audio.bonus.addEventListener("ended", () => {
              this.gameStart(true)
            })
            break
          }
          case "extradubbel": {
            dubbel.amount--
            dubbel.active = true
            break
          }
        }
      },
      altGetNumbers() {
        console.log("altGetNumbers")
        this.numIndex = []
        this.num = []
        let odds = JSON.parse(JSON.stringify(this.oddsModifier))

        // skall detta spel ge en vinst?

        // Om det blir vinst
        let random = Math.floor(Math.random() * 7 + odds)
        this.winnerType = random >= 7 ? 0 : 99

        if (this.winnerType == 0) {
          this.oddsModifier = this.oddsModifier >= 1 ? 0 : odds - 0.04
        } else {
          this.oddsModifier = this.oddsModifier <= -1 ? 0 : odds + 0.05
          let speciall = Math.floor(
            Math.random() * (17 - 4 * Math.abs(this.oddsModifier)) + 1,
          )
          console.log(speciall, this.oddsModifier)
          this.winnerType = speciall
        }
        let winRow
        let winVal
        let changedNumbers = []

        if (this.winnerType < this.winTypes.length) {
          this.isWinner = true
          winRow = this.winTypes[this.winnerType]
          winVal = this.winNum()
          this.winVal = winVal
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
        for (let i = 0; i < x.length; i++) {
          if (i % 3 == 0) {
            arr[Math.floor(i / 3)] = []
          }
          arr[Math.floor(i / 3)][i % 3] = x[i]
        }

        let mIndex = []

        let tmpReel = this.spinnerArr.map((e, i) => {
          let val = arr[i][1]
          mIndex[i] = []
          this.num[i] = val
          let info = this.findNumber(val, i)
          let start = info.index == 0 ? e.length - 1 : info.index - 1
          mIndex[i] = info.index
          e.splice(start, 3, ...arr[i])
          return e
        })
        setTimeout(() => {
          this.reelArr = tmpReel
        }, 500)

        /*         this.spinnerArr = this.spinnerArr.map((e) => {
          let a = [...e]
          if (e.length > this.count) {
            a.splice(21)
          }
          return a
        }) */

        this.mIndex = mIndex

        return this.mIndex
      },
      setBet(val) {
        val = val < 5 ? 5 : val
        val = val > this.tokens.tokens.sum ? this.tokens.tokens.sum : val
        this.tokens.tokens.bet = val
      },
      getWinnings() {
        let bonus = this.tokens.bonusTypes.find((i) => i.name === "Extra Spin")
        let bonusWin
        let themeWin
        let tokenWin
        let bonusCount = 1

        switch (this.winnerType) {
          case 0: {
            tokenWin = this.staticBet + this.staticBet * (7 - this.num[0])
            break
          }
          case 1: {
            //TEMAN!
            let currentTheme = this.theme.currentTheme
            let deluxeTheme = this.theme.findDelux
            console.log("TEMA", this.num[0])
            switch (this.winVal) {
              case 5: {
                console.log("TEMA5: ", this.num)
                //falls through
              }
              case 2: {
                if (
                  deluxeTheme &&
                  currentTheme === deluxeTheme.basic.toLowerCase() &&
                  !deluxeTheme.owned
                ) {
                  deluxeTheme.owned = true
                  themeWin = deluxeTheme.name
                } else {
                  tokenWin = this.staticBet + this.staticBet / 5
                }
                break
              }
              default: {
                tokenWin = this.staticBet + this.staticBet / 5
                break
              }
            }
            break
          }
          case 2: {
            //BONUSAR
            switch (this.winVal) {
              case 4: {
                let bonus = this.tokens.bonusTypes.find(
                  (i) => i.name === "Extra Dubbel",
                )
                bonus.amount++
                bonusWin = bonus.name

                break
              }

              case 5: {
                bonus = this.tokens.bonusTypes.find(
                  (i) => i.name === "Extra Row",
                )
                //falls through
              }
              case 3: {
                let tw = this.staticBet + this.staticBet * (7 - this.num[0])
                if (tw < bonus.cost) {
                  bonus.amount++
                  bonusWin = bonus.name
                } else {
                  let x = Math.ceil(tw / (bonus.cost * 2))
                  bonus.amount += x
                  bonusWin = bonus.name
                  bonusCount = x
                }
                break
              }
              default: {
                let bName = ["extrarow", "extraspin"]
                bName = bName[Math.floor(Math.random() * 2)]
                let bonus = this.tokens.bonusTypes.find(
                  (e) =>
                    e.name.toLowerCase().replace(/\s/, "") ==
                    bName.toLowerCase().replace(/\s/, ""),
                )

                bonus.amount++
                bonusWin = bonus.name
                break
              }
            }
            break
          }
          case 3: {
            //falls through
          }
          case 4: {
            //falls through
          }
          default: {
            tokenWin = this.staticBet + Math.ceil(this.staticBet / 5)
          }
        }
        bonusWin = bonusCount > 1 ? bonusCount + "x " + bonusWin : bonusWin
        if (
          this.tokens.bonusTypes.find((i) => i.name === "Extra Dubbel").active
        ) {
          tokenWin = tokenWin * 2
          bonusCount = bonusCount * 2
        }

        if (tokenWin) {
          this.tokens.winning(tokenWin)
          this.score.updateScore(tokenWin)
        }

        this.winSum = this.getWinnerText({
          tokens: tokenWin,
          bonus: bonusWin,
          themes: themeWin,
        })
      },
      done() {
        console.log("done")
        let bonus = this.tokens.bonusTypes

        //Berätta att hjulen slutat snurra
        this.isSpinning = false

        // kolla om det finns en extra rad, men att den ska bort
        if (
          bonus.find((i) => i.name === "Extra Row").uses == 0 &&
          this.reels == 4
        ) {
          console.log("0uses")
          let extraRow = bonus.find((i) => i.name === "Extra Row")
          extraRow.active = false
          this.reels = 3
          this.spinnerArr = new Array(this.reels)
            .fill(null)
            .map(() => this.generateSpinner())
        }

        if (this.isWinner) {
          this.audio.win.play()
          this.getWinnings()
          this.winner = true
          this.reset()
        } else if (this.tokens.tokens.sum < 1) {
          this.gameOver = true
          this.audio.gameOver.play()
        } else {
          this.reset(true)
          this.audio.noWin.play()
        }
      },
      reset(all = false) {
        this.isSpinning = false
        this.isWinner = false
        this.winnerType = null

        this.staticBet = 0

        if (this.tokens.tokens.sum === 0) {
          this.tokens.tokens.bet = this.tokens.tokens.startBet
        } else if (this.tokens.tokens.sum < this.tokens.tokens.bet) {
          try {
            this.tokens.tokens.bet = this.tokens.tokens.sum
          } catch {
            this.setBet(this.tokens.tokens.sum)
          }
        }

        for (let bonus of this.tokens.bonusTypes) {
          if (bonus.name.replace(/\s/, "").toLowerCase() == "extrarow") {
            return
          }
          if (bonus.uses == 0) {
            bonus.uses = bonus.count
          }
          bonus.active = false
        }

        if (all) {
          this.gameOver = false
          this.winner = false
        }
      },

      gameStart(freeSpin = false) {
        console.log("gameStart")
        this.spinnerArr.forEach((e) => {
          e.splice(21)
        })
        if (this.$route.name === "Shop") {
          console.log("Shop Rouyt")
          return
        }

        if (this.$route.name === "Score") {
          console.log("Score Rount")
          return
        }

        if (this.isSpinning) {
          console.log("isSpinning")
          return
        }
        if (this.tokens.tokens.sum < 1) {
          console.log("tokends")
          this.gameOver = true
          return
        }
        this.reset(true)
        this.isSpinning = true

        this.staticBet = this.tokens.tokens.bet
        // Berätta att hjulen snurrar

        if (this.tokens.tokens.sum - this.staticBet < 1) {
          this.staticBet = this.tokens.tokens.sum
          this.tokens.tokens.bet = this.staticBet
        }

        if (!freeSpin) {
          this.tokens.takeoutBet(this.staticBet)
        }

        if (
          this.tokens.bonusTypes.find(
            (e) => e.name.replace(/\s/g, "").toLowerCase() == "extrarow",
          ).active
        ) {
          console.log("extra Actove")
          this.tokens.bonusTypes.find(
            (e) => e.name.replace(/\s/g, "").toLowerCase() == "extrarow",
          ).uses--
        }

        this.altGetNumbers()

        this.$refs.child.start(this.mIndex, this.isWinner, this.winnerType)
      },

      newGame() {
        this.reset(true)
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
    :rows="winSum"
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
  <div class="main-machine">
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
    <div class="side">
      <div class="bonus-container">
        <div
          class="bonus-wrapper"
          v-for="item in tokens.bonusTypes.filter((e) => e.amount > 0)"
          :key="item.name"
        >
          <div
            class="item"
            @click="
              activateBonus(item.name.replace(/[^A-z]/g, '').toLowerCase())
            "
          >
            <icon
              :name="item.name"
              :aria-label="item.name"
              :size="'50px'"
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
      <MaxWinning :ref="'betComp'" />
      <btn
        :color="'green'"
        :height="'80%'"
        :width="'85%'"
        @click="gameStart()"
        :disabled="tokens.tokens.bet > tokens.tokens.sum"
        :styles="{ maxHeight: '100%', alignSelf: 'end', justifySelf: 'center' }"
        :size="'x-large'"
      >
        SPELA
      </btn>
    </div>
  </div>
</template>

<style lang="scss">
  // body {
  //   overflow: hidden;
  // }
  .main-machine {
    display: grid;
    height: 90%;
    grid-template-rows: 100%;
    grid-template-columns: auto 27vw;
    gap: 7vh;
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
    flex-direction: row;

    height: 100%;
    width: 27vw;
    & .bonus-wrapper {
      flex-shrink: 1;
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: center;

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

  /* .bonus-container {
    grid-column: 3/4;
    grid-row: 1/2;
    display: flex;
    flex-direction: row;

    height: 100%;
    width: 100%;
    & .bonus-wrapper {
      flex-shrink: 1;
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  #bet {
    grid-column: 3/4;
    grid-row: 2/3;
  }

  #play {
    grid-column: 3/4;
    grid-row: 3/4;
    display: flex;
  }
 */
  .reel-cont {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .side {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 2fr 3fr 2fr;
  }
  .row-2 {
    height: 100%;
    justify-content: center;
    gap: 2vw;
    align-items: center;
    display: grid;
    grid-template-columns: 50% 50%;
    //width: 80vw;
    justify-self: center;
  }
  .cont {
    width: 80vw;
    display: flex;
    flex-direction: column;
  }

  .item {
    text-align: center;
    cursor: pointer;
    margin: 15px 15px 0 0;
  }
</style>
