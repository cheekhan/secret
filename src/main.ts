import { createApp } from "vue";
import { RouterView } from "vue-router"
import router from "./router";
import "./style/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(RouterView)
    .use(router)
    .mount("#app");

