import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router.js"
import { createPinia } from "pinia"
import "../assets/main.scss"
createApp(App).use(router).use(createPinia()).mount("#app")
