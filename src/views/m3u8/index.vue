<script setup lang="ts">
import { Search, Loading } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input3 = ref()
</script>

<template>
    <div class="uri_input">
        <el-input
            v-model="input3"
            placeholder="输入下载链接：支持普通的媒体类型，和M3U8类型"
            style="width: 75%"
        >
            <template #append>
                <el-button type="primary" :icon="Search" />
            </template>
        </el-input>
    </div>
    <el-divider>
        <el-icon class="is-loading" color="#67C23A"><Loading /></el-icon>
    </el-divider>
</template>

<style lang="less" scoped>
.uri_input {
    display: flex;
    justify-content: center;
}

:deep(.el-divider__text) {
    background-color: var(--self-bg-color-1);
}
</style>
