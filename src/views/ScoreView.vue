<script>
  import { useScoreStore } from "../stores/scoreStore.js"

  export default {
    setup() {
      const scoreStore = useScoreStore()
      window.content = scoreStore
      return { scoreStore }
    },
  }
</script>
<template>
  <div class="score-container">
    <div class="score-header">
      <h1 class="header-text">Best Scores</h1>
      <!--   <div class="token-icon">t</div> -->
    </div>
    <ol class="score-list">
      <li class="score-item">
        <div class="score-position score-gold">1.</div>
        <div class="score-value">{{ scoreStore.scores.highScore[0] }}</div>
      </li>
      <li class="score-item">
        <div class="score-position score-silver">2.</div>
        <div class="score-value">{{ scoreStore.scores.highScore[1] }}</div>
      </li>
      <li class="score-item">
        <div class="score-position score-bronze">3.</div>
        <div class="score-value">{{ scoreStore.scores.highScore[2] }}</div>
      </li>
      <li class="score-item">
        <div class="score-position">4.</div>
        <div class="score-value">{{ scoreStore.scores.highScore[3] }}</div>
      </li>
      <li class="score-item">
        <div class="score-position">5.</div>
        <div class="score-value">{{ scoreStore.scores.highScore[4] }}</div>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
  .score-position,
  .score-value {
    font-weight: normal;
  }
  .score-container {
    width: 400px;
    margin: auto;
    background-image: linear-gradient(
      45deg,
      hsla(50deg, 0%, 90%) -20%,
      hsla(55deg, 0%, 95%) 80%
    );
    border-radius: 30px;
    border: 3px solid hsla(50deg, 100%, 50%);

    box-shadow: inset -2px 2px 5px 0px hsla(50deg, 0%, 0%, 0.5);
    padding: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .score-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 22px;
  }

  .header-text {
    font-size: 22px;
    margin-right: 10px;
  }
  .score-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .score-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 20px;
  }

  .score-position {
    font-size: 24px;
    font-weight: bold;
    color: #999;
    margin-right: 10px;
    width: 30px;
    text-align: center;
  }

  .score-gold {
    color: gold;
  }

  .score-silver {
    color: silver;
  }

  .score-bronze {
    color: #cd7f32;
  }

  .score-value {
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
  }
</style>
