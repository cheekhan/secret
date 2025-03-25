<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { useSvg, size, branches } from "./index";
import { useRect, useStemsPie, useGodesPie, useWxInfo, useDate } from "./setup";
import selectStem from "./selectStem.vue";
import selectBranch from "./selectBranch.vue";
import { Loading, Cpu } from "@element-plus/icons-vue";
import type { Selection } from "d3";
// 绘制svg
const container = ref();
const stemsGroup: Ref<null | Selection<SVGGElement, unknown, null, undefined>> =
  ref(null);
const svg = ref();
onMounted(() => {
  svg.value = useSvg(container.value, size.width, size.height);
  useRect(svg.value);
  stemsGroup.value = useStemsPie(svg.value);
  // useGodesPie(svg);
  useWxInfo(svg.value);
});
// 计算现在的时间
const date = ref(useDate());
function fetchDate() {
  date.value = useDate();
}
// 起课，根据月将+占时进行计算
const index_h = ref(0); // 占时
const index_m = ref(0); // 月将
const day_stem = ref(0); // 日干
const day_branch = ref(0); // 日支
function start() {
  // 计算天盘
  const step = 12 - index_m.value + index_h.value;
  const angleStep = (2 * Math.PI) / 12; // 角度
  stemsGroup.value?.attr(
    "transform",
    `translate(250,250),rotate(${angleStep * step * (180 / Math.PI)})`
  );
  // 计算神将
  // 选出来的贵人位，就是天盘位
  // 天盘位对应的地盘位，决定了顺还是逆
  let guiren = [
    // 默认是夜贵
    branches.未,
    branches.申,
    branches.酉,
    branches.酉,
    branches.未,
    branches.申,
    branches.未,
    branches.寅,
    branches.卯,
    branches.卯,
  ];
  if (index_h.value >= 3 && index_h.value <= 8) {
    // 卯到辰，是昼贵
    guiren = [
      branches.丑,
      branches.子,
      branches.亥,
      branches.亥,
      branches.丑,
      branches.子,
      branches.丑,
      branches.午,
      branches.巳,
      branches.巳,
    ];
  }
  const index_gr = guiren[day_stem.value]; // 贵人位置
  const gr_flag = step - 12 + index_gr; // 贵人位置对应的地盘
  const godStartAngle = angleStep * (step + index_gr) * (180 / Math.PI);
  if (gr_flag >= 5 && gr_flag <= 10) {
    // 逆序
    useGodesPie(svg.value, godStartAngle);
  } else {
    // 顺序
    useGodesPie(svg.value, godStartAngle, false);
  }
}
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
      <div style="width: 450px; padding-left: 55px; box-sizing: border-box">
        <div class="right-row">
          <span style="margin-right: 50px">{{ date.y }}年</span>
          <span style="margin-right: 50px">{{ date.M }}月</span>
          <span style="margin-right: 50px">{{ date.d }}日</span>
          <span style="margin-right: 50px">{{ date.h }}时</span>
          <span>{{ date.m }}分</span>
        </div>
        <div class="right-row" style="justify-content: flex-start">
          <div>
            <selectStem />
            <selectBranch />
            <span style="margin-left: 15px; margin-right: 50px">年</span>
          </div>
          <div>
            <selectStem />
            <selectBranch />
            <span style="margin-left: 10px">月</span>
          </div>
        </div>
        <div class="right-row" style="justify-content: flex-start">
          <div>
            <selectStem v-model="day_stem" />
            <selectBranch v-model="day_branch" />
            <span style="margin-left: 15px; margin-right: 50px">日</span>
          </div>
          <div style="margin-left: 65px">
            <selectBranch />
            <span style="margin-left: 10px">时</span>
          </div>
        </div>
        <div class="right-row">
          <div>
            <span>月将：</span>
            <selectBranch v-model="index_m" />
          </div>
          <div>
            <span style="margin-left: 15px">真时：</span>
            <selectBranch />
          </div>
          <div>
            <span style="margin-left: 15px">占时：</span>
            <selectBranch v-model="index_h" />
          </div>
        </div>
        <div class="right-row" style="justify-content: flex-end">
          <el-button
            style="margin-right: 26px"
            :icon="Loading"
            @click="fetchDate"
            >刷新</el-button
          >
          <el-button
            type="primary"
            style="margin-right: 26px"
            :icon="Cpu"
            @click="start"
            >起课</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- 地支的五行和阴阳 -->
  <div class="branch-info">
    <p style="background-color: #191919">子</p>
    <p style="background-color: #191919">丑</p>
    <p style="background-color: #191919">寅</p>
    <p style="background-color: #191919">卯</p>
    <p style="background-color: #191919">辰</p>
    <p style="background-color: #191919">巳</p>
    <p style="background-color: #191919">午</p>
    <p style="background-color: #191919">未</p>
    <p style="background-color: #191919">申</p>
    <p style="background-color: #191919">酉</p>
    <p style="background-color: #191919">戌</p>
    <p style="background-color: #191919">亥</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>水</p>
    <p>土</p>
    <p>木</p>
    <p>木</p>
    <p>土</p>
    <p>火</p>
    <p>火</p>
    <p>土</p>
    <p>金</p>
    <p>金</p>
    <p>土</p>
    <p>水</p>
  </div>
  <!-- 天干的五行和阴阳 -->
  <div class="stem-info">
    <p style="background-color: #191919">甲</p>
    <p style="background-color: #191919">乙</p>
    <p style="background-color: #191919">丙</p>
    <p style="background-color: #191919">丁</p>
    <p style="background-color: #191919">戊</p>
    <p style="background-color: #191919">己</p>
    <p style="background-color: #191919">庚</p>
    <p style="background-color: #191919">辛</p>
    <p style="background-color: #191919">壬</p>
    <p style="background-color: #191919">癸</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>阳</p>
    <p>阴</p>
    <p>木</p>
    <p>木</p>
    <p>火</p>
    <p>火</p>
    <p>土</p>
    <p>土</p>
    <p>金</p>
    <p>金</p>
    <p>水</p>
    <p>水</p>
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
  // justify-content: space-between;
}
.branch-info {
  display: flex;
  flex-wrap: wrap;
  p {
    width: 8.3%;
    margin: 0;
    padding: 5px 0;
    text-align: center;
  }
}
.stem-info {
  display: flex;
  flex-wrap: wrap;
  p {
    width: 10%;
    margin: 0;
    padding: 5px 0;
    text-align: center;
  }
}
</style>
