<script setup lang="ts">
import { ref } from "vue";
import type { CalendarDateType, CalendarInstance } from "element-plus";
import {
  PieChart,
  ArrowLeft,
  ArrowRight,
  Clock,
} from "@element-plus/icons-vue";

const calendar = ref<CalendarInstance>();
const value = ref(new Date());

/** 日历实例的内置函数 */
function selectDate(selectType: CalendarDateType) {
  calendar.value?.selectDate(selectType);
}
</script>

<template>
  <el-calendar v-model="value" ref="calendar">
    <template #header="{ date }">
      <span style="line-height: 32px">自律让我不自由</span>
      <span style="line-height: 32px">{{ date }}</span>
      <el-button-group>
        <el-button
          type="primary"
          :icon="ArrowLeft"
          @click="selectDate('prev-month')"
          >上个月</el-button
        >
        <el-button type="primary" :icon="Clock" @click="selectDate('today')"
          >今天</el-button
        >
        <el-button type="primary" :icon="PieChart">分析</el-button>
        <el-button
          type="primary"
          :icon="ArrowRight"
          @click="selectDate('next-month')"
          >下个月</el-button
        >
      </el-button-group>
    </template>
  </el-calendar>
</template>

<style lang="less" scoped></style>
