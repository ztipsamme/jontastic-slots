import { createRouter, createWebHashHistory } from 'vue-router'

import AboutView from '../views/AboutView.vue'
import StartView from './views/ContactView.vue'
import GameView from './views/HomeView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: AboutView,
      path: '/about',
    },
    {
      component: GameView,
      path: '/game',
    },
    {
      component: StartView,
      path: '/',
    },
  ],
})
