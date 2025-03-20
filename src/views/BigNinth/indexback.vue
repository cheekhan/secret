<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import {
  SizeInfo,
  use12Branches,
  use12Stems,
  use12Godes,
  useSvg,
} from "./index";
import {
  earthBranchesType,
  celestialStemsType,
  earthBranches,
  celestialStems,
} from "./utils";
import dayjs from "dayjs";
import { Warning } from "@element-plus/icons-vue";

interface ymdhType {
  // 四柱
  y: string;
  m: string;
  d: string;
  h: string;
}

// 获取日期信息
const getTmdh = (): ymdhType => {
  const now = dayjs().format("YYYY,M,D,H").split(",");
  return {
    y: now[0],
    m: now[1],
    d: now[2],
    h: now[3],
  };
};
const timeInfo: Ref<ymdhType> = ref(getTmdh());
setInterval(() => requestAnimationFrame(() => (timeInfo.value = getTmdh())));
// 手动设置日期信息
const Year: Ref<Array<number>> = ref([0, 0]);
const Month: Ref<Array<number>> = ref([0, 0]);
const Day: Ref<Array<number>> = ref([0, 0]);
const Hour: Ref<number> = ref(0);
const MonthIndex: Ref<number> = ref(0);

/**
 * 起课方法
 */
function handleClick() {
  // 13 + 占时 - 月将
  const index = 12 - MonthIndex.value + Hour.value;
  branchesGroup.value.rotate(index);
}

// 罗盘绘制
const container: Ref<HTMLElement | null> = ref(null);
const branchesGroup = ref(); // 地盘

onMounted(() => {
  const svg = useSvg(container.value!, SizeInfo.width, SizeInfo.height);
  use12Branches(svg);
  branchesGroup.value = use12Stems(svg, 0);
  use12Godes(svg);
});
// 参考信息
const branchesTable = ref([
  { name: "子", yy: 1, wx: "水" },
  { name: "丑", yy: 0, wx: "土" },
  { name: "寅", yy: 1, wx: "木" },
  { name: "卯", yy: 0, wx: "木" },
  { name: "辰", yy: 1, wx: "土" },
  { name: "巳", yy: 0, wx: "火" },
  { name: "午", yy: 1, wx: "火" },
  { name: "未", yy: 0, wx: "土" },
  { name: "申", yy: 1, wx: "金" },
  { name: "酉", yy: 0, wx: "金" },
  { name: "戌", yy: 1, wx: "土" },
  { name: "亥", yy: 0, wx: "水" },
]);
const stemsTable = ref([
  { name: "甲", yy: 1, wx: "木" },
  { name: "乙", yy: 0, wx: "木" },
  { name: "丙", yy: 1, wx: "火" },
  { name: "丁", yy: 0, wx: "火" },
  { name: "戊", yy: 1, wx: "土" },
  { name: "己", yy: 0, wx: "土" },
  { name: "庚", yy: 1, wx: "金" },
  { name: "辛", yy: 0, wx: "金" },
  { name: "壬", yy: 1, wx: "水" },
  { name: "癸", yy: 0, wx: "水" },
]);
</script>
<template>
  <div class="container">
    <div ref="container" style="margin: 10px 0 0 10px" />
    <div class="preview">
      <div>
        <p>年：</p>
        <p>{{ timeInfo.y }}</p>
        <el-select v-model="Year[0]" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in celestialStems"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
        <el-select v-model="Year[1]" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in earthBranches"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </div>
      <div>
        <p>月：</p>
        <p>{{ timeInfo.m }}</p>
        <el-select v-model="Month[0]" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in celestialStems"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
        <el-select v-model="Month[1]" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in earthBranches"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </div>
      <div>
        <p>日：</p>
        <p>{{ timeInfo.d }}</p>
        <el-select v-model="Day[0]" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in celestialStems"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
        <el-select v-model="Day[1]" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in earthBranches"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </div>
      <div>
        <p>时：</p>
        <p>{{ timeInfo.h }}</p>
        <el-select v-model="Hour" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in earthBranches"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </div>
      <div>
        <p>月将：</p>
        <p>{{ timeInfo.m }}</p>
        <el-select v-model="MonthIndex" size="small" style="width: 50px">
          <el-option
            v-for="(item, index) in earthBranches"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
        <el-tooltip
          effect="dark"
          content="月中气才能确定月将"
          placement="right"
        >
          <el-icon style="margin-left: 20px; margin-top: 5px"
            ><Warning
          /></el-icon>
        </el-tooltip>
      </div>
      <el-button
        type="primary"
        style="width: 105px; margin: 40px 0 0 150px"
        @click="handleClick"
        >起课</el-button
      >
    </div>
  </div>

  <el-table :data="[1, 2]" border style="width: 100%">
    <el-table-column
      v-for="(item, index) in stemsTable"
      :key="index"
      :label="item.name"
    >
      <template #default="{ row }">
        <p>{{ row === 1 ? (item.yy ? "阳" : "阴") : item.wx }}</p>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="[1, 2]" border style="width: 100%">
    <el-table-column
      v-for="(item, index) in branchesTable"
      :key="index"
      :label="item.name"
    >
      <template #default="{ row }">
        <p>{{ row === 1 ? (item.yy ? "阳" : "阴") : item.wx }}</p>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="less" scoped>
.container {
  display: flex;

  .preview {
    .el-select {
      margin-left: 20px;
    }

    & > div {
      display: flex;
      margin-bottom: 5px;
    }

    p {
      color: var(--self-text-0);
      width: 60px;
      text-align: right;
      margin: 0;
      padding: 0;
    }
  }
}

.column-p {
}
</style>
