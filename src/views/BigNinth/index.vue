<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { SizeInfo, use12Branches, use12Stems, use12Godes } from "./index"
import { useSvg } from "./utils"
import dayjs from 'dayjs';

interface ymdhType { // 四柱
  y: string,
  m: string,
  d: string,
  h: string
}
// 获取四柱
const getTmdh = (): ymdhType => {
  const now = dayjs().format('YYYY,M,D,H').split(',')
  return {
    y: now[0],
    m: now[1],
    d: now[2],
    h: now[3]
  }
}
const timeInfo: Ref<ymdhType> = ref(getTmdh());
setInterval(() => requestAnimationFrame(() => timeInfo.value = getTmdh()))
// 罗盘绘制
const container: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
  const svg = useSvg(container.value!, SizeInfo.width, SizeInfo.height);
  use12Branches(svg);
  use12Stems(svg, 0);
  use12Godes(svg);
})
</script>
<template>
  <div class="preview">
    <p>{{ timeInfo.y }}</p>
    <p>{{ timeInfo.m }}</p>
    <p>{{ timeInfo.d }}</p>
    <p>{{ timeInfo.h }}</p>
  </div>
  <div class="preview">
    <p>甲子年</p>
    <p>甲子月</p>
    <p>甲子日</p>
    <p>子时</p>
  </div>
  <div class="container" ref="container" />
</template>
<style lang="less" scoped>
.container {
  // width: 800px;

}

.preview {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;

  p {
    margin: 0 20px 0 0;
    color: #fff;

  }
}
</style>