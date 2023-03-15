<script>
  import { useScoreStore } from "../stores/scoreStore.js"

  export default {
    setup() {
      const scoreStore = useScoreStore()
      return { highScore: scoreStore.scores.highScore }
    },
  }
</script>

<template>
  <div class="scores">
    <h1>Best Scores</h1>
    <div>
      <ol class="scorelist">
        <li v-for="(score, index) in this.highScore" :key="index">
          {{ score }}
        </li>
      </ol>
      <img id="trophy" src="/assets/svg/trophy.svg" alt="Trofé" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .scores {
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
    background-image: linear-gradient(
      45deg,
      hsla(50deg, 0%, 90%) -20%,
      hsla(55deg, 0%, 95%) 80%
    );
    border-radius: 30px;
    border: 3px solid hsla(50deg, 100%, 50%);

    box-shadow: inset -2px 2px 5px 0px hsla(50deg, 0%, 0%, 0.5);
    padding: 40px;
    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      #trophy {
        width: 50vh;
      }
      .scorelist {
        width: min-content;
        max-height: 50vh;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        column-gap: 60px;
        font-size: 24px;
        > *:nth-child(1) {
          font-size: 36px;
          &::marker {
            color: gold;
          }
        }
        > *:nth-child(2) {
          font-size: 32px;
          &::marker {
            color: silver;
          }
        }
        > *:nth-child(3) {
          font-size: 28px;
          &::marker {
            color: #cd7f32;
          }
        }
      }
    }
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  @media screen and (min-width: 1000px) {
    .scores {
      div {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
