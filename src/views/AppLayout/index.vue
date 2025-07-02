<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
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
    <el-config-provider :locale="zhCn">
        <el-container class="app-container">
            <el-aside width="250px">
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
            </el-aside>
            <el-main>
                <el-scrollbar>
                    <RouterView />
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-config-provider>
</template>
<style lang="less" scoped>
.app-container {
    //width: 1280px;
    //height: 720px;
    height: 100vh;
    background-color: var(--self-bg-color-1);
    //overflow: hidden;
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
