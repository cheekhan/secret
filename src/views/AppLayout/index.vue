<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Button from '@/components/BaseButton/index.vue'
const router = useRouter()
const aside = ref([
    {
        title: '天灵地也灵',
        items: [
            {
                title: '转动时间',
                path: '/big-ninth',
            },
        ],
    },
])

function handleRouter(path: string) {
    router.push(path)
}
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
                <Button></Button>
            </div>
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
</style>
