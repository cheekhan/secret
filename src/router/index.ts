import { createWebHashHistory, createRouter } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import AppLayout from "@/views/AppLayout/index.vue"
/** 其它页面 */
import BigNinth from "@/views/BigNinth/index.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: AppLayout,
        children: [
            {
                path: "",
                redirect:'/big-ninth'
            },
            {
                path: "big-ninth",
                component: BigNinth
            }
        ]
    }
]


export default createRouter({
    routes,
    history: createWebHashHistory()
})

