import { createRouter, createWebHashHistory } from "vue-router"

import StartView from "../views/StartView.vue"
import ShopView from "../views/ShopView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: StartView,
      path: "/",
    },
    {
      component: ShopView,
      path: "/shop",
    },
  ],
})
