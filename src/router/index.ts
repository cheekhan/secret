import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/views/AppLayout/index.vue'
/** 其它页面 */
import BigNinth from '@/views/BigNinth/index.vue'
import M3U8 from '@/views/m3u8/index.vue'
import NoSmoking from '@/views/NoSmoking/index.vue'
import GameCity from '@/views/game/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                // redirect: '/big-ninth',
                redirect: '/m3u8',
            },
            {
                path: 'big-ninth',
                component: BigNinth,
            },
            {
                path: 'm3u8',
                component: M3U8,
            },
            {
                path: 'no-smoking',
                component: NoSmoking,
            },
            {
                path: 'game-city',
                component: GameCity,
            },
        ],
    },
]

export default createRouter({
    routes,
    history: createWebHashHistory(),
})
