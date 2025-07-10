import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/views/AppLayout/index.vue'
/** 其它页面 */
import BigNinth from '@/views/BigNinth/index.vue'
import Liuyao from '@/views/LiuYao/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                redirect: '/liu-yao',
            },
            {
                path: 'big-ninth',
                component: BigNinth,
            },
            {
                path: 'liu-yao',
                component: Liuyao,
            },
        ],
    },
]

export default createRouter({
    routes,
    history: createWebHashHistory(),
})
