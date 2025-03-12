import { createApp } from "vue";
import { RouterView } from "vue-router"
import router from "./router";
import "./style/index.css";

createApp(RouterView)
    .use(router)
    .mount("#app");

