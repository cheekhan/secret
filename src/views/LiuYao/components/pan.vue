<script setup lang="ts">
import { YaoItemEnum } from '@/types/liuyao'
const { yao } = defineProps<{
    yao: [
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
        YaoItemEnum,
    ] // 爻
}>()
</script>
<template>
    <div class="flex-col">
        <div class="flex-col left">
            <div>
                <p>龙</p>
                <p>龙</p>
                <p>龙</p>
                <p>龙</p>
                <p>龙</p>
                <p>龙</p>
            </div>
            <div>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
            </div>
            <div>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
            </div>
            <div style="width: 60px">
                <p class="yang-item" />
                <p class="yin-item"></p>
                <p class="yang-item" />
                <p class="yin-item"></p>
                <p class="yang-item" />
                <p class="yin-item"></p>
            </div>
            <div style="margin-right: 0">
                <p>世</p>
                <p>世</p>
                <p>世</p>
                <p>世</p>
                <p>世</p>
                <p>世</p>
            </div>
        </div>
        <div class="flex-col center"></div>
        <div class="flex-col right">
            <div>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
                <p>子水</p>
            </div>
            <div>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
                <p>兄弟</p>
            </div>
            <div style="width: 60px; margin-right: 0">
                <p class="yang-item" />
                <p class="yin-item"></p>
                <p class="yang-item" />
                <p class="yin-item"></p>
                <p class="yang-item" />
                <p class="yin-item"></p>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex-col {
    display: flex;
    // flex-direction: column;
    width: 100%;
    p {
        margin: 0;
        padding: 0;
    }
}
.left,
.right {
    width: 52%;
    & > div {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-right: 6px;
        flex-grow: 1;
    }
}
.right {
    width: 40%;
    .yang-item,
    .yin-item {
        background-color: var(--self-bg-color-2);
    }
}

.center {
    width: 8%;
}

.yang-item,
.yin-item {
    height: 12px;
    background-color: #000;
    // position: relative;
}
.yin-item::after {
    content: '';
    display: block;
    width: 10px;
    height: 12px;
    margin-left: 25px;
    background-color: var(--self-bg-color-1);
}
</style>
