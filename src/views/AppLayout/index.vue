<script setup lang="ts">
import { } from "vue"
import { RouterView } from "vue-router";
</script>
<template>
    <el-container class="app-container">
        <el-aside width="250px">
            <p class="page-group">掐指一算</p>
            <p class="page">排盘排盘</p>
            <p class="page-group">biubiubiu</p>
            <p class="page">下载</p>
        </el-aside>
        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>
<style lang="less" scoped>
.app-container {
    width: 1280px;
    height: 720px;
    background-color: var(--self-bg-color-1);
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
    transition: all .2s;
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