<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSvg, size } from "./index";
import { useRect, useStemsPie, useGodesPie, useWxInfo, useDate } from "./setup";
import selectStem from "./selectStem.vue";
import selectBranch from "./selectBranch.vue";
// 绘制svg
const container = ref();
onMounted(() => {
  const svg = useSvg(container.value, size.width, size.height);
  useRect(svg);
  useStemsPie(svg);
  useGodesPie(svg);
  useWxInfo(svg);
});
// 计算现在的时间
const date = ref(useDate());
function fetchDate() {
  date.value = useDate();
}
// 
const index_h = ref(0); // 占时
const index_m = ref(0); // 月将
</script>

<template>
  <div style="display: flex">
    <div ref="container"></div>
    <div class="svg-right">
      <div class="wuxing-color">
        <p style="background-color: #909399">金</p>
        <p style="background-color: #409eff">水</p>
        <p style="background-color: #67c23a">木</p>
        <p style="background-color: #f56c6c">火</p>
        <p style="background-color: #e6a23c">土</p>
      </div>
      <!-- 宽度预计450 -->
      <div style="width: 450px; padding-left: 15px; box-sizing: border-box">
        <!-- 年、日 -->
        <div class="right-row">
          <p>{{ date.y }}年：</p>
          <selectStem />
          <selectBranch />
          <p>{{ date.d }}日：</p>
          <selectStem />
          <selectBranch />
        </div>
        <!-- 月、时 -->
        <div class="right-row">
          <p>{{ date.M }}月：</p>
          <selectStem />
          <selectBranch />
          <p>{{ date.h }}点：</p>
          <p style="width: 65px; text-align: left; font-size: 18px">
            {{ date.m }}：{{ date.s }}
          </p>
          <selectBranch />
        </div>
        <!-- 矫正后的月将和时间 -->
        <div class="right-row">
          <p>月将：</p>
          <selectBranch v-model="index_m" />
          <div style="width: 65px"></div>
          <p>真时：</p>
          <selectBranch v-model="index_h" />
          <div style="width: 65px"></div>
        </div>
        <!-- 刷新和起课按钮 -->
        <div class="right-row" style="justify-content: flex-end">
          <el-button
            auto-insert-space
            plain
            type="primary"
            style="margin-right: 20px"
            @click="fetchDate"
            >刷新</el-button
          >
          <el-button auto-insert-space type="primary">起课</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.svg-right {
  display: flex;
  .wuxing-color {
    display: flex;
    flex-direction: column;
    p {
      height: 100px;
      width: 60px;
      margin: 0;
      padding: 0;
      text-align: center;
      line-height: 100px;
    }
  }
}
.right-row {
  display: flex;
  margin-bottom: 10px;
  & > P {
    margin: 0;
    padding: 0;
    width: 95px;
    font-size: 20px;
    text-align: right;
    line-height: 35px;
  }
}
</style>
