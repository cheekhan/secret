<script setup lang="ts">
import LiuyaoPan from './components/pan.vue'
import { ref, type Ref } from 'vue'
import { YaoItemEnum } from '@/types/liuyao'
const yao: Ref<
    [
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
    ]
> = ref([
    YaoItemEnum.ShaoYin,
    YaoItemEnum.ShaoYang,
    YaoItemEnum.LaoYang,
    YaoItemEnum.LaoYin,
    YaoItemEnum.ShaoYang,
    YaoItemEnum.LaoYang,
])
</script>

<template>
    <LiuyaoPan :yao="yao" />
</template>
