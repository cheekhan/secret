import { createApp } from 'vue'
import { RouterView } from 'vue-router'
import router from './router'
import './style/index.css'
// import { Icon } from 'vant'

createApp(RouterView).use(router)
// .use(Icon)
.mount('#app')
