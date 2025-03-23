<script setup lang="ts">
import { ref, type Ref } from "vue";
import { stems } from "./index";
const options: Array<stems> = [
  stems["甲"],
  stems["乙"],
  stems["丙"],
  stems["丁"],
  stems["戊"],
  stems["己"],
  stems["庚"],
  stems["辛"],
  stems["壬"],
  stems["癸"],
];
const value: Ref<stems> = ref(0);

const emits = defineEmits<{
  (e: "update:modelValue", value: stems): void;
}>();

function handleChange() {
  emits("update:modelValue", value.value);
}
</script>

<template>
  <el-select v-model="value" style="width: 65px" @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item"
      :label="stems[item]"
      :value="item"
    />
  </el-select>
</template>
