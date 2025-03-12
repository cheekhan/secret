<script setup lang="ts">
import {onMounted, ref, type Ref} from 'vue';
import {
  SizeInfo, use12Branches, use12Stems, use12Godes,
  useSvg
} from "./index"
import {
  earthBranchesType, celestialStemsType,
  earthBranches, celestialStems,
} from "./utils"
import dayjs from "dayjs"

interface ymdhType { // 四柱
  y: string,
  m: string,
  d: string,
  h: string
}

// 获取日期信息
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
// 手动设置日期信息
const Year: Ref<[celestialStemsType, earthBranchesType]> = ref(['甲', '子']);
const Month: Ref<[celestialStemsType, earthBranchesType]> = ref(['甲', '子']);
const Day: Ref<[celestialStemsType, earthBranchesType]> = ref(['甲', '子']);
const Hour: Ref<earthBranchesType> = ref('子');

/**
 * 起课方法
 */
function handleClick() {
  branchesGroup.value.rotate(2)
}


// 罗盘绘制
const container: Ref<HTMLElement | null> = ref(null);
const branchesGroup = ref(); // 地盘

onMounted(() => {
  const svg = useSvg(container.value!, SizeInfo.width, SizeInfo.height);
  use12Branches(svg);
  branchesGroup.value = use12Stems(svg, 0);
  use12Godes(svg);
})
</script>
<template>
  <div class="container">
    <div ref="container" style="margin:10px 0 0 10px;"/>
    <div class="preview">
      <div>
        <p>年：</p>
        <p>{{ timeInfo.y }}</p>
        <el-select
            v-model="Year[0]"
            size="small"
            style="width: 50px"
        >
          <el-option
              v-for="item in celestialStems"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
        <el-select
            v-model="Year[1]"
            size="small"
            style="width: 50px"
        >
          <el-option
              v-for="item in earthBranches"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </div>
      <div>
        <p>月：</p>
        <p>{{ timeInfo.m }}</p>
        <el-select
            v-model="Month[0]"
            size="small"
            style="width: 50px"
        >
          <el-option
              v-for="item in celestialStems"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
        <el-select
            v-model="Month[1]"
            size="small"
            style="width: 50px"
        >
          <el-option
              v-for="item in earthBranches"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </div>
      <div>
        <p>日：</p>
        <p>{{ timeInfo.d }}</p>
        <el-select
            v-model="Day[0]"
            size="small"
            style="width: 50px"
        >
          <el-option
              v-for="item in celestialStems"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
        <el-select
            v-model="Day[1]"
            size="small"
            style="width: 50px"
        >
          <el-option
              v-for="item in earthBranches"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </div>
      <div>
        <p>时：</p>
        <p>{{ timeInfo.h }}</p>
        <el-select
            v-model="Hour"
            size="small"
            style="width: 50px"
        >
          <el-option
              v-for="item in earthBranches"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </div>
      <el-button type="primary" style="width: 105px;margin:40px 0 0 150px;" @click="handleClick">起课</el-button>


    </div>
  </div>
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

</style>