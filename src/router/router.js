import { createRouter, createWebHashHistory } from "vue-router"

import StartView from "../views/StartView.vue"
import ShopView from "../views/ShopView.vue"
import ScoreView from "../views/ScoreView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: StartView,
      path: "/",
    },
    {
      component: ShopView,
      name: "Shop",
      path: "/shop",
    },
    {
      component: ScoreView,
      name: "Score",
      path: "/score",
    },
  ],
})
