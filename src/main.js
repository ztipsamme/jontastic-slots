import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router.js"
import { createPinia } from "pinia"

import "../assets/main.scss"

let x = createApp(App).use(router).use(createPinia())
window.main = x

x.mount("#app")
