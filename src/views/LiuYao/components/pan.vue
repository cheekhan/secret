<script setup lang="ts">
import { YaoItemEnum } from '@/types/liuyao'
import { FourInfoType } from '@/types/base'
const { title, date, yao, four } = defineProps<{
    title: string // 占事
    date: Date // 占时
    yao: Array<YaoItemEnum> // 爻
    four: FourInfoType // 四柱
}>()
</script>
<template>
    <div>
        <p>
            <span>{{ date }}</span>
            <span>{{ title }}</span>
        </p>
        <p>{{ four }}</p>
    </div>
</template>

<style lang="less" scoped></style>
