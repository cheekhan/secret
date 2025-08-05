<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
/** 侧边栏配置和标题 */
const aside = ref([
    {
        title: '天灵地也灵',
        items: [
            {
                title: '转动时间',
                path: '/big-ninth',
            },
            {
                title: '天人感应',
                path: '/liu-yao',
            },
        ],
    },
])

const title = computed(() => {
    let t = ''
    aside.value.some((g) => {
        g.items.some((item) => {
            if (item.path === route.fullPath) {
                t = item.title
                return true
            }
        })
    })
    return t
})
/** 侧边栏导航函数 */
function handleRouter(path: string) {
    router.push(path)
}
/** h5情况下的内容 */
const showPopup = ref(false)
</script>
<template>
    <div class="app-container">
        <div class="app-aside">
            <div class="app-show-b">
                <!-- 大屏的菜单 -->
                <template v-for="group in aside">
                    <p class="page-group">{{ group.title }}</p>
                    <p
                        class="page"
                        v-for="item in group.items"
                        @click="handleRouter(item.path)"
                    >
                        {{ item.title }}
                    </p>
                </template>
            </div>
            <div class="app-show-s">
                <div class="show-s-navbar">
                    <van-icon
                        name="bars"
                        color="#555555"
                        size="30"
                        @click="showPopup = true"
                    />
                    <p class="navbar-title">{{ title }}</p>
                    <p></p>
                </div>
            </div>
            <van-popup
                v-model:show="showPopup"
                position="left"
                overlay-class="aside-popup"
                :close-on-click-overlay="true"
            >
                <template v-for="group in aside" #overlay-content>
                    <p class="s-page-group">{{ group.title }}</p>
                    <p
                        class="s-page"
                        v-for="item in group.items"
                        @click="handleRouter(item.path)"
                    >
                        {{ item.title }}
                    </p>
                </template>
            </van-popup>
        </div>
        <div class="app-main">
            <RouterView />
        </div>
    </div>
</template>
<style lang="less" scoped>
.app-container {
    display: block;
    height: 100vh;
    background-color: var(--self-bg-color-1);
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
}
// 小屏幕 app-show-s app-show-b
@media screen and (max-width: 460px) {
    .app-aside {
        height: 35px;
    }
}
// 大屏幕
@media screen and (min-width: 461px) {
    .app-container {
        display: flex;
    }
    .app-aside {
        width: 250px;
    }
    .app-main {
        width: 0;
        flex-grow: 1;
    }
}
// 大屏下的样式
.page-group {
    color: var(--self-text-3);
    font-size: 14px;
    margin: 45px 10px 10px 10px;
    cursor: default;
}

.page {
    color: var(--self-text-1);
    margin: 0 10px 5px 10px;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
}

.page:hover {
    background-color: var(--self-bg-color-2);
}

:deep(.el-main) {
    --el-main-padding: 10px;
}

:deep(.el-aside) {
    background-color: var(--self-bg-color-0);
}
// 小屏下的样式
.show-s-navbar {
    display: flex;
    justify-content: space-between;
}
.navbar-title {
    color: var(--self-text-2);
    font-size: 16px;
    line-height: 30px;
}
.aside-popup {
    width: 70%;
    height: 100%;
    background-color: var(--self-bg-color-0);
}
.s-page-group {
    color: var(--self-text-3);
    font-size: 16px;
    margin: 45px 10px 10px 10px;
    cursor: default;
}

.s-page {
    color: var(--self-text-2);
    margin: 0 10px 5px 10px;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
}
</style>
