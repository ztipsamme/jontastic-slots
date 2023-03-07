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
  <div class="score">
    <h1>High Scores</h1>
    <ul>
      <li :key="score" v-for="score in scoreStore.scores.highScore">
        {{ score }}
      </li>
    </ul>
  </div>
</template>
